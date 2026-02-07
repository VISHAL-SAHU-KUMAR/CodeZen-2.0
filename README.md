# AgriPredict360

AgriPredict360 is an AI-powered agriculture platform empowering farmers with insights, disease detection, yield prediction, and market analysis.

## Project Structure

- `frontend/`: React + Next.js application
- `backend/`: Node.js + Express API
- `ai-service/`: Python FastAPI for ML models
- `mobile-app/`: React Native mobile application
- `database/`: Database configurations (MongoDB, Redis, Postgres)
- `docker/`: Docker configuration files
- `scripts/`: Utility scripts for data seeding, training, etc.
- `docs/`: Documentation files

## Getting Started

### Prerequisites

- Node.js
- Python 3.9+
- Docker & Docker Compose

### Running with Docker

1. Navigate to the `docker` directory:
   ```bash
   cd docker
   ```
2. Start the services:
   ```bash
   docker-compose up --build
   ```

The services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- AI Service: http://localhost:8000

## Documentation

See the `docs/` directory for detailed documentation:
- [API Documentation](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
