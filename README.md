# react native moga

Mobile application built with React Native and Expo.
This project is part of a full-stack system with a Django backend.

---

#Tech Stack

- React Native
- Expo
- React Navigation
- Zustand (state management)
- Axios / Fetch API
- JavaScript

---

#Features

- User authentication
- Profile management
- Tasks module
- Items / wishes module
- Messaging / chat screens
- Notifications system

---

#Project Status

This project is currently under development.

The implemented features were functional during development and are being prepared for portfolio presentation.

---

#Installation

Clone the repository:

```bash
git clone https://github.com/dinkovasilev/moga-mobile.git
cd moga-mobile

#Install dependencies:
npm install

#Run the app
npm start

Then:

press a → run on Android emulator

press i → run on iOS simulator (Mac only)

or scan QR code using Expo Go (real device)

#Backend Configuration
Before running the app, you need to configure the backend API.
Edit the file: core/config.js

Set your backend address: export const API_HOST = 'http://192.168.x.x:8000/mobile';
Replace 192.168.x.x with your local machine IP address.

Notes
The app is designed to work with a Django backend (see moga-backend).

Make sure your backend server is running and accessible from your device.

If using a real phone, ensure both devices are on the same network.

#Future Improvements
Environment variable support (.env)

Better error handling

UI/UX refinements

API abstraction improvements

#Author
Dinko Vasilev
