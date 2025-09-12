# Professional Business Website

![App Preview](https://imgix.cosmicjs.com/a6cc2d60-8fa5-11f0-8dcc-651091f6a7c0-photo-1461749280684-dccba630e2f6-1757660207780.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional business website built with Next.js 15 and powered by Cosmic. Showcase your services, team members, client testimonials, and case studies with a responsive design and seamless content management.

## Features

- 🏢 **Professional Services Showcase** - Dynamic service cards with pricing and features
- 👥 **Team Member Profiles** - Complete team pages with bios and skills
- 💬 **Client Testimonials** - Star-rated testimonials with photos
- 📊 **Case Study Portfolio** - Detailed project showcases
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **Fast Performance** - Optimized loading and image handling
- 🔍 **SEO Optimized** - Built-in search engine optimization
- ✨ **Modern UI/UX** - Clean design with smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68c3c3b377284889dcb2cb30&clone_repository=68c3c50e77284889dcb2cb53)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a company website with services, team members, testimonials, and case studies", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content model

### Installation

1. Install dependencies:
```bash
bun install
```

2. Set up your environment variables:
```bash
cp .env.example .env.local
```

3. Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Services
```typescript
import { cosmic } from '@/lib/cosmic'

export async function getServices() {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Service[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Team Members
```typescript
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as TeamMember[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

## Cosmic CMS Integration

This application is fully integrated with Cosmic for content management:

- **Services**: Manage service offerings, pricing, and features
- **Team Members**: Add/edit team profiles with photos and skills
- **Testimonials**: Display client feedback with ratings
- **Case Studies**: Showcase project details and results

All content can be updated through the Cosmic dashboard without touching code.

## Deployment Options

### Deploy to Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic SSL and global CDN

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set environment variables in Netlify dashboard

Remember to set your environment variables in your deployment platform's dashboard.

<!-- README_END -->