# SidePageRepairPage

This project is a recreation of the SidePageRepairPage component based on a Figma design, featuring a fully interactive interface with queue management, drag-and-drop inventory/crafting table, and history tracking.

---

## Features

### Tabs System
- Three tabs at the top: Queue, Table, and History.
- Switching tabs updates the displayed content dynamically without page reload.

### Queue Tab
- Displays multiple queue items representing repair jobs.
- Each item shows:
  - Item name
  - Start time
  - End time
  - Remaining time (counting down)
  - Progress bar (%), updating in real-time.
- Progress automatically increases over time based on start/end times.
- Items auto-remove when progress reaches 100%.

### Table & Inventory (Drag and Drop)
- Inventory and Crafting Table support drag-and-drop operations.
- Items can be moved between the two sections.
- Supports moving full or partial stacks.
- Quantities update correctly in both source and destination.

### History Tab
- Displays history cards consistent with the Figma design.
- Fully responsive layout.

---

## Notice

- A **Queue Add Form** has been added to demonstrate how new items can be dynamically added to the queue for testing and demonstration purposes.

---

## Technologies Used

- Frontend framework: [React / Vue / Svelte] *(specify your choice here)*
- State management: *(e.g., Zustand, Redux, Vuex, or local state)*
- Styling: *(e.g., Tailwind CSS, CSS Modules, or plain CSS)*
- Drag and Drop: *(e.g., React DnD, Vue Draggable, or native HTML5 drag-and-drop)*

---

## Setup & Run

1. Clone the repository:  
   `git clone https://github.com/your-username/sidepage-repair-app.git`

2. Navigate to the project directory:  
   `cd sidepage-repair-app`

3. Install dependencies:  
   `npm install`

4. Run the development server:  
   `npm start`

5. Open `http://localhost:3000` in your browser to view the app.

---

## Edge Cases Handling

Please refer to the included **SidePageRepairPage_EdgeCaseDocumentation.docx** file for detailed documentation of all edge cases addressed in this project. This includes:

- Queue timing and auto-removal behavior  
- Drag-and-drop partial stack handling and invalid drops  
- Responsive UI edge cases  
- Accessibility considerations and keyboard navigation support

---

## Notes

- The app is fully responsive and tested on multiple screen sizes.  
- Drag-and-drop provides visual feedback for valid drop zones and quantity updates.  
- Queue timers use accurate time-based calculations to ensure progress stays consistent across re-renders.

---

## Contact

For questions or feedback, please contact: [Your Email Address]

---

Thank you for reviewing my submission!
