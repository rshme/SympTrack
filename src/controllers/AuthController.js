import AuthModel from "../models/Auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthController {
  constructor() {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId: "1048611951446-o5d3qk0cen96h4rspeu3r3d03jl13dgm.apps.googleusercontent.com",
      iosClientId: "1048611951446-lom6bh5qncetcui91fpnhfhnd7n4i41g.apps.googleusercontent.com",
      profileImageSize: 120
    });
  }

  async initGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      return { success: true };
    } catch (error) {
      console.error("Google Play Services error:", error);
      return {
        success: false,
        error: "Google Play Services not available or outdated",
      };
    }
  }

  async signInWithGoogle() {
    try {
      // Check if Google Play Services are available
      const playServicesCheck = await this.initGoogleSignIn();
      console.log(playServicesCheck)
      if (!playServicesCheck.success) {
        return playServicesCheck;
      }

      // Sign in
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.data.user)

      // Save user to model
      AuthModel.setUser(userInfo.data.user);

      // Save to AsyncStorage for persistence
      await AsyncStorage.setItem("user", JSON.stringify(userInfo.data.user));

      return { success: true, user: userInfo.data.user };
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      console.error("Google Sign-In Error Code:", error.code);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return { success: false, error: "User cancelled the login flow" };
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return { success: false, error: "Sign in is already in progress" };
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          success: false,
          error: "Play services not available or outdated",
        };
      }

      return {
        success: false,
        error: error.message || "Unknown error during sign in",
      };
    }
  }

  async checkExistingAuth() {
    try {
      // Check if signed in with Google
      const isSignedIn = false;

      if (isSignedIn) {
        // Get user info
        const userInfo = await GoogleSignin.getCurrentUser();
        if (userInfo) {
          AuthModel.setUser(userInfo.user);
          return { success: true, user: userInfo.user };
        }
      }

      // If not signed in with Google, check AsyncStorage as fallback
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        AuthModel.setUser(parsedUser);
        return { success: true, user: parsedUser };
      }

      return { success: false };
    } catch (error) {
      console.error("Error checking existing auth:", error);
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      // Sign out from Google
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // Clear local storage
      await AsyncStorage.removeItem("user");

      // Update model
      AuthModel.logout();

      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error);
      return { success: false, error: error.message };
    }
  }
}

export default AuthController;
