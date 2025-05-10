// src/controllers/SurveyController.js
import surveyModel from "../models/Survey";

class SurveyController {
  constructor(model) {
    this.model = model;
  }

  // Initialize data
  initializeData() {
    return this.model.init();
  }

  // Get all survey data
  getAllSurveys() {
    return this.model.getAllData();
  }

  // Get a specific survey
  getSurvey(id) {
    return this.model.getDataById(id);
  }

  // Add a new survey
  addSurvey(surveyData) {
    // Validate data
    if (!this.validateSurveyData(surveyData)) {
      throw new Error("Invalid survey data");
    }

    return this.model.addData(surveyData);
  }

  // Update an existing survey
  updateSurvey(id, surveyData) {
    // Validate data
    if (!this.validateSurveyData(surveyData, false)) {
      throw new Error("Invalid survey data");
    }

    return this.model.updateData(id, surveyData);
  }

  // Randomize coordinates for a survey
  randomizeCoordinates(id) {
    // Get current data
    const surveyData = this.model.getDataById(id);
    if (!surveyData) return null;

    const updatedData = {
      coordinates: {
        latitude: surveyData.coordinates.latitude,
        longitude: surveyData.coordinates.longitude,
      },
    };

    // Update and return the updated item
    const updatedItem = this.model.updateData(id, updatedData);
    console.log("Updated coordinates:", updatedItem.coordinates);
    return updatedItem;
  }

  // Delete a survey
  deleteSurvey(id) {
    this.model.deleteData(id);
  }

  // Add a listener for data changes
  subscribeToChanges(callback) {
    this.model.addListener(callback);
  }

  // Remove a listener
  unsubscribeFromChanges(callback) {
    this.model.removeListener(callback);
  }

  // Validate survey data fields
  validateSurveyData(data, requireAll = true) {
    const requiredFields = [
      "name",
      "phone_number",
      "email",
      "address",
      "coordinates",
    ];

    if (requireAll) {
      // Check if all required fields exist
      for (const field of requiredFields) {
        if (field === "coordinates") {
          if (
            !data.coordinates ||
            typeof data.coordinates.latitude !== "number" ||
            typeof data.coordinates.longitude !== "number"
          ) {
            return false;
          }
        } else if (!data[field]) {
          return false;
        }
      }
    } else {
      // For updates, check that provided fields have values
      for (const field in data) {
        if (field === "coordinates") {
          if (
            data.coordinates &&
            (typeof data.coordinates.latitude !== "number" ||
              typeof data.coordinates.longitude !== "number")
          ) {
            return false;
          }
        } else if (data[field] === undefined || data[field] === null) {
          return false;
        }
      }
    }

    return true;
  }

  // Future: could add methods for data filtering, sorting, etc.
}

// Export a singleton instance with the model injected
const surveyController = new SurveyController(surveyModel);
export default surveyController;
