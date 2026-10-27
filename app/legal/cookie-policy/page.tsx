import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Ezekiel Docs uses cookies and similar technologies, and how to manage your preferences.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="27 October 2026">
      <p>
        This Cookie Policy explains how Ezekiel Docs uses cookies and similar
        storage technologies when you visit our website. It should be read
        together with our <a href="/legal/privacy-policy">Privacy Policy</a>,
        which describes how we handle personal data under the Data Protection
        Act, 2019 of Kenya.
      </p>

      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files placed on your device by a website. They
        allow the site to remember your actions and preferences over a period
        of time so you do not have to re-enter them on every visit. Cookies may
        be session cookies, which are deleted when you close the browser, or
        persistent cookies, which remain until they expire or you delete them.
      </p>

      <h2>2. The cookies we use</h2>
      <h3>Necessary cookies</h3>
      <p>
        These cookies are essential for the website to function. They handle
        security, cookie consent storage, and basic form protection. They
        cannot be switched off because the service would not work reliably
        without them.
      </p>
      <h3>Functional cookies</h3>
      <p>
        Functional cookies remember choices you make, such as in-progress
        document drafts and interface preferences, so the platform can offer a
        smoother experience.
      </p>
      <h3>Analytics cookies</h3>
      <p>
        Analytics cookies collect aggregated information about the pages you
        visit, the documents you view, and how you move through the site. We use
        this information to improve navigation and prioritise useful templates.
        These cookies are only set with your consent.
      </p>
      <h3>Marketing cookies</h3>
      <p>
        Marketing cookies help us measure the effectiveness of updates and
        share relevant information about new document templates. They are only
        set with your consent and are never used to sell your data.
      </p>

      <h2>3. How long cookies remain</h2>
      <p>
        Session cookies are removed when you close your browser. Persistent
        cookies used for preferences and consent are typically retained for up
        to twelve months, while analytics and marketing cookies expire in line
        with each provider&apos;s settings, usually between thirty days and
        twelve months.
      </p>

      <h2>4. Managing your preferences</h2>
      <p>
        When you first visit the site, a consent banner lets you accept all
        cookies or manage your preferences. Your choice is stored locally under
        the name ezekiel-docs-cookie-consent. You can change your decision at
        any time by clearing this value in your browser storage, which will
        cause the banner to appear again on your next visit.
      </p>
      <p>
        You can also control or delete cookies through your browser settings.
        Blocking necessary cookies may prevent parts of the platform, including
        document generation, from working correctly.
      </p>

      <h2>5. Third-party cookies</h2>
      <p>
        Some cookies are set by trusted providers that support security,
        analytics, and email delivery. These providers process information
        under their own data handling terms, and we only enable optional
        providers after you give consent.
      </p>

      <h2>6. Your data protection rights</h2>
      <p>
        Under the Data Protection Act, 2019, you have rights to access,
        correct, delete, and restrict the personal data associated with these
        technologies. Details are available in our{' '}
        <a href="/legal/privacy-policy">Privacy Policy</a>, or contact
        privacy@ezekieldocs.co.ke for assistance.
      </p>

      <h2>7. Updates to this policy</h2>
      <p>
        We may revise this Cookie Policy when our services or applicable
        regulations change. The last updated date at the top of this page shows
        the current version.
      </p>
    </LegalPage>
  )
}
