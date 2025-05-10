// src/models/SurveyModel.js
import DUMMY_DATA from '../utils/dummyData';

class SurveyModel {
  constructor() {
    this.data = [];
    this.listeners = [];
  }

  // Initialize with dummy data
  init() {
    this.data = DUMMY_DATA;
    this.notifyListeners();
    return this.data;
  }

  // Get all survey data
  getAllData() {
    return this.data;
  }

  // Get a specific survey by ID
  getDataById(id) {
    return this.data.find(item => item.id === id);
  }

  // Add a new survey entry
  addData(surveyData) {
    // Generate a new ID
    const newId = (Math.max(...this.data.map(item => parseInt(item.id))) + 1).toString();
    
    // Add the new data with ID
    const newSurvey = {
      id: newId,
      ...surveyData
    };
    
    this.data = [...this.data, newSurvey];
    this.notifyListeners();
    return newSurvey;
  }

  // Update an existing survey
  updateData(id, updatedData) {
    let updatedItem = null;
    
    this.data = this.data.map(item => {
      if (item.id === id) {
        updatedItem = { ...item, ...updatedData };
        return updatedItem;
      }
      return item;
    });
    
    this.notifyListeners();
    return updatedItem;
  }

  // Delete a survey
  deleteData(id) {
    this.data = this.data.filter(item => item.id !== id);
    this.notifyListeners();
  }

  // Observer pattern - add listener
  addListener(listener) {
    this.listeners.push(listener);
  }

  // Observer pattern - remove listener
  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Notify all listeners of data changes
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.data));
  }
}

// Export a singleton instance
const surveyModel = new SurveyModel();
export default surveyModel;