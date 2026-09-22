# Dynamic To-Do Application - Auspify Task 3

A clean, responsive, and dynamic task management web application built with vanilla JavaScript, HTML5, and CSS3. This application allows users to create, track, complete, and delete daily tasks seamlessly, with persistent data storage using browser LocalStorage.

---

## 🚀 Live Demo & Links

- **Live Demo (Vercel):** [https://auspify-task-3.vercel.app/](https://auspify-task-3.vercel.app/)
- **GitHub Repository:** [https://github.com/murodil01/Auspify-Task-3.git](https://github.com/murodil01/Auspify-Task-3.git)

---

## ✨ Features & Functionality

- **Task Creation:** Quickly add new tasks with real-time DOM rendering.
- **Task Completion Tracking:** Toggle task completion status (strike-through / checkbox UI feedback).
- **Task Deletion:** Remove individual tasks dynamically from the UI and storage.
- **LocalStorage Persistence:** All tasks remain saved across page refreshes and browser sessions.
- **Interactive UI & Animations:** Smooth hover states, transition effects, and intuitive task layout.
- **Responsive Design:** Optimized layout for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack & Concepts Covered

- **HTML5:** Semantic structure, accessible form fields, and task item lists.
- **CSS3:** Custom properties (variables), Flexbox layout, dynamic state styling (`.completed`), and transitions.
- **JavaScript (ES6):**
  - **DOM Manipulation:** Creating, appending, and toggling HTML elements dynamically.
  - **Event Handling:** Form submit handlers, click events, and event delegation.
  - **Browser LocalStorage API:** Serializing arrays with `JSON.stringify()` and parsing with `JSON.parse()`.

---

## 📂 Project Structure

```text
Auspify-Task-3/
│
├── index.html          # Task application layout & input structure
├── style.css           # Responsive layout, task card styles, & UI states
├── script.js           # Core DOM logic, event listeners, & LocalStorage handler
└── README.md           # Project documentation
