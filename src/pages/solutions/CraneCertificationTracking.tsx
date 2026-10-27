import SolutionPage, { type SolutionContent } from '../../components/SolutionPage'

// Targets "crane operator certification tracking" (+ crane operator
// certification software). No OSHA references (site rule).
const content: SolutionContent = {
  eyebrow: 'Crane operator certification tracking',
  h1: 'Crane operator certification tracking that',
  h1Accent: 'Never Lapses.',
  intro: [
    'Boomline tracks crane operator certifications, medical cards, and training records in one place — and alerts the right person before anything expires.',
    'No spreadsheet to keep updated, no expired card discovered on the job site. Built with trusted field experts, for crane companies.',
  ],
  showcase: { pane: 'overview', subTab: 'maintenance' },
  features: {
    eyebrow: 'Certification tracking',
    heading: 'Every card, every record, every expiration date.',
    intro: 'Certifications live with the employee, so the office, the dispatcher, and the owner all see the same status.',
    items: [
      {
        title: 'Operator certifications',
        body: 'Track each operator’s certifications and their expiration dates in one place.',
      },
      {
        title: 'Medical cards',
        body: 'Keep medical cards on file with the employee, with the date they run out.',
      },
      {
        title: 'Training records',
        body: 'Training records stored with each employee, ready when a customer or auditor asks.',
      },
      {
        title: 'Expiration alerts',
        body: 'Certs lapsing, inspections expiring, jobs unassigned. The right alert, to the right person, at the right time.',
      },
      {
        title: 'Expiring list for owners',
        body: 'The Command Center lists what’s coming due — certifications and equipment — so nothing sneaks up on you.',
      },
      {
        title: 'Safety & training',
        body: 'Keep employees up to date with company safety standards.',
      },
      {
        title: 'Role-based access',
        body: 'Every person on your crew sees exactly what they need. Permissions handled, hierarchy respected.',
      },
      {
        title: 'Any device',
        body: 'Check a certification from the yard, the office, or the job site — phone, tablet, or desktop.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    heading: 'How certification tracking works in Boomline.',
    items: [
      {
        title: 'Add your crew',
        body: 'Each employee gets a record for their certifications, medical card, and training.',
      },
      {
        title: 'Enter expiration dates',
        body: 'Log each certification with the date it runs out.',
      },
      {
        title: 'Get alerted early',
        body: 'Boomline alerts the right person before a certification lapses, so there’s time to renew.',
      },
      {
        title: 'Stay ahead',
        body: 'Owners see what’s expiring in the Command Center — certifications and equipment in one list.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Why switch',
    heading: 'Spreadsheets don’t warn you before a card expires.',
    intro: [
      'Most crane companies track operator certifications in a spreadsheet, a binder, or someone’s memory. That works until a card lapses and nobody notices until a customer — or an operator on site — asks for it.',
    ],
    columns: ['Spreadsheet & binder', 'Boomline'],
    rows: [
      {
        label: 'Where certs live',
        before: 'A spreadsheet one person maintains',
        after: 'On each employee’s record',
      },
      {
        label: 'Expiration warnings',
        before: 'Only if someone checks',
        after: 'Alerts before anything expires',
      },
      {
        label: 'Medical cards & training',
        before: 'In a separate binder',
        after: 'In the same record',
      },
      {
        label: 'Owner visibility',
        before: 'Ask the office',
        after: 'Expiring list in the Command Center',
      },
      {
        label: 'Checking from the field',
        before: 'Call the office',
        after: 'Phone, tablet, or desktop',
      },
    ],
  },
  related: {
    eyebrow: 'Beyond certifications',
    heading: 'Connected to the rest of your operation.',
    items: [
      {
        title: 'Crane dispatch',
        body: 'One board for the day. Dispatch every employee and outside trucking partner at once.',
        to: '/crane-dispatch-software',
      },
      {
        title: 'Crane inspections',
        body: 'Daily and monthly inspections, tracked in the field and converted to a PDF document.',
        to: '/crane-inspection-software',
        tag: 'beta',
      },
      {
        title: 'Field tickets',
        body: 'Live digital job tickets with signatures, linked to the job for billing.',
        to: '/crane-field-ticket-software',
        tag: 'beta',
      },
      {
        title: 'Crane maintenance',
        body: 'Maintenance intervals, work orders, and a full record for every crane.',
        to: '/crane-maintenance-software',
      },
    ],
  },
  faqs: [
    {
      q: 'What is crane operator certification tracking?',
      a: 'It’s keeping every operator’s certifications, medical cards, and training records in one place with their expiration dates — and getting warned before any of them lapse. Boomline does this on each employee’s record.',
    },
    {
      q: 'Does Boomline alert me before a certification expires?',
      a: 'Yes. Boomline sends alerts for certifications lapsing — the right alert, to the right person, at the right time.',
    },
    {
      q: 'Can Boomline track medical cards and training records too?',
      a: 'Yes. Medical cards, training records, and certifications are all tracked together.',
    },
    {
      q: 'Can Boomline track certifications for other equipment operators?',
      a: 'Yes. Certification tracking works for every equipment operator on your crew, not just crane operators. Any certification with an expiration date can be tracked on the employee’s record with alerts before it lapses.',
    },
    {
      q: 'Can Boomline track NCCCO certifications?',
      a: 'Yes. Any operator certification with an expiration date — including NCCCO cards — can be tracked on the employee’s record with alerts before it lapses.',
    },
    {
      q: 'Can owners see everything that’s about to expire?',
      a: 'Yes. The Command Center lists what’s coming due, including certifications and equipment.',
    },
    {
      q: 'Can I start with just certification tracking?',
      a: 'Yes. Start small or run the full platform — we flip features on as you grow.',
    },
  ],
  cta: {
    heading: 'Never get caught with an expired card.',
    body: 'Book a 15-minute demo. We’ll show you Boomline running on a real crane company’s data.',
  },
}

export default function CraneCertificationTracking() {
  return <SolutionPage content={content} />
}
