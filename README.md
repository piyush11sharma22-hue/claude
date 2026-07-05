# AI Sales Team — Claude Skills

A set of Claude Code skills that act like a small outbound sales team: they find and qualify leads that match your ideal customer profile, then write hyper-personalized emails and DMs (with follow-up sequences) for each individual — and package everything as a CRM-ready CSV.

Built for founders, sales, business development, recruiting, and marketing.

## The Skills

| Skill | What it does |
|-------|--------------|
| **`ai-sales-team`** | The orchestrator. Runs the whole pipeline end-to-end: offer → ICP → research → scoring → personalized outreach → CSV export. Start here for the full motion. |
| **`lead-research-assistant`** | Finds, qualifies, and scores target companies/people against your ideal customer profile, with real buying signals and the right decision-maker for each. |
| **`outreach-writer`** | Turns a researched lead into hyper-personalized emails, LinkedIn DMs, and Instagram/X DMs, plus multi-step follow-up sequences that get replies. |

They live under `.claude/skills/` and become available automatically when Claude Code runs in this repo (or when you copy a skill folder into your own project's `.claude/skills/`).

## Quick Start

Describe your offer and target, and let the AI sales team build the campaign:

```
My offer: I build custom AI automations for e-commerce brands — cut support
tickets 40%. Proof: did this for a DTC skincare brand doing $2M/yr.
Target: DTC e-commerce founders, US, 10–50 employees, using Shopify.
Channels: email + Instagram DM.
Volume: 15 leads.

Build me the campaign.
```

You'll get a scored lead list, a personalized sequence per lead, and a CSV ready to import into your CRM or sequencing tool.

### Just need one half?

- **Only leads?** Use `lead-research-assistant`: *"Find me 10 companies in [industry] that would be good leads for [product]."*
- **Only messages?** Use `outreach-writer`: *"Write a personalized cold email + follow-ups to [person] at [company], hook: [signal]."*

## What Makes the Outreach Personal

Every message is built on a **real signal** about the person or company — recent funding, a job posting, a product launch, a post they wrote, a tech-stack clue — never a fabricated compliment. The skills refuse to invent people, emails, or personal facts, and flag anything unverified before you send.

## Responsible Outreach

These skills **draft** campaigns; you review and send. They follow cold-outreach etiquette and remind you of the rules that apply to you (CAN-SPAM, GDPR/PECR, CASL): accurate sender info, a real reason for contact, easy opt-out, verified emails, and honoring unsubscribe/DNC requests. Quality over volume — a handful of genuinely personalized messages beats a mass blast.

## Repository Layout

```
.claude/skills/
├── ai-sales-team/
│   └── SKILL.md
├── lead-research-assistant/
│   └── SKILL.md
└── outreach-writer/
    ├── SKILL.md
    └── references/
        ├── email-frameworks.md   # PAS, BAB, AIDA, subject lines, reply checklist
        └── templates.md          # ready-to-fill email/DM sequences + CSV schema
```
