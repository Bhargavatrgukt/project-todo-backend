Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML ` To-Do Project API  This project is a task management API built with Node.js, Express, and SQLite. It provides endpoints for creating, updating, deleting, and retrieving tasks and projects, making it ideal for managing to-do lists.  ## Features  - **Project Management**: Create, update, and delete projects.  - **Task Management**: Manage tasks associated with projects, including marking tasks as complete or incomplete.  - **SQLite Database**: Uses SQLite as a lightweight database for persistent storage.  - **RESTful API**: Fully REST-compliant API for integration with any client.  ## API Documentation  Access the full API collections in Postman:  - [Projects API Collection](https://elements.getpostman.com/redirect?entityId=34844007-aef0e8af-e17d-44bf-bfed-8d2163b5dd76&entityType=collection)  - [Tasks API Collection](https://elements.getpostman.com/redirect?entityId=34844007-34bc6241-7615-4b31-9b06-5a1d43d62156&entityType=collection)  ## Prerequisites  - Node.js (v14+)  - npm (v6+)  - SQLite3  ## Installation  1. Clone the repository:     ```bash     git clone https://github.com/yourusername/todo-project.git     cd todo-project `

1.  bashCopy codenpm install
2.  Set up the database:

    - The database will be automatically initialized on the first run with the required tables.

3.  bashCopy codenpm startOr, with live reload using nodemon:bashCopy codenpm run dev

The server will be available at http://localhost:3000.

## Endpoints

### Projects

- **Create a Project**: POST /api/projects

  - Body: { "name": "Project Name", "color": "#FF5733", "isFavorite": 1 }

- **Update a Project**: PUT /api/projects/:id

  - Body: { "name": "Updated Name", "color": "#123456", "isFavorite": 0 }

- **Delete a Project**: DELETE /api/projects/:id
- **Retrieve All Projects**: GET /api/projects

### Tasks

- **Create a Task**: POST /api/:project_id/tasks

  - Body: { "content": "Task Content", "description": "Detailed Task Description", "due_date": "YYYY-MM-DD", "is_completed": 0 }

- **Update a Task**: PUT /api/:project_id/tasks/:id

  - Body: { "content": "Updated Content", "description": "Updated Description", "due_date": "YYYY-MM-DD", "is_completed": 1 }

- **Delete a Task**: DELETE /api/:project_id/tasks/:id
- **Retrieve Tasks for a Project**: GET /api/:project_id/tasks

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **API Testing**: Postman
