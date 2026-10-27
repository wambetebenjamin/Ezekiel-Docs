import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern use of the Ezekiel Docs legal document automation platform.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="27 October 2026">
      <p>
        These Terms of Service govern your access to and use of the Ezekiel
        Docs website and document generation platform. By creating an account
        or generating a document, you agree to these terms. If you do not
        agree, please do not use the service.
      </p>

      <h2>1. About the service</h2>
      <p>
        Ezekiel Docs provides automated templates that help users prepare
        common legal documents aligned with Kenyan law. The platform generates
        documents from the information you enter and delivers them as
        downloadable PDF files.
      </p>

      <h2>2. Not legal advice</h2>
      <p>
        The service provides document automation and general legal information.
        It is not a law firm, and using the platform does not create an
        advocate-client relationship. Generated documents are not a substitute
        for tailored legal advice. For complex, high-value, or disputed
        matters, you should consult a qualified Kenyan advocate before signing.
      </p>

      <h2>3. Your account and responsibilities</h2>
      <ul>
        <li>
          You must provide accurate, complete, and current information in every
          form.
        </li>
        <li>
          You are responsible for keeping your login credentials confidential
          and for activity that happens under your account.
        </li>
        <li>
          You must not use the platform for unlawful purposes, fraud, money
          laundering, or the creation of misleading documents.
        </li>
        <li>
          You must not attempt to disrupt, reverse engineer, or gain
          unauthorised access to the service.
        </li>
      </ul>

      <h2>4. Document accuracy and review</h2>
      <p>
        Templates are reviewed by qualified Kenyan lawyers and updated when
        relevant law changes. However, the correctness of a generated document
        depends on the information you provide and the specific facts of your
        situation. You are responsible for reading the full document before
        signing and for obtaining independent advice where appropriate.
      </p>

      <h2>5. Subscriptions, fees, and refunds</h2>
      <p>
        The Free plan allows limited document generation each month. Paid plans
        unlock additional usage and features, with fees shown on the pricing
        page before payment. Subscriptions renew automatically until cancelled.
        You may cancel at any time, and cancellation takes effect at the end of
        the current billing period. Refunds are assessed on request where a
        service fault prevented a document from being generated.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The platform, including its templates, design, code, and branding, is
        owned by Ezekiel Docs or its licensors and protected by intellectual
        property law. You receive a personal, non-exclusive, non-transferable
        licence to use generated documents for your own lawful business or
        personal purposes. You must not resell, republish, or present the
        platform itself as your own product.
      </p>

      <h2>7. Data protection</h2>
      <p>
        We process personal data under the Data Protection Act, 2019 and as
        described in our{' '}
        <a href="/legal/privacy-policy">Privacy Policy</a>. By using the
        service, you confirm that any personal data you enter about another
        person has been collected lawfully and that the person has been informed
        where required.
      </p>

      <h2>8. Third-party services</h2>
      <p>
        The platform relies on hosting, storage, email, and security providers.
        Your use may also be subject to those providers&apos; terms where they
        apply. We select providers with reasonable security and reliability
        standards.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        The service is provided on an as-is and as-available basis. To the
        fullest extent permitted by Kenyan law, Ezekiel Docs is not liable for
        indirect, incidental, or consequential losses, including lost profits
        or lost business opportunities, arising from use of a generated
        document. Our aggregate liability for any claim is limited to the fees
        you paid in the three months before the claim arose. Nothing in these
        terms excludes liability that cannot be excluded under Kenyan law.
      </p>

      <h2>10. Suspension and termination</h2>
      <p>
        We may suspend or terminate access where you breach these terms, misuse
        the service, or fail to pay applicable fees. You may stop using the
        service and cancel your account at any time. Provisions that are
        intended to survive termination, including intellectual property and
        liability clauses, will continue to apply.
      </p>

      <h2>11. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of the Republic of Kenya. Disputes
        will first be referred to good-faith negotiation, then mediation, and
        failing resolution, to the courts of Kenya, without limiting the right
        to seek urgent injunctive relief.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We may update these terms to reflect changes in the service or the law.
        Material changes will be published on this page with a revised last
        updated date. Continued use after changes take effect constitutes
        acceptance of the updated terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms of Service can be sent to
        legal@ezekieldocs.co.ke or through the WhatsApp contact published on
        the website.
      </p>
    </LegalPage>
  )
}
