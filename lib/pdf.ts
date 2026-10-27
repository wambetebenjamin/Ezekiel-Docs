import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'
import type { DocumentType } from './documents'

export interface PdfResult {
  blob: Blob
  filename: string
  dataUrl: string
  reference: string
}

type FormData = Record<string, string>

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 56
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const PRIMARY: [number, number, number] = [27, 67, 50]
const MUTED: [number, number, number] = [122, 148, 136]

function value(data: FormData, key: string): string {
  const entry = data[key]
  return entry && entry.trim().length > 0 ? entry.trim() : 'Not specified'
}

function formatDate(iso: string): string {
  if (!iso) return 'Not specified'
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) return iso
  return parsed.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function money(amount: string): string {
  if (!amount || Number.isNaN(Number(amount))) return amount || 'Not specified'
  return `KES ${Number(amount).toLocaleString('en-KE')}`
}

const CLAUSE_TEMPLATES: Record<string, (data: FormData) => string> = {
  'Definition of confidential information': () =>
    'Confidential information means any non-public business, technical, financial, or personal information disclosed by either party in any form, whether written, oral, electronic, or visual, that a reasonable person would understand to be confidential given its nature and the circumstances of disclosure.',
  'Obligations of the receiving party': () =>
    'The receiving party shall keep all confidential information strictly confidential, use it solely for the permitted purpose, restrict access to personnel who need to know it, and not disclose it to any third party without the prior written consent of the disclosing party.',
  'Permitted disclosures and exceptions': () =>
    'Confidential information does not include information that is or becomes public knowledge other than through breach, was already lawfully known before disclosure, is independently developed, or is required to be disclosed by a court of competent jurisdiction or a Kenyan regulatory authority.',
  'Return or destruction of information': () =>
    'On request or on the end of the permitted purpose, the receiving party shall promptly return or securely destroy all confidential information, including copies, and certify such return or destruction in writing if requested.',
  'Remedies for breach': () =>
    'The parties agree that breach of this agreement may cause irreparable harm for which monetary damages may be inadequate, and the disclosing party may seek injunctive or other equitable relief from the Kenyan courts without prejudice to any other remedy.',
  'Scope of services': (data) =>
    `The provider shall perform the following services: ${value(data, 'scope')}. Any change to this scope must be agreed in writing by both parties before it takes effect.`,
  'Fees and payment terms': (data) =>
    `The client shall pay the provider ${money(data.contractValue)} under the following payment terms: ${value(data, 'paymentTerms')}. Late payments may attract interest at the lawful rate applicable in Kenya.`,
  'Delivery and acceptance': () =>
    'The provider shall deliver the services with reasonable skill and care and in line with the agreed timelines. The client shall review deliverables promptly and notify the provider of any defects within seven days of delivery.',
  'Warranties and service standards': () =>
    'The provider warrants that the services will be performed professionally and in compliance with applicable Kenyan law. No other warranty, express or implied, applies beyond those stated in this agreement.',
  'Limitation of liability': () =>
    'Neither party is liable for indirect or consequential loss. Each party’s total liability under this agreement is limited to the fees paid or payable under it, except for fraud, wilful misconduct, or breach of confidentiality.',
  'Term and termination': (data) =>
    `This agreement runs from ${formatDate(data.startDate)}${
      data.endDate ? ` until ${formatDate(data.endDate)}` : ' until terminated by either party'
    }. Either party may terminate for material breach that is not remedied within fourteen days of written notice.`,
  'Duties and responsibilities': (data) =>
    `The employee is appointed as ${value(data, 'jobTitle')} and shall perform the duties associated with that role, including: ${value(data, 'scope')}. The employee shall obey lawful instructions and observe all workplace policies.`,
  'Remuneration and deductions': (data) =>
    `The employer shall pay a monthly gross salary of ${money(data.salary)} on ${value(data, 'payDay')}. Statutory deductions required by Kenyan law, including PAYE, NSSF, and SHIF contributions, shall be made where applicable.`,
  'Working hours and leave': () =>
    'Normal working hours follow the employer’s published rosters and Kenyan employment law. The employee is entitled to annual leave, sick leave, maternity and paternity leave, and public holidays in line with the Employment Act, 2007.',
  'Confidentiality and intellectual property': () =>
    'All work product, inventions, and materials created within the scope of employment belong to the employer. The employee shall keep business information confidential during and after employment.',
  'Discipline and grievance': () =>
    'Discipline shall be applied fairly and progressively. The employee may raise a grievance in writing and is entitled to be heard before any disciplinary decision is made.',
  'Termination and notice': (data) =>
    `Either party may end employment by giving ${value(data, 'noticePeriod')} written notice, or by paying salary in lieu of notice. Termination shall comply with the Employment Act, 2007 and any fair procedure required by law.`,
  'Engagement and deliverables': (data) =>
    `The freelancer shall deliver: ${value(data, 'scope')}. Deliverables and timelines may only change through written agreement between the parties.`,
  'Fees, expenses, and invoicing': (data) =>
    `The client shall pay ${money(data.contractValue)} on the basis of ${value(data, 'paymentTerms')}. Pre-approved expenses supported by receipts shall be reimbursed.`,
  'Revisions and approval': () =>
    'The client is entitled to two reasonable rounds of revisions at no extra cost. Additional revisions requested after acceptance may be charged separately at agreed rates.',
  'Intellectual property ownership': () =>
    'On full payment, the freelancer assigns all intellectual property rights in final deliverables to the client, except for background tools and pre-existing works that remain the freelancer’s property.',
  'Independent contractor status': () =>
    'The freelancer is an independent contractor and is not an employee, partner, or agent of the client. The freelancer is responsible for their own tax, insurance, and statutory obligations in Kenya.',
  'Engagement and status': (data) =>
    `The contractor shall provide: ${value(data, 'scope')}. The contractor acts independently and is responsible for their own tax and statutory obligations.`,
  'Services and deliverables': (data) =>
    `The consultant shall provide the following consulting services: ${value(data, 'scope')} and deliver the reports or outputs agreed in writing.`,
  'Consulting services': (data) =>
    `The consultant shall advise the client on: ${value(data, 'scope')}, exercising the skill and care expected of a competent professional.`,
  'Tax and statutory obligations': () =>
    'Each party is responsible for its own taxes and statutory contributions under Kenyan law, including withholding tax where applicable.',
  'Description of goods': (data) =>
    `The seller agrees to sell and the buyer agrees to buy: ${value(data, 'goodsDescription')}. Risk in the goods passes to the buyer on delivery and acceptance.`,
  'Purchase price and payment': (data) =>
    `The purchase price is ${money(data.contractValue)}, payable ${String(value(data, 'paymentTerms')).toLowerCase()}. Ownership of the goods only passes once the full price has been received.`,
  'Delivery and passing of risk': (data) =>
    `The goods shall be delivered to ${value(data, 'deliveryLocation')} on or before ${formatDate(data.endDate)}. The seller bears risk until delivery, after which risk passes to the buyer.`,
  'Warranties and returns': () =>
    'The seller warrants that the goods are of satisfactory quality, fit for purpose, and free from third-party claims. Defective goods may be rejected within seven days of delivery.',
  'Default and remedies': () =>
    'If either party defaults and fails to remedy the default within fourteen days of written notice, the innocent party may cancel the sale and claim damages under Kenyan law.',
  'Demised property and term': (data) =>
    `The landlord lets and the tenant takes ${value(data, 'propertyAddress')} for the term starting ${formatDate(data.startDate)}${
      data.endDate ? ` and ending ${formatDate(data.endDate)}` : ''
    }, renewable only by written agreement.`,
  'Rent and deposit': (data) =>
    `Monthly rent is ${money(data.monthlyRent)}, payable on the ${value(data, 'rentDueDay')}. A security deposit of ${money(data.deposit)} is held against damages or arrears and is refundable within fourteen days of the tenancy ending, less lawful deductions.`,
  'Landlord and tenant obligations': () =>
    'The landlord shall maintain the structure and fixed fittings. The tenant shall pay rent on time, keep the property clean, use it only for the permitted purpose, and not cause a nuisance to neighbours.',
  'Repairs and maintenance': () =>
    'Structural repairs remain the landlord’s responsibility. The tenant handles routine upkeep and must report damage promptly. The landlord may inspect on reasonable written notice.',
  'Subletting and alterations': () =>
    'The tenant may not sublet, assign, or make structural alterations without the landlord’s prior written consent.',
  'Termination and holdover': () =>
    'Either party may end the tenancy on the notice stated in this agreement. If the tenant stays on without a new agreement, a monthly tenancy arises on the same terms until properly ended.',
  'Purpose and scope of the venture': (data) =>
    `The parties establish a joint venture for: ${value(data, 'projectDescription')}. The venture is limited to this purpose and does not create a general partnership beyond it.`,
  'Contributions of each party': () =>
    'Each party shall make the cash, asset, or service contributions agreed in writing and on the agreed timetable. A party that fails to contribute may have its share adjusted by written agreement.',
  'Profit, loss, and accounting': (data) =>
    `Profits and losses shall be shared ${value(data, 'profitShare')}. Proper books of account shall be kept and shared with each party at least every quarter.`,
  'Management and decisions': () =>
    'Material decisions require unanimous written consent. Day-to-day decisions may be made by the party nominated in writing to manage the venture.',
  'Exit and deadlock': () =>
    'A deadlock unresolved after twenty-one days goes first to mediation and then to arbitration in Kenya. A party may exit by selling its interest to the other party at fair value.',
  'Share capital and ownership': (data) =>
    `This agreement governs the shareholders of ${value(data, 'companyName')} (registration number ${value(data, 'companyNumber')}) and their respective shares in the company.`,
  'Board and management': () =>
    'The company is managed by its board. Reserved matters listed in this agreement require shareholder approval by the stated majority before the company may act.',
  'Dividends and reserves': (data) =>
    `Distributions follow the company’s ${String(value(data, 'dividendPolicy')).toLowerCase()} policy, subject to solvency and the Companies Act, 2015.`,
  'Transfer of shares and pre-emption': () =>
    'A shareholder wishing to sell must first offer the shares to existing shareholders pro rata at the same price. Shares may only be sold to an outsider if the pre-emption offer is not accepted.',
  'Tag along and drag along': () =>
    'Minority shareholders may join a sale of the company on the same terms (tag along). If holders of the required majority sell, remaining shareholders may be required to sell on identical terms (drag along).',
  'Dispute resolution': () =>
    'Disputes shall first go to negotiation, then mediation, and failing resolution, to arbitration in Kenya under the Arbitration Act, 1995, without prejudice to the right to seek urgent injunctive relief.',
  'Confidentiality': () =>
    'Each party shall keep the terms of this agreement and all confidential information disclosed under it private, except where disclosure is required by Kenyan law.',
  'Principal and interest': (data) =>
    `The lender advances ${money(data.principalAmount)} at an annual interest rate of ${value(data, 'interestRate')} percent. Interest accrues from the drawdown date until full repayment.`,
  'Repayment schedule': (data) =>
    `Repayments are made on a ${String(value(data, 'repaymentSchedule')).toLowerCase()} basis starting ${formatDate(
      data.startDate,
    )} and ending by ${formatDate(data.endDate)}.`,
  'Prepayment': () =>
    'The borrower may repay all or part of the loan early without penalty, provided all accrued interest to the repayment date is settled at the same time.',
  'Events of default': () =>
    'Failure to pay when due, insolvency, breach of a covenant, or provision of false information is an event of default allowing the lender to demand immediate repayment of the outstanding balance.',
  'Security and guarantees': (data) =>
    `The obligations under this loan are supported by: ${value(data, 'security')}. The lender may enforce the security following an uncured event of default.`,
  'Position and reporting line': (data) =>
    `The candidate is offered the role of ${value(data, 'jobTitle')}, reporting to the line manager designated by the company and working from ${value(data, 'workLocation')}.`,
  'Remuneration and benefits': (data) =>
    `The role carries a monthly gross salary of ${money(data.salary)} paid through the company payroll, together with the benefits described in company policies and subject to statutory deductions.`,
  'Conditions of employment': (data) =>
    `This offer is based on employment of the type: ${value(data, 'employmentType')}, and remains conditional on satisfactory references, proof of the right to work in Kenya, and verification of qualifications.`,
  'Acceptance': (data) =>
    `To accept this offer, sign and return a copy by ${formatDate(data.acceptanceDeadline)}. If the candidate does not accept by that date, the offer lapses automatically.`,
  'Assignment of lease': (data) =>
    `The assignor assigns all rights and obligations under the lease of ${value(data, 'propertyAddress')} to the assignee with effect from ${formatDate(data.assignmentDate)}.`,
  'Landlord consent': () =>
    'The landlord consents to this assignment in writing. Consent does not release the assignor from obligations that expressly survive assignment under the original lease.',
  'Assignee obligations': () =>
    'From the effective date, the assignee performs every tenant obligation under the lease, including rent, service charges, maintenance, and compliance with use restrictions.',
  'Arrears and deposits': (data) =>
    `Outstanding rent and arrears as at the effective date total ${money(data.outstandingRent)}. The existing deposit transfers to the assignee or is refunded to the assignor as agreed in writing.`,
  'Continuing liability': () =>
    'Unless the landlord expressly releases the assignor in writing, the assignor remains liable for breaches occurring before the effective date of assignment.',
  'Equipment and term': (data) =>
    `The owner hires out ${value(data, 'equipmentDescription')} from ${formatDate(data.startDate)} until ${formatDate(data.endDate)} under the terms of this agreement.`,
  'Rental fee and deposit': (data) =>
    `The rental fee is ${money(data.rentalFee)}, billed ${String(value(data, 'feeFrequency')).toLowerCase()}. Any deposit paid is held against damage or loss and refunded after the equipment is returned in the agreed condition.`,
  'Use and care': () =>
    'The hirer shall use the equipment lawfully and carefully, follow the manufacturer’s instructions, and not sub-hire, modify, or move the equipment without written consent.',
  'Damage and loss': () =>
    'The hirer is responsible for any loss or damage beyond fair wear and tear and shall cover repair or replacement costs at market rates.',
  'Return and renewal': () =>
    'The equipment must be returned clean and complete by the end date. Late returns attract daily hire charges, and renewal requires written agreement before the end date.',
  'Legitimate business interest': () =>
    'The party protected by this covenant has a legitimate business interest in its client relationships, confidential information, staff, and trade secrets that reasonably require protection.',
  'Restricted activities': (data) =>
    `The restricted party must not, directly or indirectly, engage in: ${value(data, 'restrictedActivities')}, whether as owner, employee, consultant, agent, or investor.`,
  'Duration and geography': (data) =>
    `This restriction applies for ${value(data, 'restrictionPeriod')} after the trigger date and within ${value(data, 'restrictedRegion')}. The parties confirm these limits are reasonable and necessary.`,
  'Consideration': () =>
    'The restricted party receives consideration for this covenant through the employment, sale, or other commercial arrangement to which this agreement is attached.',
  'Nature of business': (data) =>
    `The partnership carries on the business of ${value(data, 'businessActivity')} under the name ${value(data, 'businessName')} in accordance with the Partnership Act (Cap 29) of Kenya.`,
  'Capital contributions': () =>
    'Each partner shall contribute the capital agreed in writing by the due date. Partnership property is owned by the partners in their profit-sharing proportions.',
  'Profit and loss sharing': (data) =>
    `Partners share profits and losses as follows: ${value(data, 'profitShare')}. Proper accounts are prepared at least annually and available to every partner.`,
  'Management and authority': () =>
    'Every partner may take part in management. Decisions outside the ordinary course require unanimous consent, while ordinary decisions follow a simple majority.',
  'Admission and retirement of partners': () =>
    'A new partner may only be admitted with unanimous consent. A retiring partner gives at least one month’s written notice and is paid their capital and profit share after final accounts.',
  'Dissolution': () =>
    'The partnership dissolves on agreement, expiry, death, bankruptcy of a partner, or court order. Assets are applied first to creditors, then to partner loans, capital, and finally surplus in profit-sharing proportions.',
  'Termination': () =>
    'Either party may end this engagement by giving written notice as agreed, or immediately if the other party commits a material breach that is not cured within fourteen days of written notice, becomes insolvent, or is unable to perform. Fees for work completed up to termination remain due, and each party shall return the other party’s property and confidential material.',
  'Fees and expenses': (data) =>
    `Fees for the consulting services total ${money(
      data.contractValue,
    )}, payable ${String(
      value(data, 'paymentTerms'),
    ).toLowerCase()}. Pre-approved reasonable expenses are reimbursed against receipts, and no other amounts are payable without prior written approval.`,
  'Intellectual property': () =>
    'Each party retains ownership of its background intellectual property. Reports, plans, and other materials specifically prepared for the client under this engagement are assigned to the client on payment in full, while the consultant retains generic skills, know-how, and non-client-specific tools.',
  'Conflict of interest': () =>
    'The consultant shall avoid any activity that conflicts with the interests of the client under this engagement and shall disclose any actual or potential conflict immediately. The consultant may serve other clients provided no confidential information is used or disclosed.',
  'Fees and invoicing': (data) =>
    `The contractor is paid ${money(
      data.contractValue,
    )} for the services, invoiced and settled ${String(
      value(data, 'paymentTerms'),
    ).toLowerCase()}. The contractor bears its own operating costs, and expenses are only reimbursed when agreed in writing in advance.`,
  'Confidentiality and IP': () =>
    'The contractor shall keep all client information confidential and use it only to perform this engagement. Deliverables created specifically for the client become the client’s intellectual property on full payment, while the contractor retains its pre-existing tools, methods, and know-how.',
}

