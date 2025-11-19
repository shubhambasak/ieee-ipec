# IEEE Society @ IPEC - Website

A modern, responsive website for IEEE Society at IPEC built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### User-Facing Features
- **Home Page**: Hero section, chapters overview, quick links
- **Team Page**: Current team and alumni with detailed profiles
- **Events**: Upcoming and past events with search and filtering
- **Blog**: Articles, guides, and news posts
- **Member Registration**: Complete registration form for new IEEE members
- **Contact**: Contact form with honeypot protection and email fallback

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel for committee members
  - Event management (add, edit, delete)
  - Team member management
  - Announcement banner control
  - Gallery image management
  - JSON export/import for committee handovers
- **Authentication**: Password-protected admin access

### Technical Features
- **Glassmorphism UI**: Modern frosted glass effects
- **Dark Mode**: Smooth theme transitions
- **Image Optimization**: Lazy loading and optimized images
- **SEO**: Complete meta tags, Open Graph, structured data
- **Performance**: Preconnect, caching, optimized animations
- **Accessibility**: Keyboard navigation, focus rings, ARIA labels
- **Responsive Design**: Mobile-first, fluid typography

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### EmailJS Setup (for forms)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create email templates
4. Get your Public Key
5. Update `src/components/RegistrationForm.tsx` and `src/components/ContactFormEnhanced.tsx`:
   - `SERVICE_ID`
   - `TEMPLATE_ID`
   - `PUBLIC_KEY`

### Admin Access
Default admin password: `ieee-admin-2025`
**⚠️ Change this in production!** (Update in `src/lib/auth.ts`)

### Analytics
Uncomment and configure in `index.html`:
- Plausible Analytics
- Google Analytics 4

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/            # shadcn/ui components
│   ├── AdminPanel.tsx
│   ├── EventCard.tsx
│   ├── OptimizedImage.tsx
│   └── ...
├── pages/              # Page components
│   ├── admin/         # Admin pages
│   ├── Home.tsx
│   ├── Team.tsx
│   └── ...
├── lib/                # Utilities and data
│   ├── auth.ts        # Authentication
│   ├── events.ts      # Event data management
│   └── utils.ts
└── hooks/             # Custom React hooks
```

## 🎨 Design System

### Colors (IEEE Official)
- **Light Mode**: #00BDF2, #6DCFF6, #B9E5FA
- **Dark Mode**: #00629B, #477CA7, #809DBD

### Typography
- **Font**: Poppins
- **Responsive**: Fluid typography with clamp()

## 🔐 Admin Panel

Access the admin panel at `/admin/login`

**Features:**
- Add/Edit/Delete Events
- Manage Team Members
- Update Announcement Banner
- Upload Gallery Images
- Export/Import JSON for handovers

## 📝 Documentation

See `docs/` folder for detailed documentation:
- `WIKI.md` - Complete documentation
- `API.md` - API reference (if applicable)
- `DEPLOYMENT.md` - Deployment guide

## 🚀 Deployment

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Configure environment variables if needed
4. Update admin password in production
5. Set up EmailJS credentials
6. Configure analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

© 2025 IEEE Society @ IPEC. All rights reserved.

## 📞 Support

For issues or questions, contact the webmaster team.






## Contributing (Quick Start For IEEE-IPEC TECH TEAM)

1. Accept the collaborator invite.
2. Clone the repo:
  git clone git@github.com:shubhambasak/ieee-ipec.git
3. Create a branch:
  git checkout -b feature/<yourname>-short-desc
4. Make changes → Commit → Push:
  git push origin feature/<yourname>-short-desc
5. Open a Pull Request → Wait for review → Merge.
