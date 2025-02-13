# 🏡 Housing Estate App

This is a **React Native + Expo** app that allows users to browse a list of houses, view their details, and unlock them based on their GPS location.

## 🚀 Features
- Displays a list of houses with images, addresses, and descriptions.
- Navigates to a **Details Screen** for more information.
- Uses **Expo Location API** to check if a user is within 30 meters of a house.
- Unlocks a house when the user is close enough.
- Uses **Mock API (JSON data)** for fetching house listings.

---

## 📌 Prerequisites
Before running the project, make sure you have:
- **Node.js** installed (Download from [Node.js official site](https://nodejs.org/))
- **Expo CLI** installed globally  
  ```
  npm install -g expo-cli
  ```
- **Android Emulator / Physical Device**  
  - For Android: Use **Android Studio** or a physical device.
  - For iOS: Use an **iPhone Simulator** (Mac users) or an actual iPhone.

---

## 🔧 Installation & Setup
1. **Clone the repository**  
   ```sh
   git clone https://github.com/prince7858/Housing-estate.git
   cd Housing-estate
   ```
   
2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Start the development server**  
   ```sh
   expo start
   ```
   - Press **'w'** to run in the web browser.  
   - Scan the QR code using the **Expo Go** app on your phone.  

---

## 📸 Demo Video
[Click here to watch the demo](https://drive.google.com/file/d/175Gio91QFv-JSHMcgxkVx4Ln1YXMSaEb/view?usp=drivesdk)


---

## ✨ Troubleshooting
- If you get an error **"Cannot read properties of undefined (reading 'latitude')"**, make sure your mock API contains latitude and longitude for all houses.
- If `expo-location` permission is denied, manually enable **location access** from your device settings.

---

## ✨ Credits
- **Author:** Prince Kumar  
- **Technologies Used:** React Native, Expo, Expo Router, React Query, Expo Location API  

