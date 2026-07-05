---
name: outreach-writer
description: Writes hyper-personalized cold outreach for a specific person - emails, LinkedIn DMs, and Instagram/X DMs - plus multi-step follow-up sequences. Every message is grounded in real research signals about the individual and their company so it reads 1:1, not mass-blasted. Perfect for sales, business development, recruiting, and founder-led outreach.
---

# Outreach Writer

Turns a researched lead (a person + their company + context) into outreach that gets replies: short, specific, human, and built around a single relevant reason to reach out *now*. Handles email, LinkedIn, and social DMs, and lays out the whole follow-up sequence — not just the first touch.

Pairs naturally with the **lead-research-assistant** skill (which finds and qualifies the leads) and the **ai-sales-team** skill (which runs the whole pipeline). Use this skill when you already know *who* you're contacting and need the words.

## When to Use This Skill

- Writing a first cold email or DM to a specific decision-maker
- Turning a list of qualified leads into a ready-to-send outreach sequence
- Personalizing a template at scale without it reading like a template
- Writing follow-ups that add value instead of "just bumping this"
- Rewriting outreach that isn't getting replies

## Inputs It Needs

Give the skill as much of this as you have. The more real detail, the more personal (and effective) the output:

- **Who you are / your offer**: product or service, the outcome you create, proof (a metric, a recognizable customer, a case study)
- **The person**: name, role/title, company, and — critically — a *personalization hook*: something specific about them or the company (recent funding, a job posting, a product launch, a podcast they were on, a LinkedIn post, a tech-stack signal, hiring surge, a pain point their role owns)
- **The channel**: email, LinkedIn DM/connection note, Instagram/X DM (each has different length + tone rules)
- **The goal of the message**: book a call, get a reply, drive to a demo, start a conversation
- **Constraints**: tone (formal/casual), your name + signature, any compliance rules, links you want included

If a personalization hook is missing, ask for one or research it first — a hook is what separates this from spam. Never fabricate a specific fact about a person or company; if you don't have a real signal, use a role-based or industry-based angle and say so.

## Instructions

When asked to write outreach:

1. **Establish the one reason to reach out now.** Every good cold message has a single, specific trigger — a signal that makes contacting *this* person *today* make sense. Identify it first. If there isn't one, the angle is weaker and the message should be shorter and lower-commitment.

2. **Map the value to their world.** Translate your generic value proposition into the outcome *this person's role* cares about. A VP of Eng cares about velocity and on-call load; a CFO cares about cost and risk; a founder cares about growth and runway. Lead with their outcome, not your features.

3. **Pick the framework** (see `references/email-frameworks.md`) that fits the situation:
   - **PAS** (Problem → Agitate → Solve) when there's a clear pain
   - **BAB** (Before → After → Bridge) when you're selling a transformation
   - **AIDA** (Attention → Interest → Desire → Action) for a fuller pitch
   - **Question-led** when you want a low-friction reply
   - **Referral / mutual-context** when you share a connection or community

4. **Write to the channel's rules:**
   - **Email**: 50–125 words. One idea. A subject line under ~45 characters that isn't clickbait. A single, easy CTA (a question beats "book a 30-min call"). Plain text, no images, minimal links.
   - **LinkedIn connection note**: under 300 characters, no pitch — just the hook and a reason to connect.
   - **LinkedIn DM (after connecting)**: 2–4 sentences, conversational, one soft CTA.
   - **Instagram / X DM**: 1–3 sentences, casual, feels like a real person, zero corporate tone. Reference their content.

5. **Nail the mechanics that get replies:**
   - Open with *them*, not "I". The first line should be impossible to have sent to anyone else.
   - One CTA only. Make saying yes take two seconds ("Worth a quick look?" / "Open to a 15-min chat next week?").
   - Cut every sentence that doesn't earn its place. Shorter almost always wins.
   - Write like a human talking, not a brochure. No "I hope this email finds you well," no "I wanted to reach out," no buzzwords.
   - Match their formality. Founders/startups: casual. Enterprise/regulated: a notch more formal.

6. **Design the follow-up sequence** (see `references/templates.md`). A single email is not a campaign. Default cadence:
   - **Touch 1** — the personalized hook + value + soft CTA
   - **Touch 2** (Day 3–4) — a new angle or a proof point (case study, metric), not "just bumping"
   - **Touch 3** (Day 7–9) — a different value angle or a relevant resource
   - **Touch 4** (Day 14) — the polite break-up ("Should I close the loop?") — these often get the reply
   Each follow-up must add something new. Never guilt-trip.

7. **Produce variants.** Give 2 subject-line options and, when useful, a shorter and a longer version so the user can A/B test.

## Output Format

For each lead, output:

```markdown
## Outreach: [Person Name] — [Role] at [Company]

**Personalization hook used**: [the specific signal this is built on]
**Angle**: [the one reason to reach out now]
**Channel**: [Email / LinkedIn / IG DM]

### Subject line options
1. [under ~45 chars]
2. [alt]

### Touch 1 — [Channel] (Day 0)
[message body]

### Touch 2 — Follow-up (Day 3–4)
[message body]

### Touch 3 — Follow-up (Day 7–9)
[message body]

### Touch 4 — Break-up (Day 14)
[message body]

---
```

When writing for many leads at once, keep each block tight and offer to export the whole set to a CSV (columns: name, email, company, hook, subject, touch_1 … touch_4) for import into a CRM or sequencing tool (HubSpot, Instantly, Lemlist, Apollo, etc.).

## Anti-Patterns (never do these)

- Fabricating a specific compliment or fact ("loved your recent post on X") when there's no real post
- Generic openers: "I hope you're doing well", "I wanted to reach out", "My name is…"
- Multiple CTAs or a wall of links
- Pitching the whole product in the first message
- Follow-ups that only say "bumping this" or "did you see my last email?"
- Fake urgency or manufactured scarcity
- Making the message about you instead of them

## Next Steps It Offers

- Export the sequence to CSV for a sequencing tool
- Draft A/B variants of the subject line or first line
- Adjust tone (more casual / more formal) or shorten
- Loop back to **lead-research-assistant** to find more hooks for a lead
