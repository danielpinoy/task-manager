# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Folder Structure

src/
├── assets/ # Static assets like images, fonts, etc.
├── components/ # Reusable UI components
│ ├── count/ # Components related to counting/statistics
│ ├── navbar/ # Navigation components
│ ├── TaskFilter.jsx # Task filtering component
│ ├── TaskForm.jsx # Form for creating/editing tasks
│ ├── TaskList.jsx # List view of tasks
│ └── TaskStats.jsx # Task statistics component
├── pages/ # Page-level components/routes
│ ├── analytics/ # Analytics page and related components
│ ├── count/ # Count page and related components
│ ├── priority/ # Priority management page
│ ├── settings/ # Settings page
│ ├── taskmanager/ # Task management page
│ └── Home.jsx # Home page component
├── services/ # Service layer (API calls, data handling)
│ └── Api.jsx # API service for backend communication
├── styles/ # CSS and styling related files
├── utils/ # Utility functions and helpers
├── App.css # Main application styles
├── App.jsx # Root application component
├── index.css # Global CSS
└── main.jsx # Application entry point
