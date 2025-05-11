import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import SurveyScreen from './src/views/SurveyScreen';
import LoginScreen from './src/views/LoginScreen';
import AuthController from './src/controllers/AuthController';
import AuthModel from './src/models/Auth';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authController = new AuthController();

  useEffect(() => {
    // Check if the user is already authenticated
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const result = await authController.checkExistingAuth();
    setIsAuthenticated(result.success);
    setIsLoading(false);
  };

  const handleLoginSuccess = (user) => {
    console.log('User logged in:', user);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await authController.signOut();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen 
            name="Survey" 
            options={{
              title: 'COVID-19 Survey',
              headerRight: () => (
                <TouchableOpacity 
                  onPress={handleLogout}
                  style={{ marginRight: 15 }}
                >
                  <Text style={{ color: '#0066cc' }}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          >
            {(props) => <SurveyScreen {...props} user={AuthModel.getUser()} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen 
            name="Login" 
            options={{ headerShown: false }}
          >
            {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}