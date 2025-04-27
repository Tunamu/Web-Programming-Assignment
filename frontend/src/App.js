import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./pages/NavBar";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import QuizPage from "./pages/QuizPage";


function App() {
  return (
    <div className="App">
        <NavBar/>
      <Routes>
          <Route path="/SignUp" element={<LoginPage/>} />
          <Route path="/" element={<MainPage/>} />
          <Route path="/Quiz" element={<QuizPage/>} />
      </Routes>
    </div>
  );
}

export default App;
