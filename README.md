# Fashion SME Supplier Finder - MVP

A mobile-first PWA designed for fashion/clothing SMEs to find suppliers using natural language search and smart filtering.

## Features

### 🔍 Natural Language Search
- Parse clothing requirements in plain English
- Extract key parameters: category, product, quantity, color, budget, MOQ, delivery time
- Example: *"I need 500 oversized black T-shirts, under RM12 each, MOQ below 100, delivered within 7 days"*

### 📊 Smart Filtering
- **Under RM5/unit** - Filter by unit price
- **MOQ <100** - Filter by minimum order quantity
- **Fast Delivery** - Prioritize suppliers with ≤7 days delivery
- **Within 30 km** - Filter by distance/location

### 🏭 Supplier Matching
Filters suppliers by:
- Product type (T-shirts, hoodies, formal wear, etc.)
- Available materials and colors
- MOQ requirements
- Unit pricing
- Delivery timeframe
- Location/distance
- Certifications (ISO 9001, HALAL, etc.)

### 📱 Mobile-First PWA
- Responsive design (mobile, tablet, desktop)
- Installable on home screen
- Offline support via Service Worker
- Fast loading and smooth interactions

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: PWA with Service Worker
- **Data**: Static JSON supplier database
- **Deployment**: GitHub Pages or any static host

## Project Structure

```
fashion-sme-supplier-finder/
├── index.html              # Main app shell
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── css/
│   └── styles.css         # Mobile-first responsive styles
├── js/
│   ├── app.js             # Main app logic
│   ├── parser.js          # Natural language parser
│   └── filter.js          # Supplier filtering engine
├── data/
│   └── suppliers.json     # Demo supplier database
└── README.md
```

## Demo Suppliers

1. **KL Apparel Hub (Demo)** - Kuala Lumpur, MOQ 50, RM4.50/unit
2. **Penang Garment Works (Demo)** - Penang, MOQ 100, RM6.80/unit
3. **Selangor Fashion Manufacturing (Demo)** - Selangor, MOQ 75, RM3.90/unit
4. **Johor Textile Supply (Demo)** - Johor Bahru, MOQ 200, RM2.10/unit
5. **Borneo Apparel Supply (Demo)** - Sarawak, MOQ 30, RM5.20/unit

Each supplier includes:
- Location & distance
- Rating & reviews
- Product types & materials
- Available colors & sizes
- Custom printing/embroidery options
- MOQ & unit pricing
- Production & delivery timeframes
- Certifications

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:8080
```

### Deployment

The app is a static site and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any static hosting provider

## Usage

1. **Enter Search Query**: Describe what clothing you need in natural language
   - Example: *"500 oversized black T-shirts, under RM12 each, MOQ below 100, within 7 days"*

2. **Apply Quick Filters**: Select any filters to narrow down results
   - Tap filter chips to toggle on/off
   - Results update in real-time

3. **Review Results**: Suppliers are ranked by relevance
   - Compare MOQ, price, delivery time, location
   - Check certifications and capabilities

4. **Contact Supplier**: Tap "Contact Supplier" to reach out
   - Save to shortlist for later comparison

## Future Enhancements

- [ ] Backend API integration for real supplier data
- [ ] User authentication & saved searches
- [ ] Shortlist management & comparison tools
- [ ] Supplier ratings & review system
- [ ] Direct messaging with suppliers
- [ ] Order tracking & management
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Native mobile apps (iOS/Android)

## License

MIT

---

**Built for fashion SMEs to find the right supplier, quickly and easily.**
