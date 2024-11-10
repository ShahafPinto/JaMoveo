import { Route , Routes, Navigate} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import LivePage from "./pages/LivePage"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="text-secondary">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
