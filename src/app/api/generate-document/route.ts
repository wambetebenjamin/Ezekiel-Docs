import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { createTransport } from 'nodemailer';
import { jsPDF } from 'jspdf';

const RECAPTCHA_SECRET_KEY: string = process.env.RECAPTCHA_SECRET_KEY ?? '';
const BLOB_READ_WRITE_TOKEN: string = process.env.BLOB_READ_WRITE_TOKEN ?? '';
const SMTP_HOST: string = process.env.SMTP_HOST ?? '';
const SMTP_PORT: number = parseInt(process.env.SMTP_PORT ?? '587', 10);
const SMTP_USER: string = process.env.SMTP_USER ?? '';
const SMTP_PASS: string = process.env.SMTP_PASS ?? '';
const SMTP_FROM: string = process.env.SMTP_FROM ?? '';

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    );
    return await response.json();
  } catch {
    return { success: false };
  }
}

function generatePDF(documentType: string, formData: Record<string, any>): Buffer {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Helper functions
  const addText = (text: string, x: number, yPos: number, options: { fontSize?: number; fontStyle?: string; maxWidth?: number } = {}) => {
    doc.setFontSize(options.fontSize || 10);
    doc.setFont('helvetica', options.fontStyle || 'normal');
    const maxWidth = options.maxWidth || pageWidth - margin * 2;
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return yPos + lines.length * (options.fontSize || 10) * 0.5;
  };

  const addLabelValue = (label: string, value: string, yPos: number) => {
    y = addText(`${label}:`, margin, yPos, { fontSize: 10, fontStyle: 'bold' });
    y = addText(value || 'N/A', margin, yPos, { fontSize: 10, maxWidth: pageWidth - margin * 2 - 50 });
    return y + 5;
  };

  const checkPageBreak = (neededSpace: number) => {
    if (y + neededSpace > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // Title
  const titles: Record<string, string> = {
    'nda': 'Non-Disclosure Agreement',
    'service-agreement': 'Service Agreement',
    'employment-contract': 'Employment Contract',
    'freelancer-contract': 'Freelancer Contract',
    'sale-agreement': 'Sale Agreement',
    'tenancy-agreement': 'Tenancy Agreement',
    'loan-agreement': 'Loan Agreement',
    'partnership-agreement': 'Partnership Agreement',
    'consultancy-agreement': 'Consultancy Agreement',
    'power-of-attorney': 'Power of Attorney',
    'memorandum-of-understanding': 'Memorandum of Understanding',
    'shareholders-agreement': 'Shareholders Agreement',
    'contractor-agreement': 'Independent Contractor Agreement',
  };

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(titles[documentType] || 'Legal Document', pageWidth / 2, y, { align: 'center' });
  y += 15;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-KE')} | Ezekiel Docs`, pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Document-specific content
  switch (documentType) {
    case 'nda':
      y = addLabelValue('Disclosing Party', formData.party1Name || '', y);
      y = addLabelValue('Disclosing Party Address', formData.party1Address || '', y);
      y = addLabelValue('Receiving Party', formData.party2Name || '', y);
      y = addLabelValue('Receiving Party Address', formData.party2Address || '', y);
      y = addLabelValue('Purpose of Disclosure', formData.purpose || '', y);
      y = addLabelValue('Confidentiality Duration', `${formData.duration || 24} months`, y);
      y = addLabelValue('Governing Law', formData.governingLaw || 'Kenya', y);
      break;

    case 'service-agreement':
      y = addLabelValue('Service Provider', formData.providerName || '', y);
      y = addLabelValue('Provider Address', formData.providerAddress || '', y);
      y = addLabelValue('Client', formData.clientName || '', y);
      y = addLabelValue('Client Address', formData.clientAddress || '', y);
      y = addLabelValue('Services Description', formData.services || '', y);
      y = addLabelValue('Fees', `KSh ${formData.fees || 0}`, y);
      y = addLabelValue('Payment Terms', formData.paymentTerms || '', y);
      y = addLabelValue('Start Date', formData.startDate || '', y);
      y = addLabelValue('End Date', formData.endDate || 'Ongoing', y);
      y = addLabelValue('Termination Notice', `${formData.terminationNotice || 30} days`, y);
      break;

    case 'employment-contract':
      y = addLabelValue('Employer', formData.employerName || '', y);
      y = addLabelValue('Employer Address', formData.employerAddress || '', y);
      y = addLabelValue('Employee', formData.employeeName || '', y);
      y = addLabelValue('Employee Address', formData.employeeAddress || '', y);
      y = addLabelValue('Employee ID/Passport', formData.employeeId || '', y);
      y = addLabelValue('Position', formData.position || '', y);
      y = addLabelValue('Department', formData.department || 'N/A', y);
      y = addLabelValue('Monthly Salary', `KSh ${formData.salary || 0}`, y);
      y = addLabelValue('Pay Frequency', formData.payFrequency || '', y);
      y = addLabelValue('Start Date', formData.startDate || '', y);
      y = addLabelValue('Contract Type', formData.contractType || '', y);
      y = addLabelValue('Contract Duration', formData.contractDuration ? `${formData.contractDuration} months` : 'Permanent', y);
      y = addLabelValue('Working Hours/Week', formData.workingHours || 40, y);
      y = addLabelValue('Annual Leave Days', formData.leaveDays || 21, y);
      y = addLabelValue('Notice Period', `${formData.noticePeriod || 30} days`, y);
      y = addLabelValue('Benefits', formData.benefits || 'As per company policy', y);
      break;

    case 'freelancer-contract':
      y = addLabelValue('Client', formData.clientName || '', y);
      y = addLabelValue('Client Address', formData.clientAddress || '', y);
      y = addLabelValue('Freelancer', formData.freelancerName || '', y);
      y = addLabelValue('Freelancer Address', formData.freelancerAddress || '', y);
      y = addLabelValue('Freelancer PIN', formData.freelancerPin || '', y);
      y = addLabelValue('Project Description', formData.projectDescription || '', y);
      y = addLabelValue('Deliverables', formData.deliverables || '', y);
      y = addLabelValue('Total Fee', `KSh ${formData.totalFee || 0}`, y);
      y = addLabelValue('Payment Schedule', formData.paymentSchedule || '', y);
      y = addLabelValue('Start Date', formData.startDate || '', y);
      y = addLabelValue('Deadline', formData.deadline || '', y);
      y = addLabelValue('Revisions Included', formData.revisions || 2, y);
      y = addLabelValue('IP Ownership', formData.ipOwnership || '', y);
      y = addLabelValue('Confidentiality', formData.confidentiality ? 'Yes' : 'No', y);
      break;

    case 'sale-agreement':
      y = addLabelValue('Seller', formData.sellerName || '', y);
      y = addLabelValue('Seller Address', formData.sellerAddress || '', y);
      y = addLabelValue('Buyer', formData.buyerName || '', y);
      y = addLabelValue('Buyer Address', formData.buyerAddress || '', y);
      y = addLabelValue('Item Description', formData.itemDescription || '', y);
      y = addLabelValue('Quantity', formData.quantity || 1, y);
      y = addLabelValue('Unit Price', `KSh ${formData.unitPrice || 0}`, y);
      y = addLabelValue('Total Price', `KSh ${formData.totalPrice || 0}`, y);
      y = addLabelValue('Payment Method', formData.paymentMethod || '', y);
      y = addLabelValue('Payment Terms', formData.paymentTerms || '', y);
      y = addLabelValue('Delivery Date', formData.deliveryDate || '', y);
      y = addLabelValue('Delivery Location', formData.deliveryLocation || '', y);
      y = addLabelValue('Warranty', `${formData.warranty || 0} months`, y);
      y = addLabelValue('Risk Transfers On', formData.riskTransfer || '', y);
      break;

    case 'tenancy-agreement':
      y = addLabelValue('Landlord', formData.landlordName || '', y);
      y = addLabelValue('Landlord Address', formData.landlordAddress || '', y);
      y = addLabelValue('Tenant', formData.tenantName || '', y);
      y = addLabelValue('Tenant Address', formData.tenantAddress || '', y);
      y = addLabelValue('Tenant ID/Passport', formData.tenantId || '', y);
      y = addLabelValue('Property Address', formData.propertyAddress || '', y);
      y = addLabelValue('Property Type', formData.propertyType || '', y);
      y = addLabelValue('Monthly Rent', `KSh ${formData.rentAmount || 0}`, y);
      y = addLabelValue('Security Deposit', `KSh ${formData.deposit || 0}`, y);
      y = addLabelValue('Rent Due Day', formData.rentDueDay || 1, y);
      y = addLabelValue('Tenancy Start', formData.startDate || '', y);
      y = addLabelValue('Tenancy End', formData.endDate || '', y);
      y = addLabelValue('Renewal Notice', `${formData.renewalNotice || 90} days`, y);
      y = addLabelValue('Utilities Included', formData.utilitiesIncluded || 'As agreed', y);
      y = addLabelValue('Maintenance', formData.maintenanceResponsibility || '', y);
      y = addLabelValue('Subletting', formData.sublettingAllowed ? 'Allowed' : 'Not Allowed', y);
      y = addLabelValue('Pets', formData.petsAllowed ? 'Allowed' : 'Not Allowed', y);
      break;

    case 'loan-agreement':
      y = addLabelValue('Lender', formData.lenderName || '', y);
      y = addLabelValue('Lender Address', formData.lenderAddress || '', y);
      y = addLabelValue('Borrower', formData.borrowerName || '', y);
      y = addLabelValue('Borrower Address', formData.borrowerAddress || '', y);
      y = addLabelValue('Borrower ID/Passport', formData.borrowerId || '', y);
      y = addLabelValue('Principal Amount', `KSh ${formData.principalAmount || 0}`, y);
      y = addLabelValue('Interest Rate', `${formData.interestRate || 0}% per annum`, y);
      y = addLabelValue('Loan Term', `${formData.loanTerm || 0} months`, y);
      y = addLabelValue('Repayment Frequency', formData.repaymentFrequency || '', y);
      y = addLabelValue('Start Date', formData.startDate || '', y);
      y = addLabelValue('Purpose', formData.purpose || 'General', y);
      y = addLabelValue('Collateral', formData.collateral || 'Unsecured', y);
      y = addLabelValue('Late Fee', `KSh ${formData.lateFee || 0}`, y);
      y = addLabelValue('Prepayment Allowed', formData.prepaymentAllowed ? 'Yes' : 'No', y);
      break;

    case 'partnership-agreement':
      y = addLabelValue('Partner 1', formData.partner1Name || '', y);
      y = addLabelValue('Partner 1 Address', formData.partner1Address || '', y);
      y = addLabelValue('Partner 2', formData.partner2Name || '', y);
      y = addLabelValue('Partner 2 Address', formData.partner2Address || '', y);
      y = addLabelValue('Business Name', formData.businessName || '', y);
      y = addLabelValue('Business Address', formData.businessAddress || '', y);
      y = addLabelValue('Business Purpose', formData.businessPurpose || '', y);
      y = addLabelValue('Partner 1 Capital', `KSh ${formData.capitalContribution1 || 0}`, y);
      y = addLabelValue('Partner 2 Capital', `KSh ${formData.capitalContribution2 || 0}`, y);
      y = addLabelValue('Partner 1 Profit Share', `${formData.profitSharing1 || 0}%`, y);
      y = addLabelValue('Partner 2 Profit Share', `${formData.profitSharing2 || 0}%`, y);
      y = addLabelValue('Partner 1 Role', formData.managementRole1 || '', y);
      y = addLabelValue('Partner 2 Role', formData.managementRole2 || '', y);
      y = addLabelValue('Decision Making', formData.decisionMaking || '', y);
      y = addLabelValue('Dispute Resolution', formData.disputeResolution || '', y);
      y = addLabelValue('Withdrawal Notice', `${formData.withdrawalNotice || 90} days`, y);
      break;

    case 'consultancy-agreement':
      y = addLabelValue('Client', formData.clientName || '', y);
      y = addLabelValue('Client Address', formData.clientAddress || '', y);
      y = addLabelValue('Consultant', formData.consultantName || '', y);
      y = addLabelValue('Consultant Address', formData.consultantAddress || '', y);
      y = addLabelValue('Consultant PIN', formData.consultantPin || '', y);
      y = addLabelValue('Scope of Work', formData.scopeOfWork || '', y);
      y = addLabelValue('Deliverables', formData.deliverables || '', y);
      y = addLabelValue('Fees', `KSh ${formData.fees || 0}`, y);
      y = addLabelValue('Payment Terms', formData.paymentTerms || '', y);
      y = addLabelValue('Start Date', formData.startDate || '', y);
      y = addLabelValue('End Date', formData.endDate || 'Ongoing', y);
      y = addLabelValue('Termination Notice', `${formData.terminationNotice || 30} days`, y);
      y = addLabelValue('Confidentiality', formData.confidentiality ? 'Yes' : 'No', y);
      y = addLabelValue('IP Ownership', formData.ipOwnership || '', y);
      break;

    case 'power-of-attorney':
      y = addLabelValue('Donor (You)', formData.donorName || '', y);
      y = addLabelValue('Donor Address', formData.donorAddress || '', y);
      y = addLabelValue('Donor ID/Passport', formData.donorId || '', y);
      y = addLabelValue('Attorney', formData.attorneyName || '', y);
      y = addLabelValue('Attorney Address', formData.attorneyAddress || '', y);
      y = addLabelValue('Attorney ID/Passport', formData.attorneyId || '', y);
      y = addLabelValue('Powers Granted', formData.powersGranted || '', y);
      y = addLabelValue('Effective Date', formData.startDate || '', y);
      y = addLabelValue('Expiry Date', formData.endDate || 'Indefinite', y);
      y = addLabelValue('Revocable', formData.revocable ? 'Yes' : 'No', y);
      y = addLabelValue('Specific Transactions Only', formData.specificTransactions ? 'Yes' : 'No', y);
      break;

    case 'memorandum-of-understanding':
      y = addLabelValue('Party 1', formData.party1Name || '', y);
      y = addLabelValue('Party 1 Address', formData.party1Address || '', y);
      y = addLabelValue('Party 2', formData.party2Name || '', y);
      y = addLabelValue('Party 2 Address', formData.party2Address || '', y);
      y = addLabelValue('Purpose', formData.purpose || '', y);
      y = addLabelValue('Objectives', formData.objectives || '', y);
      y = addLabelValue('Party 1 Responsibilities', formData.responsibilities1 || '', y);
      y = addLabelValue('Party 2 Responsibilities', formData.responsibilities2 || '', y);
      y = addLabelValue('Duration', `${formData.duration || 12} months`, y);
      y = addLabelValue('Confidentiality', formData.confidentiality ? 'Yes' : 'No', y);
      y = addLabelValue('Legally Binding', formData.binding ? 'Yes' : 'No', y);
      y = addLabelValue('Termination Notice', `${formData.terminationNotice || 30} days`, y);
      break;

    case 'shareholders-agreement':
      y = addLabelValue('Company', formData.companyName || '', y);
      y = addLabelValue('Company Address', formData.companyAddress || '', y);
      y = addLabelValue('Shareholder 1', `${formData.shareholder1Name || ''} (${formData.shareholder1Shares || 0}%)`, y);
      y = addLabelValue('Shareholder 2', `${formData.shareholder2Name || ''} (${formData.shareholder2Shares || 0}%)`, y);
      if (formData.shareholder3Name) {
        y = addLabelValue('Shareholder 3', `${formData.shareholder3Name} (${formData.shareholder3Shares || 0}%)`, y);
      }
      y = addLabelValue('Board Composition', formData.boardComposition || '', y);
      y = addLabelValue('Voting Thresholds', formData.votingThresholds || '', y);
      y = addLabelValue('Dividend Policy', formData.dividendPolicy || 'As per board', y);
      y = addLabelValue('Transfer Restrictions', formData.shareTransferRestrictions || '', y);
      y = addLabelValue('Drag-Along Rights', formData.dragAlong ? 'Yes' : 'No', y);
      y = addLabelValue('Tag-Along Rights', formData.tagAlong ? 'Yes' : 'No', y);
      y = addLabelValue('Dispute Resolution', formData.disputeResolution || '', y);
      break;

    case 'contractor-agreement':
      y = addLabelValue('Company', formData.companyName || '', y);
      y = addLabelValue('Company Address', formData.companyAddress || '', y);
      y = addLabelValue('Contractor', formData.contractorName || '', y);
      y = addLabelValue('Contractor Address', formData.contractorAddress || '', y);
      y = addLabelValue('Contractor PIN', formData.contractorPin || '', y);
      y = addLabelValue('Services', formData.services || '', y);
      y = addLabelValue('Compensation', `KSh ${formData.compensation || 0}`, y);
      y = addLabelValue('Payment Schedule', formData.paymentSchedule || '', y);
      y = addLabelValue('Start Date', formData.startDate || '', y);
      y = addLabelValue('End Date', formData.endDate || 'Ongoing', y);
      y = addLabelValue('Termination Notice', `${formData.terminationNotice || 14} days`, y);
      y = addLabelValue('Expenses Reimbursable', formData.expensesReimbursable ? 'Yes' : 'No', y);
      y = addLabelValue('Equipment Provided', formData.equipmentProvided ? 'Yes' : 'No', y);
      y = addLabelValue('Non-Compete', formData.nonCompete ? 'Yes' : 'No', y);
      y = addLabelValue('Confidentiality', formData.confidentiality ? 'Yes' : 'No', y);
      break;

    default:
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          y = addLabelValue(key, String(value), y);
        }
      });
  }

  // Footer
  y = Math.max(y + 20, doc.internal.pageSize.getHeight() - 40);
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('This document was generated by Ezekiel Docs (ezekieldocs.com)', pageWidth / 2, y, { align: 'center' });
  doc.text('Review by a qualified Kenyan advocate is recommended before signing.', pageWidth / 2, y + 5, { align: 'center' });

  return Buffer.from(doc.output('arraybuffer'));
}

