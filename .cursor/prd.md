# OSRS Quest Planner - Product Requirements Document

## Overview
The **OSRS Quest Planner** is a web-based tool designed to help Old School RuneScape players create and validate custom quest routes based on their in-game goals. Whether the player is pursuing Barrows Gloves, Song of the Elves, or simply looking to complete all quests efficiently, this tool enables them to build personalized, efficient routes with real-time prerequisite validation.

## Goals and Objectives
- **Custom route building** with live validation of quest prerequisites
- **One-stop access** to all relevant quest data
- **Alternative route suggestions** for fixing invalid plans
- **Save/load functionality** for managing multiple routes
- **Modern UI/UX**, including mobile responsiveness
- Provide **real-time route validation** and **goal-specific quest planning**

## Target Audience
The tool is designed for **all account types**—Ironmen, mains, skillers, and any player who values efficiency and clarity in quest planning. By removing the tedious and manual research required to plan valid quest orders, the planner saves players significant time and effort.

## Core Features

### 🧩 1. Custom Quest Route Builder *(MVP)*
Players can create personalized quest routes using a sleek, intuitive interface. This may be a drag-and-drop or checklist-style layout that allows users to choose quests and define their desired order of completion. The planner continuously evaluates the route’s structure to ensure logical and efficient progression.

### ✅ 2. Real-Time Route Validation *(MVP)*
As players build or edit a route, the planner performs automatic validation to ensure all prerequisite quests are met. If a route is invalid, the tool highlights missing requirements and suggests alternative quest insertions to make the path valid.

### 💾 3. Save & Load Routes *(MVP)*
Users can save multiple quest routes with custom names (e.g., “Barrows Gloves Plan,” “Skiller Route”). Saved routes can be reloaded at any time to resume planning or adjust based on new goals or account progression.

### ✍️ 4. Edit Saved Routes *(MVP)*
Saved routes are fully editable. Users can modify quest order, insert or remove quests, and revalidate the updated plan on the fly.

### 🎯 5. Prewritten Route Templates *(MVP)*
The planner includes built-in, optimized quest routes for major goals such as:
- Barrows Gloves
- Song of the Elves
- Quest Cape
- Lunar Diplomacy / Ancient Magicks access

These templates serve as fast-start options or planning inspiration for new users.

### 📱 6. Mobile-Responsive Design *(MVP)*
The entire planner is designed to work seamlessly on mobile devices, maintaining full functionality and a clean, touch-friendly UI. Players can use the tool on the go without losing clarity or control.

### 🔗 7. Export or Share Routes *(MVP)*
Users can export their custom routes or share them with others via unique, generated links. This feature encourages collaboration, content sharing, and easy backup of progress.

### 🧱 8. Custom Route Nodes *(MVP)*
Users can insert custom nodes into their quest route to represent non-quest milestones such as skilling goals or other in-game actions related to questing. These are simple text labels (e.g., “Train Agility to 56,” “Unlock Fairy Rings”) that serve as neutral placeholders within the route.

Custom nodes:
- Do not affect validation
- Are visually distinct from quests
- Help users organize and pace their questing journey

### 📂 9. Tabluar display of Quests *(MVP)* 
A tabluar display of all OSRS quests in which a user can browse quest data at a high level, and can optionally click on a quest to open a modal to view more detail about the quest including a link to the quest walkthrough from the OSRS Wiki.

### 10. About Page *(MVP)*
An about page detailing the need for the tool, the inspiration behind it -- and a link for donation if desired.

### 🌳 11. Quest Prerequisite Tree Viewer *(Future Enhancement)*
A visual, collapsible quest dependency tree that shows the full chain of required quests leading up to a selected goal. This feature enhances clarity and provides high-level insight into the planning structure.

### 📊 12. Skill Level Tracking / Integration *(Future Enhancement)*
Allows users to input their current skill levels and view only the quests that are currently completable. Potential integration with external tracking services like Wise Old Man to auto-fetch player progress.

## User Experience

### 1. Sleek, Modern UI
- **Minimalist Design**: The interface will be clean and simple, with ample white space. Avoiding clutter ensures that users can focus on their quest planning without distractions.
- **Intuitive Navigation**: Ensure that all actions are easy to find. For example, the "Save," "Load," "Edit" buttons should be placed prominently. The flow between different sections (route creation, validation, saving) should feel seamless and logical.

### 2. Mobile-Responsive
- **Mobile First**: The planner should be fully optimized for mobile devices, ensuring that users on smartphones or tablets can use the planner with ease. All features (route creation, saving, etc.) must work perfectly on small screens.
- **Touch-Friendly**: Buttons, checklists, and interactive elements will be large enough to interact with on touchscreens, providing an intuitive mobile experience.

