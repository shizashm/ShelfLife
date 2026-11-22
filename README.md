
# ShelfLife

## Project Overview

ShelfLife is a web application designed to help readers discover books, organize their personal bookshelves, track their reading progress, and receive personalized book recommendations based on their reading preferences.

This application was developed as part of the ISTE 340 Client Programming group project.

## Features

- Search for books by title, author, or subject.
- View book information and descriptions using the Open Library API.
- Organize books into personal reading shelves.
- View reading statistics and track reading goals.
- Set reading preferences and receive personalized book recommendations.
- Save books and reading preferences using localStorage.
- Responsive layouts for desktop, tablet, and mobile devices.

## Technologies Used

- React
- Vite
- JavaScript
- HTML and CSS
- React Router
- React Context API
- Open Library API
- localStorage

## Prerequisites

Before running the application, make sure to have:

- Node.js (22.12 or later in the Node 22 series recommended)
- npm
- A web browser
- An active internet connection for fetching book data

## Installation and Setup

1. Download and extract the project folder.
2. Open the ShelfLife project folder in Visual Studio Code.
3. Open the terminal and install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal in your browser.

## API Information

ShelfLife uses the public Open Library API to retrieve book information, covers, descriptions, and search results.

API website: https://openlibrary.org/

No API key or environment variables are required to run the application.

## Data Persistence

The application uses localStorage to save the user's books, shelf selections, reading preferences, and reading goals. This allows the saved information to remain available after refreshing or reopening the website.

## Testing and Production Build

To check the code for linting errors:

```bash
npm run lint
```

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Team

Team 6 - Papercut

Shiza Shaheem
Sandhli Arora
Shaik Nadia Tabassum

