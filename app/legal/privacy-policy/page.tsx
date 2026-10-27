import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Ezekiel Docs collects, uses, stores, and protects personal data under the Kenya Data Protection Act, 2019.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="27 October 2026">
      <p>
        Ezekiel Docs operates a legal document automation platform for Kenyan
        small and medium enterprises, freelancers, and startups. This Privacy
        Policy explains how we collect, use, store, share, and protect personal
        data when you use our website and services. It is written to comply
        with the Data Protection Act, 2019 of Kenya (the KDPA) and guidance
        issued by the Office of the Data Protection Commissioner.
      </p>

      <h2>1. Data controller and contact details</h2>
      <p>
        Ezekiel Docs is the data controller for personal information processed
        through this platform. Questions, access requests, and complaints can
        be sent to privacy@ezekieldocs.co.ke or raised through the WhatsApp
        contact published on this website. We will respond without undue delay
        and in any event within the period required by Kenyan law.
      </p>

      <h2>2. Information we collect</h2>
      <p>We only collect information that is needed to provide the service.</p>
      <ul>
        <li>
          Identity and contact details: full names, business names, national
          identification or company registration numbers, postal and physical
          addresses, email addresses, and phone numbers entered into document
          forms.
        </li>
        <li>
          Document content: the contract terms, amounts, dates, property
          details, and clauses you provide so we can generate your documents.
        </li>
        <li>
          Account information: login credentials where authentication is used,
          plus records of the documents you generate.
        </li>
        <li>
          Technical information: device type, browser, IP address, and basic
          usage statistics collected through cookies described in our Cookie
          Policy.
        </li>
        <li>
          Enquiry information: your name, email, subject, and message when you
          contact us.
        </li>
      </ul>

      <h2>3. How we use personal data</h2>
      <ul>
        <li>To generate, store, and deliver the legal documents you request.</li>
        <li>
          To send confirmation emails containing your generated PDF and
          service-related notices.
        </li>
        <li>
          To provide customer support, respond to enquiries, and troubleshoot
          technical problems.
        </li>
        <li>
          To prevent fraud and abuse, including reCAPTCHA verification of form
          submissions.
        </li>
        <li>
          To understand aggregated usage patterns and improve the platform,
          subject to the cookie choices you make.
        </li>
      </ul>

      <h2>4. Legal basis for processing</h2>
      <p>
        Under the KDPA and applicable data protection principles, we rely on
        the following grounds: performance of a contract with you when
        generating documents, compliance with a legal obligation where Kenyan
        law requires record keeping, your consent for optional cookies and
        marketing communications, and our legitimate interest in operating a
        secure and reliable business platform. Where we rely on consent, you
        may withdraw it at any time.
      </p>

      <h2>5. Data sharing and subprocessors</h2>
      <p>
        We do not sell your personal data. We share data only with service
        providers who help us operate the platform and who are bound by
        contractual confidentiality obligations:
      </p>
      <ul>
        <li>Hosting and file storage providers used to store generated PDFs.</li>
        <li>Email delivery providers used for transactional messages.</li>
        <li>Security and anti-bot providers used to verify form submissions.</li>
        <li>Analytics providers, activated only when you accept analytics cookies.</li>
      </ul>
      <p>
        Where a provider processes data outside Kenya, we require appropriate
        safeguards consistent with the KDPA, including standard contractual
        protections and a demonstrated adequacy of protection.
      </p>

      <h2>6. Data retention</h2>
      <p>
        Generated documents and the data within them are retained for as long
        as your account is active and for a reasonable period afterwards so you
        can retrieve copies. Enquiry records are retained for twenty-four
        months. Cookie identifiers are retained according to the periods in
        our Cookie Policy. When data is no longer needed, it is securely
        deleted or anonymised.
      </p>

      <h2>7. Your rights under the KDPA</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate or incomplete data.</li>
        <li>Request deletion of data where there is no overriding legal reason to keep it.</li>
        <li>Object to or restrict certain processing.</li>
        <li>Withdraw consent at any time without affecting lawful processing already carried out.</li>
        <li>Request data portability for information you provided to us.</li>
        <li>Lodge a complaint with the Office of the Data Protection Commissioner.</li>
      </ul>
      <p>
        To exercise any right, contact privacy@ezekieldocs.co.ke. We may ask
        for reasonable proof of identity before acting on a request.
      </p>

      <h2>8. Security measures</h2>
      <p>
        We protect data using encryption in transit, access controls, least
        privilege permissions, regular dependency updates, and secure hosting.
        Sensitive form entries are processed only for the purpose of document
        generation and are never displayed in public areas of the platform.
      </p>

      <h2>9. Children&apos;s data</h2>
      <p>
        The platform is intended for business users and adults entering
        contracts. We do not knowingly collect personal data from children. If
        you believe a child&apos;s data has been submitted, contact us and we
        will delete it promptly.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy as the service or Kenyan law
        develops. Material changes will be highlighted on the website, and the
        last updated date will always reflect the current version.
      </p>
    </LegalPage>
  )
}
