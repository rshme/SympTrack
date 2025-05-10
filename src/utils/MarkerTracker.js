// src/utils/MarkerTracker.js
import React, { useState, useEffect } from "react";
import { Polyline } from "react-native-maps";

// Custom hook to track marker movement history
export const useMarkerTracker = (selectedItem, maxHistoryLength = 3) => {
  // Store history of coordinates for the selected marker
  const [markerHistory, setMarkerHistory] = useState({});

  // Update history when selected item changes
  useEffect(() => {
    if (selectedItem) {
      const itemId = selectedItem.id;

      setMarkerHistory((prev) => {
        // Get existing history for this marker or create a new array
        const history = prev[itemId] || [];

        // Add new coordinates to history, limit the length
        const updatedHistory = [...history, selectedItem.coordinates].slice(
          -maxHistoryLength
        );

        // Return updated history object
        return {
          ...prev,
          [itemId]: updatedHistory,
        };
      });
    }
  }, [
    selectedItem?.id,
    selectedItem?.coordinates.latitude,
    selectedItem?.coordinates.longitude,
  ]);

  // Component to render polylines for tracking
  const MarkerTrails = () => {
    return (
      <>
        {Object.entries(markerHistory).map(([itemId, coordinates]) => {
          // Only render if we have at least 2 points
          if (coordinates.length < 2) return null;

          return (
            <Polyline
              key={`trail-${itemId}`}
              coordinates={coordinates}
              strokeColor={selectedItem?.id === itemId ? "#0066ff" : "#999999"}
              strokeWidth={2}
            />
          );
        })}
      </>
    );
  };

  return {
    markerHistory,
    MarkerTrails,
  };
};

export default useMarkerTracker;
