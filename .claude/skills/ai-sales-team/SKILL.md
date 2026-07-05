---
name: ai-sales-team
description: Your end-to-end AI sales team. Runs the full outbound pipeline in one go - understands your offer, finds and qualifies leads that match your ideal customer profile, scores them, then writes hyper-personalized emails and DMs plus follow-up sequences for each one, and exports everything as a CRM-ready CSV. Orchestrates the lead-research-assistant and outreach-writer skills.
---

# AI Sales Team

A single skill that acts like a small outbound sales team: a researcher who finds and qualifies leads, an SDR who writes the personalized outreach, and a coordinator who packages it all for your CRM. Give it your offer and a target, and it returns a ready-to-send campaign.

It orchestrates two focused skills:
- **lead-research-assistant** — finds, qualifies, and scores target companies/people
- **outreach-writer** — writes the personalized emails, DMs, and follow-up sequences

Use this skill when you want the whole thing done at once. Use the two sub-skills directly when you only need one half.

## When to Use This Skill

- "Find me leads and write the outreach" — the complete outbound motion
- Standing up a new outbound campaign for a product or service
- Turning a vague target ("agencies in the US using AI tools") into a ready CSV of scored leads with personalized messages
- Founder-led sales where you don't have an SDR team

## How to Use

Describe your offer and who you want to reach. Run it from your product's code
directory for automatic context, or spell out your ICP.

```
My offer: [what you sell + the outcome + one proof point]
Target: [industry / role / location / company size]
Channels: [email, LinkedIn, Instagram DM]
Volume: [how many leads]

Build me the campaign.
```

Example:
```
My offer: I build custom AI automations for e-commerce brands — cut support
tickets 40%. Proof: did this for a DTC skincare brand doing $2M/yr.
Target: DTC e-commerce founders, US, 10–50 employees, using Shopify.
Channels: email + Instagram DM.
Volume: 15 leads.

Build me the campaign.
```

## The Pipeline

Run these stages in order. Confirm the ICP with the user before spending effort
on research if anything is ambiguous.

### Stage 1 — Understand the Offer
- If in a code directory, analyze the codebase to understand the product.
- Pin down: what you sell, the concrete outcome, and one proof point (metric or
  recognizable customer). Ask for a proof point if none is given — it's what
  makes the outreach credible.

### Stage 2 — Define the Ideal Customer Profile (ICP)
Use the **lead-research-assistant** skill's ICP step: industry, size, location,
pain points, tech signals. Confirm with the user before proceeding.

### Stage 3 — Research & Qualify Leads
Use **lead-research-assistant** to find companies/people that match, gather real
signals (funding, hiring, launches, tech stack, posts), and identify the right
decision-maker for each. **Do not fabricate people, emails, or facts.** When a
detail isn't verifiable, mark it clearly as `[unverified — confirm before send]`.

### Stage 4 — Score & Prioritize
Assign each lead a fit score (1–10) with a one-line reason, using the research
skill's scoring criteria (ICP fit, signal of need, timing, budget indicators).
Sort high to low.

### Stage 5 — Write Personalized Outreach
For each lead, use the **outreach-writer** skill to produce:
- the personalization hook + angle,
- 2 subject-line options,
- a full sequence (Touch 1 → break-up) for each chosen channel.
Every message must be built on that lead's real signal — no two messages
identical.

### Stage 6 — Package & Export
Produce two things:
1. A **scannable summary** in the chat (see format below).
2. A **CRM-ready CSV** the user can import, using the schema in
   `outreach-writer/references/templates.md`.

## Output Format

```markdown
# Campaign: [Offer] → [Target]

## Summary
- Leads: [X]  |  High priority (8–10): [X]  |  Avg fit: [X]
- Channels: [email / LinkedIn / IG]
- Sequence length: [N touches over M days]

## Priority Leads

### 1. [Person] — [Role] @ [Company]  ·  Fit [X/10]
- **Why they fit**: [1–2 lines from real signals]
- **Hook**: [the specific signal the outreach is built on]
- **Contact**: [email / LinkedIn / IG]  ·  [decision-maker rationale]
- **Touch 1 subject**: [subject]
- **Touch 1**: [message body]
- (full sequence in the CSV)

[repeat, sorted by fit score]

## Deliverables
- [x] Scored lead list
- [x] Personalized sequence per lead
- [x] CSV ready for [CRM/sequencer]
```

Then write the CSV to a file and offer it to the user.

## Guardrails

- **Never invent contact details or personal facts.** Flag anything unverified.
- **Respect outreach law/etiquette.** Cold email is subject to rules like
  CAN-SPAM (US), GDPR/PECR (EU/UK), and CASL (Canada): use accurate sender info,
  a real reason for contact, and always include an easy opt-out on email. Remind
  the user to verify emails (e.g. with a verification tool) and honor
  unsubscribe/DNC requests. Don't scrape or contact where it isn't permitted.
- **Quality over volume.** 15 genuinely personalized messages beat 500 blasts.
- **Get consent before sending anything on the user's behalf** — this skill
  drafts the campaign; the user reviews and sends.

## Next Steps It Offers

- Draft A/B variants for the top leads
- Deepen research on the highest-fit accounts
- Adjust tone or shorten across the whole batch
- Regenerate the CSV mapped to a specific tool (HubSpot, Apollo, Instantly, …)
