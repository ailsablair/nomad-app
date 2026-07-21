# Architecting & Automating Cloud Infrastructure for the Nomad Platform
### Ailsa Blair • hello@ailsablair.com

> Building a secure deployment pipeline, modern cloud infrastructure, and automated CI/CD for an AI-powered rental platform.

**Role:** Solutions Engineer & Product Designer

**Live Application:** https://apps.ailsablair.ca/nomad

**Repository:** https://github.com/ailsablair/nomad

**Tech Stack**

- TypeScript
- React
- Vite
- Node.js
- Google Gemini API
- GitHub Actions
- SSH
- SFTP
- Linux
- IONOS Hosting

---

# Executive Summary

The **Nomad Platform** is an AI-powered application that helps digital nomads discover unconventional long-term housing around the world using Google's Gemini API.

While development progressed smoothly in a local environment, deploying the application into production introduced an entirely different class of engineering challenges involving:

- Infrastructure provisioning
- Static asset compilation
- Subdirectory routing
- Secure deployment
- CI/CD automation
- SSH-based server orchestration

Rather than treating each issue as an isolated bug, I approached them as systems engineering problems—iteratively improving the architecture until deployment became fully automated, repeatable, and secure.

The result was a production workflow that reduced deployment time from approximately **15 minutes to under one minute**, eliminated manual releases, and established an enterprise-style deployment pipeline.

---

# Architecture

```
Developer
     │
     ▼
 Git Push (main)
     │
     ▼
GitHub Actions
     │
 SSH Authentication
     │
     ▼
IONOS Linux Server
     │
 git pull
 npm install
 npm run build
     │
     ▼
Production Build
```

---

# Phase 1 — Infrastructure & Secure Hosting

## Objective

Deploy the application to a dedicated production environment while ensuring all traffic remained encrypted.

### What I implemented

- Configured a dedicated application subdomain
- Mapped a clean document root within IONOS
- Provisioned SSL certificates
- Enforced HTTPS across the application

### Outcome

- Secure HTTPS deployment
- Elimination of browser security warnings
- Encrypted communication for all user traffic

---

# Phase 2 — Production Build Engineering

Modern React applications cannot be served directly from source code.

The application required compilation into optimized production assets before deployment.

## Challenges

### Build Path Resolution

Initial builds failed with:

```
ENOENT: Could not read package.json
```

I diagnosed the issue as an incorrect terminal working directory rather than a project configuration problem.

Once the workspace was corrected, compilation proceeded.

---

### Dependency Installation

The next blocker:

```
vite: command not found
```

Because cloned repositories exclude local dependencies, I initialized the project's dependency tree with:

```bash
npm install
```

This restored the complete build environment.

---

### Production Compilation

Executing

```bash
npm run build
```

generated an optimized `dist/` directory containing compressed HTML, CSS, and JavaScript assets ready for production deployment.

---

# Phase 3 — Static Deployment & Routing

Compiled assets were uploaded to the production server using SFTP.

Although deployment completed successfully, the application rendered only a blank page.

Developer tools revealed cascading 404 errors.

```
GET /assets/index.js
404 Not Found
```

## Root Cause

Vite was generating asset paths relative to the root domain:

```
/assets/
```

instead of the application's deployment directory:

```
/nomad-app/assets/
```

## Solution

Configured the Vite base path:

```ts
base: "/nomad-app/"
```

Rebuilding and redeploying resolved every routing error.

### Before

```
apps.ailsablair.ca/assets/index.js
                ❌ 404
```

### After

```
apps.ailsablair.ca/nomad-app/assets/index.js
                ✅ 200
```

---

# Phase 4 — CI/CD Automation

Manual builds and drag-and-drop uploads were replaced with GitHub Actions.

## Objectives

- Automatic deployment
- Secure credential management
- Zero manual releases

Repository secrets were securely stored using GitHub Secrets, allowing deployment credentials to remain outside the codebase.

---

## Repository Secret Debugging

Initial workflow executions failed with:

```
Input required and not supplied: server
```

The deployment workflow referenced secrets stored in a different repository.

Migrating the secrets into the active repository immediately restored successful credential injection.

---

# Phase 5 — Protocol Failures & Architectural Pivot

The next challenge emerged during automated deployments.

GitHub Actions consistently failed with:

```
Server sent FIN packet unexpectedly
```

## Investigation

The deployment action defaulted to traditional FTP.

IONOS rejected insecure FTP sessions, terminating the connection during protocol negotiation.

Attempts to transition existing deployment actions to SFTP exposed another limitation:

Most FTP deployment actions simply do not support native SFTP.

