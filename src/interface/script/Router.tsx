import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Overlay } from "./pages/HUD";
import { Loader } from "./pages/Loader";

export function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route index element={<Loader />} />
        <Route path="/hud" element={<Overlay />} />
      </Routes>
    </Router>
  );
}
