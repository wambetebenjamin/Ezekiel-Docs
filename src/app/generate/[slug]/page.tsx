'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, action: { action: string }) => Promise<string>;
      render: (element: string | HTMLElement, parameters: any) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, FileText, Shield, Download, AlertCircle, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants';

const DOCUMENT_CONFIG: Record<string, any> = {
  'nda': {
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Protect confidential information shared between parties.',
    icon: FileText,
    steps: [
      {
        id: 'parties',
        title: 'Party Details',
        fields: [
          { name: 'disclosingPartyName', label: 'Disclosing Party Name', type: 'text', required: true, placeholder: 'Company or individual sharing confidential info' },
          { name: 'disclosingPartyAddress', label: 'Disclosing Party Address', type: 'textarea', required: true, placeholder: 'Physical address' },
          { name: 'receivingPartyName', label: 'Receiving Party Name', type: 'text', required: true, placeholder: 'Company or individual receiving confidential info' },
          { name: 'receivingPartyAddress', label: 'Receiving Party Address', type: 'textarea', required: true, placeholder: 'Physical address' },
        ],
      },
      {
        id: 'terms',
        title: 'Agreement Terms',
        fields: [
          { name: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true, placeholder: 'Describe the business purpose for sharing confidential information' },
          { name: 'duration', label: 'Confidentiality Duration (years)', type: 'number', required: true, min: 1, max: 10, default: 3 },
          { name: 'jurisdiction', label: 'Governing Law Jurisdiction', type: 'select', required: true, options: ['Kenya', 'Other'], default: 'Kenya' },
          { name: 'jurisdictionOther', label: 'If Other, Specify Country', type: 'text', required: false, showWhen: { field: 'jurisdiction', value: 'Other' } },
        ],
      },
      {
        id: 'review',
        title: 'Review & Generate',
        fields: [],
        review: true,
      },
    ],
  },
  'service-agreement': {
    name: 'Service Agreement',
    description: 'Define terms for professional services between provider and client.',
    icon: FileText,
    steps: [
      {
        id: 'parties',
        title: 'Party Details',
        fields: [
          { name: 'providerName', label: 'Service Provider Name', type: 'text', required: true },
          { name: 'providerAddress', label: 'Provider Address', type: 'textarea', required: true },
          { name: 'clientName', label: 'Client Name', type: 'text', required: true },
          { name: 'clientAddress', label: 'Client Address', type: 'textarea', required: true },
        ],
      },
      {
        id: 'scope',
        title: 'Scope & Deliverables',
        fields: [
          { name: 'services', label: 'Services Description', type: 'textarea', required: true, placeholder: 'Detailed description of services to be provided' },
          { name: 'deliverables', label: 'Deliverables', type: 'textarea', required: true, placeholder: 'List specific deliverables and milestones' },
          { name: 'timeline', label: 'Timeline / Deadline', type: 'text', required: true, placeholder: 'e.g., 30 days from start date' },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        ],
      },
      {
        id: 'payment',
        title: 'Payment Terms',
        fields: [
          { name: 'feeType', label: 'Fee Structure', type: 'select', required: true, options: ['Fixed Fee', 'Hourly Rate', 'Milestone Based'], default: 'Fixed Fee' },
          { name: 'totalAmount', label: 'Total Amount (KSh)', type: 'number', required: true, min: 0, step: 1000 },
          { name: 'paymentSchedule', label: 'Payment Schedule', type: 'select', required: true, options: ['50% upfront, 50% on completion', 'Monthly', 'Per milestone', 'Net 30'], default: '50% upfront, 50% on completion' },
          { name: 'expenses', label: 'Expenses Covered', type: 'textarea', required: false, placeholder: 'Travel, materials, etc.' },
        ],
      },
      {
        id: 'terms',
        title: 'Additional Terms',
        fields: [
          { name: 'terminationNotice', label: 'Termination Notice (days)', type: 'number', required: true, default: 14, min: 1 },
          { name: 'confidentiality', label: 'Include Confidentiality Clause', type: 'checkbox', required: false, default: true },
          { name: 'ipOwnership', label: 'IP Ownership', type: 'select', required: true, options: ['Client owns all IP', 'Provider retains IP, licenses to client'], default: 'Client owns all IP' },
        ],
      },
      {
        id: 'review',
        title: 'Review & Generate',
        fields: [],
        review: true,
      },
    ],
  },
  'employment-contract': {
    name: 'Employment Contract',
    description: 'Formalize employer-employee relationship with clear terms.',
    icon: Shield,
    steps: [
      {
        id: 'employer',
        title: 'Employer Details',
        fields: [
          { name: 'companyName', label: 'Company Name', type: 'text', required: true },
          { name: 'companyAddress', label: 'Company Address', type: 'textarea', required: true },
          { name: 'companyRegNo', label: 'Company Registration Number', type: 'text', required: true },
          { name: 'representativeName', label: 'Authorized Representative', type: 'text', required: true },
        ],
      },
      {
        id: 'employee',
        title: 'Employee Details',
        fields: [
          { name: 'employeeName', label: 'Employee Full Name', type: 'text', required: true },
          { name: 'employeeId', label: 'National ID / Passport No.', type: 'text', required: true },
          { name: 'employeeAddress', label: 'Employee Address', type: 'textarea', required: true },
          { name: 'employeePhone', label: 'Phone Number', type: 'tel', required: true },
          { name: 'employeeEmail', label: 'Email Address', type: 'email', required: true },
        ],
      },
      {
        id: 'terms',
        title: 'Employment Terms',
        fields: [
          { name: 'position', label: 'Job Title / Position', type: 'text', required: true },
          { name: 'department', label: 'Department', type: 'text', required: false },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
          { name: 'contractType', label: 'Contract Type', type: 'select', required: true, options: ['Permanent', 'Fixed Term', 'Probationary'], default: 'Permanent' },
          { name: 'endDate', label: 'End Date (if Fixed Term)', type: 'date', required: false, showWhen: { field: 'contractType', value: 'Fixed Term' } },
          { name: 'probationPeriod', label: 'Probation Period (months)', type: 'number', required: true, default: 3, min: 0, max: 12 },
        ],
      },
      {
        id: 'compensation',
        title: 'Compensation & Benefits',
        fields: [
          { name: 'basicSalary', label: 'Basic Monthly Salary (KSh)', type: 'number', required: true, min: 0, step: 1000 },
          { name: 'allowances', label: 'Allowances (Housing, Transport, etc.)', type: 'textarea', required: false },
          { name: 'workingHours', label: 'Working Hours per Week', type: 'number', required: true, default: 45, min: 1, max: 60 },
          { name: 'leaveDays', label: 'Annual Leave Days', type: 'number', required: true, default: 21, min: 0 },
          { name: 'medicalCover', label: 'Medical Cover Provided', type: 'checkbox', required: false, default: true },
          { name: 'nssfContribution', label: 'NSSF Contribution', type: 'checkbox', required: false, default: true },
          { name: 'nhifContribution', label: 'NHIF Contribution', type: 'checkbox', required: false, default: true },
        ],
      },
      {
        id: 'review',
        title: 'Review & Generate',
        fields: [],
        review: true,
      },
    ],
  },
  'freelancer-contract': {
    name: 'Freelancer Contract',
    description: 'Establish terms for independent contractor engagements.',
    icon: FileText,
    steps: [
      {
        id: 'parties',
        title: 'Party Details',
        fields: [
          { name: 'clientName', label: 'Client Name', type: 'text', required: true },
          { name: 'clientAddress', label: 'Client Address', type: 'textarea', required: true },
          { name: 'freelancerName', label: 'Freelancer Name', type: 'text', required: true },
          { name: 'freelancerId', label: 'Freelancer ID / Passport', type: 'text', required: true },
          { name: 'freelancerAddress', label: 'Freelancer Address', type: 'textarea', required: true },
        ],
      },
      {
        id: 'scope',
        title: 'Project Scope',
        fields: [
          { name: 'projectTitle', label: 'Project Title', type: 'text', required: true },
          { name: 'scopeDescription', label: 'Scope of Work', type: 'textarea', required: true },
          { name: 'deliverables', label: 'Deliverables & Milestones', type: 'textarea', required: true },
          { name: 'revisions', label: 'Number of Revisions Included', type: 'number', required: true, default: 2, min: 0 },
        ],
      },
      {
        id: 'payment',
        title: 'Payment Terms',
        fields: [
          { name: 'feeType', label: 'Fee Type', type: 'select', required: true, options: ['Fixed Price', 'Hourly Rate', 'Per Deliverable'], default: 'Fixed Price' },
          { name: 'totalFee', label: 'Total Fee (KSh)', type: 'number', required: true, min: 0, step: 1000 },
          { name: 'paymentTerms', label: 'Payment Terms', type: 'select', required: true, options: ['50% deposit, 50% on delivery', 'Net 15', 'Net 30', 'Per milestone'], default: '50% deposit, 50% on delivery' },
        ],
      },
      {
        id: 'terms',
        title: 'Terms & IP',
        fields: [
          { name: 'ipOwnership', label: 'IP Ownership', type: 'select', required: true, options: ['Client owns all work product', 'Freelancer retains copyright, grants license'], default: 'Client owns all work product' },
          { name: 'confidentiality', label: 'Confidentiality Clause', type: 'checkbox', required: false, default: true },
          { name: 'termination', label: 'Termination Notice (days)', type: 'number', required: true, default: 7, min: 1 },
        ],
      },
      {
        id: 'review',
        title: 'Review & Generate',
        fields: [],
        review: true,
      },
    ],
  },
  'sale-agreement': {
    name: 'Sale Agreement',
    description: 'Document terms for sale of goods or property.',
    icon: Shield,
    steps: [
      {
        id: 'parties',
        title: 'Party Details',
        fields: [
          { name: 'sellerName', label: 'Seller Name', type: 'text', required: true },
          { name: 'sellerId', label: 'Seller ID / Passport', type: 'text', required: true },
          { name: 'sellerAddress', label: 'Seller Address', type: 'textarea', required: true },
          { name: 'buyerName', label: 'Buyer Name', type: 'text', required: true },
          { name: 'buyerId', label: 'Buyer ID / Passport', type: 'text', required: true },
          { name: 'buyerAddress', label: 'Buyer Address', type: 'textarea', required: true },
        ],
      },
      {
        id: 'property',
        title: 'Property/Goods Details',
        fields: [
          { name: 'itemType', label: 'Type', type: 'select', required: true, options: ['Real Property', 'Motor Vehicle', 'Goods/Equipment', 'Other'] },
          { name: 'description', label: 'Detailed Description', type: 'textarea', required: true },
          { name: 'location', label: 'Location / Address', type: 'text', required: false },
          { name: 'titleDeed', label: 'Title Deed / Registration No.', type: 'text', required: false },
        ],
      },
      {
        id: 'price',
        title: 'Price & Payment',
        fields: [
          { name: 'purchasePrice', label: 'Purchase Price (KSh)', type: 'number', required: true, min: 0, step: 10000 },
          { name: 'deposit', label: 'Deposit Amount (KSh)', type: 'number', required: true, default: 0, min: 0, step: 10000 },
          { name: 'balanceDue', label: 'Balance Due Date', type: 'date', required: true },
          { name: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: ['Bank Transfer', 'Cheque', 'Cash', 'Other'] },
        ],
      },
      {
        id: 'review',
        title: 'Review & Generate',
        fields: [],
        review: true,
      },
    ],
  },
  'tenancy-agreement': {
    name: 'Tenancy Agreement',
    description: 'Create rental agreements for residential or commercial property.',
    icon: Shield,
    steps: [
      {
        id: 'parties',
        title: 'Party Details',
        fields: [
          { name: 'landlordName', label: 'Landlord Name', type: 'text', required: true },
          { name: 'landlordId', label: 'Landlord ID / Passport', type: 'text', required: true },
          { name: 'landlordAddress', label: 'Landlord Address', type: 'textarea', required: true },
          { name: 'tenantName', label: 'Tenant Name', type: 'text', required: true },
          { name: 'tenantId', label: 'Tenant ID / Passport', type: 'text', required: true },
          { name: 'tenantAddress', label: 'Tenant Current Address', type: 'textarea', required: true },
        ],
      },
      {
        id: 'property',
        title: 'Property Details',
        fields: [
          { name: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
          { name: 'propertyType', label: 'Property Type', type: 'select', required: true, options: ['Residential', 'Commercial', 'Mixed Use'] },
          { name: 'description', label: 'Description (rooms, amenities, etc.)', type: 'textarea', required: true },
          { name: 'furnished', label: 'Furnished', type: 'checkbox', required: false, default: false },
        ],
      },
      {
        id: 'terms',
        title: 'Tenancy Terms',
        fields: [
          { name: 'startDate', label: 'Tenancy Start Date', type: 'date', required: true },
          { name: 'duration', label: 'Duration (months)', type: 'number', required: true, default: 12, min: 1 },
          { name: 'rentAmount', label: 'Monthly Rent (KSh)', type: 'number', required: true, min: 0, step: 1000 },
          { name: 'deposit', label: 'Security Deposit (months)', type: 'number', required: true, default: 1, min: 0 },
          { name: 'rentDueDate', label: 'Rent Due Day of Month', type: 'number', required: true, default: 1, min: 1, max: 28 },
          { name: 'utilities', label: 'Utilities Included', type: 'textarea', required: false, placeholder: 'Water, electricity, internet, etc.' },
        ],
      },
      {
        id: 'review',
        title: 'Review & Generate',
        fields: [],
        review: true,
      },
    ],
  },
};

const baseSchema = z.object({});

function getSchemaForStep(config: any, stepIndex: number) {
  const step = config.steps[stepIndex];
  const shape: Record<string, any> = {};
  
  step.fields.forEach((field: any) => {
    let fieldSchema: any;
    
    switch (field.type) {
      case 'text':
        fieldSchema = z.string().min(field.required ? 1 : 0, `${field.label} is required`);
        break;
      case 'textarea':
        fieldSchema = z.string().min(field.required ? 1 : 0, `${field.label} is required`);
        break;
      case 'email':
        fieldSchema = z.string().email('Invalid email address');
        break;
      case 'tel':
        fieldSchema = z.string().regex(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number');
        break;
      case 'number':
        fieldSchema = z.number({ invalid_type_error: 'Must be a number' }).min(field.min ?? 0).max(field.max ?? 999999);
        break;
      case 'date':
        fieldSchema = z.string().min(1, `${field.label} is required`);
        break;
      case 'select':
        fieldSchema = z.string().min(1, `${field.label} is required`);
        break;
      case 'checkbox':
        fieldSchema = z.boolean();
        break;
    }
    
    if (field.required === false && field.type !== 'checkbox') {
      fieldSchema = fieldSchema.optional().or(z.literal(''));
    }
    
    shape[field.name] = fieldSchema;
  });

  // Handle conditional fields
  step.fields.forEach((field: any) => {
    if (field.showWhen) {
      // These are handled in the UI, not in the schema
    }
  });

  return z.object(shape);
}

export default function GenerateDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const config = DOCUMENT_CONFIG[slug];

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedPdf, setGeneratedPdf] = useState<Blob | null>(null);
  const [showRecaptchaV2, setShowRecaptchaV2] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const formDataRef = useRef<Record<string, any>>({});

  if (!config) {
    return (
      <div className="container py-12 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-danger mb-4" />
        <h2 className="text-2xl fw-bold text-body-emphasis">Document Not Found</h2>
        <p className="text-body-secondary mt-2">The document type "{slug}" does not exist.</p>
        <Link href="/documents" className="btn btn-primary mt-4">Browse Documents</Link>
      </div>
    );
  }

  const step = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;
  const isReviewStep = step.review === true;

  // Create form with dynamic schema
  const stepSchema = getSchemaForStep(config, currentStep);
  const form = useForm<Record<string, any>>({
    resolver: zodResolver(stepSchema),
    defaultValues: step.fields.reduce((acc: any, f: any) => {
      if (f.default !== undefined) acc[f.name] = f.default;
      return acc;
    }, {}),
    mode: 'onChange',
  });

  const { watch, setValue, getValues, reset, formState: { errors } } = form;

  const watchedValues = watch();

  // Persist form data across steps
  useEffect(() => {
    const saved = localStorage.getItem(`ezekiel-docs-${slug}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(key => {
          if (form.getValues().hasOwnProperty(key) || step.fields.some((f: any) => f.name === key)) {
            form.setValue(key, parsed[key], { shouldValidate: true });
          }
        });
      } catch (e) {
        console.warn('Failed to parse saved form data');
      }
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      const allData = { ...formDataRef.current, ...value };
      formDataRef.current = allData;
      localStorage.setItem(`ezekiel-docs-${slug}`, JSON.stringify(allData));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleNext = async () => {
    const valid = await form.trigger();
    if (valid) {
      if (isLastStep) {
        await handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const allData = formDataRef.current;
      
      // Verify reCAPTCHA v3
      if (typeof window !== 'undefined' && window.grecaptcha) {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'generate_document' });
        setRecaptchaToken(token);
      }

      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: slug,
          formData: allData,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.requireV2) {
          setShowRecaptchaV2(true);
          setSubmitError('Please complete the verification challenge.');
          return;
        }
        throw new Error(result.error || 'Failed to generate document');
      }

      if (result.downloadUrl) {
        const pdfResponse = await fetch(result.downloadUrl);
        const pdfBlob = await pdfResponse.blob();
        setGeneratedPdf(pdfBlob);
        
        // Clear saved form data
        localStorage.removeItem(`ezekiel-docs-${slug}`);
        formDataRef.current = {};
      }
    } catch (error: any) {
      setSubmitError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecaptchaV2Callback = (token: string) => {
    setRecaptchaToken(token);
    setShowRecaptchaV2(false);
    handleSubmit();
  };

  const downloadPdf = () => {
    if (generatedPdf) {
      const url = URL.createObjectURL(generatedPdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${config.name.replace(/\s+/g, '-')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const renderField = (field: any, index: number) => {
    const showField = !field.showWhen || watchedValues[field.showWhen.field] === field.showWhen.value;
    if (!showField) return null;

    const error = errors[field.name];
    const isRequired = field.required !== false;

    return (
      <motion.div
        key={field.name}
        className={`col-12 col-md-6 ${field.type === 'textarea' || field.fullWidth ? 'col-12' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <label className="form-label text-sm" htmlFor={field.name}>
          {field.label} {isRequired && <span className="text-danger-emphasis">*</span>}
        </label>
        <Controller
          name={field.name}
          control={form.control}
          rules={{ required: isRequired ? true : undefined }}
          render={({ field: controllerField }) => {
            const fieldProps = {
              ...controllerField,
              id: field.name,
              className: `form-control form-control-sm ${error ? 'is-invalid' : ''}`,
              onChange: (e: any) => controllerField.onChange(e.target.value),
              onBlur: controllerField.onBlur,
            };

            switch (field.type) {
              case 'textarea':
                return (
                  <textarea
                    {...fieldProps}
                    rows={4}
                    placeholder={field.placeholder}
                    style={{ fontSize: '16px' }}
                  />
                );
              case 'select':
                return (
                  <select {...fieldProps} style={{ fontSize: '16px' }}>
                    <option value="">Select...</option>
                    {field.options.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                );
              case 'checkbox':
                return (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      {...fieldProps}
                      className="form-check-input"
                      checked={controllerField.value || false}
                      onChange={(e) => controllerField.onChange(e.target.checked)}
                    />
                    <label className="form-check-label text-sm" htmlFor={field.name}>
                      {field.label}
                    </label>
                  </div>
                );
              case 'date':
                return <input {...fieldProps} type="date" style={{ fontSize: '16px' }} />;
              case 'number':
                return <input {...fieldProps} type="number" min={field.min} max={field.max} step={field.step} style={{ fontSize: '16px' }} />;
              default:
                return <input {...fieldProps} type={field.type} placeholder={field.placeholder} style={{ fontSize: '16px' }} />;
            }
          }}
        />
        {error && (
          <div className="invalid-feedback text-xs d-block mt-1">{typeof error.message === 'string' ? error.message : 'Invalid input'}</div>
        )}
      </motion.div>
    );
  };

  const renderReview = () => {
    const allData = { ...formDataRef.current, ...getValues() };
    
    return (
      <div className="card h-100 border-0 shadow-sm bg-body-bg">
        <div className="card-body p-4 p-md-5">
          <h4 className="text-body-emphasis fw-semibold mb-4">Review Your Document</h4>
          <p className="text-body-secondary text-sm mb-4">
            Please verify all information below before generating your {config.name.toLowerCase()}.
          </p>
          
          <div className="max-h-[50vh] overflow-y-auto space-y-4">
            {config.steps.flatMap((s: any) => s.fields).map((field: any) => {
              const value = allData[field.name];
              if (value === undefined || value === '' || value === false) return null;
              
              return (
                <div key={field.name} className="d-flex flex-column flex-sm-row gap-2 p-3 bg-body-tertiary rounded-3">
                  <span className="fw-medium text-body-emphasis text-sm flex-shrink-0" style={{ minWidth: '200px' }}>
                    {field.label}
                  </span>
                  <span className="text-body-secondary text-sm flex-1 text-break">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </span>
                </div>
              );
            })}
          </div>

          {submitError && (
            <div className="alert alert-danger mt-4" role="alert">
              <AlertCircle className="w-5 h-5 me-2 d-inline-block" />
              {submitError}
            </div>
          )}

          {showRecaptchaV2 && (
            <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded-3 border border-warning">
              <p className="text-warning-emphasis text-sm mb-2">
                Additional verification required. Please complete the challenge below.
              </p>
              <div
                className="g-recaptcha"
                data-sitekey={RECAPTCHA_SITE_KEY}
                data-callback={handleRecaptchaV2Callback}
                data-size="normal"
              ></div>
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-content-end">
            <button
              onClick={handleBack}
              type="button"
              className="btn btn-outline-secondary fw-semibold w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 me-1" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn btn-primary fw-semibold w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 me-1 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  Generate Document
                  <Download className="w-4 h-4 ms-1" />
                </>
              )}
            </button>
          </div>

          {generatedPdf && (
            <div className="mt-4 p-4 bg-success bg-opacity-10 border border-success rounded-3 animate-fade-in">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="m-0 fw-semibold text-success-emphasis">Document Generated Successfully!</p>
                    <p className="m-0 text-success-emphasis text-sm">Your PDF is ready for download.</p>
                  </div>
                </div>
                <button
                  onClick={downloadPdf}
                  className="btn btn-success fw-semibold shimmer-effect"
                >
                  <Download className="w-4 h-4 me-1" /> Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-vh-100">
      {/* Progress Header */}
      <header className="bg-body-tertiary border-b border-border sticky top-0 z-40">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <Link
              href="/documents"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
              aria-label="Back to documents"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div className="text-center flex-1 px-4">
              <h1 className="m-0 text-body-emphasis fw-bold text-lg">{config.name}</h1>
              <p className="m-0 text-body-secondary text-sm">{config.description}</p>
            </div>
            <div className="w-24" />
          </div>
          
          {/* Progress Bar */}
          <div className="px-4 pb-3">
            <div className="progress" style={{ height: '6px' }} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={config.steps.length} aria-label="Form progress">
              <div
                className="progress-bar bg-primary"
                style={{ width: `${((currentStep + 1) / config.steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="d-flex justify-content-between mt-2 text-xs text-body-secondary">
              {config.steps.map((s: any, i: number) => (
                <span key={s.id} className={i <= currentStep ? 'fw-semibold text-primary' : ''}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <main className="py-6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-8 col-xxl-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isReviewStep ? (
                    renderReview()
                  ) : (
                    <div className="card h-100 border-0 shadow-sm bg-body-bg">
                      <div className="card-body p-4 p-md-5">
                        <h4 className="text-body-emphasis fw-semibold mb-4">{step.title}</h4>
                        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                          <div className="row gy-4 gx-4">
                            {step.fields.map((field: any, index: number) => renderField(field as any, index))}
                          </div>
                          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 justify-content-end">
                            {currentStep > 0 && (
                              <button
                                type="button"
                                onClick={handleBack}
                                className="btn btn-outline-secondary fw-semibold w-full sm:w-auto"
                              >
                                <ArrowLeft className="w-4 h-4 me-1" /> Back
                              </button>
                            )}
                            <button
                              type="submit"
                              className="btn btn-primary fw-semibold w-full sm:w-auto"
                            >
                              {isLastStep ? (
                                <>
                                  Generate Document
                                  <Download className="w-4 h-4 ms-1" />
                                </>
                              ) : (
                                <>
                                  Continue
                                  <ArrowRight className="w-4 h-4 ms-1" />
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* reCAPTCHA v3 script */}
      <script
        async
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
      />
      <script
        async
        src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
      />
    </div>
  );
}