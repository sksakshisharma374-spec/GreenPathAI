# Road Corridor Visualization Application

A React-based web application using React Leaflet to visualize road corridors with animated polylines in Delhi.

## Features

### Feature 1: Base Map Setup ✓
- Interactive map centered on Delhi (28.6139, 77.2090)
- Zoom level set to 13
- OpenStreetMap TileLayer (no API key required)
- Clean map rendering without errors

### Feature 2: Road Polylines & Corridor Animation ✓
- Multiple road corridors with different statuses:
  - **Grey**: Normal roads
  - **Bright Green**: Active corridor
  - **Orange**: Sealed feeder (with dashed lines)
- **CSS Pulse Animation**: Active corridors have animated glow effect
- **Auto-zoom**: When `corridorActive = true`, map automatically fits bounds to show full route

### Additional Features ✓
- **Intersection Markers**: Markers at all intersection points with popup information
- **Toggle Button**: Beautiful toggle switch to activate/deactivate corridor animation
- **Corridor Selector**: Buttons to switch between different corridors
- **Color Legend**: Visual guide showing road status colors
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
src/
├── components/
│   ├── RoadCorridorMap.jsx          # Main map component
│   ├── RoadCorridorMap.css          # Map container & control panel styling
│   ├── CorridorPolylines.jsx        # Polyline rendering component
│   ├── PolylinesStyle.css           # Polyline animations & styling
│   ├── CorridorToggle.jsx           # Toggle button component
│   └── CorridorToggle.css           # Toggle button styling
├── data/
│   └── corridorData.js              # Sample road corridor data
├── App.jsx                          # Main app component
├── App.css                          # App-level styling
├── index.css                        # Global styles & Leaflet imports
└── main.jsx                         # Entry point
```

## Technical Stack

- **React 19.2.4**: UI framework with functional components and hooks
- **React Leaflet 4.x**: React wrapper for Leaflet maps
- **Leaflet**: Mapping library with OpenStreetMap tiles
- **Vite**: Fast build tool and development server
- **CSS**: Custom animations and responsive design

## Installation & Setup

### 1. Install Dependencies
All dependencies are already installed. To reinstall:

```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5174` (or another port if that's in use)

### 3. Build for Production
```bash
npm run build
```

## Component Architecture

### RoadCorridorMap Component
- **Responsibility**: Main container component managing map state and interactions
- **State Management**:
  - `corridorActive`: Boolean to toggle animation on/off
  - `activeCorridorIndex`: Index of currently selected corridor
- **Key Features**:
  - MapContainer setup with proper zoom and center
  - Custom hook (MapBoundsUpdater) for auto-zoom on corridor activation
  - Renders intersection markers
  - Integrates CorridorPolylines and CorridorToggle components

### CorridorPolylines Component
- **Responsibility**: Renders all polylines for road corridors
- **Props**:
  - `polylineRoutes`: Array of corridor routes
  - `corridorActive`: Animation state
  - `activeCorridorIndex`: Current active corridor
- **Features**:
  - Dynamic color based on road status
  - Animated class application for active routes
  - Popup information on click

### CorridorToggle Component
- **Responsibility**: Toggle button for corridor animation
- **Props**:
  - `corridorActive`: Current toggle state
  - `onToggle`: Callback for toggle action
- **Features**:
  - Smooth toggle animation
  - Status indicator when active

## Animation Details

### Polyline Animation
The active corridor polylines have a pulsing glow effect with 2-second duration:
- Pulse effect: Line width and opacity change smoothly
- Glow effect: Drop shadow increases and decreases for visual prominence
- Applied only to active corridor routes when animation is toggled on

### Toggle Animation
Smooth sliding toggle with color transition from grey (#ccc) to green (#4caf50).

## Sample Data

The application includes hardcoded sample data for Delhi:

### Intersections (7 total)
- Central Delhi (28.6139, 77.2090)
- North Delhi (28.6340, 77.1800)
- South Delhi (28.5935, 77.1700)
- East Delhi (28.6050, 77.2500)
- West Delhi (28.6200, 77.1950)
- Northeast Delhi (28.6450, 77.2200)
- Southeast Delhi (28.5820, 77.2300)

### Corridors (4 total)
1. **Main Corridor Route 1**: Normal status roads connecting north and northeast
2. **Active Corridor Route**: Green active status roads (default active when toggled)
3. **Sealed Feeder**: Orange sealed status roads with dashed line styling
4. **Mixed Status Route**: Combination of normal and sealed status roads

## Usage Guide

1. **View the Map**: The application loads with an interactive map of Delhi centered on Central Delhi
2. **Explore Corridors**: Click "Select Corridor" buttons in the right control panel to switch between different routes
3. **Toggle Animation**: Click the toggle button to activate/deactivate the corridor animation
   - When activated, the map automatically zooms to fit the selected corridor
   - Active routes glow and pulse every 2 seconds for visual emphasis
4. **View Details**: Click on any polyline to see corridor information in a popup
5. **View Intersections**: Click on any marker to see intersection names and details
6. **Use Legend**: Reference the color legend to understand road status codes

## Code Quality Standards

- ✓ **Modular Components**: Each component has a single responsibility
- ✓ **React Hooks**: Uses `useState`, `useEffect`, `useRef` for state management
- ✓ **Clean Code**: Well-commented code with descriptive variable names
- ✓ **CSS Organization**: Separate stylesheets per component with BEM-inspired naming
- ✓ **Responsive Design**: Mobile-first approach with media queries for 480px, 768px breakpoints
- ✓ **Error Handling**: Proper null checks and safe component rendering
- ✓ **Performance**: Uses functional components and optimized event handlers

## Browser Compatibility

- Chrome/Edge (latest) ✓
- Firefox (latest) ✓
- Safari (latest) ✓
- Mobile browsers (iOS Safari, Chrome Mobile) ✓

Requires ES6 support and CSS Grid/Flexbox support.

## Performance Optimizations

- CSS animations use `transform` and `filter` for GPU acceleration
- Auto-zoom uses `map.fitBounds()` with smooth animation
- Efficient polyline rendering with React Leaflet
- Event delegation for UI interactions
- Proper cleanup in useEffect hooks

## Customization Guide

### Adding More Corridors
Edit `src/data/corridorData.js`:

```javascript
export const intersections = {
  new_location: { lat: 28.xxx, lng: 77.xxx, name: "Location Name" }
};

