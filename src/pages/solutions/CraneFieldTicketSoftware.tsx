import SolutionPage, { type SolutionContent } from '../../components/SolutionPage'

// Targets "crane field ticket software" (+ digital field tickets, crane job
// ticket app, electronic job tickets). Field Tickets, Billing and Invoicing
// carry the site's `beta` tag — keep it on every mention.
const content: SolutionContent = {
  eyebrow: 'Crane field ticket software',
  h1: 'Digital field tickets for',
  h1Accent: 'Crane Jobs.',
  intro: [
    'Boomline is crane field ticket software that replaces paper job tickets. Tickets live on the job, signatures are captured in the field, and every ticket is linked to the job for billing.',
    'No more tickets lost in a truck cab, unreadable carbon copies, or chasing signatures after the fact. Field Tickets is in beta and rolling out now.',
  ],
  showcase: true,
  features: {
    eyebrow: 'Field tickets',
    heading: 'Every crane job ticket, captured in the field.',
    intro: 'Field tickets are built into the job, so the work your crew did and the invoice you send come from the same record.',
    items: [
      {
        title: 'Live digital job tickets',
        body: 'Tickets live on the job record — not on paper in a truck. The office sees them as soon as they’re filled out.',
        tag: 'beta',
      },
      {
        title: 'First and second signatures',
        body: 'Capture the first and second signatures in the field, right on the ticket.',
        tag: 'beta',
      },
      {
        title: 'Linked to the job for billing',
        body: 'Every ticket is tied to its job, so billing works from what actually happened on site.',
        tag: 'beta',
      },
      {
        title: 'Exportable customer copy',
        body: 'Give the customer a clean copy of the ticket instead of a smudged carbon.',
        tag: 'beta',
      },
      {
        title: 'Invoices from job data',
        body: 'Generate invoices from the job. Hourly, daily, or project-based. Email to the customer and track sent / paid.',
        tag: 'beta',
      },
      {
        title: 'Standby, overtime, travel',
        body: 'Billing handles standby, overtime, travel, and mileage — all built in.',
        tag: 'beta',
      },
      {
        title: 'TimeSheets by job',
        body: 'Weekly grid by employee. Standard time and overtime by job. Export to PDF.',
      },
      {
        title: 'Any device',
        body: 'Crews fill out tickets from whatever they carry — phone, tablet, or desktop.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    heading: 'From the job site to the invoice.',
    items: [
      {
        title: 'Dispatch the job',
        body: 'The job is on the board with its crew, crane, and job-site details. The ticket is linked to that job.',
      },
      {
        title: 'Fill out the ticket on site',
        body: 'The crew completes the digital job ticket in the field.',
      },
      {
        title: 'Capture signatures',
        body: 'First and second signatures go on the ticket before the crew leaves.',
      },
      {
        title: 'Bill from the job',
        body: 'The ticket is linked to the job, so the invoice is generated from job data.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Why switch',
    heading: 'Paper field tickets cost crane companies money.',
    intro: [
      'A paper ticket has to survive the truck, the weather, and the drive back to the yard before anyone can bill from it. Every lost or unreadable ticket is a job that’s late to invoice — or never billed at all.',
    ],
    columns: ['Paper tickets', 'Boomline'],
    rows: [
      {
        label: 'Where the ticket lives',
        before: 'In a truck cab or a clipboard',
        after: 'On the job record',
      },
      {
        label: 'Signatures',
        before: 'Chased after the fact',
        after: 'First and second signatures captured in the field',
      },
      {
        label: 'Getting it to the office',
        before: 'Whenever the crew brings it in',
        after: 'Available as soon as it’s filled out',
      },
      {
        label: 'Billing',
        before: 'Re-typed into invoices',
        after: 'Linked to the job for billing',
      },
      {
        label: 'Customer copy',
        before: 'Carbon copy, if it’s readable',
        after: 'Exportable customer copy',
      },
    ],
  },
  related: {
    eyebrow: 'Beyond field tickets',
    heading: 'Connected to the rest of your operation.',
    items: [
      {
        title: 'Crane dispatch',
        body: 'One board for the day. Dispatch every employee and outside trucking partner at once.',
        to: '/crane-dispatch-software',
      },
      {
        title: 'Billing & invoicing',
        body: 'Hourly, daily, or project-based billing. Invoices generated from job data.',
        to: '/features',
        tag: 'beta',
      },
      {
        title: 'Crane inspections',
        body: 'Daily and monthly inspections, tracked in the field and converted to a PDF document.',
        to: '/crane-inspection-software',
        tag: 'beta',
      },
      {
        title: 'Operator certifications',
        body: 'Medical cards, training records, and certifications. Alerts before anything expires.',
        to: '/crane-certification-tracking',
      },
    ],
  },
  faqs: [
    {
      q: 'What is crane field ticket software?',
      a: 'Crane field ticket software replaces paper job tickets with digital ones filled out in the field. In Boomline, each ticket is linked to its job, captures signatures on site, and feeds billing.',
    },
    {
      q: 'Can customers sign field tickets in Boomline?',
      a: 'Yes. Boomline captures first and second signatures on the ticket in the field.',
    },
    {
      q: 'How do field tickets connect to invoicing?',
      a: 'Every ticket is linked to its job, and invoices are generated from job data — hourly, daily, or project-based, with standby, overtime, travel, and mileage built in. Billing and Invoicing are in beta.',
    },
    {
      q: 'Can the customer get a copy of the ticket?',
      a: 'Yes. Each field ticket has an exportable customer copy.',
    },
    {
      q: 'Is Field Tickets available now?',
      a: 'Field Tickets is in beta and actively rolling out. Book a demo to see it running.',
    },
    {
      q: 'What devices do crews use for field tickets?',
      a: 'Boomline runs on iOS, Android (beta), and the web, so crews can use a phone, tablet, or desktop.',
    },
  ],
  cta: {
    heading: 'Get rid of paper tickets.',
    body: 'Book a 15-minute demo. We’ll show you Boomline running on a real crane company’s data.',
  },
}

export default function CraneFieldTicketSoftware() {
  return <SolutionPage content={content} />
}
