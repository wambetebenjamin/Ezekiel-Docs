export type DocumentCategory =
  | 'Business'
  | 'Employment'
  | 'Property'
  | 'Freelance'

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'

export interface DocumentField {
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  options?: string[]
  half?: boolean
  help?: string
}

export interface DocumentType {
  slug: string
  name: string
  shortName: string
  category: DocumentCategory
  description: string
  iconKey: string
  fillTimeMinutes: number
  stepTwoFields: DocumentField[]
  clauses: string[]
}

const currencyField: DocumentField = {
  name: 'contractValue',
  label: 'Contract value (KES)',
  type: 'number',
  required: false,
  placeholder: 'e.g. 250000',
  half: true,
}

const dateFields: DocumentField[] = [
  {
    name: 'startDate',
    label: 'Start date',
    type: 'date',
    required: true,
    half: true,
  },
  {
    name: 'endDate',
    label: 'End date',
    type: 'date',
    required: false,
    half: true,
  },
]

const scopeField: DocumentField = {
  name: 'scope',
  label: 'Scope of work or purpose',
  type: 'textarea',
  required: true,
  placeholder:
    'Describe what the agreement covers, the services to be delivered, or the property involved.',
}

const clausesField: DocumentField = {
  name: 'specialClauses',
  label: 'Special clauses (optional)',
  type: 'textarea',
  required: false,
  placeholder:
    'Add any extra terms the parties have agreed, for example notice periods, payment milestones, or confidentiality terms.',
  help: 'Leave blank if you do not need extra clauses.',
}

const commonBusinessFields: DocumentField[] = [
  ...dateFields,
  currencyField,
  {
    name: 'paymentTerms',
    label: 'Payment terms',
    type: 'select',
    required: true,
    half: true,
    options: [
      'On signature',
      'Within 7 days of invoice',
      'Within 14 days of invoice',
      'Within 30 days of invoice',
      'Milestone based',
    ],
  },
  {
    name: 'governingLaw',
    label: 'Governing law',
    type: 'text',
    required: true,
    half: true,
    placeholder: 'Republic of Kenya',
  },
  scopeField,
  clausesField,
]

export const DOCUMENT_CATEGORIES: Array<'All' | DocumentCategory> = [
  'All',
  'Business',
  'Employment',
  'Property',
  'Freelance',
]

