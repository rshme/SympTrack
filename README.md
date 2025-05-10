
SympTrack App Installation Guide
===========================================

Introduction
------------

This README will guide you through the process of installing and running the React Native Android app on your local machine.

Environment Details
-------------------

The setup has been tested and is working on the following environment:

*   **Virtual Device Manager:** Pixel 7
*   **Android API Version:** API 35
*   **Android Version:** Android 15.0

Prerequisites
-------------

Before proceeding with the installation, ensure that the following tools are installed on your machine:

*   **Node.js:** v20.11.0
*   **Android Studio** 
*   **JDK (Java Development Kit)**

Step-by-Step Installation Guide
-------------------------------

### 1\. Clone the Repository

Clone the React Native app repository to your local machine:

    git clone https://github.com/rshme/SympTrack

### 2\. Install Dependencies

Navigate to the project directory and install all the necessary dependencies:

    cd SympTrack
    npm install

### 3\. Set Up Android Virtual Device

Ensure you have set up a virtual device in the Android Virtual Device Manager. Follow these steps:

1.  Open Android Studio and go to **Tools** > **AVD Manager**.
2.  Create a new virtual device with Pixel 7 and API 35 (Android 15.0) if you haven't already.
3.  Start the virtual device.

### 4\. Run the App on Android Emulator

Now, run the React Native app on the Android emulator:

    npm run android

This will automatically compile the app and deploy it to your virtual device.

### 5\. Troubleshooting

If you run into issues, here are a few things to check:

*   Ensure that the Android emulator is running and the environment variables are correctly set up.
*   Check if all necessary dependencies have been installed (React Native, Android SDK, etc.).
*   Make sure your virtual device has the correct API level (API 35) and Android version (Android 15.0).

Conclusion
----------

You should now have the SympTrack App running on your Pixel 7 virtual device with API 35 and Android 15.0.