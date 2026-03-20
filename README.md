# 🔮 Astro Teller

A sophisticated Full-Stack AI application that provides personalized fortune-telling and destiny analysis by integrating **Zi Wei Dou Shu**, **Western Astrology**, and **MBTI Personality Type**.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Google Gemini 1.5 Flash](https://ai.google.dev/)
- **Version Control**: Git & GitHub

## ✨ Key Features

- **Comprehensive Data Ingestion**: Collects Gender, Date of Birth, Exact Time, and MBTI types to feed the AI reasoning engine.
- **Parent-Friendly UI**: High-contrast, large-font design specifically optimized for older users and mobile accessibility.
- **Defensive Engineering**: Robust frontend validation and structured JSON payloads to ensure API stability.
- **Secure Backend**: Implements Next.js API Routes to safeguard sensitive Gemini API keys via environment variables.

## 🛠️ Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/Howard624/astro-teller.git](https://github.com/Howard624/astro-teller.git)
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a file named `.env.local` in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---
*Developed with precision by [Howard624](https://github.com/Howard624)*