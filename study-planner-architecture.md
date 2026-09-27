# Study Planner — MERN Stack Architecture

## 1. Project Overview

A simple study planner for students.

### Version 1 Features

Students should be able to:

- Add a task
- Add a course name
- Add a topic name
- Assign a priority
- Assign a duration
- Mark a task as completed
- View all tasks
- View pending tasks
- View completed tasks
- Delete a task

The first version should prioritize simplicity and clean architecture over advanced features.

---

# 2. Technology Stack

## Frontend

- React
- Vite
- JavaScript
- HTML/CSS
- React Hooks
- Fetch API or Axios

## Backend

- Node.js
- Express.js
- JavaScript
- REST API

## Database

- MongoDB
- Mongoose

## Development Tools

- Git
- VS Code
- npm

---

# 3. High-Level Architecture

```text
                    STUDY PLANNER
                         |
          +--------------+--------------+
          |                             |
       Frontend                      Backend
        React                       Node/Express
          |                             |
          |        HTTP/REST API        |
          +---------------------------->|
                                        |
                                    Mongoose
                                        |
                                        v
                                    MongoDB
```

The React frontend should never communicate directly with MongoDB.

The communication flow should be:

```text
React UI
   |
   | HTTP request
   v
Express API
   |
   v
Controller
   |
   v
Mongoose Model
   |
   v
MongoDB
```

For responses:

```text
MongoDB
   |
   v
Mongoose
   |
   v
Controller
   |
   v
Express API
   |
   | JSON response
   v
React UI
```

---

# 4. Recommended Project Structure

```text
study-planner/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── taskService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

# 5. Frontend Architecture

The frontend is responsible for:

- Displaying tasks
- Collecting user input
- Sending requests to the backend
- Displaying loading/error states
- Updating the UI when task data changes

## Main Components

### `Dashboard.jsx`

The main application page.

It should contain:

```text
Dashboard
│
├── Navbar
│
├── TaskForm
│
├── FilterBar
│
└── TaskList
      └── TaskCard
```

### `TaskForm.jsx`

Responsible for creating tasks.

Fields:

- Task name
- Course name
- Topic name
- Priority
- Duration

On submission:

```text
TaskForm
   |
   v
taskService.createTask()
   |
   v
POST /api/tasks
```

### `TaskCard.jsx`

Displays one task.

Example:

```text
-----------------------------------------
Complete Chapter 3 Exercises

Course: C Programming
Topic: Functions

Priority: High
Duration: 60 minutes

[Mark Complete]       [Delete]
-----------------------------------------
```

### `TaskList.jsx`

Receives tasks and renders multiple `TaskCard` components.

### `FilterBar.jsx`

Allows the user to switch between:

```text
All | Pending | Completed
```

---

# 6. Backend Architecture

The backend should follow a simple:

```text
Routes
  ↓
Controllers
  ↓
Models
  ↓
MongoDB
```

architecture.

## `server.js`

Responsibilities:

- Start Express
- Load middleware
- Connect to MongoDB
- Register routes
- Start the server

It should NOT contain all business logic.

---

# 7. MongoDB Data Model

A task can be represented as:

```javascript
{
  _id: ObjectId,

  taskName: String,

  courseName: String,

  topicName: String,

  priority: String,

  duration: Number,

  completed: Boolean,

  createdAt: Date,

  updatedAt: Date
}
```

## Example

```json
{
  "taskName": "Complete Chapter 3 exercises",
  "courseName": "C Programming",
  "topicName": "Functions",
  "priority": "high",
  "duration": 60,
  "completed": false
}
```

Mongoose timestamps should automatically provide:

```text
createdAt
updatedAt
```

---

# 8. Priority Values

Use a controlled set of values:

```text
low
medium
high
```

Do not allow arbitrary priority strings.

The Mongoose schema should use an enum.

---

# 9. REST API

## Create Task

```http
POST /api/tasks
```

Request:

```json
{
  "taskName": "Complete Chapter 3 exercises",
  "courseName": "C Programming",
  "topicName": "Functions",
  "priority": "high",
  "duration": 60
}
```

Response:

```json
{
  "success": true,
  "task": {}
}
```

---

## Get All Tasks

```http
GET /api/tasks
```

Returns all tasks.

---

## Get Pending Tasks

```http
GET /api/tasks?completed=false
```

---

## Get Completed Tasks

```http
GET /api/tasks?completed=true
```

---

## Mark Task Complete

```http
PATCH /api/tasks/:id/complete
```

The server should change:

```text
completed: false
```

to:

```text
completed: true
```

This should be an idempotent operation where practical.

---

## Delete Task

```http
DELETE /api/tasks/:id
```

---

# 10. Controller Responsibilities

`taskController.js` should contain functions such as:

```javascript
createTask()
getTasks()
completeTask()
deleteTask()
```

Controllers should:

1. Validate/receive request data
2. Call the appropriate Mongoose operation
3. Return a JSON response
4. Pass unexpected errors to error middleware

Business logic should not be duplicated across routes.

---

# 11. Task Service

The frontend should keep API calls in:

```text
client/src/services/taskService.js
```

Example responsibilities:

```javascript
createTask()
getTasks()
completeTask()
deleteTask()
```

Components should call these service functions rather than putting raw HTTP requests everywhere.

This keeps the React components easier to understand.

---

# 12. State Management

Do NOT introduce Redux for version 1.

React's built-in state management is sufficient.

For example:

```javascript
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [filter, setFilter] = useState("all");
```

The first version should keep state local to the dashboard/application where possible.

---

# 13. Task Filtering

Filtering can initially happen on the backend.

Examples:

```text
All tasks:
GET /api/tasks