### 3. Visual Feedback
- **Real-Time Validation Feedback**: When a route is invalid, the system should visually highlight broken paths with clear error messages, showing exactly what needs to be fixed. Correct routes will have a green, positive confirmation to let the user know their plan is solid.
- **Hover/Click Feedback**: As users interact with the interface, buttons and items should give clear visual cues, like highlighting or changing states when hovered or clicked.

### 4. Clear Actionable Items
- **Quest Listings**: Quests should be listed clearly, showing their names, requirements, and completion status (e.g., unlocked, incomplete, or in-progress).
- **Custom Node Placement**: For custom nodes, users should be able to drag/drop or click to add them easily to their route, with visual indicators of where they are in the process.

### 5. Easy-to-Understand Icons and Labels
- **Icons for Quick Understanding**: Use icons where appropriate (e.g., checkmarks for completed quests, warning symbols for invalid quests) so users can quickly identify quest statuses and other important data.
- **Informative Tooltips**: Hovering over icons or labels should show brief tooltips explaining what the item is or does (e.g., hovering over a quest might show its prerequisites).

### 6. Guided User Experience
- **Walkthrough for New Users**: When users first visit the tool, a simple guide should walk them through key features—how to build a route, save it, and share it.
- **Help/FAQ Section**: The tool should have easily accessible help options for users who need assistance.

### 7. Color Scheme
- **Bright, Contrasting Colors**: The app will use a color palette that is bright enough for visibility but also gentle on the eyes (e.g., soft greens, blues, and grays). Important elements, like validation feedback, should stand out with bright, contrasting colors (e.g., red for errors, green for success).
- **Consistency with OSRS Theme**: The design should stay aligned with the aesthetic of Old School RuneScape, using colors and fonts that feel familiar but not overwhelming.

## Technical Requirements

### Frontend (UI/UX)
- **Technologies**:
  - The frontend should be built using **SvelteKit**, a modern framework for building fast, dynamic web applications with excellent support for client-side rendering.
  - **CSS Modules** will be used for styling to scope the CSS locally to components, avoiding global style conflicts and ensuring modularity.
  - **Mobile-first approach** using **Media Queries** to ensure a responsive design that adapts to all screen sizes.
- **Key Features**:
  - Interactive elements (quest selection, drag-and-drop interface) using Svelte's reactive system.
  - Real-time, **client-side validation** of routes. The route validation will happen on the user's device, ensuring faster feedback and reducing server load.
  - A clean, simple user interface using a minimalist design, prioritizing readability and ease of navigation.
  - **SvelteKit's routing system** will be used for smooth transitions between different pages or views if multiple pages are required.

### Backend (API & Database)
- **Technologies**:
  - The backend will also leverage **SvelteKit's server-side rendering** and API routes, allowing seamless integration between the frontend and backend. SvelteKit will handle both the frontend and backend logic within the same framework, offering a simplified, unified development environment. For database interaction, development will be simplified to using the LocalStorage APIs, until just before deployment when **Prisma** will be integrated and can be used to interface with a **NoSQL** (e.g., MongoDB) or **SQL database** (e.g., PostgreSQL).
  - Real-time route validation will be handled entirely on the client side using **SvelteKit's** reactive stores and built-in state management, ensuring quick feedback without backend communication unless required for data persistence.
  - **Authentication**: Authentication is undecided and will at a later date prior to MVP. Likely some form of **OAuth2** or **JWT**. During implementation assume unauthenticated users.
  - **Cloud Hosting**: Hosted on services like **AWS**, **Google Cloud**, or **Vercel** to ensure scalability and reliability.

### Real-Time Route Validation (Client-Side)
- **Functionality**:
  - Route validation will be handled entirely on the client side using **SvelteKit's** reactive system, ensuring quick feedback and a more responsive experience.
  - The system will check the selected quests against their prerequisites in real-time as the user builds their route.
  - **Quest Prerequisites** will be stored as JSON data and updated regularly for accuracy.

## Success Metrics
- **User Engagement**: Tracking the number of active users and frequency of return visits.
- **Route Creation Frequency**: How many routes are created, saved, and shared.
- **Route Validation Efficiency**: Time taken to validate routes and the percentage of users who successfully complete a validation without errors.
- **Mobile Usage**: Percentage of users accessing the tool from mobile devices.
- **User Satisfaction**: Feedback surveys, user reviews, and engagement on related community forums.

## Timeline and Milestones
- **Phase 1 (Planning & Design)**:
  - Define core features, initial wireframes, and UI/UX concepts (1 month).
  - Build MVP route-building system, validation logic, and basic UI (2 months).
- **Phase 2 (Development)**:
  - Develop backend services (user authentication, route storage) using **SvelteKit** (3 months).
  - Implement real-time route validation and mobile responsiveness (2 months).
  - Testing & QA phase (1 month).
- **Phase 3 (Launch & Post-Launch)**:
  - Initial release with MVP features (1 month).
  - Collect user feedback, fix bugs, and roll out improvements (ongoing).
  - Launch prewritten route templates and other enhancements based on user feedback (3-6 months).

---
