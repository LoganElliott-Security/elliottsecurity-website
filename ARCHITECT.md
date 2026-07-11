# ElliottSecurity Platform

Version: v0.3.0-beta.1

---

# Mission

ElliottSecurity Platform is a modern cybersecurity publishing platform built with Astro.

Its purpose is to document real-world cybersecurity engineering work through a professional, maintainable, Markdown-first website.

This is NOT a traditional portfolio.

It is a living knowledge platform that grows alongside the engineer.

---

# Core Philosophy

The website is NOT the product.

The content is the product.

The website is only the rendering engine.

Everything should be designed around making publishing as easy as possible.

The ideal publishing workflow is:

VS Code
↓
Markdown
↓
Git Commit
↓
GitHub
↓
Cloudflare Pages
↓
Website Automatically Updates

No manual deployment.

No manual page creation.

No duplicated content.

---

# Source of Truth

GitHub is the single source of truth.

All website content originates from Git.

Cloudflare Pages automatically deploys every successful push to the main branch.

---

# Tech Stack

Astro 7

TypeScript

Tailwind CSS

Astro Content Collections

Markdown

Cloudflare Pages

GitHub

GitHub Actions

---

# Architecture Goals

The project must prioritize:

Maintainability

Scalability

Performance

Accessibility

Reusable components

Minimal technical debt

Type safety

Documentation

Avoid shortcuts.

Avoid duplicated code.

Avoid hardcoded content whenever possible.

---

# Folder Structure

Use lowercase folder names only.

src/

assets/

components/

config/

content/

data/

layouts/

lib/

pages/

styles/

types/

Never create uppercase directories.

---

# Component Philosophy

Components should be:

Reusable

Stateless whenever possible

Small

Composable

Well documented

Avoid components that exist for only one page unless there is a compelling reason.

---

# Layout Philosophy

Pages should only describe structure.

Layouts should handle page framing.

Components should handle presentation.

Markdown should provide content.

---

# Content Philosophy

Everything possible should come from Markdown.

Never hardcode:

Projects

Threat Hunts

Research

Articles

Detection Rules

Homelab documentation

Products

These must all originate from Astro Content Collections.

---

# Planned Content Collections

Articles

Projects

Threat Hunts

Detection Engineering

Homelab

Products

Future collections may include:

Sigma Rules

YARA Rules

Malware Analysis

Incident Reports

Playbooks

---

# Homepage Philosophy

The homepage should be dynamic.

Latest Articles

Featured Projects

Current Focus

Latest Threat Hunts

Research

Everything should automatically populate from content collections.

Adding a Markdown file should update the homepage without modifying code.

---

# Design Philosophy

Professional.

Modern.

Dark theme.

Minimal.

Readable.

Performance first.

Accessibility first.

Avoid excessive animations.

Use whitespace intentionally.

---

# Responsive Design

Desktop first-class.

Tablet supported.

Mobile fully functional.

No layout should break below 320px width.

---

# Styling

Use Tailwind CSS.

Avoid inline styles.

Avoid duplicated utility combinations by extracting reusable components.

---

# TypeScript

Prefer explicit typing.

Avoid "any".

Prefer interfaces and type aliases where appropriate.

---

# Naming Conventions

Folders:

lowercase

Components:

PascalCase

Functions:

camelCase

Variables:

camelCase

Constants:

UPPER_SNAKE_CASE when appropriate

Markdown slugs:

kebab-case

---

# Git Workflow

main

Production

feature/*

Active development

Every commit should follow Conventional Commits.

Examples:

feat:

fix:

docs:

refactor:

style:

perf:

test:

chore:

---

# Deployment

Deployments occur automatically.

Git Push

↓

GitHub

↓

Cloudflare Pages

↓

Production

Never manually deploy unless debugging.

---

# Documentation

Every major feature should include documentation.

The docs folder should remain synchronized with the codebase.

---

# Performance Goals

Fast initial page load.

Excellent Lighthouse score.

Minimal JavaScript.

Static generation whenever possible.

Optimize images.

Avoid unnecessary client-side rendering.

---

# Accessibility Goals

Semantic HTML.

Keyboard navigation.

Proper heading hierarchy.

Color contrast compliance.

ARIA only when necessary.

---

# Long-Term Vision

This project should evolve into a complete cybersecurity knowledge platform.

Future sections include:

Threat Hunting

Detection Engineering

Homelab

Projects

Research

Articles

Products

Downloads

The website should eventually require very little maintenance.

The majority of future work should consist of publishing Markdown content rather than modifying Astro code.

---

# AI Development Guidelines

When making changes:

Read the existing architecture before modifying files.

Favor reusable solutions.

Avoid introducing technical debt.

Keep folder names lowercase.

Maintain TypeScript correctness.

Follow Astro best practices.

Prefer Markdown-driven content.

Do not hardcode information that belongs in a content collection.

When uncertain, prioritize maintainability over speed of implementation.

The goal is to build a platform that remains maintainable for many years.
