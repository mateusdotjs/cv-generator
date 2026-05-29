# CV Generator

A modern, fast, and feature-rich CV/Resume Generator built with **React 19**, **Vite 7**, **Tailwind CSS v4**, and **TypeScript**. The application provides an interactive, live-preview editor allowing you to customize, reorder, and translate your resume dynamically and export it as a high-quality PDF.

---

## 🚀 Features

- **📄 Live PDF Preview & Render**: Real-time PDF updates using `@react-pdf/renderer` with a debounced compilation pipeline (400ms) to ensure smooth editing without UI lag.
- **🔄 Drag-and-Drop Reordering**: Sort sections (e.g., placing Experience above Education) or individual items (e.g., reordering jobs) seamlessly using `@dnd-kit`.
- **✍️ Rich Text Editor**: Format descriptions using an embedded **TipTap Rich Text Editor** for clean, bold, italicized, or bulleted resume summaries and details.
- **🌐 Internationalization (i18n)**: Switch between **English (en)** and **Portuguese (pt-BR)**. The system translates section titles and standard fields automatically.
- **📁 Import & Export JSON**: Export your resume data to a localized JSON backup file and import it anytime to resume editing on any device.
- **💾 Offline-First Persistence**: Powered by **Zustand** with `persist` middleware, automatically storing all CV modifications in `localStorage`.
- **🛠 Custom Sections**: Create flexible custom sections (either simple text blocks or detailed lists with timeline dates, titles, and institutions).

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) (utilizing the new React Compiler for automatic memoization)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/vite` for build-time compilation)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
- **Rich Text Editor**: [TipTap 3](https://tiptap.dev/)
- **PDF Generation**: [@react-pdf/renderer 4](https://react-pdf.org/)
- **Drag & Drop**: [@dnd-kit/core](https://dnd-kit.com/) & [@dnd-kit/sortable](https://dnd-kit.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **UI Components**: Radix UI + [Lucide React](https://lucide.dev/) for vector iconography

---

## 📁 Directory Structure

```text
src/
├── assets/         # Static assets (images, logos)
├── components/     # UI Components
│   ├── menu/       # Section toggles and actions menu
│   ├── resume-form/# Input forms, drag-and-drop sortable components, and TipTap editors
│   ├── resume-pdf/ # PDF output rendering, styles, and document definitions
│   └── ui/         # Reusable design system primitives (Button, Input, Popover, etc.)
├── hooks/          # Custom utility React hooks
├── i18n/           # Translation assets (English & Portuguese JSON translation files)
├── lib/            # Shared utilities (Tailwind class mergers, date parsers, JSON exporters)
├── pages/          # Layout Pages (Home Dashboard and Resume Editor)
├── stores/         # Zustand store and feature-sliced state files
└── types.ts        # Shared TypeScript type declarations
```

---

## 📦 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cv-generator.git
   cd cv-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To run the app in development mode:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To build the application for production:
```bash
npm run build
```
The optimized bundle will be created inside the `dist/` directory.

### Previewing the Build

Preview the production build locally:
```bash
npm run preview
```

### Code Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

---

## 🗃 Architecture & State Management

State is managed by a centralized Zustand store (`src/stores/cvStore.ts`) organized into discrete **slices** (`src/stores/slices/`):
* `resumesSlice`: Manages high-level resume documents, addition/deletion, and renaming.
* `sectionsSlice`: Stores dynamic ordering and configuration of CV sections.
* `personalDetailsSlice`, `summarySlice`, `educationSlice`, `experienceSlice`, `projectSlice`: Handle data inputs for standard resume structures.
* `customItemsSlice` & `customItemsSimpleSlice`: Manage user-created custom sections.

### Data Hydration & Date Parsing
Because `Date` objects are serialized to ISO strings in `localStorage`, a custom helper (`src/lib/convertDates.ts`) dynamically converts date strings back into proper Javascript `Date` objects on hydration. This ensures date calculations and picker components operate smoothly.
