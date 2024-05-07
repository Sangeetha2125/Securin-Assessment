import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home";
import IndividualCVE from "./pages/IndividualCVE";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/cves/list" />} />
        <Route index path="/cves/list" element={<Home />} />
        <Route path="/cves/:id" element={<IndividualCVE />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
