'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Loader2, AlertCircle, Shield, Download } from 'lucide-react';
import { DOCUMENT_TYPES } from '@/lib/constants';
import { WHATSAPP_HREF } from '@/lib/constants';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; size: 'invisible' }) => number;
      reset: (widgetId: number) => void;
    };
  }
}

type FormData = Record<string, string | number | boolean>;

const createSchema = (fields: typeof DOCUMENT_TYPES[0]['fields']) => {
  const shape: Record<string, z.ZodTypeAny> = {};
  fields?.forEach(field => {
    if (field.type === 'number') {
      shape[field.name] = z.number({ required_error: `${field.label} is required` }).min(0);
    } else if (field.type === 'select') {
      shape[field.name] = z.string().min(1, `${field.label} is required`);
    } else if (field.type === 'checkbox') {
      shape[field.name] = z.boolean();
    } else if (field.type === 'date') {
      shape[field.name] = z.string().min(1, `${field.label} is required`);
    } else if (field.type === 'textarea') {
      shape[field.name] = z.string().min(1, `${field.label} is required`);
    } else {
      shape[field.name] = z.string().min(1, `${field.label} is required`);
    }
  });
  return z.object(shape);
};

const steps = [
  { id: 1, title: 'Party Details', description: 'Enter names, IDs, and addresses' },
  { id: 2, title: 'Document Details', description: 'Fill in document-specific fields' },
  { id: 3, title: 'Review & Confirm', description: 'Verify all information before generating' },
];

