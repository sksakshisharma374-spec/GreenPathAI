import React from "react";
import "./CorridorToggle.css";

/**
 * CorridorToggle Component
 * Toggle button to activate/deactivate corridor animation
 *
 * Props:
 * - corridorActive: Boolean indicating current state
 * - onToggle: Callback function when toggle is clicked
 */
const CorridorToggle = ({ corridorActive, onToggle }) => {
  return (
    <div className="toggle-container">
      <label htmlFor="corridor-toggle" className="toggle-label">
        Activate Corridor Animation
      </label>
      <div className="toggle-wrapper">
        <button
          id="corridor-toggle"
          className={`toggle-button ${corridorActive ? "active" : ""}`}
          onClick={onToggle}
          aria-pressed={corridorActive}
        >
          <span className="toggle-slider"></span>
          {corridorActive ? "ON" : "OFF"}
        </button>
      </div>
      {corridorActive && (
        <p className="status-indicator">
          ✓ Corridor animation is active - Auto zoom to corridor enabled
        </p>
      )}
    </div>
  );
};

export default CorridorToggle;
