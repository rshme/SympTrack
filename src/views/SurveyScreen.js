// src/views/SurveyScreen.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Alert } from "react-native";
import SurveyMapView from "./MapView";
import SurveyListView from "./ListView";
import surveyController from "../controllers/SurveyController";

const SurveyScreen = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize data on component mount
  useEffect(() => {
    try {
      const data = surveyController.initializeData();
      setSurveyData(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load survey data");
      console.error(error);
    } finally {
      setLoading(false);
    }

    // Subscribe to data changes
    surveyController.subscribeToChanges(handleDataChange);

    // Cleanup on unmount
    return () => {
      surveyController.unsubscribeFromChanges(handleDataChange);
    };
  }, []);

  // Handler for data changes
  const handleDataChange = (updatedData) => {
    setSurveyData(updatedData);
  };

  // Handler for marker press on map
  const handleMarkerPress = (item) => {
    setSelectedItem(item);
  };

  // Handler for item press in list
  const handleItemPress = (item) => {
    setSelectedItem(item);
    // Could add additional functionality here like showing details
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mapContainer}>
        <SurveyMapView data={surveyData} onMarkerPress={handleMarkerPress} />
      </View>
      <View style={styles.listContainer}>
        <SurveyListView
          data={surveyData}
          onItemPress={handleItemPress}
          selectedItemId={selectedItem?.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mapContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

export default SurveyScreen;
