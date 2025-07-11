
# Interactive Star Map and Constellation Guide

A space-themed Next.js web application that allows users to explore a 3D star map, identify constellations, and learn about celestial objects based on their location and time. Built for the "Space and Beyond" hackathon theme.

## Features

- **Interactive 3D Star Map**: Explore stars and constellations in a browser-based 3D environment
- **Location-Based Viewing**: Uses browser geolocation to show stars visible from your location
- **AI-Generated Descriptions**: Learn about celestial objects with detailed descriptions
- **Search Functionality**: Find specific stars and constellations quickly
- **Observation History**: Track and review your stargazing sessions
- **Space-Themed UI**: Beautiful dark gradient backgrounds with neon accents
- **Mobile Responsive**: Works on both desktop and mobile devices
- **Optional AR View**: Toggle for AR functionality (placeholder for AR.js integration)

## Tech Stack

- **Frontend**: React with Next.js architecture
- **Styling**: Tailwind CSS with custom space theme
- **UI Components**: Shadcn/ui component library
- **Fonts**: Google Fonts (Orbitron)
- **Icons**: Lucide React
- **Data Storage**: LocalStorage (Supabase integration ready)
- **Visualization**: HTML5 Canvas for 2D star map

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd interactive-star-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/ui components
│   └── StarMapCanvas.tsx   # 3D star map visualization
├── data/
│   └── celestialData.js    # Hardcoded star and constellation data
├── pages/
│   ├── Index.tsx          # Home page
│   ├── StarMap.tsx        # Interactive star map page
│   ├── History.tsx        # Observation history page
│   └── NotFound.tsx       # 404 page
└── App.tsx                # Main app with routing
```

## Usage

### Home Page
- Welcome message with space-themed design
- Feature overview cards
- "Explore Stars" button to navigate to the star map

### Star Map Page
- **Location Detection**: Automatically detects your location for accurate star positioning
- **Interactive Canvas**: Click on stars to learn more about them
- **Search Bar**: Type star or constellation names to find them quickly
- **Object Details**: View detailed information about selected celestial objects
- **AR Toggle**: Switch to AR mode (placeholder functionality)

### History Page
- **Observation Log**: View all previously explored stars and constellations
- **Search & Filter**: Find specific observations by name or date
- **Detailed Records**: Each entry includes magnitude, distance, and description
- **Delete Options**: Remove individual entries or clear all history

## Features in Detail

### Geolocation
- Automatically requests browser location permission
- Uses coordinates to determine visible stars
- Fallback to default location if permission denied

### Star Data
Currently includes 20 major stars with:
- Right Ascension (RA) and Declination (Dec) coordinates
- Magnitude (brightness)
- Distance in light-years
- AI-generated 50-word descriptions

### Constellations
Basic constellation line data connecting major stars:
- Orion, Canis Major, Leo, Gemini
- Extensible structure for adding more constellations

### Space Theme Design
- **Colors**: 
  - Background: Dark gradient (#1A1A2E to #0F0F1F)
  - Accent: Neon blue (#00B7EB)
  - Secondary: Purple (#6B5B95)
  - Text: White (#FFFFFF)
- **Typography**: Orbitron font for space-age feel
- **Effects**: Glowing borders, hover animations, starry backgrounds

## Supabase Integration (Ready)

The app is structured to easily integrate with Supabase:

1. **Database Schema**:
   ```sql
   CREATE TABLE celestial_objects (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     magnitude FLOAT,
     distance FLOAT,
     ra FLOAT,
     dec FLOAT,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Environment Variables** (add to your deployment):
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Future Enhancements

- **AR.js Integration**: Full AR constellation overlay
- **Three.js 3D View**: True 3D star map with orbit controls
- **Real-time Star Positions**: API integration for accurate star positions
- **Weather Integration**: Cloud cover and visibility data
- **Social Features**: Share observations with other users
- **Advanced Filters**: Filter by star type, constellation, brightness
- **Offline Mode**: Cache star data for offline viewing

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Notes

- Optimized for 60fps canvas rendering
- Efficient star filtering and search algorithms
- Responsive design with mobile-first approach
- Lazy loading for better initial load times

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is built for hackathon purposes. Feel free to use and modify as needed.

## Acknowledgments

- Star data sourced from Hipparcos catalog
- Constellation information from IAU official designations
- Space theme inspired by NASA imagery and space exploration aesthetics

---

**Happy Stargazing!** 🌟✨🔭
