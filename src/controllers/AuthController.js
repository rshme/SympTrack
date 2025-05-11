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
      webClientId: "1048611951446-2ef224u7n4us1m1qumkjrgrkh4l8reid.apps.googleusercontent.com",
      iosClientId: "1048611951446-en0htr19s3629l58obthgc86dsetip8m.apps.googleusercontent.com",
      offlineAccess: true, // if you need to access Google API on behalf of the user
      forceCodeForRefreshToken: true, // needed for offline access
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
      if (!playServicesCheck.success) {
        return playServicesCheck;
      }

      // Sign in
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Save user to model
      AuthModel.setUser(userInfo.user);

      // Save to AsyncStorage for persistence
      await AsyncStorage.setItem("user", JSON.stringify(userInfo.user));

      return { success: true, user: userInfo.user };
    } catch (error) {
      console.error("Google Sign-In Error:", error);

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
      const isSignedIn = await GoogleSignin.isSignedIn();

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
