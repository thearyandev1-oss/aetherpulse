# AetherPulse System Architecture

## 1. Edge AI Layer
- **TensorFlow.js / MediaPipe**: Processes live video feeds locally on traffic cameras.
- **Google Gemini Pro**: Analyzes complex traffic flow and provides heuristic wait-time optimizations.

## 2. Cloud Infrastructure (Google Cloud)
- **Firebase Functions**: Serverless routing and API aggregation.
- **Google Cloud Build / App Engine**: Continuous deployment and hosting via `app.yaml` and `cloudbuild.yaml`.
- **Firestore**: Real-time synchronization of traffic states.

## 3. Security & Quality
- **CI/CD**: GitHub Actions running Jest/Cypress for 100% coverage.
- **CodeQL & Snyk**: Continuous vulnerability scanning.
