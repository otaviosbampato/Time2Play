import styles from "./RecuperaSenha.module.css";
import { useState } from "react";

import Footer from "../../../shared/components/Footer/Footer.tsx";

import Axios from "../../../shared/context/Axios.tsx";
import { useNavigate } from "react-router-dom";

export default function RecuperaSenha() {
  const [email, setEmail] = useState<string>();
  const navigation = useNavigate();

  const enviarEmail = async () => {
    try {
      const response = await Axios.post("/auth/esqueceuSenha", {
        email,
      });
      console.log(response.data);
      window.alert("E-mail enviado com sucesso");
      navigation("/recuperaSenhaCodigo", { state: { email } });
    } catch (error) {
      window.alert("Erro ao enviar o e-mail");
      console.log(error);
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
          <h2 className={styles.title}>recuperação de senha</h2>
          <div className={styles.circle}>
            <img className={styles.lock} src="src/assets/lock.png"></img>
          </div>
          <input
            type="email"
            placeholder="insira o seu email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.botaoContinuar} onClick={enviarEmail}>
            <p className={styles.continuar}>continuar</p>
          </button>
          <div className={styles.divisor}>
            <div className={styles.barraCinza} />
            <h1 className={styles.divisorText}>OU</h1>
            <div className={styles.barraCinza} />
          </div>
          <button className={styles.botaoCadastrar}>
            <p className={styles.continuar}>cadastrar</p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
