import styles from "./CadastroCliente.module.css";
import { useState } from "react";

import Footer from "../../../../shared/components/Footer/Footer.tsx";
import Axios from "../../../../shared/context/Axios.tsx";

import { useNavigate } from "react-router-dom";

export default function CadastroCliente() {
  const [email, setEmail] = useState<string>();
  const [nome, setNome] = useState<string>();
  const [senha, setSenha] = useState<string>();

  const navigate = useNavigate();

  const registrar = async () => {
    window.alert(nome + " " + email + " " + senha);
    try {
      const response = await Axios.post("/cliente/registrar", {
        email,
        nome,
        senha,
      });
      window.alert("registrado com sucesso");
      console.log(response.data);
    } catch (error) {
      console.log("Erro");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.logoContainer}>
        <img
          src="src/assets/LOGOTRANSPARENTE.png"
          className={styles.logoTransparente}
        />
      </div>

      <div className={styles.centralizer}>
        <div className={styles.formBox}>
          <div style={{ height: "8%", paddingTop: "20px" }}>
            <img className={styles.logo} src="src/assets/logo-README.png" />
          </div>
          <h2 className={styles.title}>Cadastro</h2>
          <input
            type="text"
            placeholder="nome"
            className={styles.input}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="senha"
            className={styles.input}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className={styles.bottomTextDiv}>
            <span className={styles.bottomText}>
              Ao se cadastrar, você afirma que concorda com a nossa{" "}
              <a href="">Política de Privacidade</a> e{" "}
              <a href="https://google.com" target="_blank">
                Termos de Uso.
              </a>
            </span>
          </div>
          <button className={styles.botaoContinuar} onClick={registrar}>
            <p>cadastrar</p>
          </button>
          <div className={styles.divisor} />
          <a href="" className={styles.loginPrompt}>
            Já possui uma conta? Login
          </a>
          <button className={styles.botaoCadastrar} onClick={() => navigate("/cadastroProprietario")}>
            <p style={{ textDecoration: "underline" }}>
              quero anunciar quadras
            </p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
