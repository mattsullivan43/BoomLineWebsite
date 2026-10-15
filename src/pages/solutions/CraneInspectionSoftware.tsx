import SolutionPage, { type SolutionContent } from '../../components/SolutionPage'

// Targets "crane inspection software" (+ crane inspection app). Daily
// Inspections carries the `beta` tag on Home — keep it here. No OSHA
// references (site rule).
const content: SolutionContent = {
  eyebrow: 'Crane inspection software',
  h1: 'Crane inspection software for',
  h1Accent: 'The Field.',
  intro: [
    'Boomline is crane inspection software for daily and monthly inspections — filed in the field, converted to a PDF document, and kept on each crane’s record.',
    'Inspections sit next to maintenance and work orders, so you see inspection gaps before they turn into downtime. Daily Inspections is in beta and rolling out now.',
  ],
  showcase: { pane: 'overview', subTab: 'maintenance' },
  features: {
    eyebrow: 'Inspections',
    heading: 'Inspections tracked where the work happens.',
    intro: 'Crews file inspections from the field. The office and owners see the result on the crane’s record.',
    items: [
      {
        title: 'Daily and monthly inspections',
        body: 'Daily and monthly inspections tracked in the field and converted to a PDF document.',
        tag: 'beta',
      },
      {
        title: 'Filed by the crew',
        body: 'Employees file inspections, see their jobs, and clock in — from any device.',
      },
      {
        title: 'On the crane’s record',
        body: 'Full asset record per machine. Hours, miles, inspections, maintenance log, work order history.',
      },
      {
        title: 'Inspection gaps flagged',
        body: 'Maintenance Risk shows overdue maintenance exposure and inspection gaps — where downtime is about to bite.',
      },
      {
        title: 'Expiration alerts',
        body: 'Inspections expiring, certs lapsing, jobs unassigned. The right alert, to the right person, at the right time.',
      },
      {
        title: 'Maintenance intervals',
        body: 'Recurring service intervals by hours, miles, or calendar days. Overdue / Due soon / On track.',
      },
      {
        title: 'Work orders',
        body: 'Create field, shop, or maintenance work orders. Filter by priority and assign to techs or employees.',
      },
      {
        title: 'Other assets too',
        body: 'Trucks, trailers, forklifts, and more — tracked alongside cranes. Same logic, same visibility.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    heading: 'How crane inspections work in Boomline.',
    items: [
      {
        title: 'Inspect in the field',
        body: 'The crew files the daily or monthly inspection from a phone, tablet, or desktop.',
      },
      {
        title: 'PDF on the record',
        body: 'The inspection is converted to a PDF document and kept with the crane.',
      },
      {
        title: 'Spot problems early',
        body: 'Inspection gaps and overdue maintenance show up before they cause downtime.',
      },
      {
        title: 'Fix it',
        body: 'Create a work order and assign it to a tech or employee.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Why switch',
    heading: 'Paper inspections get lost before anyone reads them.',
    intro: [
      'A paper inspection sheet has to make it from the crane back to the office, then into a file, before anyone can act on it. By the time someone notices a missed inspection, the crane may already be out on a job.',
    ],
    columns: ['Paper & clipboards', 'Boomline'],
    rows: [
      {
        label: 'Filing the inspection',
        before: 'Paper sheet on a clipboard',
        after: 'Filed in the field from any device',
      },
      {
        label: 'Record keeping',
        before: 'A filing cabinet in the office',
        after: 'PDF on the crane’s record',
      },
      {
        label: 'Missed inspections',
        before: 'Found after the fact',
        after: 'Inspection gaps flagged',
      },
      {
        label: 'Expiring inspections',
        before: 'Someone has to remember',
        after: 'Alerts to the right person',
      },
      {
        label: 'Repairs',
        before: 'A phone call to the shop',
        after: 'Work order assigned to a tech',
      },
    ],
  },
  related: {
    eyebrow: 'Beyond inspections',
    heading: 'Connected to the rest of your operation.',
    items: [
      {
        title: 'Operator certifications',
        body: 'Medical cards, training records, and certifications. Alerts before anything expires.',
        to: '/crane-certification-tracking',
      },
      {
        title: 'Crane dispatch',
        body: 'One board for the day. Dispatch every employee and outside trucking partner at once.',
        to: '/crane-dispatch-software',
      },
      {
        title: 'Field tickets',
        body: 'Live digital job tickets with signatures, linked to the job for billing.',
        to: '/crane-field-ticket-software',
        tag: 'beta',
      },
      {
        title: 'Equipment',
        body: 'Maintenance intervals, work orders, and a full record for every crane.',
        to: '/features',
      },
    ],
  },
  faqs: [
    {
      q: 'What is crane inspection software?',
      a: 'Crane inspection software lets crews file crane inspections digitally and keeps the results on each crane’s record. Boomline handles daily and monthly inspections, converts them to PDF, and flags inspection gaps.',
    },
    {
      q: 'Does Boomline handle daily and monthly crane inspections?',
      a: 'Yes. Daily and monthly inspections are tracked in the field and converted to a PDF document. Daily Inspections is in beta.',
    },
    {
      q: 'Where are completed inspections stored?',
      a: 'On the crane’s asset record, alongside hours, miles, the maintenance log, and work order history.',
    },
    {
      q: 'Will Boomline warn me about missed or expiring inspections?',
      a: 'Yes. Maintenance Risk shows inspection gaps, and alerts go to the right person when inspections are expiring.',
    },
    {
      q: 'Can inspections lead straight to a repair?',
      a: 'Yes. Create a field, shop, or maintenance work order and assign it to a tech or employee.',
    },
    {
      q: 'Does it work for trucks and trailers too?',
      a: 'Yes. Trucks, trailers, forklifts, and other assets are tracked alongside cranes.',
    },
  ],
  cta: {
    heading: 'Put crane inspections on the record.',
    body: 'Book a 15-minute demo. We’ll show you Boomline running on a real crane company’s data.',
  },
}

export default function CraneInspectionSoftware() {
  return <SolutionPage content={content} />
}
