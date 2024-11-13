import { Route , Routes, Navigate} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import LivePage from "./pages/LivePage"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AdminRegister from "./pages/AdminRegister";
import ResultsPage from "./pages/ResultsPage"
import { SessionContextProvider } from "./context/SessionContext"

function App() {
  const {user} = useContext(AuthContext);
  return (
    <>
    <SessionContextProvider user = {user}>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={user? <MainPage /> : <Login />} />
          <Route path="/register" element={user? <MainPage /> :<Register />} />
          <Route path="/admin-register" element={user? <MainPage /> :<AdminRegister />} />
          <Route path="/login" element={user? <MainPage /> :<Login />} />
          <Route path="/results" element={user?.isAdmin? <ResultsPage /> : <Navigate to="/" />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </SessionContextProvider>
    </>
  )
}

export default App
