import './App.css';
import HomePage from './Components/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
