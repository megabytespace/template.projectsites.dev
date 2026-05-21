# Prompt — FAQs from description

Generate FAQ items ready to drop into the `FAQ` section component. Output JSON conforming to the `FAQItem[]` shape.

## Why FAQs matter

`FAQPage` JSON-LD has the **highest AI-citation rate** across ChatGPT, Perplexity, and Google AI Overviews. Every page with substantive content needs FAQ.

## Use this when

- You have a `_brand.json` and need FAQ content
- You're populating `/faq` page (3 sections: general / billing / support)
- You're adding FAQs to a landing page

## The prompt

--- PROMPT START ---

You write FAQ blocks for marketing websites built on `projectsites-template@3.1.0`. Output JSON only.

## Input

A business description + optional list of "concerns" or "objections" the brief mentions.

## Output schema

```json
{
  "items": [
    { "question": "...", "answer": "..." }
  ]
}
```

Generate 6-10 FAQs by default. Generate more if the brief explicitly requests it.

## Question rules

- **Phrased as the user would type into Google** — not as marketing positioning
  - Good: `"How long does setup take?"`
  - Bad: `"What is your time-to-value commitment?"`
- **Cover the spectrum**: pricing, timing, security/safety, accessibility, eligibility, refunds/cancellation, support, geographic scope
- **Specific verbs**: "How", "What", "Can I", "Do you", "When"
- **No leading questions** that exist only to set up your sales pitch

## Answer rules

- **40-80 words HARD** — long enough to be a quotable answer in ChatGPT, short enough not to bloat the page
- **Self-contained** — readable without context. NO "as mentioned above" / "see the pricing page".
- **One concrete number per answer** where possible — adds AI-citation weight
- **Active voice**
- **No banned slop**: revolutionize / leverage / innovative / world-class / cutting-edge / seamless / robust
- **End with a CTA** when natural — "Email hello@business.com" / "Book a free consultation"

## Industry coverage maps

For each industry, hit these question topics minimum:

### SaaS / B2B software
- Pricing / free trial
- Cancellation / refund
- Data residency / GDPR / SOC 2
- Onboarding time
- Integration with X (Slack / GitHub / etc.)
- Migration from competitor
- Enterprise features (SSO / SLA / audit log)
- Self-hosted option

### Restaurant / café
- Reservations vs walk-in
- Hours
- Gluten-free / dairy-free / vegan options
- Catering / private events
- Custom cakes / orders
- Sourcing (flour, beans, ingredients)
- Parking
- Delivery / takeout

### Local service (plumber / electrician / etc.)
- Service area (cities / counties / zips)
- Hours / emergency availability
- License + insurance
- Warranty / guarantees
- Free estimates / pricing structure
- Same-day availability
- Payment methods
- New customer onboarding

### Medical / dental
- Insurance accepted
- New patient acceptance
- Hours
- Pediatric / adult / specialist
- Emergency policy
- Payment plans
- Languages spoken
- Telehealth availability

### Legal
- Free consultation availability
- Practice areas
- Fees (flat vs hourly)
- Timeline (typical case length)
- Geographic limits (state bar)
- Video consultations
- Documents needed for first meeting
- Out-of-state clients

### Nonprofit
- Tax-deductibility (EIN)
- How funds are used (% to program)
- Volunteering opportunities
- In-kind donation acceptance
- Hiring
- Annual report availability
- Recurring giving
- Corporate sponsorship

### Portfolio / agency
- Project cost / pricing structure
- Timeline
- Availability / current waitlist
- Geographic scope (remote / in-person)
- Industries served
- White-label / NDA
- Process / what's included
- Post-launch support

### Retail / DTC
- Shipping (domestic / international)
- Returns / exchanges
- Sizing
- Materials / sustainability
- Production location
- Wholesale availability
- Care instructions
- Gift cards / wrapping

## Worked example

Brief: `"Anchor Plumbing, licensed Alaska plumber #12345, serving Anchorage + Eagle River + Wasilla. Same-day service. 24/7 emergency. Free estimates within 25 miles."`

Output:

```json
{
  "items": [
    {
      "question": "What area do you serve?",
      "answer": "All of Anchorage, Eagle River, Chugiak, Wasilla, and Palmer. Free estimates within 25 miles of downtown Anchorage. Beyond 25 miles, a $50 trip fee applies — credited back if you hire us."
    },
    {
      "question": "Do you offer 24/7 emergency service?",
      "answer": "Yes. Call (907) 555-0100 any time — after-hours calls forward to our on-call plumber. Emergency dispatch within 60 minutes in Anchorage. Out-of-area emergencies dispatched the same day."
    },
    {
      "question": "Are you licensed and insured?",
      "answer": "Yes. Alaska plumbing license #12345 (active since 2003). $2M general liability insurance plus workers' compensation. License + insurance certificates available on request."
    },
    {
      "question": "Do you offer free estimates?",
      "answer": "Yes — within 25 miles of downtown Anchorage. Most estimates take 30-60 minutes. We give you a written quote on the spot. Estimates beyond 25 miles have a $50 trip fee, credited back if you hire us."
    },
    {
      "question": "How quickly can you come out?",
      "answer": "Same-day for non-emergency calls scheduled before noon. Emergency dispatch within 60 minutes in Anchorage during business hours, within 90 minutes after hours. Call (907) 555-0100 to schedule."
    },
    {
      "question": "What warranties do you offer?",
      "answer": "2-year warranty on all labor. Manufacturer warranty on parts (typically 1-10 years depending on the fixture). Warranty terms are written into your invoice — no fine print."
    },
    {
      "question": "What payment methods do you accept?",
      "answer": "Cash, check, all major credit cards (Visa, Mastercard, Amex, Discover), Apple Pay, Google Pay. Payment plans available for jobs over $1,500 through Wisetack — apply at the time of service."
    }
  ]
}
```

## Output strictly

Return ONLY the JSON object with the `items` array. No commentary. No markdown fences.

--- USER BRIEF BEGINS ---

[append the business description + any specific concerns / questions to cover here]

--- USER BRIEF ENDS ---

--- PROMPT END ---
