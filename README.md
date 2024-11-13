# HealthAppNS - AI Health Prediction and Personal Medical Record

**HealthAppNS** is a health-tracking application designed to empower users to monitor and assess potential health risks with the help of machine learning. The app collects essential health metrics, stores personal medical information, and leverages AI to analyze the probability of certain diseases, all accessible through a secure, easy-to-use web interface.

## 🚀 Features

- **AI Health Risk Assessment**: Users can input personal health data (e.g., blood pressure, height, weight) to receive insights from a machine learning model on potential health risks.
- **Personal Medical Record Storage**: Securely stores user medical history and key health metrics, allowing users to track changes over time.
- **Google Authentication**: User-friendly login via Google, implemented with Firebase Authentication.
- **Personalized Dashboard**: New users are prompted to provide basic health information to personalize their experience.
## Screenshots

![Desktop View](screenshots/ss1.png)
![Desktop View](screenshots/ss2.png)
![Desktop View](screenshots/ss3.png)
![Desktop View](screenshots/ss4.png)
![Desktop View](screenshots/ss5.png)


## 🛠 Technologies Used

- **Frontend**: 
  - React with Vite and TypeScript
  - Tailwind CSS for styling
  - Shadcn UI Library for UI components
- **Authentication**: Firebase Authentication (Google OAuth)

## 🚩 Getting Started

To run this project locally, you need access to both the frontend and backend code:
1. Clone this repository:
   ```bash
   git clone https://github.com/Smiky0/healthapp/
   cd healthapp
   ```
2. Backend Repository:
   ```bash
   git clone https://github.com/Folylolyboyz/Health_Track_App
   ```
3. Setup firebase project for authentication 
4. Install frontend dependency:
  ```bash
  npm install
  npm run dev
  ```
5. Your application should be running at http://localhost:5173/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_BACKEND_API_URL`

`VITE_FIREBASE_API_KEY`

## Future Enhancements
- Implement blockchain at to store user data and reports
- Expand AI model capabilities to assess additional health metrics
- Enhance AI models to predict more accurately
- Add visualization features to track health data over time
- Improve user interface and responsiveness for better usability

## 🌐 Hosting
Medicheck is hosted on: 
https://healthappns.netlify.app/

## 🎯 Usage
- Visit the app and log in using your Google account.
- First-time users will be prompted to provide some personal details (age, gender, etc.).
- Once set up, access the AI health assessment feature and view your personal medical record.
## 🤝 Contributing

Contributions are welcome! If you have ideas to improve performance or optimize code, please feel free to fork the repository, make changes, and submit a pull request.
Contribution Guidelines

    Ensure any new code is well-documented and follows the project's existing style.
    For significant changes, open an issue to discuss your idea before implementation.

## License

[GNU](https://choosealicense.com/licenses/gpl-3.0/)