Rather than continuing to adapt tooling that fundamentally conflicted with the hosting environment, I redesigned the deployment architecture.

---

# SSH-Based Deployment Architecture

Instead of uploading thousands of compiled files from GitHub Actions, the workflow now performs secure remote execution.

GitHub authenticates via SSH and instructs the server to build the application locally.

```yaml
name: Deploy via SSH

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: appleboy/ssh-action@v1

        with:
          host: ${{ secrets.IONOS_HOST_IP }}
          username: ${{ secrets.IONOS_SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22

          script: |
            cd /subdomains/apps/nomad/
            git pull origin main
            npm install
            npm run build
```

This eliminated the need for FTP entirely.

---

# Resolving Server Synchronization

The first SSH deployments exposed another issue.

```
Untracked working tree files would be overwritten
```

The server contained legacy files from previous manual deployments.

To establish Git as the single source of truth, I performed a clean synchronization:

```bash
git fetch origin
git reset --hard origin/main
```

Once the server matched the repository exactly, deployments became deterministic and repeatable.

---

# Product Design

Alongside infrastructure engineering, I designed the user experience around the specific needs of digital nomads.

## Design Priorities

- Long-term housing discovery
- Flexible rental arrangements
- Workspace suitability
- International usability
- Multi-currency support
- Clear filtering for large datasets

The interface emphasizes fast decision-making while minimizing cognitive load across geographically diverse housing options.

---

# Results

| Metric | Before | After |
|---------|--------|-------|
| Deployment | Manual FTP | Automated SSH |
| Deployment Time | ~15 minutes | < 60 seconds |
| Release Process | Manual | Push-to-deploy |
| Security | FTP + HTTP | SSH + HTTPS |
| Build Consistency | Local | Server-side |
| Human Error | High | Minimal |

---

# Key Engineering Takeaways

This project demonstrates more than deploying a React application.

It demonstrates the ability to:

- Design production infrastructure
- Debug build systems
- Diagnose networking and protocol failures
- Implement secure authentication
- Build automated CI/CD pipelines
- Adapt architecture when existing tooling proves insufficient

Rather than forcing unreliable deployment tooling to fit the hosting environment, I redesigned the deployment model around SSH remote execution, resulting in a more secure, resilient, and maintainable production workflow.

---

# Skills Demonstrated

- Solutions Engineering
- Infrastructure Architecture
- DevOps
- CI/CD
- GitHub Actions
- SSH
- Linux Administration
- Production Debugging
- React
- TypeScript
- Vite
- Cloud Deployment
- Systems Thinking

---

## Next Steps for Nomad

### Task 1: Optimizing for Freshness Without Sacrificing Speed
When the client app attempts to scrape or query APIs for hundreds of live listings synchronously every time a user opens the page, the app will suffer from severe latency, browser freezes, and API rate-limit errors. 
__Solution__: To achieve instant load times paired with fresh listings, I'll implement a Stale-While-Revalidate (SWR) Caching Strategy combined with Lazy Loading.

### Task 2: Proactive Error Proofing for Task 1
When implementing background fetching and caching, several runtime errors commonly occur in production.

### Task 3: Integrating the High-Value "Weekly+" Sourcing Directory
To balance quantity (volume of available stays across Canada/North America) with quality (legitimate mid-term stays, transparent pricing, and unconventional architectures like tiny homes and stationary RVs), I'll selectively integrate 5 primary engines from my attached directory of 15 potential data sources for Nomad.

### Task 4: Proactive Error Proofing for Multi-Source Ingestion
Aggregating disparate APIs and scrapers (matching clean REST JSON from Coliving.com with regex-parsed strings from Kijiji)  inevitably introduces data corruption. To prevent app-breaking runtime errors, implement this __Defensive Normalization__ Schema:
- __Preventing "Undefined Property" Crashes:__ If a scraper fails to extract an image or coordinate, React components will crash if they attempt to read listing.location.lat on an undefined object. Ensure we always pass raw ingested payloads through a strict type-guard adapter before saving them to your state or database.
- __Neutralizing Duplicate Listings Across Platforms:__ Individual hosts frequently cross-post their tiny homes or RVs on both Airbnb, Furnished Finder, and Kijiji. To prevent users from seeing identical properties side-by-side, I'll Implement a deduplication filter in the backend ingestion script based on spatial proximity + title similarity. If two listings exist within 0.005 degrees of latitude/longitude (~500 meters) and share > 70% string similarity in their title, merge them into a single UI card that displays multiple booking platform links (e.g., "Book via Furnished Finder or RVshare").
