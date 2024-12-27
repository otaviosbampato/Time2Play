import logo from "../../../assets/logo.png";
import logout from "../../../assets/logout.png";
import engrenagem from "../../../assets/engrenagem.png";
import { Link } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  currentTab: "Inicio" | "minhasQuadras" | "adicionarQuadra";
};

export default function Header({ currentTab }: HeaderProps) {
  return (
    <div className="header-container">
      <div>
        <img src={logo} className="header-logo" alt="Logo" />
      </div>
      <div className="header-nav">
        <Link
          className={`header-link ${currentTab === "Inicio" ? "active" : ""}`}
          to="/inicio"
        >
          Início
        </Link>
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
        <Link className="header-white-circle" to="/ConfiguracoesPerfilProprietario">
          <img src={engrenagem} className="header-icon" alt="Settings" />
        </Link>
        <Link className="header-green-circle" to="/">
          <img src={logout} className="header-icon" alt="Logout" />
        </Link>
      </div>
    </div>
  );
}
