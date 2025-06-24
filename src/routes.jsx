import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/page";
import Filme from "./pages/Filme/page";
import Header from "./components/Header/page";
import Erro from "./pages/Erro/page";
import Favoritos from "./pages/Favoritos/page";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
