# Music Library Web Application

A React-based web application for managing and playing music. Features include user authentication, music library management, playlist creation, and search functionality. Integrated with Firebase for authentication, Firestore for data storage, and Firebase Storage for music files. Styled with Material-UI and custom CSS.

## Features

- User Authentication (Email/Password, Google)
- Music Library Management
- Playlist Creation and Management
- Search Functionality (Songs, Albums, Artists)
- Album and Artist Details
- User Profile Management
- Responsive Design with Material-UI

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Firebase Account

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/music-library.git
    ```
2. Navigate to the project directory:
    ```sh
    cd music-library
    ```
3. Install the necessary modules:
    ```sh
    npm install
    ```
4. Email me at [Yukta Chikate](mailto:chikate.y@northeastern.edu?subject=[GitHub]%20Firebase%20Config%20Key%20needed) for the Firebase config key, which is required to access the database.
5. Store the Firebase config keys in `src/firebase/firebaseConfig.json`.

### Running the Application

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/components`: Contains React components for different parts of the application.
- `src/firebase`: Firebase configuration and initialization files.
- `src/styles`: Custom CSS files for additional styling.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
