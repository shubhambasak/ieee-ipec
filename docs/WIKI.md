# IEEE @ IPEC Website - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features Guide](#features-guide)
4. [Admin Panel Guide](#admin-panel-guide)
5. [Development Guide](#development-guide)
6. [Deployment Guide](#deployment-guide)
7. [Troubleshooting](#troubleshooting)

## Overview

This website is built with modern web technologies to provide a professional, accessible, and performant experience for IEEE Society @ IPEC members and visitors.

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **UI Components**: shadcn/ui (Radix UI)
- **Forms**: React Hook Form + Zod validation
- **Email**: EmailJS integration
- **Build Tool**: Vite
- **Package Manager**: npm

## Architecture

### Project Structure
```
ieee-main/
├── public/              # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── admin/      # Admin-specific components
│   │   └── ...         # Shared components
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin pages
│   │   └── ...         # Public pages
│   ├── lib/            # Utilities and helpers
│   ├── hooks/          # Custom React hooks
│   └── App.tsx         # Main app component
├── docs/               # Documentation
├── index.html          # HTML template
└── package.json        # Dependencies
```

### Data Flow
- **Events**: Managed in `src/lib/events.ts`, stored in localStorage (admin)
- **Team**: Managed in admin panel, stored in localStorage
- **Announcements**: Managed in admin panel, stored in localStorage
- **Forms**: Submit via EmailJS with mailto fallback

## Features Guide

### 1. Home Page
- Hero section with call-to-action
- About section
- Chapters overview
- Quick links
- Sponsor carousel

### 2. Events System
- **Upcoming Events**: Future events with registration
- **Past Events**: Historical events with galleries
- **Search & Filter**: Real-time search by title, description, tags
- **Categories**: Workshop, Talk, Competition, Networking, Exhibition
- **Status**: Upcoming or Past

### 3. Team Page
- Current team members
- Alumni toggle
- Click cards to view detailed profiles
- LinkedIn and email integration

### 4. Blog Section
- Category filtering
- Full article view
- Author and date information
- Tag system

### 5. Member Registration
- Complete registration form
- Academic information
- IEEE membership details
- EmailJS integration

### 6. Contact Page
- Enhanced contact form with honeypot
- Core team contact cards
- Email fallback

## Admin Panel Guide

### Access
1. Navigate to `/admin/login`
2. Enter admin password (default: `ieee-admin-2025`)
3. Access granted for 24 hours

### Features

#### Events Management
- **Add Event**: Fill form with all required fields
- **Delete Event**: Click trash icon on event card
- **Save**: Click "Save All Events" to persist changes

#### Team Management
- **Edit Members**: Modify existing team member information
- **Add Member**: Click "Add Team Member" button
- **Save**: Click "Save Team" to persist changes

#### Announcement Management
- **Update Message**: Edit announcement text
- **Change Type**: Info, Warning, or Success
- **Toggle Visibility**: Enable/disable announcement
- **Save**: Click "Save Announcement" to update

#### Gallery Management
- **Select Event**: Choose event from dropdown
- **Add Images**: Paste image URLs (one per line)
- **Update**: Click "Update Gallery" to save

#### Data Export/Import
- **Export**: Download all data as JSON file
- **Import**: Upload JSON file to restore data
- **Use Case**: Committee handovers, backups

### JSON Structure
```json
{
  "events": [...],
  "team": [...],
  "announcement": {...},
  "exportedAt": "2025-01-20T..."
}
```

## Development Guide

### Setup
```bash
npm install
npm run dev
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`
4. Add to sitemap.xml

### Adding New Components
1. Create in `src/components/`
2. Follow existing patterns
3. Use glassmorphism classes
4. Ensure accessibility

### Styling Guidelines
- Use Tailwind utility classes
- Apply glassmorphism effects: `glass-strong`, `glass-subtle`
- Use layer classes for depth: `layer-1` through `layer-4`
- Add focus rings: `focus-ring`
- Use card-interactive for hover effects

### Image Guidelines
- Use OptimizedImage component
- Set priority for above-the-fold images
- Use consistent cropping: `crop=faces` for portraits
- Provide alt text for accessibility

## Deployment Guide

### Pre-Deployment Checklist
- [ ] Update admin password
- [ ] Configure EmailJS credentials
- [ ] Set up analytics
- [ ] Update sitemap.xml with production URL
- [ ] Test all forms
- [ ] Verify all links
- [ ] Check mobile responsiveness
- [ ] Test dark mode
- [ ] Verify SEO meta tags

### Build
```bash
npm run build
```

### Deploy
Deploy the `dist/` folder to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Variables
If using environment variables, create `.env`:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Troubleshooting

### Common Issues

**Forms not sending emails**
- Check EmailJS configuration
- Verify service and template IDs
- Check browser console for errors

**Admin panel not accessible**
- Clear localStorage
- Check password in `src/lib/auth.ts`
- Verify route is `/admin/login`

**Images not loading**
- Check image URLs
- Verify CORS settings
- Check network tab in DevTools

**Dark mode not working**
- Check ThemeProvider configuration
- Verify suppressHydrationWarning on html
- Clear browser cache

### Performance Issues
- Enable lazy loading for images
- Use priority only for critical images
- Check bundle size with `npm run build`

## Security Notes

1. **Admin Password**: Change default password in production
2. **EmailJS Keys**: Keep API keys secure
3. **Honeypot**: Contact form includes honeypot protection
4. **Input Validation**: All forms have client-side validation
5. **XSS Protection**: React automatically escapes content

## Maintenance

### Regular Tasks
- Update events regularly
- Refresh team member information
- Update announcement banner
- Backup data (export JSON)
- Review and update blog posts

### Committee Handover
1. Export all data (JSON)
2. Share admin credentials securely
3. Update documentation
4. Transfer hosting access

## Support

For technical support or questions:
- Contact: webmaster@ieeeipec.org
- GitHub Issues: (if using version control)
- Documentation: Refer to this wiki

---

**Last Updated**: January 2025
**Version**: 1.0.0

