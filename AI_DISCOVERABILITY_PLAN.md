# Boomline AI Discoverability Plan

## The core problem with boomline.co right now

I already confirmed it: my fetch only got `<head>` metadata, no body content. That's the exact issue every AI crawler has with your site. GPTBot, ClaudeBot, PerplexityBot — they read raw HTML and don't execute JavaScript. Your React SPA serves an empty shell and builds the content client-side, so to every AI crawler, boomline.co looks like a blank page with a nice description.

Fix that one thing and you've solved 70% of the problem.

## The plan, ranked by impact

### 1. Make content visible in raw HTML (critical, blocking everything else)

You need server-side rendering or static prerendering. Options:

- Migrate the marketing site to Next.js (SSR/SSG out of the box) — best long-term move
- Or keep your current React build and add prerender.io / Cloudflare Workers prerender — middleware that serves bot user-agents a fully-rendered HTML snapshot
- Or split the marketing site off entirely: build it in Astro or just static HTML. Keep the app at app.boomline.co as the SPA. Marketing site doesn't need React.

For a marketing site this small, I'd go static HTML or Astro. Faster, cheaper, AI-crawler-perfect, and you stop wasting React on a landing page.

### 2. Add /llms.txt and /llms-full.txt

New emerging standard. A markdown file at boomline.co/llms.txt that gives LLMs a curated map of your site:

```markdown
# Boomline

> Crane and heavy equipment rental software. Dispatch, fleet, inspections, certifications, field operations.

## Product
- [Features](https://boomline.co/features): Job management, dispatch, maintenance, barcode integration, QuickBooks sync
- [Pricing](https://boomline.co/pricing): $30-45/crane/month, $300/month floor, $30K implementation

## Company
- [About](https://boomline.co/about): Founded by Matt Sullivan (software) and Jason O'Donnell (crane industry, O'Donnell Crane)
```

Takes 20 minutes. Real upside, no downside.

### 3. Schema.org structured data (JSON-LD)

Add `SoftwareApplication`, `Organization`, `Product`, and `FAQPage` schemas to your pages. This is the single clearest signal you can give an LLM about what you are. Wrap it in a `<script type="application/ld+json">` block in your `<head>`.

### 4. Verify nothing is blocking AI bots

Check `boomline.co/robots.txt`. If you're on Cloudflare, log in and check if AI bot blocking is on — Cloudflare changed defaults to block them, and many sites are invisible without realizing. You want GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot all allowed.

### 5. Content structure for extraction

LLMs cite the clearest, most-quotable passages. Rewrite key pages to:

- Lead each section with a direct, definitive answer in the first sentence
- Use real H2/H3 hierarchy (not divs styled like headings)
- Include concrete numbers — "$30/crane/month," "65 cranes managed," "10DLC compliant" — specifics get cited, marketing fluff gets skipped
- Add an FAQ section ("What is crane rental software?" "How is Boomline different from Point of Rental?" "How does Boomline handle inspections?") — FAQs are LLM-citation magnets

### 6. Build a comparison page

"Boomline vs Point of Rental" or "Boomline vs Texada." This is huge for AI search — when someone asks ChatGPT "what's the best crane rental software," it pulls from comparison pages. You don't have one. Your competitors don't either, judging from the ZipDo/BuildOps listicles. First-mover advantage here.

### 7. Submit to Bing Webmaster Tools

ChatGPT runs on Bing. Most people skip this. 15 minutes, real impact.

## What I'd do in what order

**This week:**

- Check robots.txt and Cloudflare for AI bot blocks
- Add llms.txt
- Add JSON-LD schema to homepage
- Submit sitemap to Bing

**Next 2 weeks:**

- Decide: rebuild marketing site as static/Astro, or add prerender middleware
- Write a real FAQ section
- Build the comparison page vs Point of Rental

---

**Next step options:** write the llms.txt, JSON-LD schemas, and FAQ copy based on current Boomline content, or pick one item from the list and go deep on it.