export const DOCUMENTS: DocumentType[] = [
  {
    slug: 'nda',
    name: 'Non-Disclosure Agreement (NDA)',
    shortName: 'NDA',
    category: 'Business',
    description:
      'Protect confidential information shared between parties during discussions, negotiations, or ongoing business relationships.',
    iconKey: 'shield',
    fillTimeMinutes: 5,
    stepTwoFields: [
      {
        name: 'purpose',
        label: 'Purpose of disclosure',
        type: 'textarea',
        required: true,
        placeholder:
          'Explain why confidential information will be shared, for example evaluating a business partnership.',
      },
      {
        name: 'duration',
        label: 'Confidentiality period',
        type: 'select',
        required: true,
        half: true,
        options: ['1 year', '2 years', '3 years', '5 years', 'Indefinite'],
      },
      {
        name: 'governingLaw',
        label: 'Governing law',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'Republic of Kenya',
      },
      clausesField,
    ],
    clauses: [
      'Definition of confidential information',
      'Obligations of the receiving party',
      'Permitted disclosures and exceptions',
      'Return or destruction of information',
      'Remedies for breach',
    ],
  },
  {
    slug: 'service-agreement',
    name: 'Service Agreement',
    shortName: 'Service Agreement',
    category: 'Business',
    description:
      'Set out the terms under which a business supplies services to a client, including scope, fees, timelines, and liability.',
    iconKey: 'file-text',
    fillTimeMinutes: 8,
    stepTwoFields: commonBusinessFields,
    clauses: [
      'Scope of services',
      'Fees and payment terms',
      'Delivery and acceptance',
      'Warranties and service standards',
      'Limitation of liability',
      'Term and termination',
    ],
  },
  {
    slug: 'employment-contract',
    name: 'Employment Contract',
    shortName: 'Employment Contract',
    category: 'Employment',
    description:
      'Formalise the relationship between an employer and an employee with duties, pay, working hours, leave, and termination terms.',
    iconKey: 'briefcase',
    fillTimeMinutes: 10,
    stepTwoFields: [
      {
        name: 'jobTitle',
        label: 'Job title',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Accountant',
      },
      {
        name: 'workLocation',
        label: 'Work location',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Nairobi',
      },
      ...dateFields,
      {
        name: 'salary',
        label: 'Monthly gross salary (KES)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 120000',
      },
      {
        name: 'payDay',
        label: 'Monthly pay day',
        type: 'select',
        required: true,
        half: true,
        options: [
          'Last working day of the month',
          '25th of the month',
          '28th of the month',
          '1st of the following month',
        ],
      },
      {
        name: 'employmentType',
        label: 'Employment type',
        type: 'select',
        required: true,
        half: true,
        options: ['Permanent', 'Fixed term', 'Probation', 'Part time', 'Casual'],
      },
      {
        name: 'noticePeriod',
        label: 'Notice period',
        type: 'select',
        required: true,
        half: true,
        options: ['24 hours', '7 days', '14 days', '30 days', 'One month'],
      },
      scopeField,
      clausesField,
    ],
    clauses: [
      'Duties and responsibilities',
      'Remuneration and deductions',
      'Working hours and leave',
      'Confidentiality and intellectual property',
      'Discipline and grievance',
      'Termination and notice',
    ],
  },
  {
    slug: 'freelancer-contract',
    name: 'Freelancer Contract',
    shortName: 'Freelancer Contract',
    category: 'Freelance',
    description:
      'A clear agreement between a freelancer and a client covering deliverables, revisions, payment, and ownership of work.',
    iconKey: 'laptop',
    fillTimeMinutes: 7,
    stepTwoFields: commonBusinessFields,
    clauses: [
      'Engagement and deliverables',
      'Fees, expenses, and invoicing',
      'Revisions and approval',
      'Intellectual property ownership',
      'Independent contractor status',
      'Termination',
    ],
  },
  {
    slug: 'sale-agreement',
    name: 'Sale of Goods Agreement',
    shortName: 'Sale Agreement',
    category: 'Business',
    description:
      'Record the terms of a sale of goods or business assets, including price, delivery, warranties, and passing of risk.',
    iconKey: 'shopping-bag',
    fillTimeMinutes: 8,
    stepTwoFields: [
      {
        name: 'goodsDescription',
        label: 'Description of goods or assets',
        type: 'textarea',
        required: true,
        placeholder: 'List the goods, quantities, serial numbers, or assets being sold.',
      },
      ...dateFields,
      currencyField,
      {
        name: 'deliveryLocation',
        label: 'Delivery location',
        type: 'text',
        required: false,
        half: true,
        placeholder: 'e.g. Warehouse, Mombasa Road',
      },
      {
        name: 'paymentTerms',
        label: 'Payment terms',
        type: 'select',
        required: true,
        half: true,
        options: [
          'Full payment on signature',
          'Deposit then balance on delivery',
          'Installments',
          'Letter of credit',
        ],
      },
      clausesField,
    ],
    clauses: [
      'Description of goods',
      'Purchase price and payment',
      'Delivery and passing of risk',
      'Warranties and returns',
      'Default and remedies',
    ],
  },
  {
    slug: 'tenancy-agreement',
    name: 'Tenancy Agreement',
    shortName: 'Tenancy Agreement',
    category: 'Property',
    description:
      'Govern the rental of residential or commercial property between a landlord and tenant, covering rent, deposit, and obligations.',
    iconKey: 'home',
    fillTimeMinutes: 9,
    stepTwoFields: [
      {
        name: 'propertyAddress',
        label: 'Property address',
        type: 'textarea',
        required: true,
        placeholder: 'Full address and description of the rented property.',
      },
      ...dateFields,
      {
        name: 'monthlyRent',
        label: 'Monthly rent (KES)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 45000',
      },
      {
        name: 'deposit',
        label: 'Security deposit (KES)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 45000',
      },
      {
        name: 'rentDueDay',
        label: 'Rent due day',
        type: 'select',
        required: true,
        half: true,
        options: ['1st of the month', '5th of the month', '10th of the month'],
      },
      {
        name: 'propertyUse',
        label: 'Permitted use',
        type: 'select',
        required: true,
        half: true,
        options: ['Residential', 'Commercial', 'Mixed use'],
      },
      clausesField,
    ],
    clauses: [
      'Demised property and term',
      'Rent and deposit',
      'Landlord and tenant obligations',
      'Repairs and maintenance',
      'Subletting and alterations',
      'Termination and holdover',
    ],
  },
  {
    slug: 'joint-venture-agreement',
    name: 'Joint Venture Agreement',
    shortName: 'Joint Venture',
    category: 'Business',
    description:
      'Define how two or more parties collaborate on a specific project, sharing contributions, profits, risks, and decision-making.',
    iconKey: 'users',
    fillTimeMinutes: 10,
    stepTwoFields: [
      {
        name: 'projectDescription',
        label: 'Project description',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the joint venture project and its objectives.',
      },
      ...dateFields,
      {
        name: 'profitShare',
        label: 'Profit and loss sharing',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. 50/50',
      },
      {
        name: 'governingLaw',
        label: 'Governing law',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'Republic of Kenya',
      },
      clausesField,
    ],
    clauses: [
      'Purpose and scope of the venture',
      'Contributions of each party',
      'Profit, loss, and accounting',
      'Management and decisions',
      'Exit and deadlock',
    ],
  },
  {
    slug: 'shareholders-agreement',
    name: 'Shareholders Agreement',
    shortName: 'Shareholders Agreement',
    category: 'Business',
    description:
      'Regulate the relationship between company shareholders, covering management, share transfers, dividends, and dispute resolution.',
    iconKey: 'building-2',
    fillTimeMinutes: 12,
    stepTwoFields: [
      {
        name: 'companyName',
        label: 'Company name',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'Registered company name',
      },
      {
        name: 'companyNumber',
        label: 'Company registration number',
        type: 'text',
        required: false,
        half: true,
        placeholder: 'e.g. CPR/2024/000000',
      },
      ...dateFields,
      {
        name: 'dividendPolicy',
        label: 'Dividend policy',
        type: 'select',
        required: true,
        half: true,
        options: ['Annual', 'Bi-annual', 'Reinvested', 'At board discretion'],
      },
      {
        name: 'governingLaw',
        label: 'Governing law',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'Republic of Kenya',
      },
      clausesField,
    ],
    clauses: [
      'Share capital and ownership',
      'Board and management',
      'Dividends and reserves',
      'Transfer of shares and pre-emption',
      'Tag along and drag along',
      'Dispute resolution',
    ],
  },
  {
    slug: 'consultancy-agreement',
    name: 'Consultancy Agreement',
    shortName: 'Consultancy Agreement',
    category: 'Freelance',
    description:
      'Engage a consultant for specialist advice with clear deliverables, fees, confidentiality, and intellectual property terms.',
    iconKey: 'messages-square',
    fillTimeMinutes: 7,
    stepTwoFields: commonBusinessFields,
    clauses: [
      'Consulting services',
      'Fees and expenses',
      'Confidentiality',
      'Intellectual property',
      'Conflict of interest',
      'Termination',
    ],
  },
  {
    slug: 'loan-agreement',
    name: 'Loan Agreement',
    shortName: 'Loan Agreement',
    category: 'Business',
    description:
      'Document a loan between parties with principal, interest, repayment schedule, default consequences, and security.',
    iconKey: 'landmark',
    fillTimeMinutes: 8,
    stepTwoFields: [
      ...dateFields,
      {
        name: 'principalAmount',
        label: 'Principal amount (KES)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 500000',
      },
      {
        name: 'interestRate',
        label: 'Annual interest rate (%)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 14',
      },
      {
        name: 'repaymentSchedule',
        label: 'Repayment schedule',
        type: 'select',
        required: true,
        half: true,
        options: ['Monthly', 'Quarterly', 'Lump sum on end date', 'Weekly'],
      },
      {
        name: 'security',
        label: 'Security or guarantor',
        type: 'text',
        required: false,
        half: true,
        placeholder: 'Describe collateral or guarantor, if any',
      },
      clausesField,
    ],
    clauses: [
      'Principal and interest',
      'Repayment schedule',
      'Prepayment',
      'Events of default',
      'Security and guarantees',
    ],
  },
  {
    slug: 'offer-letter',
    name: 'Job Offer Letter',
    shortName: 'Offer Letter',
    category: 'Employment',
    description:
      'Make a formal written job offer covering position, start date, salary, benefits, and conditions for the candidate to accept.',
    iconKey: 'mail-check',
    fillTimeMinutes: 6,
    stepTwoFields: [
      {
        name: 'jobTitle',
        label: 'Job title',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Marketing Officer',
      },
      {
        name: 'workLocation',
        label: 'Work location',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Kisumu',
      },
      {
        name: 'startDate',
        label: 'Proposed start date',
        type: 'date',
        required: true,
        half: true,
      },
      {
        name: 'salary',
        label: 'Monthly gross salary (KES)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 90000',
      },
      {
        name: 'employmentType',
        label: 'Employment type',
        type: 'select',
        required: true,
        half: true,
        options: ['Permanent', 'Fixed term', 'Probation', 'Part time'],
      },
      {
        name: 'acceptanceDeadline',
        label: 'Acceptance deadline',
        type: 'date',
        required: true,
        half: true,
      },
      clausesField,
    ],
    clauses: [
      'Position and reporting line',
      'Remuneration and benefits',
      'Working hours and leave',
      'Conditions of employment',
      'Acceptance',
    ],
  },
  {
    slug: 'lease-assignment',
    name: 'Lease Assignment',
    shortName: 'Lease Assignment',
    category: 'Property',
    description:
      'Transfer an existing lease from a current tenant to a new tenant, with landlord consent and continued obligations documented.',
    iconKey: 'key',
    fillTimeMinutes: 9,
    stepTwoFields: [
      {
        name: 'propertyAddress',
        label: 'Property address',
        type: 'textarea',
        required: true,
        placeholder: 'Full address of the leased property.',
      },
      ...dateFields,
      {
        name: 'assignmentDate',
        label: 'Assignment effective date',
        type: 'date',
        required: true,
        half: true,
      },
      {
        name: 'outstandingRent',
        label: 'Outstanding rent or arrears (KES)',
        type: 'number',
        required: false,
        half: true,
        placeholder: 'e.g. 0',
      },
      clausesField,
    ],
    clauses: [
      'Assignment of lease',
      'Landlord consent',
      'Assignee obligations',
      'Arrears and deposits',
      'Continuing liability',
    ],
  },
  {
    slug: 'independent-contractor-agreement',
    name: 'Independent Contractor Agreement',
    shortName: 'Contractor Agreement',
    category: 'Freelance',
    description:
      'Engage a contractor while clearly establishing independent status, tax responsibility, deliverables, and payment terms.',
    iconKey: 'user-check',
    fillTimeMinutes: 8,
    stepTwoFields: commonBusinessFields,
    clauses: [
      'Engagement and status',
      'Services and deliverables',
      'Fees and invoicing',
      'Tax and statutory obligations',
      'Confidentiality and IP',
      'Termination',
    ],
  },
  {
    slug: 'rental-agreement',
    name: 'Equipment Rental Agreement',
    shortName: 'Rental Agreement',
    category: 'Property',
    description:
      'Hire out equipment or assets with clear terms on rental period, fees, care, damage, and return conditions.',
    iconKey: 'key-round',
    fillTimeMinutes: 7,
    stepTwoFields: [
      {
        name: 'equipmentDescription',
        label: 'Equipment description',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the equipment, serial numbers, and condition at handover.',
      },
      ...dateFields,
      {
        name: 'rentalFee',
        label: 'Rental fee (KES)',
        type: 'number',
        required: true,
        half: true,
        placeholder: 'e.g. 30000',
      },
      {
        name: 'feeFrequency',
        label: 'Fee frequency',
        type: 'select',
        required: true,
        half: true,
        options: ['One off', 'Daily', 'Weekly', 'Monthly'],
      },
      clausesField,
    ],
    clauses: [
      'Equipment and term',
      'Rental fee and deposit',
      'Use and care',
      'Damage and loss',
      'Return and renewal',
    ],
  },
  {
    slug: 'non-compete-agreement',
    name: 'Non-Compete Agreement',
    shortName: 'Non-Compete',
    category: 'Employment',
    description:
      'Restrict a party from competing with a business for a defined period after employment or a business sale.',
    iconKey: 'lock',
    fillTimeMinutes: 6,
    stepTwoFields: [
      ...dateFields,
      {
        name: 'restrictedActivities',
        label: 'Restricted activities',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the business activities the party cannot carry out.',
      },
      {
        name: 'restrictedRegion',
        label: 'Restricted region',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Nairobi County',
      },
      {
        name: 'restrictionPeriod',
        label: 'Restriction period',
        type: 'select',
        required: true,
        half: true,
        options: ['6 months', '12 months', '18 months', '24 months'],
      },
      clausesField,
    ],
    clauses: [
      'Legitimate business interest',
      'Restricted activities',
      'Duration and geography',
      'Consideration',
      'Remedies for breach',
    ],
  },
  {
    slug: 'partnership-deed',
    name: 'Partnership Deed',
    shortName: 'Partnership Deed',
    category: 'Business',
    description:
      'Establish a partnership between two or more people, setting capital contributions, profit sharing, roles, and dissolution.',
    iconKey: 'handshake',
    fillTimeMinutes: 10,
    stepTwoFields: [
      {
        name: 'businessName',
        label: 'Partnership business name',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'Registered business name',
      },
      {
        name: 'businessActivity',
        label: 'Business activity',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Legal consultancy',
      },
      ...dateFields,
      {
        name: 'profitShare',
        label: 'Profit and loss sharing',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'e.g. Equal shares',
      },
      {
        name: 'governingLaw',
        label: 'Governing law',
        type: 'text',
        required: true,
        half: true,
        placeholder: 'Republic of Kenya',
      },
      clausesField,
    ],
    clauses: [
      'Nature of business',
      'Capital contributions',
      'Profit and loss sharing',
      'Management and authority',
      'Admission and retirement of partners',
      'Dissolution',
    ],
  },
]

