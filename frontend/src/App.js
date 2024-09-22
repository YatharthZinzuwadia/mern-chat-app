import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Use element prop */}
        <Route path="/chats" element={<Chatpage />} /> {/* Use element prop */}
      </Routes>
    </div>
  );
}

export default App;
