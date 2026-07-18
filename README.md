# vantispi.com

Company website for **Vantis Project Intelligence** — browser-based project controls
software (ScheduleInsight, Sketchdule) and expert consultancy.

Hand-crafted static site: no build step, no dependencies. The folder deploys as-is.

## Structure

    index.html          Home
    products.html       ScheduleInsight & Sketchdule deep dives
    consultancy.html    Services, engagement models, sectors
    about.html          Story, privacy architecture, principles
    contact.html        Contact form (opens a pre-filled email) + details
    assets/style.css    Design system (CSS custom properties at the top)
    assets/main.js      Nav toggle, scroll reveals, contact form
    assets/favicon.svg  Favicon
    sitemap.xml, robots.txt

## Editing

- Colours & fonts: edit the :root tokens at the top of assets/style.css.
- Contact email: currently contact@vantispi.com — search-and-replace across
  contact.html, index.html and assets/main.js if it changes.
- Footer "DATA DATE" is a brand wink — bump it when you make a meaningful revision.

## Hosting

Point Cloudflare Pages or Netlify at this repo (root folder, no build command),
then add the custom domain vantispi.com and follow the DNS records it shows you
in GoDaddy. GitHub Pages also works if the repo is made public.

## Later upgrades

- Swap the mailto contact form for Formspree/Basin (one attribute change).
- Add /insights/ articles for SEO.
- Ask scheduleinsight.co.uk and sketchdule.com to footer-link back here
  ("A Vantis Project Intelligence product") — the biggest early SEO win.
