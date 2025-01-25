import { useState } from "react";
import logo from "../../../assets/logo.png";
import logout from "../../../assets/logout.png";
import engrenagem from "../../../assets/engrenagem.png";
import { Link } from "react-router-dom";
import "./Header.css";

import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  currentTab: "Inicio" | "minhasQuadras" | "adicionarQuadra";
};

export default function Header({ currentTab }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = useAuth();
  const navigation = useNavigate()

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
  
      auth.setEstaLogado(false);
      auth.setIsProprietario(false)
      auth.setToken("");
  
      console.log("Usuário deslogado");
  
      navigation("/");
    } catch (e) {
      console.error("Erro ao realizar logout:", e);
    }
  };

  return (
    <div className="header-container">
      <div className="header-logo-menu">
        <img src={logo} className="header-logo" alt="Logo" />
        <button className="header-menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className={`header-nav ${menuOpen ? "open" : ""}`}>
        <div className="header-content">
          <div className="header-links">
            <Link
              className={`header-link ${
                currentTab === "minhasQuadras" ? "active" : ""
              }`}
              to="/minhasQuadras"
            >
              Minhas quadras
            </Link>
            <Link
              className={`header-link ${
                currentTab === "adicionarQuadra" ? "active" : ""
              }`}
              to="/adicionarQuadra"
            >
              Adicionar quadra
            </Link>
          </div>
          <div className="header-icons">
            <Link to="/ConfiguracoesPerfilProprietario">
              <img
                src={engrenagem}
                className="header-icon header-white-circle"
                alt="Settings"
              />
            </Link>
            <Link to="/" onClick={handleLogout}>
              <img
                src={logout}
                className="header-icon header-green-circle"
                alt="Logout"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
