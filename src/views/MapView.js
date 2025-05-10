// src/views/MapView.js
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const SurveyMapView = ({ data, onMarkerPress }) => {
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

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {data.map((item) => (
          <Marker
            key={item.id}
            coordinate={item.coordinates}
            title={item.name}
            description={item.address}
            onPress={() => onMarkerPress(item)}
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
