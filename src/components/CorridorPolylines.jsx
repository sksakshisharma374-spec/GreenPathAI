import React from "react";
import { Polyline, Popup } from "react-leaflet";
import "./PolylinesStyle.css";

/**
 * CorridorPolylines Component
 * Renders polylines for road corridors with dynamic styling based on status
 *
 * Props:
 * - polylineRoutes: Array of corridor routes with segments
 * - corridorActive: Boolean indicating if corridor animation is active
 * - activeCorridorIndex: Index of the currently active corridor
 */
const CorridorPolylines = ({
  polylineRoutes,
  corridorActive,
  activeCorridorIndex,
}) => {
  /**
   * Get color for polyline based on status and active state
   */
  const getPolylineColor = (status, isActiveCorridor) => {
    if (isActiveCorridor && corridorActive && status === "active") {
      return "#00FF00"; // Bright Green for active corridor
    }

    switch (status) {
      case "active":
        return "#00FF00"; // Bright Green
      case "sealed":
        return "#FFA500"; // Orange
      case "normal":
      default:
        return "#808080"; // Grey
    }
  };

  /**
   * Get animation class for polyline
   */
  const getPolylineClass = (status, isActiveCorridor) => {
    if (isActiveCorridor && corridorActive && status === "active") {
      return "polyline-active-animated";
    }
    return "";
  };

  /**
   * Get polyline weight based on status
   */
  const getLineWeight = (status, isActiveCorridor) => {
    if (isActiveCorridor && corridorActive && status === "active") {
      return 5; // Thicker line for active animated corridor
    }
    return 3;
  };

  return (
    <>
      {polylineRoutes.map((corridor, corridorIdx) => {
        const isActiveCorridor = corridorIdx === activeCorridorIndex;

        return (
          <div key={corridor.id}>
            {corridor.routes.map((route, routeIdx) => {
              const color = getPolylineColor(route.status, isActiveCorridor);
              const animationClass = getPolylineClass(
                route.status,
                isActiveCorridor
              );
              const weight = getLineWeight(route.status, isActiveCorridor);
              const dashArray = route.status === "sealed" ? "5, 10" : "0";

              return (
                <Polyline
                  key={`${corridor.id}-route-${routeIdx}`}
                  positions={route.coordinates}
                  color={color}
                  weight={weight}
                  opacity={0.9}
                  dashArray={dashArray}
                  className={animationClass}
                >
                  <Popup>
                    <div className="popup-content">
                      <strong>Corridor:</strong> {corridor.name}
                      <br />
                      <strong>Route:</strong> {route.fromName} → {route.toName}
                      <br />
                      <strong>Status:</strong>{" "}
                      {route.status.charAt(0).toUpperCase() +
                        route.status.slice(1)}
                    </div>
                  </Popup>
                </Polyline>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default CorridorPolylines;
