import Users from "./components/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Albums from "./components/Albums";
import Photos from "./components/Photos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="/photos/:id" element={<Photos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