export default function GeneratePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const document = DOCUMENT_TYPES.find(d => d.slug === slug);

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body-bg">
        <div className="text-center p-8">
          <FileText className="w-16 h-16 text-body-tertiary mx-auto mb-4" />
          <h1 className="text-2xl fw-bold text-body-emphasis mb-2">Document Not Found</h1>
          <p className="text-body-secondary mb-4">The requested document type does not exist.</p>
          <Link href="/documents" className="btn btn-primary">Browse Documents</Link>
        </div>
      </div>
    );
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showRecaptchaV2, setShowRecaptchaV2] = useState(false);
  const recaptchaWidgetId = useRef<number | null>(null);
  const formDataRef = useRef<FormData>({});

  const schema = createSchema(document.fields);
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: document.fields.reduce((acc, field) => {
      if (field.default !== undefined) acc[field.name] = field.default;
      return acc;
    }, {} as Partial<FormValues>),
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    formDataRef.current = watchedValues;
  }, [watchedValues]);

  const goToStep = (step: number) => {
    if (step > currentStep) {
      const stepFields = document.fields.filter((f: typeof document.fields[0]) => {
        if (currentStep === 1) return ['party1Name', 'party1Address', 'party2Name', 'party2Address', 'party1Id', 'party2Id', 'employeeId', 'tenantId', 'freelancerPin', 'consultantPin', 'contractorPin', 'borrowerId', 'donorId', 'attorneyId', 'partner1Name', 'partner2Name', 'shareholder1Name'].includes(f.name);
        return true;
      });
      const isValid = stepFields.every(f => !errors[f.name as keyof FormValues]);
      if (!isValid) return;
    }
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecaptchaV2Callback = (token: string) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaV2Expired = () => {
    setRecaptchaToken(null);
  };

  const executeRecaptchaV3 = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) return null;

    return new Promise<string>((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action: 'generate_document' })
          .then(resolve)
          .catch(() => resolve(''));
      });
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let token = await executeRecaptchaV3();

      if (!token || (token && parseFloat(token) < 0.5)) {
        setShowRecaptchaV2(true);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: slug,
          formData: data,
          recaptchaToken: token,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.requireV2) {
          setShowRecaptchaV2(true);
          setIsSubmitting(false);
          return;
        }
        throw new Error(result.error || 'Failed to generate document');
      }

      setDownloadUrl(result.downloadUrl);
      goToStep(4);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const partyFields = document.fields.filter((f: typeof document.fields[0]) =>
    ['party1Name', 'party1Address', 'party2Name', 'party2Address', 'party1Id', 'party2Id', 'employeeId', 'tenantId', 'freelancerPin', 'consultantPin', 'contractorPin', 'borrowerId', 'donorId', 'attorneyId', 'partner1Name', 'partner2Name', 'shareholder1Name', 'providerName', 'providerAddress', 'clientName', 'clientAddress', 'landlordName', 'landlordAddress', 'tenantName', 'tenantAddress', 'sellerName', 'sellerAddress', 'buyerName', 'buyerAddress', 'lenderName', 'lenderAddress', 'borrowerName', 'borrowerAddress', 'freelancerName', 'freelancerAddress', 'consultantName', 'consultantAddress', 'companyName', 'companyAddress', 'contractorName', 'contractorAddress', 'shareholder2Name', 'shareholder3Name'].includes(f.name)
  );

  const documentFields = document.fields.filter((f: typeof document.fields[0]) =>
    !['party1Name', 'party1Address', 'party2Name', 'party2Address', 'party1Id', 'party2Id', 'employeeId', 'tenantId', 'freelancerPin', 'consultantPin', 'contractorPin', 'borrowerId', 'donorId', 'attorneyId', 'partner1Name', 'partner2Name', 'shareholder1Name', 'providerName', 'providerAddress', 'clientName', 'clientAddress', 'landlordName', 'landlordAddress', 'tenantName', 'tenantAddress', 'sellerName', 'sellerAddress', 'buyerName', 'buyerAddress', 'lenderName', 'lenderAddress', 'borrowerName', 'borrowerAddress', 'freelancerName', 'freelancerAddress', 'consultantName', 'consultantAddress', 'companyName', 'companyAddress', 'contractorName', 'contractorAddress', 'shareholder2Name', 'shareholder3Name'].includes(f.name)
  );

  const renderField = (field: typeof document.fields[0]) => {
    const error = errors[field.name as keyof FormValues];
    const fieldProps = register(field.name);

    if (field.type === 'select') {
      return (
        <div className="mb-3" key={field.name}>
          <label className="form-label text-sm">{field.label} <span className="text-danger-emphasis">*</span></label>
          <Controller
            name={field.name}
            control={control}
            rules={{ required: `${field.label} is required` }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <select
                {...fieldProps}
                ref={ref}
                onChange={e => onChange(e.target.value)}
                onBlur={onBlur}
                className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
              >
                <option value="">Select {field.label}</option>
                {(field as { options?: string[] }).options?.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          />
          {error && 'message' in error && <div className="invalid-feedback text-xs">{error.message as string}</div>}
        </div>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <div className="mb-3 form-check" key={field.name}>
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : undefined }}
            render={({ field: { onChange, value } }) => (
              <input
                type="checkbox"
                className={`form-check-input ${error ? 'is-invalid' : ''}`}
                id={field.name}
                checked={value ?? false}
                onChange={e => onChange(e.target.checked)}
              />
            )}
          />
          <label className="form-check-label text-sm" htmlFor={field.name}>
            {field.label}
          </label>
          {error && 'message' in error && <div className="invalid-feedback text-xs">{error.message as string}</div>}
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div className="mb-3" key={field.name}>
          <label className="form-label text-sm">{field.label} <span className="text-danger-emphasis">*</span></label>
          <textarea
            {...fieldProps}
            rows={3}
            className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
          {error && 'message' in error && <div className="invalid-feedback text-xs">{error.message as string}</div>}
        </div>
      );
    }

    if (field.type === 'date') {
      return (
        <div className="mb-3" key={field.name}>
          <label className="form-label text-sm">{field.label} <span className="text-danger-emphasis">*</span></label>
          <input
            {...fieldProps}
            type="date"
            className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
          />
          {error && 'message' in error && <div className="invalid-feedback text-xs">{error.message as string}</div>}
        </div>
      );
    }

    if (field.type === 'number') {
      return (
        <div className="mb-3" key={field.name}>
          <label className="form-label text-sm">{field.label} <span className="text-danger-emphasis">*</span></label>
          <input
            {...fieldProps}
            type="number"
            step={(field as { step?: number }).step || 1}
            className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
          {error && 'message' in error && <div className="invalid-feedback text-xs">{error.message as string}</div>}
        </div>
      );
    }

    return (
      <div className="mb-3" key={field.name}>
        <label className="form-label text-sm">{field.label} <span className="text-danger-emphasis">*</span></label>
        <input
          {...fieldProps}
          type="text"
          className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
        {error && 'message' in error && <div className="invalid-feedback text-xs">{error.message as string}</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-body-bg border-b border-border">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <Link href="/documents" className="btn btn-ghost btn-sm p-2" aria-label="Back to documents">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1 px-4 max-w-2xl mx-auto">
              <div className="form-progress">
                <motion.div
                  className="form-progress-bar"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <div className="d-flex justify-content-between text-xs text-body-tertiary mt-1">
                {steps.map((step: typeof steps[0], i: number) => (
                  <span key={step.id} className={i + 1 <= currentStep ? 'text-primary fw-semibold' : ''}>
                    Step {step.id}
                  </span>
                ))}
                <span className={currentStep === 4 ? 'text-primary fw-semibold' : ''}>Complete</span>
              </div>
            </div>
            <div className="w-40" />
          </div>
        </div>
      </div>

      <main className="pt-20 pb-6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-8">
              {/* Document Header */}
              <div className="mb-4 mb-md-5">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Link href="/documents" className="btn btn-ghost btn-sm p-2" aria-label="Back to documents">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div>
                    <span className="badge bg-primary/10 text-primary text-xs px-3 py-2 mb-2">
                      {document.category}
                    </span>
                    <h1 className="m-0 text-body-emphasis text-3xl fw-bold">{document.name}</h1>
                  </div>
                </div>
                <p className="m-0 text-body-secondary text-lg">{document.description}</p>
              </div>

              {/* Step Indicator */}
              <div className="mb-4 d-flex align-items-center">
                {steps.map((step: typeof steps[0], i: number) => (
                  <div key={step.id} style={{ display: 'contents' }}>
                    <div className={`d-flex align-items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                      <div className={`d-flex align-items-center gap-2 ${i + 1 === currentStep ? 'text-primary' : 'text-body-tertiary'}`}>
                        <div className={`w-8 h-8 rounded-circle d-flex align-items-center justify-content-center fw-semibold text-sm ${i + 1 < currentStep ? 'bg-success text-white' : i + 1 === currentStep ? 'bg-primary text-white' : 'bg-body-tertiary border border-border'}`}>
                          {i + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : step.id}
                        </div>
                        <span className="d-none d-md-block fw-medium text-sm">{step.title}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-2 mx-2 ${i + 1 < currentStep ? 'bg-success' : 'bg-body-tertiary'} rounded`} />
                      )}
                    </div>
                  </div>
                ))}
                <div className={`d-flex align-items-center gap-2 ${currentStep === 4 ? 'text-primary' : 'text-body-tertiary'}`}>
                  <div className={`w-8 h-8 rounded-circle d-flex align-items-center justify-content-center fw-semibold text-sm ${currentStep === 4 ? 'bg-primary text-white' : 'bg-body-tertiary border border-border'}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="fw-medium text-sm">Complete</span>
                </div>
              </div>

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {currentStep <= 3 && (
                  <motion.form
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="card border-border overflow-hidden">
                      <div className="card-header bg-body-tertiary border-b border-border">
                        <h2 className="m-0 fw-semibold text-body-emphasis">{steps[currentStep - 1].title}</h2>
                        <p className="m-0 mt-1 text-body-secondary text-sm">{steps[currentStep - 1].description}</p>
                      </div>
                      <div className="card-body p-4 p-md-5">
                        <div className="row g-3">
                          {(currentStep === 1 ? partyFields : documentFields).map((field: typeof document.fields[0]) => (
                            <div key={field.name} className="col-12 col-md-6">
                              {renderField(field)}
                            </div>
                          ))}
                        </div>

                        {/* reCAPTCHA v2 */}
                        {currentStep === 3 && showRecaptchaV2 && (
                          <div className="mt-4 p-4 bg-warning-bg-subtle border border-warning-border-subtle rounded-xl">
                            <div className="d-flex align-items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="fw-semibold text-warning-emphasis mb-2">Additional Verification Required</h4>
                                <p className="m-0 text-warning-emphasis text-sm mb-3">
                                  Please complete the reCAPTCHA challenge below to verify you're human.
                                </p>
                                <div id="recaptcha-container" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Submit / Navigation Buttons */}
                        <div className="mt-4 pt-4 border-t border-border d-flex flex-col-reverse sm:flex-row gap-3 justify-content-end">
                          {currentStep > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm px-4 py-2 fw-semibold"
                              onClick={() => goToStep(currentStep - 1)}
                            >
                              <ArrowLeft className="w-4 h-4 me-2" />
                              Back
                            </button>
                          )}
                          {currentStep < 3 && (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm px-4 py-2 fw-semibold ms-auto"
                              onClick={() => goToStep(currentStep + 1)}
                            >
                              Next
                              <ArrowRight className="w-4 h-4 ms-2" />
                            </button>
                          )}
                          {currentStep === 3 && (
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm px-4 py-2 fw-semibold ms-auto"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 me-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  Generate Document
                                  <ArrowRight className="w-4 h-4 ms-2" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.form>
                )}

                {/* Success Step */}
                {currentStep === 4 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="p-2 bg-success/10 rounded-circle d-inline-flex mb-4">
                      <CheckCircle className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="text-body-emphasis text-3xl fw-bold mb-3">Document Generated!</h2>
                    <p className="text-body-secondary text-lg mb-5 max-w-xl mx-auto">
                      Your <strong>{document.name}</strong> has been created and is ready to download.
                    </p>
                    <div className="d-flex flex-col sm:flex-row gap-3 justify-content-center mb-5">
                      <button
                        onClick={handleDownload}
                        className="btn btn-lg btn-primary text-white fw-semibold px-6 py-3 shimmer-hover"
                      >
                        <Download className="w-5 h-5 me-2" />
                        Download PDF
                      </button>
                      <a
                        href="/documents"
                        className="btn btn-lg btn-outline-secondary fw-semibold px-6 py-3"
                      >
                        Create Another Document
                      </a>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3 text-body-secondary text-sm">
                      <Shield className="w-5 h-5 text-success" />
                      <span>Kenyan law compliant</span>
                      <span className="mx-2">·</span>
                      <span>Lawyer reviewed</span>
                      <span className="mx-2">·</span>
                      <span>Instant PDF</span>
                    </div>
                  </motion.div>
                )}

                {/* Error State */}
                {submitError && currentStep <= 3 && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-danger-bg-subtle border border-danger-border-subtle rounded-xl text-center"
                  >
                    <AlertCircle className="w-6 h-6 text-danger mx-auto mb-2" />
                    <p className="m-0 text-danger-emphasis fw-medium">{submitError}</p>
                    <p className="m-0 mt-2 text-danger text-sm">
                      <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-primary fw-semibold underline">
                        Contact support on WhatsApp
                      </a>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* reCAPTCHA v2 Script */}
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        async
        defer
      />
      {showRecaptchaV2 && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.grecaptcha && !window.recaptchaV2Rendered) {
                window.recaptchaV2WidgetId = window.grecaptcha.render('recaptcha-container', {
                  sitekey: '${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}',
                  callback: function(token) {
                    window.recaptchaV2Callback(token);
                  },
                  'expired-callback': function() {
                    window.recaptchaV2Expired();
                  },
                  size: 'normal'
                });
                window.recaptchaV2Rendered = true;
              }
            `,
          }}
        />
      )}
    </div>
  );
}