# 🟦 Clipoforge AI – Automated Micro-Content SaaS Platform

This project is a full-stack, AI-powered SaaS platform for automated micro-content generation from long-form video or audio.  
Clipoforge AI integrates modern web technologies, cloud deployment, and advanced AI/ML to deliver a scalable solution for creators, marketers, and agencies seeking to rapidly generate social-ready clips.

---

## Key Features

✅ **Multi-Source Video/Audio Upload**  
- Supports large file uploads via secure storage backends (Backblaze B2, Wasabi, S3).  
- Handles both video and audio content.  
- Built-in quota and credit-based processing.

✅ **AI-Powered Clip Generation**  
- Self-hosted Whisper.cpp for transcription (cost-optimized).  
- OpenAI GPT-3.5 Turbo for summarization, topic detection, clip highlights, and caption/title generation.  
- Automated detection of "viral moments" with NLP and heuristics.

✅ **Branded Output & Templates**  
- Fully dynamic SaaS branding (`SITE_NAME` variable and multi-tenant config).  
- Users can apply custom logo overlays, brand colors, CTA, and style templates.  
- Built-in subtitle and social thumbnail generation (FFmpeg + MoviePy).

✅ **SaaS Billing and Trial System**  
- Stripe integration for subscription, credit packs, and one-time purchases.  
- Robust free trial mode with automated abuse detection and incognito tracking.  
- Admin email alerts for suspicious activity and failed payment events.

✅ **User Management & Authentication**  
- Email-only login (username removed) via Djoser + Simple JWT (email-only, API-first).  
- Google OAuth quick login support.  
- Secure, GDPR-ready user and content management.

✅ **Personal Generation History**  
- Users can view all their generated content, filter, search, and paginate results.

✅ **SEO-Optimized & Conversion-Focused Frontend**  
- Fast, accessible homepage and dashboard (React.js + Tailwind CSS).  
- CTA-driven user journey from signup to content download.  
- Designed for high performance and scalability.

✅ **Deployment-Ready & Cost-Efficient**  
- Dockerized, portable to Fly.io, Railway, Render, or any VPS.  
- All AI/ML and task processing run on affordable, self-hosted infrastructure.  
- Optimized for sub-$20/month initial operations.

---

## Tech Stack Summary

| Layer      | Stack                        |
| ---------- | --------------------------- |
| Frontend   | React.js + Tailwind CSS     |
| Backend    | Python Django + DRF         |
| AI/ML      | Whisper.cpp, GPT-3.5 Turbo, FFmpeg, MoviePy |
| Auth       | Djoser + Simple JWT (email-only, API-first) |
| Database   | PostgreSQL (Supabase-ready) |
| Storage    | Backblaze B2 / Wasabi / S3  |
| Payments   | Stripe API + Webhooks       |
| Async Tasks| Django-Q (scalable to Celery)|
| Deployment | Docker, Fly.io, Railway, Hetzner |
| Email      | Mailgun/Postmark/SMTP (free tiers) |

---

## Project Highlights

- Fully production-grade, multi-tenant SaaS platform for AI-driven content creation.
- Scalable credit/trial/paywall logic for easy monetization and user management.
- High modularity—frontend and backend are fully decoupled for rapid iteration.
- Secure, cloud-native, and designed for global scale.

---

## Usage

1. Clone the repository.
2. Create and configure `.env` for all secret and API keys.
3. Install dependencies (Python, Node.js, Docker as needed).
4. Set up PostgreSQL (local or Supabase).
5. Run backend and frontend locally or via Docker Compose.
6. Register user/login via email or Google OAuth.
7. Upload source content, redeem credits, generate micro-content.
8. Download, review, or share social-ready clips.

---

## Future Extensions (Planned)

- Real-time video translation/dubbing (LLM + TTS models)
- Automated content publishing to social channels (YouTube Shorts, TikTok, IG Reels, etc.)
- Agency and white-label management console
- Advanced analytics and user insights dashboard

---

> ⚠ **This project is built as a senior-level SaaS/AI engineering demonstration for scalable, production-ready micro-content generation.  
> Designed to showcase advanced fullstack, DevOps, and AI/ML skills in a real-world SaaS context.**

---

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md) for continuous project updates and feature progress.

---



