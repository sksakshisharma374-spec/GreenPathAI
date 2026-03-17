import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  generatePolylineRoutes,
  intersections,
  roadCorridors,
} from "../data/corridorData";
import CorridorPolylines from "./CorridorPolylines";
import CorridorToggle from "./CorridorToggle";
import "./RoadCorridorMap.css";

/**
 * Custom hook to auto-fit map bounds when active corridor changes
 */
const MapBoundsUpdater = ({ corridorActive, activeCorridorIndex }) => {
  const map = useMap();
  const polylineRoutes = generatePolylineRoutes();

  useEffect(() => {
    if (corridorActive && activeCorridorIndex !== null) {
      const activeCorridor = polylineRoutes[activeCorridorIndex];

      // Collect all coordinates from all segments of the active corridor
      const allCoordinates = [];
      activeCorridor.routes.forEach(route => {
        route.coordinates.forEach(coord => {
          allCoordinates.push(coord);
        });
      });

      // Fit bounds with some padding
      if (allCoordinates.length > 0) {
        const bounds = L.latLngBounds(allCoordinates);
        map.fitBounds(bounds, { padding: [50, 50], animate: true });
      }
    }
  }, [corridorActive, activeCorridorIndex, map, polylineRoutes]);

  return null;
};

/**
 * RoadCorridorMap Component
 * Main component for visualizing road corridors with animated polylines
 *
 * Features:
 * - Base map centered on Delhi
 * - Multiple road corridors with different statuses (normal, active, sealed)
 * - Animated polylines for active corridors
 * - Intersection markers
 * - Auto zoom functionality
 * - Toggle button to activate/deactivate corridor animation
 */
const RoadCorridorMap = () => {
  // State management
  const [corridorActive, setCorridorActive] = useState(false);
  const [activeCorridorIndex, setActiveCorridorIndex] = useState(1); // Index of the active corridor (corridor_2)
  const mapRef = useRef(null);

  // Delhi center coordinates
  const delhiCenter = [28.6139, 77.2090];
  const zoom = 13;

  // Get polyline routes from corridor data
  const polylineRoutes = generatePolylineRoutes();

  /**
   * Handle toggle event from CorridorToggle component
   */
  const handleToggleCorridor = () => {
    setCorridorActive(!corridorActive);
  };

  /**
   * Handle corridor selection
   */
  const handleSelectCorridor = (index) => {
    setActiveCorridorIndex(index);
  };

  return (
    <div className="road-corridor-container">
      <h1>Road Corridor Visualization</h1>

      {/* Map container */}
      <MapContainer
        center={delhiCenter}
        zoom={zoom}
        className="map-container"
        ref={mapRef}
      >
        {/* OpenStreetMap TileLayer - no API key required */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Map bounds updater for auto-zoom */}
        <MapBoundsUpdater
          corridorActive={corridorActive}
          activeCorridorIndex={activeCorridorIndex}
        />

        {/* Render all intersection markers */}
        {Object.entries(intersections).map(([key, intersection]) => (
          <Marker key={key} position={[intersection.lat, intersection.lng]}>
            <Popup>{intersection.name}</Popup>
          </Marker>
        ))}

        {/* Render corridor polylines */}
        <CorridorPolylines
          polylineRoutes={polylineRoutes}
          corridorActive={corridorActive}
          activeCorridorIndex={activeCorridorIndex}
        />
      </MapContainer>

      {/* Control panel */}
      <div className="control-panel">
        <CorridorToggle
          corridorActive={corridorActive}
          onToggle={handleToggleCorridor}
        />

        <div className="legend">
          <h3>Corridor Legend</h3>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#808080" }}></div>
            <span>Normal Road</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#00FF00" }}
            ></div>
            <span>Active Corridor</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#FFA500" }}
            ></div>
            <span>Sealed Feeder</span>
          </div>
        </div>

        {/* Corridor selector */}
        <div className="corridor-selector">
          <h3>Select Corridor</h3>
          {polylineRoutes.map((corridor, index) => (
            <button
              key={corridor.id}
              className={`selector-btn ${
                activeCorridorIndex === index ? "active" : ""
              }`}
              onClick={() => handleSelectCorridor(index)}
            >
              {corridor.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadCorridorMap;
