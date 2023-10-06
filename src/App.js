import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import DisplayDocument from "./DisplayDocument";
import CRUD from './CRUD';
import './App.css';
import ReadDocuments from './ReadDocuments';
import CreateDocument from './CreateDocument';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/" element={<ReadDocuments />} />
        <Route path="/create" element={<CreateDocument />} />
        <Route path="/document/:id" element={<DisplayDocument />} />
        <Route path="/CRUD" element={<CRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
