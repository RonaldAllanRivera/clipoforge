# Clipoforge AI - Changelog


## [2025-06-08] Stripe Credits Purchase & Dashboard Update

- Implemented DRF API endpoint for Stripe Checkout sessions with dynamic credit packs
- Added Stripe webhook handler to auto-increment user credits after successful payment
- Modularized frontend dashboard: UserInfo, CreditsDisplay, CheckoutButton, LogoutButton
- Checkout button launches Stripe Checkout and redirects to dashboard on success
- Dashboard credits auto-refresh after payment
- Cleaned up legacy/classic payment endpoints for SaaS-standard Stripe workflow
- Secured purchase endpoints with JWT; all Stripe/API secrets moved to .env
- Updated .env-sample to document required Stripe and frontend URL keys

## [2025-06-08] User Info + Credits System on Dashboard

- Added 'credits' field to backend user model for SaaS usage tracking
- Exposed credits in Djoser user serializer and /auth/users/me/ endpoint
- Frontend dashboard now displays real user email and credits after login
- Modularized dashboard into UserInfo, CreditsDisplay, CheckoutButton, and LogoutButton components
- Fixed all legacy dj-rest-auth import errors after Djoser migration
- JWT context + instant logout for refresh-free SPA UX

## [2025-06-07] Djoser + Simple JWT & SaaS React Auth Migration

- Fully removed all django-allauth and dj-rest-auth packages and config
- Installed and configured Djoser and Simple JWT for API-only auth
- Implemented email-only user model and JWT login/registration
- Built AuthContext provider for instant login/logout UI (no refresh)
- Updated all frontend auth flows to use Djoser JWT endpoints
- Protected dashboard route, added instant redirects after login/logout
- Fixed all CORS/CSS issues for React + Vite + Tailwind workflow
- Refactored README to document new stack and SPA architecture


## [Unreleased]
- Project scaffold initialized
- .env, .gitignore, and changelog files created
- Directory structure for backend, frontend, workers, and docker added
