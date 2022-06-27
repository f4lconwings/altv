import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Freeroam } from "./route/Freeroam";
import { Loader } from "./route/Loader";

export function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route index element={<Loader />} />
        <Route path="/freeroam" element={<Freeroam />} />
      </Routes>
    </Router>
  );
}
