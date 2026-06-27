# Premium Recruiter-Focused Software Engineering Portfolio

This is a modern, high-performance, recruiter-focused portfolio website for **S Manjunatha**, designed with an Apple/Linear-inspired aesthetic. Built with Next.js 15, React 19, Tailwind CSS, Framer Motion, GSAP, and Lenis Smooth Scroll.

## Features

- **Apple/Linear/Vercel Aesthetic**: A clean, minimal layout with premium spacing, gorgeous typography, and elegant subtle micro-animations.
- **Dynamic Dark/Light Mode**: Smooth transitions between themes, remembering user preferences using localStorage.
- **Secure GitHub Integration**: Server-side fetching of profile metrics (stars, followers, repo count) and live repositories using the GitHub API with local caching/revalidation to avoid rate limits.
- **Interactive Repositories Dashboard**: Full repository listing with real-time client-side search, filtering by languages, and sorting.
- **Fully Working Contact Form**: Integrated with Formspree for spam-protected, direct email delivery with live validation.
- **Certifications Gallery**: Dynamic lightbox/fullscreen slider showing IBM SkillsBuild achievements with custom hover animations.
- **Optimal SEO & Speed**: Fast page load times, custom meta tags, Open Graph card support, `sitemap.xml`, and `robots.txt`.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI & Logic**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP, Lenis Smooth Scroll
- **Icons**: Lucide Icons

---

## Getting Started

### 1. Prerequisites

Make sure you have Node.js (v18.17.0 or higher) and npm installed.

### 2. Setup Environment Variables

1. Copy `.env.example` to `.env.local` in the root directory:
   ```bash
   cp .env.example .env.local
   ```
2. Create a GitHub Personal Access Token:
   - Go to [GitHub Developer Settings](https://github.com/settings/tokens).
   - Generate a token (Classic or Fine-grained) with **`repo`** and **`read:user`** scopes.
   - Add it to your `.env.local` as `GITHUB_TOKEN=your_token`.
3. Create a Formspree Form:
   - Go to [Formspree](https://formspree.io/) and create an account.
   - Create a new project/form and copy the form ID from the integration endpoint (`https://formspree.io/f/your_form_id`).
   - Add it to your `.env.local` as `NEXT_PUBLIC_FORM_ID=your_form_id`.

### 3. Installation

Install dependencies:
```bash
npm install
```

### 4. Run Development Server

Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

To create an optimized production build:
```bash
npm run build
npm run start
```

---

## Adding Your Profile Picture & Resume

1. **Profile Photo**: Place your professional photo in `public/profile.jpg`.
2. **Resume PDF**: Place your resume in `public/resume.pdf` (it will be linked to the "Download Resume" button).

---

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. In the **Environment Variables** section, add:
   - `GITHUB_TOKEN` (your GitHub personal access token)
   - `NEXT_PUBLIC_FORM_ID` (your Formspree form ID)
5. Click **Deploy**. Vercel will automatically build and serve the application.
