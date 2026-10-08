import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

// Public terms page — mounted at /terms outside the site Layout so it reads
// as a standalone legal document. Styling deliberately mirrors the Privacy
// Policy page at boomline.app/privacy so the two documents look identical.
export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif', colorScheme: 'light' }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Same fluid root font-size the app uses, so rem sizing matches boomline.app/privacy. */}
        <style>{`
          html { font-size: clamp(14px, calc(100vw / 1280 * 16), 16px); }
          @media (max-width: 768px) { html { font-size: clamp(12px, calc(100vw / 393 * 16), 18px); } }
        `}</style>
        <header className="border-b border-zinc-200 pb-4 mb-8 flex items-baseline justify-between gap-4 flex-wrap">
          <a
            href="https://boomline.app"
            className="text-lg font-bold tracking-tight no-underline text-zinc-900"
          >
            Boomline<span className="text-amber-500">.</span>
          </a>
          <span className="text-sm text-zinc-500">
            Effective Date: October 7, 2026
          </span>
        </header>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Terms &amp; Conditions</h1>
          <p className="text-base md:text-lg text-zinc-500 mb-10 leading-relaxed">
            Boomline is a business-to-business platform for crane and equipment rental management.
            These terms explain the rules for using Boomline, what you can expect from us, and what we
            expect from you.
          </p>

          <Section title="Agreement to These Terms">
            <P>
              These Terms &amp; Conditions (the "Terms") govern access to and use of Boomline (the
              "Service", available at <A href="https://boomline.app">boomline.app</A>,{' '}
              <A href="https://boomline.co">boomline.co</A>, and through our iOS and Android
              applications). The Service is owned and operated by Boomline ("Boomline", "we", "us").
            </P>
            <P>
              By accessing or using the Service, you agree to these Terms. If you are using Boomline on
              behalf of a company, you represent that you have authority to bind that company, and
              "you" refers to both you and that company. If you do not agree, do not use the Service.
            </P>
            <P>
              If your company has signed a separate written agreement with Boomline, that agreement
              controls where it conflicts with these Terms.
            </P>
          </Section>

          <Section title="Accounts and Access">
            <P>
              In most cases, your employer is the Boomline customer. Your employer's account
              administrator controls who is invited, what each user can see and do, and which features
              are turned on.
            </P>
            <UL>
              <li>You must provide accurate information and keep it up to date.</li>
              <li>
                You are responsible for keeping your sign-in credentials secure and for all activity
                under your account.
              </li>
              <li>
                Notify us right away at <A href="mailto:support@boomline.app">support@boomline.app</A>{' '}
                if you suspect unauthorized access.
              </li>
              <li>You must be at least 18 years old to use the Service.</li>
            </UL>
          </Section>

          <Section title="Acceptable Use">
            <P>You agree not to:</P>
            <UL>
              <li>Use the Service for anything unlawful, fraudulent, or harmful.</li>
              <li>
                Access, or attempt to access, data or accounts you are not authorized to use.
              </li>
              <li>
                Interfere with or disrupt the Service, its security, or the infrastructure it runs on.
              </li>
              <li>
                Reverse engineer, decompile, copy, or resell the Service, except where the law
                expressly allows it.
              </li>
              <li>
                Upload malicious code or content that infringes someone else's rights.
              </li>
              <li>
                Use automated tools to scrape or bulk-extract data from the Service without our written
                permission.
              </li>
            </UL>
            <P>
              We may suspend or restrict access that violates these Terms or puts the Service, our
              customers, or the public at risk.
            </P>
          </Section>

          <Section title="Your Data">
            <P>
              Your company owns the operational records it puts into Boomline — jobs, work orders,
              customer records, equipment records, timesheets, inspection reports, attachments, and
              similar business data ("Customer Data").
            </P>
            <P>
              You grant Boomline a limited license to host, process, and display Customer Data only as
              needed to provide, secure, support, and improve the Service. How we handle personal
              information is described in our{' '}
              <A href="https://boomline.app/privacy">Privacy Policy</A>.
            </P>
            <Callout>
              <strong>We do not sell your data.</strong> We do not use Customer Data for advertising, and
              we do not share it with third parties for their own purposes.
            </Callout>
            <P>
              You are responsible for the accuracy of Customer Data and for having the rights needed to
              put it into the Service.
            </P>
          </Section>

          <Section title="Your Operations Remain Your Responsibility">
            <P>
              Boomline is a tool for scheduling, dispatch, record-keeping, and operations management. It
              does not replace professional judgment, qualified personnel, or your own safety programs.
            </P>
            <UL>
              <li>
                You remain solely responsible for lift planning, equipment operation, inspections,
                certifications, site safety, and compliance with all laws and regulations that apply to
                your business.
              </li>
              <li>
                Reminders, alerts, and reports in the Service are aids only. You should verify critical
                information before acting on it.
              </li>
              <li>
                Rates, quotes, terms, and documents you generate in Boomline are your own. We are not a
                party to any agreement between you and your customers, vendors, or subcontractors.
              </li>
            </UL>
          </Section>

          <Section title="Fees and Payment">
            <P>
              Paid plans are billed according to the order form, quote, or subscription your company
              agrees to. Unless stated otherwise, fees are due in advance, are non-refundable, and do
              not include taxes. We may suspend the Service for accounts with past-due balances after
              giving notice.
            </P>
            <P>
              We may change pricing for future billing periods by giving at least 30 days' notice.
            </P>
          </Section>

          <Section title="Beta Features">
            <P>
              Some features may be labeled beta, preview, or early access. These are provided as-is,
              may change or be removed, and may not be as reliable as the rest of the Service.
            </P>
          </Section>

          <Section title="Our Intellectual Property">
            <P>
              Boomline, including its software, design, logos, and documentation, is owned by Boomline
              and protected by intellectual property laws. These Terms give you a limited,
              non-exclusive, non-transferable right to use the Service during your subscription. They do
              not transfer any ownership to you.
            </P>
            <P>
              If you send us feedback or suggestions, we may use them without any obligation to you.
            </P>
          </Section>

          <Section title="Third-Party Services">
            <P>
              The Service relies on third-party providers such as Amazon Web Services, Apple, and Google,
              and may connect to other services you choose to use. We are not responsible for
              third-party services, and your use of them may be subject to their own terms.
            </P>
          </Section>

          <Section title="Availability and Changes to the Service">
            <P>
              We work to keep Boomline available and reliable, but we do not guarantee that the Service
              will be uninterrupted or error-free. We may perform maintenance, and we may add, change,
              or remove features over time.
            </P>
          </Section>

          <Section title="Termination">
            <P>
              Your company may stop using the Service at any time, subject to any commitments in its
              order form or subscription. We may suspend or terminate access for material breach of these
              Terms, non-payment, or where required by law.
            </P>
            <P>
              After termination, your company may request an export of its Customer Data within 30 days
              by emailing <A href="mailto:support@boomline.app">support@boomline.app</A>. After that
              period, we may delete Customer Data, subject to legal retention obligations.
            </P>
          </Section>

          <Section title="Disclaimers">
            <P>
              <strong>
                The Service is provided "as is" and "as available." To the fullest extent permitted by
                law, Boomline disclaims all warranties, express or implied, including warranties of
                merchantability, fitness for a particular purpose, and non-infringement.
              </strong>
            </P>
          </Section>

          <Section title="Limitation of Liability">
            <P>
              To the fullest extent permitted by law, Boomline will not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or for lost profits, revenue,
              data, or business opportunities, arising out of or related to the Service.
            </P>
            <P>
              Boomline's total liability for any claim related to the Service is limited to the amount
              your company paid Boomline for the Service in the 12 months before the event giving rise to
              the claim.
            </P>
          </Section>

          <Section title="Indemnification">
            <P>
              You agree to defend and indemnify Boomline against claims, damages, and costs (including
              reasonable attorneys' fees) arising from your use of the Service, your Customer Data, your
              business operations, or your violation of these Terms or applicable law.
            </P>
          </Section>

          <Section title="General">
            <UL>
              <li>
                <strong>Governing law</strong> — These Terms are governed by the laws of the United States
                and the state in which Boomline is organized, without regard to conflict-of-law rules.
              </li>
              <li>
                <strong>Assignment</strong> — You may not assign these Terms without our written consent.
                We may assign them in connection with a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>Severability</strong> — If any provision is found unenforceable, the rest of these
                Terms remain in effect.
              </li>
              <li>
                <strong>No waiver</strong> — Our failure to enforce a provision is not a waiver of our
                right to enforce it later.
              </li>
              <li>
                <strong>Entire agreement</strong> — These Terms, our Privacy Policy, and any order form
                your company signs are the entire agreement between you and Boomline about the Service.
              </li>
            </UL>
          </Section>

          <Section title="Changes to These Terms">
            <P>
              We may update these Terms from time to time. When we make material changes we will update
              the Effective Date at the top of this page and notify customers via email or through the
              Service. Continued use of Boomline after the new Effective Date constitutes acceptance.
            </P>
          </Section>

          <Section title="Contact Us">
            <P>Questions about these Terms:</P>
            <UL>
              <li>
                Email: <A href="mailto:support@boomline.app">support@boomline.app</A>
              </li>
            </UL>
          </Section>
        </article>

        <footer className="border-t border-zinc-200 mt-12 pt-6 text-sm text-zinc-500">
          <p className="mb-1">© 2026 Boomline. All rights reserved.</p>
          <p>
            <Link to="/" className="hover:text-zinc-700 transition-colors">
              ← Back to boomline.co
            </Link>
          </p>
        </footer>
      </div>
    </div>
  )
}

// ─── Small typography helpers — keep the JSX above readable ─────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 pt-6 border-t border-zinc-200 first:mt-0 first:pt-0 first:border-t-0">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">{title}</h2>
      {children}
    </section>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 mb-4 space-y-1.5 leading-relaxed">{children}</ul>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  return (
    <a
      href={href}
      className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-50 border-l-4 border-amber-500 px-4 py-3 my-4 rounded-r text-base leading-relaxed">
      {children}
    </div>
  )
}
