import Home from "./pages/home";
import Footer from "./components/Footer";
import Signup from "./pages/signup";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <div id="page-container">

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    <Footer />

    </div>
  );
}

export default App;