function clauseText(title: string, data: FormData): string {
  return CLAUSE_TEMPLATES[title]?.(data) ?? 'The parties shall perform their obligations under this clause in good faith and in line with applicable Kenyan law.'
}

export async function generatePdf(
  documentItem: DocumentType,
  data: FormData,
): Promise<PdfResult> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  let cursorY = MARGIN
  let pageNumber = 1

  const ensureSpace = (required: number) => {
    if (cursorY + required > PAGE_HEIGHT - MARGIN) {
      doc.addPage()
      pageNumber += 1
      cursorY = MARGIN
    }
  }

  const writeParagraph = (
    text: string,
    options: {
      size?: number
      font?: 'helvetica' | 'times'
      style?: 'normal' | 'bold' | 'italic'
      color?: [number, number, number]
      spacing?: number
      indent?: number
    } = {},
  ) => {
    const {
      size = 10.5,
      font = 'helvetica',
      style = 'normal',
      color = [13, 31, 23],
      spacing = 6,
      indent = 0,
    } = options
    doc.setFont(font, style)
    doc.setFontSize(size)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent)
    lines.forEach((line: string) => {
      ensureSpace(size + 4)
      doc.text(line, MARGIN + indent, cursorY)
      cursorY += size + 4
    })
    cursorY += spacing
  }

  const writeHeading = (text: string) => {
    ensureSpace(34)
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...PRIMARY)
    doc.text(text.toUpperCase(), MARGIN, cursorY)
    cursorY += 8
    doc.setDrawColor(...PRIMARY)
    doc.setLineWidth(0.6)
    doc.line(MARGIN, cursorY, PAGE_WIDTH - MARGIN, cursorY)
    cursorY += 12
  }

  // Header
  doc.setFont('times', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...PRIMARY)
  doc.text('EZEKIEL DOCS', MARGIN, MARGIN - 18)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...MUTED)
  doc.text(
    'Legal document automation for Kenyan businesses',
    PAGE_WIDTH - MARGIN,
    MARGIN - 18,
    { align: 'right' },
  )
  doc.setDrawColor(226, 234, 230)
  doc.setLineWidth(1)
  doc.line(MARGIN, MARGIN - 8, PAGE_WIDTH - MARGIN, MARGIN - 8)

  // Title
  doc.setFont('times', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(13, 31, 23)
  const titleLines = doc.splitTextToSize(documentItem.name, CONTENT_WIDTH)
  titleLines.forEach((line: string) => {
    doc.text(line, PAGE_WIDTH / 2, cursorY + 14, { align: 'center' })
    cursorY += 22
  })
  cursorY += 10

  const generatedOn = new Date().toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const reference = `ED-${Date.now().toString(36).toUpperCase()}`

  writeParagraph(
    `This ${documentItem.name} is generated on ${generatedOn} under reference ${reference}. It is drafted to align with the laws of the Republic of Kenya and should be read together with any schedules and annexures.`,
    { font: 'helvetica', style: 'italic', color: [74, 99, 85] },
  )

  writeHeading('Parties')
  writeParagraph(
    `This agreement is made between ${value(data, 'partyAName')}, identification or registration number ${value(data, 'partyAIdNumber')}, of ${value(data, 'partyAAddress')} (the first party) and ${value(data, 'partyBName')}, identification or registration number ${value(data, 'partyBIdNumber')}, of ${value(data, 'partyBAddress')} (the second party).`,
  )
  writeParagraph(
    'Each party confirms it has the legal capacity and authority to enter into this agreement and to be bound by its terms.',
  )

  writeHeading('Background and purpose')
  writeParagraph(
    `The parties wish to record their understanding in respect of ${documentItem.shortName.toLowerCase()}. The recitals and clauses below, together with the details provided, form the entire agreement between the parties and supersede earlier discussions on the same subject.`,
  )

  if (data.scope) {
    writeParagraph(`Agreed scope: ${data.scope}`, { style: 'italic' })
  }
  if (data.specialClauses) {
    writeParagraph(`Additional terms recorded by the parties: ${data.specialClauses}`)
  }

  writeHeading('Terms and conditions')
  documentItem.clauses.forEach((clause, index) => {
    writeParagraph(`${index + 1}. ${clause}`, {
      font: 'times',
      style: 'bold',
      size: 11,
      spacing: 2,
    })
    writeParagraph(clauseText(clause, data), { indent: 14 })
  })

  writeHeading('Governing law and disputes')
  writeParagraph(
    `This agreement is governed by the laws of the Republic of Kenya. The parties submit to the jurisdiction of the courts of Kenya and agree to attempt mediation in good faith before commencing formal proceedings, without limiting the right to urgent equitable relief.`,
  )

  writeHeading('Execution')
  writeParagraph(
    'The parties have signed this agreement on the dates below, intending to be legally bound.',
    { spacing: 18 },
  )

  // Signature blocks
  ensureSpace(150)
  const columnWidth = CONTENT_WIDTH / 2 - 18
  const signTop = cursorY + 24
  doc.setDrawColor(74, 99, 85)
  doc.setLineWidth(0.8)
  doc.line(MARGIN, signTop, MARGIN + columnWidth, signTop)
  doc.line(
    PAGE_WIDTH - MARGIN - columnWidth,
    signTop,
    PAGE_WIDTH - MARGIN,
    signTop,
  )
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(13, 31, 23)
  doc.text('First party', MARGIN, signTop + 16)
  doc.text(
    'Second party',
    PAGE_WIDTH - MARGIN - columnWidth,
    signTop + 16,
  )
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(74, 99, 85)
  doc.setFontSize(9)
  doc.text(`Name: ${value(data, 'partyAName')}`, MARGIN, signTop + 32)
  doc.text(
    `Name: ${value(data, 'partyBName')}`,
    PAGE_WIDTH - MARGIN - columnWidth,
    signTop + 32,
  )
  doc.text('Signature: ______________________', MARGIN, signTop + 52)
  doc.text(
    'Signature: ______________________',
    PAGE_WIDTH - MARGIN - columnWidth,
    signTop + 52,
  )
  doc.text('Date: ______________________', MARGIN, signTop + 72)
  doc.text(
    'Date: ______________________',
    PAGE_WIDTH - MARGIN - columnWidth,
    signTop + 72,
  )
  cursorY = signTop + 100

  ensureSpace(130)
  const witnessTop = cursorY + 24
  doc.line(MARGIN, witnessTop, MARGIN + columnWidth, witnessTop)
  doc.line(
    PAGE_WIDTH - MARGIN - columnWidth,
    witnessTop,
    PAGE_WIDTH - MARGIN,
    witnessTop,
  )
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(13, 31, 23)
  doc.text('Witness one', MARGIN, witnessTop + 16)
  doc.text(
    'Witness two',
    PAGE_WIDTH - MARGIN - columnWidth,
    witnessTop + 16,
  )
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(74, 99, 85)
  doc.text('Name: ______________________', MARGIN, witnessTop + 32)
  doc.text(
    'Name: ______________________',
    PAGE_WIDTH - MARGIN - columnWidth,
    witnessTop + 32,
  )
  doc.text('Signature: ______________________', MARGIN, witnessTop + 52)
  doc.text(
    'Signature: ______________________',
    PAGE_WIDTH - MARGIN - columnWidth,
    witnessTop + 52,
  )
  cursorY = witnessTop + 80

  // QR verification marker on the final page
  const qrDataUrl = await QRCode.toDataURL(
    JSON.stringify({ reference, document: documentItem.slug, generatedOn }),
    { width: 160, margin: 1, color: { dark: '#1B4332', light: '#FFFFFF' } },
  )
  ensureSpace(90)
  doc.addImage(qrDataUrl, 'PNG', MARGIN, cursorY, 56, 56)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...MUTED)
  doc.text(
    `Scan to verify document reference ${reference}`,
    MARGIN + 66,
    cursorY + 24,
  )
  doc.text(
    'This document was generated by Ezekiel Docs. It is not a substitute for independent legal advice on complex matters.',
    MARGIN + 66,
    cursorY + 40,
  )

  // Footer on every page
  const pageCount = doc.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page)
    doc.setDrawColor(226, 234, 230)
    doc.setLineWidth(0.8)
    doc.line(
      MARGIN,
      PAGE_HEIGHT - 40,
      PAGE_WIDTH - MARGIN,
      PAGE_HEIGHT - 40,
    )
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text(
      `Ezekiel Docs | ${documentItem.shortName} | ${reference}`,
      MARGIN,
      PAGE_HEIGHT - 26,
    )
    doc.text(
      `Page ${page} of ${pageCount}`,
      PAGE_WIDTH - MARGIN,
      PAGE_HEIGHT - 26,
      { align: 'right' },
    )
  }

  const filename = `${documentItem.slug}-${reference.toLowerCase()}.pdf`
  const blob = doc.output('blob')
  const dataUrl = doc.output('datauristring')

  return { blob, filename, dataUrl, reference }
}