export const roadCorridors = [
  {
    id: "corridor_5",
    name: "New Route",
    segments: [
      { from: "intersection_1", to: "intersection_2", status: "active" }
    ]
  }
];
```

### Changing Road Colors
Modify in `RoadCorridorMap.jsx` or `PolylinesStyle.css`:
- Normal roads: Change `#808080` (grey)
- Active corridors: Change `#00FF00` (bright green)
- Sealed feeders: Change `#FFA500` (orange)

### Adjusting Animations
Edit keyframes in `PolylinesStyle.css`:
- Modify `polyline-pulse` for pulsing effect duration/intensity
- Modify `polyline-glow` for glow effect strength
- Adjust animation timing (default: 2s)

### Changing Map Center/Zoom
Edit in `RoadCorridorMap.jsx`:
```javascript
const delhiCenter = [28.6139, 77.2090];  // Change lat/lng
const zoom = 13;  // Change zoom level
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Map not loading | Check internet connection (needs OpenStreetMap tiles), clear browser cache |
| Polylines not visible | Verify corridor data in `corridorData.js`, check zoom level captures area |
| Animation not working | Enable CSS animations in browser, check `corridorActive` state changes |
| Buttons unresponsive | Check browser console for errors, verify React is loaded |
| Markers not showing | Verify intersection data, check Leaflet CSS is imported in `index.css` |

## Development Workflow

```bash
# Start dev server with HMR
npm run dev

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm preview
```

## Performance Limits

The application is optimized for:
- Up to 50 polylines (road segments)
- Up to 100 intersection markers
- Desktop and tablet viewports

For larger datasets, consider:
- Marker clustering
- Polyline simplification
- Dynamic route loading
- Virtual scrolling

## Architecture Decisions

1. **Functional Components**: Modern React best practice, better performance
2. **Hooks over HOCs**: Simpler code, easier to understand and maintain
3. **Separate CSS Files**: Component-scoped styling, easier to modify
4. **Data-driven**: Road data in separate file, easy to swap for real data
5. **Responsive Grid**: Control panel adapts to screen size, map takes remaining space

## Future Enhancements

- Real-time traffic data integration
- Route optimization algorithm
- Custom polyline drawing tool
- GIS data import/export
- Multi-language support
- Dark mode theme
- Advanced filtering and search

## License

Open source - Free to use and modify for educational and commercial purposes.

## Resources

- [React Leaflet Docs](https://react-leaflet.js.org/)
- [Leaflet Docs](https://leafletjs.com/)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Created**: March 2026 | **Version**: 1.0.0 | **Status**: Complete & Tested
