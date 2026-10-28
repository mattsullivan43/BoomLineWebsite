import SolutionPage, { type SolutionContent } from '../../components/SolutionPage'

// Targets "crane dispatch software" (+ crane scheduling software, crane
// dispatch board). Dispatch is a board, not drag-and-drop; one dispatch
// reaches employees AND outside trucking — keep copy to those facts.
const content: SolutionContent = {
  eyebrow: 'Crane dispatch software',
  h1: 'Crane dispatch software built for',
  h1Accent: 'Crane Companies.',
  intro: [
    'Boomline is crane dispatch software with one board for the whole day. See who’s available, assigned, or off across your crews, cranes, and job sites — then push the dispatch to every employee and outside trucking partner at once.',
    'Built with trusted field experts, for crane companies. Not bolted onto generic field-service tools.',
  ],
  showcase: true,
  features: {
    eyebrow: 'The dispatch board',
    heading: 'Everything crane dispatch needs, on one board.',
    intro: 'The board, the calendar, and the dispatch — in one place, built around how a crane company actually schedules work.',
    items: [
      {
        title: 'One board for the day',
        body: 'See crews, cranes, and job sites at a glance. Make scheduled adjustments with ease.',
      },
      {
        title: 'Dispatch everyone at once',
        body: 'Push the day’s dispatch to every employee and outside trucking partner with the click of a button. No phone tree, no group texts.',
      },
      {
        title: 'Outside trucking included',
        body: 'Track third-party trucking and outside employees alongside your own crews, so managed jobs don’t fall through the cracks.',
      },
      {
        title: 'Jobs calendar and list',
        body: 'Calendar and list views. Multi-day jobs, multi-crane jobs, job-site notes — all linked to a customer record.',
      },
      {
        title: 'Unscheduled jobs',
        body: 'The pipeline of work that isn’t on the calendar yet. Quote it, schedule it, lose nothing.',
      },
      {
        title: 'Time off on the board',
        body: 'Time off is requested, approved, and shown on the dispatch board, so you don’t double-book an operator who’s out.',
      },
      {
        title: 'Job-site details',
        body: 'Address, contact, lift specs, access notes. Everything the operator needs before showing up.',
      },
      {
        title: 'Quotes to jobs',
        body: 'Build quotes from rate tables, send the PDF to the customer, and convert it to a job when it’s won.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    heading: 'How crane dispatch and scheduling works in Boomline.',
    items: [
      {
        title: 'Get the job on the books',
        body: 'Quote it from your rate tables or add it to the calendar. Work that isn’t scheduled yet waits in Unscheduled Jobs.',
      },
      {
        title: 'Build the day on the board',
        body: 'See who’s available, assigned, or off. Put the right crane and crew on each job, with time off already showing.',
      },
      {
        title: 'Send the dispatch',
        body: 'Push it to every employee and outside trucking partner at once with the click of a button.',
      },
      {
        title: 'Run the day',
        body: 'Crews see their jobs from any device — phone, tablet, or desktop. When the schedule changes, adjust it on the board.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Why switch',
    heading: 'Whiteboards and generic software weren’t built for crane dispatch.',
    intro: [
      'Most crane companies dispatch from a whiteboard, a spreadsheet, and a lot of phone calls — or from field-service software built for plumbers and HVAC crews.',
      'Neither properly covers the complexity of scheduling a crane rental company: multi-crane jobs, lift specs, outside trucking, operator time off, and equipment that has to be ready before it rolls.',
    ],
    columns: ['Whiteboard & phone calls', 'Boomline'],
    rows: [
      {
        label: 'Who’s available',
        before: 'Ask around the yard',
        after: 'Available, assigned, or off — on one board',
      },
      {
        label: 'Sending the dispatch',
        before: 'Call or text each person',
        after: 'Every employee and outside trucking partner at once',
      },
      {
        label: 'Outside trucking',
        before: 'Separate calls to each company',
        after: 'Included in the same dispatch',
      },
      {
        label: 'Time off',
        before: 'Hope someone remembers',
        after: 'Shown on the dispatch board',
      },
      {
        label: 'Job-site details',
        before: 'Buried in texts and voicemails',
        after: 'Address, contact, lift specs, access notes on the job',
      },
      {
        label: 'Work not scheduled yet',
        before: 'Sticky notes and memory',
        after: 'Unscheduled Jobs pipeline',
      },
    ],
  },
  related: {
    eyebrow: 'Beyond dispatch',
    heading: 'Connected to the rest of your operation.',
    items: [
      {
        title: 'Crane maintenance',
        body: 'Maintenance intervals, work orders, and a full record for every crane.',
        to: '/crane-maintenance-software',
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
      {
        title: 'Crane inspections',
        body: 'Daily and monthly inspections, tracked in the field and converted to a PDF document.',
        to: '/crane-inspection-software',
        tag: 'beta',
      },
    ],
  },
  faqs: [
    {
      q: 'Is Boomline crane scheduling software too?',
      a: 'Yes. Boomline is crane scheduling and dispatch software in one. Schedule cranes, operators, and crews on the jobs calendar and the dispatch board, then send the dispatch to everyone at once.',
    },
    {
      q: 'What is crane dispatch software?',
      a: 'Crane dispatch software schedules cranes, operators, and crews to jobs and sends each person their assignments. Boomline does it from one board built for crane companies — including multi-crane jobs, job-site details, and outside trucking.',
    },
    {
      q: 'Can Boomline dispatch outside trucking companies?',
      a: 'Yes. One dispatch goes to every employee and outside trucking partner at once, and outside trucking is tracked alongside your own crews.',
    },
    {
      q: 'How does Boomline handle operator time off?',
      a: 'Employees request time off, managers approve it, and it shows on the dispatch board so you don’t double-book.',
    },
    {
      q: 'What devices does Boomline work on?',
      a: 'Boomline runs on iOS, Android (beta), and the web, so dispatchers and crews can use a phone, tablet, or desktop.',
    },
    {
      q: 'Can I start with just dispatch?',
      a: 'Yes. Start small or run the full platform — we flip features on as you grow.',
    },
    {
      q: 'Is Boomline built for crane rental companies specifically?',
      a: 'Yes. Boomline is built with trusted field experts, for crane companies — around how a crane operation actually runs, not adapted from generic field-service software.',
    },
  ],
  cta: {
    heading: 'See the dispatch board in action.',
    body: 'Book a platform walkthrough. We’ll show you Boomline running on a real crane company’s data.',
  },
}

export default function CraneDispatchSoftware() {
  return <SolutionPage content={content} />
}
