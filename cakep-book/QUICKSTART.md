# 🚀 Quick Start Guide

Get your manual book up and running in 5 minutes!

## ⚡ Fast Setup (Already Done!)

### Step 1: Dependencies ✅
```bash
npm install
```

### Step 2: Placeholder Images ✅
```bash
python generate_placeholders.py
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open: http://localhost:5173

## 🎯 What You'll See

1. **Home Page** with title and subtitle
2. **Interactive Flip Book** with 6 sample pages
3. **Navigation Buttons** (Previous / Next)
4. **Page Counter** showing current page
5. **Responsive Design** that works on all devices

## 📝 Replace Sample Images

### Quick Method:
1. Replace images in `public/manuals/`
2. Name them: `page1.png`, `page2.png`, etc.
3. Update line 22 in `src/components/Book.jsx`:
   ```javascript
   const TOTAL_PAGES = 10; // Your number of pages
   ```
4. Refresh browser

### Generate New Placeholders:
```bash
# Edit generate_placeholders.py line 64
create_placeholder_images(num_pages=10)

# Run
python generate_placeholders.py
```

## 🎨 Quick Customization

### Change Title (30 seconds)
**File:** `src/components/Home.jsx` (lines 19-22)
```javascript
<h1 className="main-title">🚗 My Car Manual</h1>
<p className="subtitle">Complete guide for your vehicle</p>
```

### Change Colors (1 minute)
**File:** `src/components/Book.css` (line 6)
```css
/* From: */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* To: */
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); /* Ocean */
background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); /* Sunset */
background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); /* Forest */
```

### Change Book Size (1 minute)
**File:** `src/components/Book.jsx` (lines 98-99)
```javascript
width={600}   // Change width
height={800}  // Change height
```

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy to Vercel (Easiest!)

**Option 1: GitHub + Vercel Dashboard**
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. Go to vercel.com/new
# 3. Import your repository
# 4. Click Deploy (Vercel auto-detects Vite!)
```

**Option 2: Vercel CLI**
```bash
# Install
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📱 Test Responsive

### Desktop
- Open http://localhost:5173
- Click on page corners to flip
- Use Previous/Next buttons

### Mobile
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select iPhone or Android
- Test touch gestures

## 🔧 Troubleshooting

### Images not loading?
```bash
# Check folder exists
ls public/manuals/

# Should show:
# page1.png, page2.png, page3.png, ...
```

### Dev server not starting?
```bash
# Kill any process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Try again
npm run dev
```

### Build fails?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Documentation

- **Full Guide:** See `README.md`
- **Customization:** See `CUSTOMIZATION.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Summary:** See `PROJECT_SUMMARY.md`

## 🎓 Learn More

### Code Structure
```
src/
├── components/
│   ├── Book.jsx      # Main flip book component
│   ├── Book.css      # Flip book styles
│   ├── Home.jsx      # Home page component
│   └── Home.css      # Home page styles
├── App.jsx           # Root component
└── main.jsx          # Entry point
```

### Key Files
- `Book.jsx` - All flip book logic
- `Book.css` - Visual styling
- `public/manuals/` - Your images go here

## ✅ Checklist

Before deploying to production:
- [ ] Replace placeholder images with real content
- [ ] Update title and branding
- [ ] Test on mobile devices
- [ ] Test all navigation buttons
- [ ] Optimize images (compress)
- [ ] Update README with your info
- [ ] Test build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Deploy to Vercel
- [ ] Test production URL
- [ ] Share with users! 🎉

## 💡 Pro Tips

1. **Optimize Images:**
   - Use https://tinypng.com/
   - Target: < 200KB per image
   - Format: PNG or WebP

2. **Performance:**
   - Keep total pages < 50 for best performance
   - Use consistent image sizes
   - Compress all images

3. **User Experience:**
   - Add loading states
   - Show progress indicator
   - Add tooltips to buttons

4. **SEO:**
   - Add meta descriptions
   - Use semantic HTML
   - Add alt text to images

## 🎉 You're Ready!

Your manual book is ready to deploy. Make it your own:
1. Add your content
2. Customize the design
3. Deploy to Vercel
4. Share with the world!

---

**Questions?** Check the documentation or create an issue!

**Happy building! 🚀**
