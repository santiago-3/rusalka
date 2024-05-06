import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.js";
import Menu from "./Menu.js";
import EngToRus from "./engToRus.js";
import RusToEng from "./rusToEng.js";
import SEngToRus from "./sEngToRus.js";
import SRusToEng from "./sRusToEng.js";
import UserSettings from "./userSettings.js";
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route path="write-english-to-russian" element={<EngToRus />} />
                  <Route path="write-russian-to-english" element={<RusToEng />} />
                  <Route path="select-english-to-russian" element={<SEngToRus />} />
                  <Route path="select-russian-to-english" element={<SRusToEng />} />
                  <Route path="user-settings" element={<UserSettings />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
