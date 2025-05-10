// src/views/MapView.js
import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import useMarkerTracker from "../utils/MarkerTracker";

const SurveyMapView = ({ data, onMarkerPress, selectedItem }) => {
  // Reference to the map view for animations
  const mapRef = useRef(null);

  // Use marker tracker to show movement history
  const { MarkerTrails } = useMarkerTracker(selectedItem, 3);

  // Calculate the initial region based on the first data point
  // or default to a central US location
  const initialRegion =
    data.length > 0
      ? {
          latitude: data[0].coordinates.latitude,
          longitude: data[0].coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      : {
          latitude: 39.8283, // Center of US
          longitude: -98.5795,
          latitudeDelta: 50,
          longitudeDelta: 50,
        };

  // Animate to the selected item when it changes
  useEffect(() => {
    if (selectedItem && mapRef.current) {
      // Log to verify coordinates are updating
      console.log("Animating to:", selectedItem.coordinates);

      mapRef.current.animateToRegion(
        {
          latitude: selectedItem.coordinates.latitude,
          longitude: selectedItem.coordinates.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        },
        500
      ); // 500ms animation duration
    }
  }, [
    selectedItem?.id,
    selectedItem?.coordinates.latitude,
    selectedItem?.coordinates.longitude,
  ]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {/* Render marker movement trails */}
        <MarkerTrails />

        {data.map((item) => (
          <Marker
            // Use a key that includes coordinates to force re-render when they change
            key={`${item.id}-${item.coordinates.latitude}-${item.coordinates.longitude}`}
            coordinate={item.coordinates}
            title={item.name}
            description={item.address}
            onPress={() => onMarkerPress(item)}
            pinColor={selectedItem?.id === item.id ? "blue" : "red"}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.5,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default SurveyMapView;
