# Clipoforge AI - Changelog

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
