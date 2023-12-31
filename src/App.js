import Header from "./components/Header";
import "./App.scss";
import TableUser from "./components/TableUser";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<TableUser />}></Route>
          </Routes>
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