async function sendConfirmationEmail(email: string, downloadUrl: string, documentType: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;

  try {
    const transporter = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `Your ${documentType} is ready - Ezekiel Docs`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ea580c;">Your Document is Ready</h2>
          <p>Your <strong>${documentType}</strong> has been generated successfully.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${downloadUrl}" style="background: #ea580c; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Download PDF</a>
          </p>
          <p style="color: #666; font-size: 14px;">This link expires in 7 days. For security, please download and save your document.</p>
          <hr style="margin: 30px 0; border-color: #eee;">
          <p style="color: #999; font-size: 12px;">Generated by Ezekiel Docs - Legal documents for Kenyan businesses.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Email send failed:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentType, formData, recaptchaToken } = body;

    if (!documentType || !formData || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success || (recaptchaResult.score && recaptchaResult.score < 0.5)) {
      return NextResponse.json({ requireV2: true }, { status: 400 });
    }

    // Generate PDF
    const pdfBuffer = generatePDF(documentType, formData);

    // Upload to Vercel Blob
    const filename = `${documentType}-${Date.now()}.pdf`;
    const blob = await put(filename, pdfBuffer, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
    });

    // Send confirmation email if email provided
    const email = formData.email || formData.clientEmail || formData.party1Email;
    if (email && email.includes('@')) {
      await sendConfirmationEmail(email, blob.url, documentType);
    }

    return NextResponse.json({ downloadUrl: blob.url });
  } catch (error) {
    console.error('Generate document error:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}