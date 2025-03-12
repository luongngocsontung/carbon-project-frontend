# Carbon Project Frontend

A React-based web application for evaluating and managing carbon credit projects. This application allows users to submit carbon projects for evaluation and view their potential environmental and financial impact.

## Features

- 📝 Project Submission Form

  - Project name entry
  - Location selection (country dropdown)
  - Investment amount input
  - Project type selection (Reforestation/Renewable Energy)

- 📊 Project Evaluation

  - Instant calculation of potential carbon credits
  - Estimated Return on Investment (ROI)
  - Save evaluated projects

- 📋 Project Management

  - View all saved projects in a sortable table
  - Track carbon credits generated
  - Monitor investment performance

## Tech Stack

- React + TypeScript
- Vite (Build tool)
- TanStack Query (React Query) for API data management
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/luongngocsontung/carbon-project-frontend.git
cd carbon-project-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

- Copy the `.env.example` file to `.env`
- Update the environment variables as needed

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

The application interacts with the following endpoints:

- `POST /evaluate` - Submit project data for evaluation
- `POST /projects` - Save an evaluated project
- `GET /projects` - Retrieve all saved projects

## Project Structure

```
src/
├── api/           # API client and endpoints
├── components/    # React components
│   ├── ProjectSubmissionForm/
│   └── ProjectTable/
├── types/         # TypeScript type definitions
├── constants/     # Constant values and enums
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
