# SidePageRepairPage

This project is a recreation of the SidePageRepairPage component based on a Figma design, featuring a fully interactive interface with queue management, drag-and-drop inventory/crafting table, and history tracking.

---

## Features

### Tabs System
- Three tabs at the top: **Queue**, **Table**, and **History**.
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
- **Added a Queue Add Form** to demonstrate the mechanism of adding new items dynamically to the queue.

### Table & Inventory (Drag and Drop)
- Inventory and Crafting Table support drag-and-drop operations.
- Items can be moved between the two sections.
- Supports moving full or partial stacks.
- Quantities update correctly in both source and destination.

### History Tab
- Displays history cards consistent with the Figma design.
- Fully responsive layout.

---

## Technologies Used

- Frontend framework: [React / Vue / Svelte] *(specify your choice here)*
- State management: *(e.g., Zustand, Redux, Vuex, or local state)*
- Styling: *(e.g., Tailwind CSS, CSS Modules, or plain CSS)*
- Drag and Drop: *(e.g., React DnD, Vue Draggable, or native HTML5 drag-and-drop)*

---

## Setup & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sidepage-repair-app.git
```
