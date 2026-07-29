# Box Packaging Website

A modern, responsive Next.js website showcasing custom box packaging services with an inquiry form.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Homepage
└── globals.css         # Global styles

components/
├── Header.tsx          # Navigation header with mega menu
├── Hero.tsx            # Hero section with animated boxes
├── Services.tsx        # Services showcase
├── InquiryForm.tsx     # Main inquiry form
└── Footer.tsx          # Footer

tailwind.config.ts      # Tailwind configuration
next.config.mjs         # Next.js configuration
```

## Key Features

### Header
- Responsive navigation with mega menu
- Contact information display
- Mobile hamburger menu
- CTA buttons (Get Quote)

### Hero Section
- Animated gradient background
- Large call-to-action
- Statistics display (500+ clients, 1000+ projects, 15+ years)
- Animated packaging boxes

### Services Section
- 6 service cards
- Icons and descriptions
- Hover animations
- Responsive grid layout

### Inquiry Form
- Comprehensive form fields
- Client-side validation
- Success/error messaging
- Auto-filled from website
- Submits to backend API

### Footer
- Company information
- Quick links
- Product links
- Contact information
- Copyright notice

## Styling

Uses Tailwind CSS v4 with custom color scheme:
- Primary: `#1F2937`
- Secondary: `#FDB022`
- Accent: `#0F766E`

## Animations

- Framer Motion for smooth animations
- Fade-in effects on scroll
- Hover transitions
- Animated box showcase

## API Integration

The inquiry form submits to:
```
POST https://packaging-backend.vercel.app/api/inquiries
```

Required fields:
- fullName
- email
- phone
- company
- industry
- boxType

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Mobile Responsive

- Mobile-first design
- Breakpoints: md (768px), lg (1024px)
- Touch-friendly buttons
- Responsive images

## Performance

- Image optimization
- CSS minification
- Code splitting
- Fast page loads

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

```bash
npm run build
# Deploy 'out' or '.next' folder
```

## Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#1F2937',
  secondary: '#FDB022',
  accent: '#0F766E',
}
```

### Content
Edit components or `app/page.tsx` to customize:
- Headlines
- Descriptions
- Services
- Form fields
- Contact information

### API Endpoint
Update in `components/InquiryForm.tsx`:
```typescript
const response = await axios.post('YOUR_API_URL/api/inquiries', formData)
```

## Troubleshooting

**Form not submitting?**
- Check backend API is running on port 5000
- Verify API URL in InquiryForm.tsx
- Check browser console for errors

**Styles not loading?**
- Run `npm install` to ensure all dependencies
- Clear `.next` folder and rebuild

**Images not showing?**
- Ensure image paths are correct
- Check public folder

## Testing

For testing the form locally:
1. Start backend: `cd ../backend && npm run dev`
2. Start website: `npm run dev`
3. Fill out the inquiry form
4. Check backend logs for submission

## Support

See main README.md for more information.
