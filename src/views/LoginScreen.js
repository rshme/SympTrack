import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import AuthController from "../controllers/AuthController";

const LoginScreen = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authController = new AuthController();

  useEffect(() => {
    // Check if user is already logged in
    checkExistingLogin();
  }, []);

  const checkExistingLogin = async () => {
    const result = await authController.checkExistingAuth();
    if (result.success) {
      onLoginSuccess(result.user);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    const result = await authController.signInWithGoogle();

    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setError(result.error || "Failed to sign in");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COVID-19 Survey App</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleGoogleSignIn}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
  },
  googleButton: {
    width: 240,
    height: 48,
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});

export default LoginScreen;
