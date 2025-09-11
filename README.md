
# NexMov.AI - Your AI-Powered Career Co-Pilot

![Nexmov.AI Landing Page](https://i.imgur.com/uVzSJL1.png)

Welcome to the official repository for **Nexmov.AI**, a next-generation, AI-powered career navigation platform designed to guide users from their educational journey to the C-suite. This application provides personalized, data-driven roadmaps, skill-building advice, real-time market insights, and curated career news to help users make smarter career decisions.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Application Workflow](#application-workflow)
  - [Authentication Flow](#authentication-flow)
  - [AI Features Flow](#ai-features-flow)
- [Key Components & Libraries](#key-components--libraries)

---

## Project Overview

Nexmov.AI is a comprehensive web application built to address the uncertainties that students and professionals face in their career paths. By leveraging cutting-edge AI, the platform offers a suite of tools that provide actionable insights and clear, visual roadmaps for professional growth. Whether a user is a high school student exploring future options, a professional looking to switch careers, or a job seeker wanting to understand market trends, Nexmov.AI provides the tools they need to succeed.

---

## Key Features

- **Personalized Career Roadmap:** Generates a detailed, step-by-step career plan based on a user's profile, skills, and goals. It includes timelines, skill recommendations, and salary projections.
- **Skill Gap Analysis:** Compares a user's current skills against their desired career path, identifies gaps, and suggests curated learning resources to bridge them.
- **Job Market Trends Analysis:** Provides real-time insights into the job market, including trending roles, in-demand skills, salary ranges, and top hiring companies for a specific domain and location.
- **AI-Powered Chatbot (NexAI):** An interactive, always-on chatbot that answers complex career-related questions, providing informative and engaging responses.
- **User Authentication:** Secure signup and login functionality using Firebase Authentication, providing a personalized experience for each user.
- **Fully Responsive UI:** A modern, visually appealing, and intuitive user interface built with ShadCN UI and Tailwind CSS that works seamlessly across all devices.
- **Interactive Data Visualizations:** Utilizes Recharts to present complex data through dynamic and easy-to-understand charts and graphs.

---

## Technology Stack

The application is built with a modern, robust, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## Project Structure

The project follows a standard Next.js App Router structure, organized for clarity and scalability.

```
.
├── src/
│   ├── ai/                  # AI-related logic
│   │   ├── flows/           # Genkit flows for AI features
│   │   │   ├── analyze-job-market-trends.ts
│   │   │   ├── answer-user-queries-with-chatbot.ts
│   │   │   ├── generate-career-roadmap.ts
│   │   │   └── perform-skill-gap-analysis.ts
│   │   ├── dev.ts           # Genkit development server entry point
│   │   └── genkit.ts        # Genkit initialization and configuration
│   ├── app/                 # Next.js App Router directory
│   │   ├── (main)/          # Main application layout with authentication
│   │   │   ├── career-roadmap/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── job-market-trends/page.tsx
│   │   │   ├── skill-gap-analysis/page.tsx
│   │   │   ├── layout.tsx     # Main authenticated layout
│   │   │   └── loading.tsx    # Loading UI for main routes
│   │   ├── globals.css      # Global styles and Tailwind directives
│   │   ├── layout.tsx       # Root layout
│   │   ├── loading.tsx      # Root loading UI
│   │   ├── login/page.tsx   # Login page
│   │   ├── page.tsx         # Landing page
│   │   └── signup/page.tsx  # Signup page
│   ├── components/
│   │   ├── ui/              # ShadCN UI components
│   │   ├── chatbot.tsx      # AI Chatbot component
│   │   ├── header.tsx       # Main app header
│   │   ├── icons.tsx        # Custom icon components
│   │   ├── main-nav.tsx     # Main sidebar navigation
│   │   └── user-nav.tsx     # User dropdown menu
│   ├── hooks/
│   │   ├── use-mobile.tsx   # Hook to detect mobile devices
│   │   └── use-toast.ts     # Hook for showing toast notifications
│   └── lib/
│       ├── firebase.ts      # Firebase initialization and config
│       └── utils.ts         # Utility functions (e.g., cn for classnames)
├── .env                     # Environment variables
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nexmov-ai.git
    cd nexmov-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase configuration details. You can get these from your Firebase project settings.

    ```env
    # Firebase configuration from your project settings
    NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    # ... and other Firebase config variables
    
    # Gemini API Key for Genkit
    GEMINI_API_KEY="AIza..."
    ```

4.  **Run the development server:**
    This command starts both the Next.js frontend and the Genkit development server concurrently.
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Navigate to [http://localhost:9002](http://localhost:9002) in your browser to see the application.

---

## Application Workflow

### Authentication Flow

1.  **User Visits:** A new user lands on the homepage, where they can explore features or choose to sign up/log in.
2.  **Signup:** The user fills out a multi-step registration form. Upon successful submission, a new user account is created in Firebase Authentication.
3.  **Login:** An existing user enters their credentials, which are verified against Firebase Auth.
4.  **Session Management:** Upon successful login, the user is redirected to the main dashboard. Their authentication state is managed globally, providing access to protected routes.

### AI Features Flow

1.  **User Input:** The user navigates to a feature page (e.g., Career Roadmap) and fills out a form with their details.
2.  **API Call to Genkit Flow:** The frontend client calls a Server Action that invokes the corresponding Genkit flow (e.g., `generateCareerRoadmap`).
3.  **Genkit Processing:**
    - The flow receives the user's input.
    - A structured prompt is constructed using the input data.
    - Genkit sends the prompt to the Google Gemini LLM.
    - The model processes the prompt and returns a structured JSON object as defined by the Zod output schema.
4.  **Response to Frontend:** The structured JSON data is sent back to the client.
5.  **Data Visualization:** The frontend uses the received data to dynamically render charts, graphs, and other UI elements, presenting the insights to the user in a clear and interactive way.

---

## Key Components & Libraries

- **`src/app/(main)/layout.tsx`:** This file defines the main layout for the authenticated part of the app, including the persistent sidebar and header.
- **`src/ai/genkit.ts`:** Initializes the `ai` object and configures the Genkit plugins, setting the default LLM for the application.
- **`src/ai/flows/*.ts`:** Each file in this directory represents a self-contained AI agent. It defines the input/output schemas (using Zod), the prompt template, and the server-side logic for a specific AI feature.
- **`src/components/ui/`:** This directory contains all the reusable UI components from ShadCN, which form the building blocks of the application's design system.
- **`src/lib/firebase.ts`:** This is where the Firebase app is initialized. It's crucial for connecting the application to Firebase services like Authentication.
- **`recharts`:** This library is used across the feature pages to render the responsive and interactive charts that visualize AI-generated data.
