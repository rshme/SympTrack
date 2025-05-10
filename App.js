// App.js
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SurveyScreen from "./src/views/SurveyScreen";

const App = () => {
  return (
    <SafeAreaProvider>
      <SurveyScreen />
    </SafeAreaProvider>
  );
};

export default App;
