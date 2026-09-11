# ◈ Deepscan

> **Software Supply Chain Security Analyzer**  
> *Built for KuruKshetra 2.0 — Cybersecurity & Blockchain*

Secure your software supply chain before attackers do. RepoSense analyzes your repositories, uncovers vulnerable and suspicious dependencies, detects typosquatting and dependency confusion risks, and delivers prioritized remediation.

---

## ⚡ Key Highlights & Features

- **Interactive Dependency Network Graph**: Dynamic canvas-based AST topology map with physics, animated signal pulses, and color-coded risk severity nodes (Green: Safe, Yellow: Warning, Red: Critical).
- **Vulnerability Detection**: Real-time correlation against NVD, OSV, and GitHub Security Advisory databases with CVSS impact ratings.
- **Typosquatting & Impersonation Defense**: Heuristic Levenshtein string distance modeling to spot deceptive naming conventions (e.g., `lod-ash` vs `lodash`).
- **Dependency Confusion Safeguards**: Proactively flags unreserved private internal namespaces exposed to public package registries.
- **Visual Security Showcase**: High-fidelity security matrix dashboard mockup featuring risk scoring (`72/100 HIGH RISK`), finding tabs, and remediation PR generators.
- **Simulated Quick Scan Experience**: Realistic in-browser cyber terminal demonstrating automated dependency manifest audits.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or serve it locally:

```bash
# Python 3
python -m http.server 3000

# Node.js
npx serve .
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 with SEO meta tags
- **Styling**: Vanilla CSS with custom glassmorphism design system, dark-mode cyber palette, and responsive breakpoints
- **Logic & Visuals**: Vanilla JavaScript with HTML5 Canvas 2D physics engine
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
