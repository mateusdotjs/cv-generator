import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import ResumePage from "./pages/resume";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<ResumePage />} />
    </Routes>
  );
}

export default App;
