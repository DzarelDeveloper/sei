# SEI Application Screenshots

This page documents the interface and user journey of **SEI (Self Exploration
Intelligence)**, a client-side web prototype that helps Indonesian junior- and
senior-high-school students (SMP, SMA, SMK) recognise their interests and
understand their next education pathways.

All screenshots were captured from the running application (headless Chrome,
16:9 desktop viewport, 1280×720 at 2x; phone viewport 390×844 for the mobile
section). The demonstrations use synthetic answers only — no personal data —
and the male SEI character (navy jacket, white "S" hoodie, black backpack) is
used consistently wherever a mascot is shown.

Regenerate the whole set with `npm run docs:shots` (requires the dev server on
<http://localhost:5173>).

> SEI is a prototype. Results are produced by simple local scoring rules
> (Default mode) or by an AI model you connect yourself (AI mode) and are **not
> scientifically validated**. They are not a psychological test, a talent
> measurement, a diagnosis, or a formal education recommendation.

## Table of contents

- [A. Landing Page](#a-landing-page)
- [B. Assessment Flow](#b-assessment-flow)
- [C. Results and Recommendations](#c-results-and-recommendations)
- [D. Education Pathways](#d-education-pathways)
- [E. Responsive Interface](#e-responsive-interface)
- [Capture Notes](#capture-notes)

## A. Landing Page

Route: `/`

### A1. Hero Section

The landing page opens with the value proposition — "your future starts with
knowing yourself" — and the primary entry point into the exploration flow.

![SEI landing hero section](screenshots/landing/01-hero.png)

### A2. About SEI

The "Tentang" section explains what SEI is and why the app starts from
self-recognition rather than from school choices.

![SEI about section](screenshots/landing/02-about.png)

### A3. How It Works

The "Cara Kerja" section lays out the three steps: recognise, explore, try.

![SEI how it works section](screenshots/landing/03-how-it-works.png)

### A4. Assessment Preview

A preview of the assessment atmosphere — the question card together with the
mascot — so students (and parents) know what to expect before starting.

![SEI assessment preview section](screenshots/landing/04-assessment-preview.png)

### A5. Reflection Frame

A short reflection prompt shown before answering, framing the assessment as
exploration rather than a test with right or wrong answers.

![SEI reflection section](screenshots/landing/05-reflection.png)

### A6. For Whom

The "Untuk siapa" section describes the intended users: SMP, SMA, and SMK
students, plus parents and teachers guiding them.

![SEI for-whom section](screenshots/landing/06-for-whom.png)

### A7. Call to Action

The closing invitation band ("Mulai mengenal dirimu") with the primary
start button.

![SEI call-to-action band](screenshots/landing/07-call-to-action.png)

### A8. Footer

The footer repeats the prototype disclaimer and lists the main app sections.

![SEI landing footer](screenshots/landing/08-footer.png)

## B. Assessment Flow

Routes: `/mulai`, `/mulai/sekolah`, `/asesmen/pengantar`,
`/asesmen/kecenderungan`, `/asesmen`, `/asesmen/selesai`

### B1. Education-Level Selection

The first step asks for the current education level (SMP or SMA/SMK). Each
level has its own question bank and results page.

![Education level selection](screenshots/assessment/01-level-selection.png)

### B2. SMA/SMK Track Selection

For the SMA/SMK level, students then pick their current track (SMA or SMK);
the questions are adapted to that track.

![SMA/SMK track selection](screenshots/assessment/02-track-selection.png)

### B3. Assessment Introduction

The "pengantar" screen explains how the assessment works, how long it takes,
and how answers are stored, before the first question.

![Assessment introduction page](screenshots/assessment/03-introduction.png)

### B4. AI-Mode Reflection Essays

Exclusive to AI mode: five open-ended reflection questions (plans, studies,
activities, confusion, goals). Their answers are later used by the model to
compose personalised questions.

![AI-mode reflection essay questions](screenshots/assessment/04-ai-reflection-essay.png)

### B5. Single-Choice Question

The most common question type in the default bank: one answer from a list of
options.

![Single-choice assessment question](screenshots/assessment/05-question-single-choice.png)

### B6. Multi-Select Question

Questions that allow several answers, with an explicit selection cap
("Pilih maksimal N").

![Multi-select assessment question with maximum selection](screenshots/assessment/06-question-multi-select.png)

### B7. Self-Assessment Scale

A 1–5 self-rating question — the default bank's only scale item.

![Scale self-assessment question](screenshots/assessment/07-question-scale.png)

### B8. AI-Generated Question (Linear Type)

The AI flow uses its own generated question set, which mixes single-choice,
multi-select and the linear side-choice type shown here — a type the default
bank does not contain. (Question texts vary per run because the model composes
them.)

![AI-generated linear question](screenshots/assessment/08-ai-question-linear.png)

### B9. Completion Transition

After the last question, a short confirmation screen with the mascot appears
before automatically continuing to the results page.

![Assessment completion transition](screenshots/assessment/09-completion.png)

## C. Results and Recommendations

Routes: `/hasil` (SMP, default mode), `/hasil/sma-smk` (SMA/SMK, default
mode), `/hasil/ai` (AI mode)

### C1. Results Summary (SMP, Default Mode)

The results hero summarises the patterns found in the answers, with metadata
pills (level, answered count, date). The example profile is synthetic.

![SMP results summary](screenshots/results/01-summary.png)

### C2. Interest Signals

The "Ringkasan pola minat" section shows which answer patterns produced the
strongest interest signals.

![Interest signals section](screenshots/results/02-interest-signals.png)

### C3. Field Recommendations

The primary recommended fields, each with why it appeared, supporting answers,
example pathways, and a next step.

![Primary field recommendation cards](screenshots/results/03-field-recommendations.png)

### C4. Alternative Fields

Lower-ranked fields that still showed signals, presented as alternatives worth
comparing.

![Alternative field cards](screenshots/results/04-alternative-fields.png)

### C5. Pathway Note

Guidance on education pathways (SMA vs SMK) derived from the same answers,
linking into the pathway pages.

![Education pathway note](screenshots/results/05-pathway-note.png)

### C6. Next Exploration Steps

Fields and prompts the student has not answered yet — framed as things still
worth exploring rather than gaps.

![Still-to-explore section](screenshots/results/06-next-exploration.png)

### C7. SMA/SMK Results Summary

For students already in SMA/SMK the results page is adapted: the summary
acknowledges the current track and focuses on what comes after graduation.

![SMA/SMK results summary](screenshots/results/07-sma-smk-summary.png)

### C8. Study-or-Work Direction

The SMA/SMK results rank three scenarios — study first, work/practice first,
or both — based on the student's answers.

![Study or work direction section](screenshots/results/08-sma-smk-direction.png)

### C9. AI-Mode Results Summary

AI mode produces a deliberately **more concise** read-out: a three-card page
instead of the default seven-section layout. The hero states the direction the
model (or the local fallback) read from the choices.

![AI-mode results summary](screenshots/results/09-ai-summary.png)

### C10. AI-Mode Choice Recap

Card 1: the student's own stated plan plus the specific choices that most
determined the recommendation.

![AI-mode summary of choices](screenshots/results/10-ai-choices.png)

### C11. AI-Mode Recommendation

Card 2: nearest school step and post-school direction, plus one field with
example study programmes, campuses, and job positions.

![AI-mode recommendation card](screenshots/results/11-ai-recommendation.png)

### C12. AI-Mode Preparation Steps

Card 3: three concrete things to prepare, a note about discussing the plan with
parents, and a "changed mind" callout.

![AI-mode preparation steps](screenshots/results/12-ai-preparation.png)

## D. Education Pathways

Routes: `/jalur`, `/jalur/bandingkan`, `/jelajah/bidang/:fieldId`

### D1. Pathway Information (SMA Tab)

General information about the SMA pathway: learning experience, example
activities, skills, next steps, considerations, and questions to ask schools.

![Education pathway information page](screenshots/pathways/01-pathway-info.png)

### D2. Pathway Information (SMK Tab)

The same page with the SMK tab selected, showing the vocational perspective.

![Education pathway page with SMK tab](screenshots/pathways/02-pathway-smk-tab.png)

### D3. SMA vs SMK Comparison

A side-by-side comparison of the two pathways across several dimensions,
helping students weigh fit rather than prestige.

![SMA and SMK comparison table](screenshots/pathways/03-pathway-comparison.png)

### D4. Field Exploration

A per-field page (reached from the AI results recommendation card) listing
example study programmes with real campuses and related job positions.

![Field exploration page](screenshots/pathways/04-field-exploration.png)

## E. Responsive Interface

Captured at a 390×844 phone viewport (shown centred on the standard 16:9
canvas). The layout collapses to a single column with a hamburger menu and
keeps all flows usable.

### E1. Landing Page on Mobile

![Landing hero on mobile viewport](screenshots/mobile/01-landing-hero.png)

### E2. Assessment Question on Mobile

![Assessment question on mobile viewport](screenshots/mobile/02-assessment-question.png)

## Capture Notes

- All images are real browser captures of the running application, not
  mockups; automated checks in the capture script assert that key components
  (mascot, question controls, result sections) are present.
- The demo profile uses the **boy character** consistently (`sei.character.v1`
  set to `boy` before capture); pages that do not display a character are
  captured as-is.
- Answer sets are synthetic and deliberately partial so that "alternative" and
  "still to explore" sections contain real content.
- AI-mode captures run **without a live API call**: the AI question set is
  seeded from the app's own prototype bank, and the AI results page renders its
  documented local fallback — the same layout the connected model uses. AI mode
  only performs real provider calls when the user supplies their own key in
  `/pengaturan`.
- The completion screen is transient (~1.75 s before auto-redirect) and is
  captured directly at its route.
- Mobile coverage is representative (two screens), not exhaustive.