export function getDocumentBySlug(slug: string): DocumentType | undefined {
  return DOCUMENTS.find((documentItem) => documentItem.slug === slug)
}

export const PARTY_FIELDS: DocumentField[] = [
  {
    name: 'partyAName',
    label: 'First party full name',
    type: 'text',
    required: true,
    half: true,
    placeholder: 'Person or registered business name',
  },
  {
    name: 'partyAIdNumber',
    label: 'First party ID or registration number',
    type: 'text',
    required: true,
    half: true,
    placeholder: 'National ID or company number',
  },
  {
    name: 'partyAAddress',
    label: 'First party physical address',
    type: 'textarea',
    required: true,
    placeholder: 'Street address, town, county',
  },
  {
    name: 'partyBName',
    label: 'Second party full name',
    type: 'text',
    required: true,
    half: true,
    placeholder: 'Person or registered business name',
  },
  {
    name: 'partyBIdNumber',
    label: 'Second party ID or registration number',
    type: 'text',
    required: true,
    half: true,
    placeholder: 'National ID or company number',
  },
  {
    name: 'partyBAddress',
    label: 'Second party physical address',
    type: 'textarea',
    required: true,
    placeholder: 'Street address, town, county',
  },
  {
    name: 'contactEmail',
    label: 'Contact email for your PDF copy',
    type: 'email',
    required: true,
    placeholder: 'you@example.com',
  },
]
