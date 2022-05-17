import Users from "./components/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Albums from "./components/Albums";
import Photos from "./components/Photos";
import Tree from "./components/Tree";
import treeData from "../src/data.js";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Tree data={treeData} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Users />} />
    //     <Route path="/albums/:id" element={<Albums />} />
    //     <Route path="/photos/:id" element={<Photos />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
