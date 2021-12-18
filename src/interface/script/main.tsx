import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loader, HUD } from "./pages";
import "../style/main.scss";

ReactDOM.render(
  <Router>
    <Routes>
      <Route index element={<Loader />} />
      <Route path="/hud" element={<HUD />} />
    </Routes>
  </Router>,
  document.getElementById("root"),
);
