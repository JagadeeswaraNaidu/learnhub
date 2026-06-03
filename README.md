# Next-Gen Learning Dashboard

A futuristic student learning dashboard built with Next.js, Supabase, Tailwind CSS, and Framer Motion.

## Live Demo

Vercel Deployment: [Vercel Deployment](https://learnhub-eight-fawn.vercel.app/)

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Supabase
* Lucide React

## Features

* Responsive Bento Grid Layout
* Collapsible Sidebar Navigation
* Dynamic Course Cards
* Animated Progress Indicators
* Activity Tracking Section
* Supabase Integration
* Server Component Data Fetching
* Skeleton Loading States
* Error Handling with Fallback Data
* Mobile Responsive Design

## Architecture

### Server Components

Course data is fetched on the server using Supabase and passed down to client components. This reduces client-side data fetching and improves performance.

### Client Components

Interactive elements such as:

* Data Tables
* Filters
* Search
* Animations
* Navigation

are implemented using client components.

## Supabase Integration

The dashboard retrieves course information from a Supabase PostgreSQL database.

### Courses Table

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| title      | text      |
| progress   | integer   |
| icon_name  | text      |
| created_at | timestamp |

## Loading Strategy

* loading.tsx
* Suspense Boundaries
* Skeleton Components

These provide a smooth loading experience while fetching data.

## Animation Strategy

Framer Motion is used for:

* Staggered entrance animations
* Hover interactions
* Progress animations
* Sidebar transitions

Spring-based animations were used to create a natural feel.

## Responsive Design

### Desktop

* Full sidebar
* Multi-column Bento grid

### Tablet

* Collapsed sidebar
* Two-column layout

### Mobile

* Single-column layout
* Mobile navigation

## Challenges Faced

### Supabase Integration

Handling database connectivity and implementing fallback mock data for graceful degradation.

### Animation Performance

Ensuring smooth animations without layout shifts by using transform and opacity-based transitions.

## Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
