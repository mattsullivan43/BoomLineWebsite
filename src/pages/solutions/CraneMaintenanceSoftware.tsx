import SolutionPage, { type SolutionContent } from '../../components/SolutionPage'

// Targets "crane maintenance software" (+ crane fleet maintenance, crane work
// order software). Copy sticks to what Features already claims for Equipment &
// Maintenance. No OSHA references (site rule).
const content: SolutionContent = {
  eyebrow: 'Crane maintenance software',
  h1: 'Crane maintenance software that',
  h1Accent: 'Prevents Downtime.',
  intro: [
    'Boomline is crane maintenance software that tracks service intervals by hours, miles, or calendar days — and shows what’s overdue, what’s due soon, and what’s on track for every crane.',
    'Work orders, inspections, and the maintenance log all live on the crane’s record. Built with trusted field experts, for crane companies.',
  ],
  showcase: { pane: 'overview', subTab: 'maintenance' },
  features: {
    eyebrow: 'Maintenance',
    heading: 'Every crane, every interval, every work order.',
    intro: 'The shop, the office, and the owner see the same maintenance status — before a crane rolls out to a job.',
    items: [
      {
        title: 'Service intervals',
        body: 'Recurring service intervals by hours, miles, or calendar days. Whichever-comes-first logic.',
      },
      {
        title: 'Overdue, due soon, on track',
        body: 'The Maintenance Command Center sorts every crane by status, so you know what needs the shop next.',
      },
      {
        title: 'Work orders',
        body: 'Create field, shop, or maintenance work orders. Filter by priority and assign to techs or employees.',
      },
      {
        title: 'Full crane record',
        body: 'Full asset record per machine. Hours, miles, inspections, maintenance log, work order history.',
      },
      {
        title: 'Maintenance Risk',
        body: 'Overdue maintenance exposure. Inspection gaps. Where downtime is about to bite.',
      },
      {
        title: 'Inspections on the record',
        body: 'Daily and monthly inspections tracked in the field and converted to a PDF document.',
        tag: 'beta',
      },
      {
        title: 'Alerts',
        body: 'Inspections expiring, certs lapsing, jobs unassigned. The right alert, to the right person, at the right time.',
      },
      {
        title: 'Trucks and trailers too',
        body: 'Trucks, trailers, forklifts, and more — tracked alongside cranes. Same logic, same visibility.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    heading: 'How crane maintenance works in Boomline.',
    items: [
      {
        title: 'Set the intervals',
        body: 'Add service intervals for each crane by hours, miles, or calendar days.',
      },
      {
        title: 'See what’s due',
        body: 'The Maintenance Command Center shows what’s overdue, due soon, or on track.',
      },
      {
        title: 'Open a work order',
        body: 'Create a field, shop, or maintenance work order and assign it to a tech or employee.',
      },
      {
        title: 'Keep the history',
        body: 'The work lands on the crane’s record with its maintenance log and work order history.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Why switch',
    heading: 'A whiteboard in the shop doesn’t warn you before a crane is overdue.',
    intro: [
      'Most crane companies track maintenance on a shop whiteboard, a spreadsheet, or in a mechanic’s head. That works until a crane goes out overdue — or breaks down on a job.',
    ],
    columns: ['Shop whiteboard & spreadsheet', 'Boomline'],
    rows: [
      {
        label: 'Service intervals',
        before: 'Someone tracks hours by hand',
        after: 'Hours, miles, or calendar days',
      },
      {
        label: 'What’s due',
        before: 'Check the whiteboard',
        after: 'Overdue / Due soon / On track',
      },
      {
        label: 'Repairs',
        before: 'A phone call to the shop',
        after: 'Work order assigned to a tech',
      },
      {
        label: 'Crane history',
        before: 'Scattered across paper files',
        after: 'Maintenance log and work order history on the record',
      },
      {
        label: 'Downtime risk',
        before: 'Found when a crane breaks down',
        after: 'Maintenance Risk shows it ahead of time',
      },
    ],
  },
  related: {
    eyebrow: 'Beyond maintenance',
    heading: 'Connected to the rest of your operation.',
    items: [
      {
        title: 'Crane inspections',
        body: 'Daily and monthly inspections, tracked in the field and converted to a PDF document.',
        to: '/crane-inspection-software',
        tag: 'beta',
      },
      {
        title: 'Crane dispatch',
        body: 'One board for the day. Dispatch every employee and outside trucking partner at once.',
        to: '/crane-dispatch-software',
      },
      {
        title: 'Operator certifications',
        body: 'Medical cards, training records, and certifications. Alerts before anything expires.',
        to: '/crane-certification-tracking',
      },
      {
        title: 'Field tickets',
        body: 'Live digital job tickets with signatures, linked to the job for billing.',
        to: '/crane-field-ticket-software',
        tag: 'beta',
      },
    ],
  },
  faqs: [
    {
      q: 'What is crane maintenance software?',
      a: 'Crane maintenance software tracks service intervals, work orders, and maintenance history for each crane, and warns you before anything goes overdue. Boomline does this on each crane’s asset record.',
    },
    {
      q: 'Can Boomline track maintenance by hours, miles, or days?',
      a: 'Yes. Service intervals can be set by hours, miles, or calendar days, with whichever-comes-first logic.',
    },
    {
      q: 'Does Boomline handle work orders?',
      a: 'Yes. Create field, shop, or maintenance work orders, filter them by priority, and assign them to techs or employees.',
    },
    {
      q: 'Can I see which cranes are overdue?',
      a: 'Yes. The Maintenance Command Center shows every crane as overdue, due soon, or on track, and Maintenance Risk shows where downtime is about to bite.',
    },
    {
      q: 'Does it work for trucks and trailers too?',
      a: 'Yes. Trucks, trailers, forklifts, and other assets are tracked alongside cranes.',
    },
    {
      q: 'Can I start with just maintenance?',
      a: 'Yes. Start small or run the full platform — we flip features on as you grow.',
    },
  ],
  cta: {
    heading: 'Catch it in the shop, not on the job.',
    body: 'Book a platform walkthrough. We’ll show you Boomline running on a real crane company’s data.',
  },
}

export default function CraneMaintenanceSoftware() {
  return <SolutionPage content={content} />
}
