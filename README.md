# File Explorer Project

This project consists of a backend (Node.js) and frontend (React) application for exploring files and directories.

## Table of Contents

-   [Setup and Running Instructions](#setup-and-running-instructions)
-   [Assumptions and Design Decisions](#assumptions-and-design-decisions)
-   [Challenges Faced and How They Were Solved](#challenges-faced-and-how-they-were-solved)
-   [Known Issues and Future Improvements](#known-issues-and-future-improvements)

## Setup and Running Instructions

### Backend (file-explorer-app)

1.  **Navigate to the backend directory:**

    ```bash
    cd file-explorer-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the backend server:**

    ```bash
    npm start
    ```

    * The server will typically run on `http://localhost:3000`.

4.  **Docker (Optional):**

    * Build the Docker image:

        ```bash
        docker build -t file-explorer-server .
        ```

    * Run the Docker container:

        ```bash
        docker run -p 8080:3000 file-explorer-server
        ```

### Frontend (file-explorer-client)

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../file-explorer-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the frontend application:**

    ```bash
    npm run dev
    ```

    * The application will typically run on `http://localhost:5173`.

## Assumptions and Design Decisions

### Backend

* I chose Node.js with Express.js for the backend due to its simplicity, speed, and suitability for I/O-bound operations.
* The backend assumes that it has read permissions for the directories it is trying to access.
* I use a simple api to return file system data.

### Frontend

* React with Vite was chosen for the frontend to provide a modern, fast, and efficient user interface.
* The frontend assumes the backend is running on `http://localhost:3000` or the docker mapped port.
* The frontend uses basic css for styling.

## Challenges Faced and How They Were Solved

### Backend

* **Challenge:** Handling file system operations efficiently.
* **Solution:** Used asynchronous file system operations (`fs/promises`) to avoid blocking the main thread.
* **Challenge:** Cross-Origin Resource Sharing (CORS) issues when the frontend and backend run on different ports.
* **Solution:** Implemented CORS middleware in the Express.js server.

### Frontend

* **Challenge:** Displaying large directory structures efficiently.
* **Solution:** Implemented a recursive component to display directories and files, and considered pagination for very large directories.
* **Challenge:** Keeping the frontend in sync with the backend.
* **Solution:** Used `fetch` to make api calls to the backend, and updated the UI when the data returned.

## Known Issues and Future Improvements

* **Backend Testing:**
    * no tests
* **Frontend Testing:**
    * More comprehensive unit and integration tests are needed for the frontend. 
* **Error Handling:**
    * The application lacks robust error handling. Enhancements should be made to provide better feedback to the user and log errors effectively.
* **Performance:**
    * For very large directory structures, performance optimizations are needed, such as implementing virtualized lists or lazy loading.
* **Security:**
    * Security considerations should be made, such as input sanitization, and access control.
* **UI/UX:**
    * The user interface can be enhanced with better styling and improved user experience.
