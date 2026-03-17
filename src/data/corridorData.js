/**
 * Sample road corridor data for Delhi
 * Each corridor connects multiple intersection points
 */

// Define intersections with coordinates
export const intersections = {
  intersection_1: { lat: 28.6139, lng: 77.2090, name: "Central Delhi" },
  intersection_2: { lat: 28.6340, lng: 77.1800, name: "North Delhi" },
  intersection_3: { lat: 28.5935, lng: 77.1700, name: "South Delhi" },
  intersection_4: { lat: 28.6050, lng: 77.2500, name: "East Delhi" },
  intersection_5: { lat: 28.6200, lng: 77.1950, name: "West Delhi" },
  intersection_6: { lat: 28.6450, lng: 77.2200, name: "Northeast Delhi" },
  intersection_7: { lat: 28.5820, lng: 77.2300, name: "Southeast Delhi" },
};

// Define road corridors (segments connecting intersections)
export const roadCorridors = [
  {
    id: "corridor_1",
    name: "Main Corridor Route 1",
    segments: [
      {
        from: "intersection_1",
        to: "intersection_2",
        status: "normal", // 'normal' | 'active' | 'sealed'
      },
      {
        from: "intersection_2",
        to: "intersection_6",
        status: "normal",
      },
    ],
  },
  {
    id: "corridor_2",
    name: "Active Corridor Route",
    segments: [
      {
        from: "intersection_1",
        to: "intersection_5",
        status: "active",
      },
      {
        from: "intersection_5",
        to: "intersection_2",
        status: "active",
      },
      {
        from: "intersection_2",
        to: "intersection_6",
        status: "active",
      },
    ],
  },
  {
    id: "corridor_3",
    name: "Sealed Feeder",
    segments: [
      {
        from: "intersection_1",
        to: "intersection_3",
        status: "sealed",
      },
      {
        from: "intersection_3",
        to: "intersection_7",
        status: "sealed",
      },
    ],
  },
  {
    id: "corridor_4",
    name: "Mixed Status Route",
    segments: [
      {
        from: "intersection_3",
        to: "intersection_1",
        status: "normal",
      },
      {
        from: "intersection_1",
        to: "intersection_4",
        status: "sealed",
      },
      {
        from: "intersection_4",
        to: "intersection_7",
        status: "normal",
      },
    ],
  },
];

/**
 * Generate polyline routes from corridor data
 * Converts segment definitions into coordinate arrays for rendering
 */
export const generatePolylineRoutes = () => {
  return roadCorridors.map(corridor => {
    const routes = corridor.segments.map(segment => {
      const fromIntersection = intersections[segment.from];
      const toIntersection = intersections[segment.to];

      return {
        coordinates: [
          [fromIntersection.lat, fromIntersection.lng],
          [toIntersection.lat, toIntersection.lng],
        ],
        status: segment.status,
        fromName: fromIntersection.name,
        toName: toIntersection.name,
      };
    });

    return {
      id: corridor.id,
      name: corridor.name,
      routes,
    };
  });
};
