import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ProjectPage from "./pages/Projects/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;