Pending:
GET /api/tasks?completed=false

Completed:
GET /api/tasks?completed=true
```

This keeps the architecture straightforward.

Later, more filters can be added:

```text
Priority
Course
Topic
Duration
Date
```

---

# 14. Validation

Validation should happen on BOTH sides.

## Frontend

Provide immediate feedback to the user.

Examples:

- Task name required
- Course name required
- Topic name required
- Priority required
- Duration must be greater than 0

## Backend

Never trust frontend validation.

The backend must independently validate incoming data.

Example rules:

```text
taskName     → required, non-empty
courseName   → required, non-empty
topicName    → required, non-empty
priority     → required, low/medium/high
duration     → required, positive number
completed    → boolean
```

---

# 15. Edge Cases

The application should handle:

### Empty task name

Reject the request.

### Empty course name

Reject the request.

### Empty topic name

Reject the request.

### Invalid priority

Reject values other than:

```text
low
medium
high
```

### Invalid duration

Reject:

```text
0
negative numbers
non-numeric values
```

### Invalid MongoDB ID

Return an appropriate `400` or `404` response rather than crashing.

### Task does not exist

For example:

```http
PATCH /api/tasks/does-not-exist/complete
```

Return:

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Database unavailable

The backend should return a useful error and avoid crashing the entire process unnecessarily.

### Empty task list

The frontend should display something like:

```text
No tasks found.
```

rather than showing a blank page.

### Duplicate task names

Duplicate task names should be allowed.

For example, a student may legitimately have:

```text
Read Chapter 3 — C Programming
Read Chapter 3 — Probability
```

Therefore, `taskName` should not be unique.

---

# 16. Error Handling

Use a centralized Express error-handling middleware:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Error
   ↓
errorHandler
   ↓
JSON response
```

Use consistent responses such as:

```json
{
  "success": false,
  "message": "Task not found"
}
```

Successful responses can follow:

```json
{
  "success": true,
  "task": {}
}
```

---

# 17. Environment Variables

The backend should use `.env`.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Never hard-code the MongoDB connection string in source code.

`.env` must be included in `.gitignore`.

Provide a `.env.example` file:

```env
PORT=5000
MONGODB_URI=
```

---

# 18. Initial UI

Keep the UI simple.

The first dashboard can look conceptually like:

```text
================================================
                 STUDY PLANNER
================================================

[ + Add Task ]

------------------------------------------------
Filters:
[ All ] [ Pending ] [ Completed ]
------------------------------------------------

Tasks

┌──────────────────────────────────────────────┐
│ Complete Chapter 3 Exercises                 │
│                                              │
│ C Programming                                │
│ Functions                                    │
│                                              │
│ Priority: HIGH     Duration: 60 min          │
│                                              │
│ [ Mark Complete ]                 [ Delete ] │
└──────────────────────────────────────────────┘
```

Do not spend significant time on visual design before the functionality works.

---

# 19. Development Order

Build the application incrementally.

## Phase 1 — Project Setup

- Create React/Vite frontend
- Create Node/Express backend
- Connect MongoDB
- Verify frontend and backend run independently

## Phase 2 — Backend

Implement:

1. Task model
2. Create task API
3. Get tasks API
4. Complete task API
5. Delete task API
6. Validation
7. Error handling

Test the API before building the full UI.

## Phase 3 — Frontend

Implement:

1. Dashboard
2. Task form
3. Task list
4. Task card
5. API service
6. Loading states
7. Error states
8. Filters

## Phase 4 — Integration

Verify:

```text
Create task
    ↓
MongoDB
    ↓
Fetch tasks
    ↓
React UI
    ↓
Mark complete
    ↓
MongoDB updated
    ↓
React UI updated
```

## Phase 5 — Polish

Only after the core application works:

- Better styling
- Responsive layout
- Empty states
- Confirmation before deletion
- Better error messages
- Small animations

---

# 20. Deliberately Excluded From Version 1

Do NOT implement these initially:

- User authentication
- Login/signup
- JWT
- Google authentication
- Multiple users
- Roles/permissions
- Notifications
- Calendar
- Study streaks
- Analytics
- AI features
- Email notifications
- Real-time updates
- Redux
- Docker
- Microservices
- Automated deployment

These can be added later.

The objective of version 1 is to build a working CRUD-style MERN application and understand how the pieces communicate.

---

# 21. Future Architecture

Once the basic version works, the architecture can evolve into:

```text
                         Study Planner
                              |
                 +------------+------------+
                 |                         |
              Frontend                  Backend
               React                    Express
                 |                         |
                 |                    Authentication
                 |                         |
                 |                    Task APIs
                 |                         |
                 |                    Course APIs
                 |                         |
                 |                    User APIs
                 |                         |
                 +-------------------------+
                                           |
                                        MongoDB
```

Possible future features:

- User accounts
- Courses
- Topics
- Due dates
- Recurring tasks
- Calendar
- Study sessions
- Progress statistics
- Streaks
- Search
- Sorting
- Priority filtering
- Course dashboards

---

# 22. Architecture Principle

Keep the first implementation simple:

```text
React
  ↓
REST API
  ↓
Express
  ↓
Mongoose
  ↓
MongoDB
```

Every piece should have a clear responsibility.

Avoid adding technologies just because they are commonly used in larger MERN applications.

The goal is a small, understandable application that can be expanded later.
