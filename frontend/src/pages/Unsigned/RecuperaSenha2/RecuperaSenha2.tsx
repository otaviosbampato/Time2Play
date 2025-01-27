import styles from "./RecuperaSenha2.module.css";
import { useState } from "react";

import Footer from "../../../shared/components/Footer/Footer.tsx";
import Axios from "../../../shared/context/Axios.tsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecuperaSenha() {
    const location = useLocation();
    const navigation = useNavigate();
    const email = location.state?.email || ""; // Verificação para evitar erros

    const [codigo, setCodigo] = useState("");

    const validarCodigo = async () => {
        try {
            // Valida o código
            const response = await Axios.post("auth/validarCodigo", {
                email,
                token: codigo,
            });

            console.log("Código validado com sucesso", response.data);
            window.alert("Código validado! Redirecionando...");

            // Redireciona para a página de redefinição de senha
            navigation("/RecuperarSenha3", { state: { email, codigo } });
        } catch (error) {
            console.error("Erro ao validar código", error);
            window.alert("Código inválido ou expirado");
        }
    };

    const irParaRegistrar = () => {
        navigation("/CadastroCliente")
    }
    return (
        <div className={styles.background}>
            <div className={styles.logoContainer}>
                <img
                    src="src/assets/LOGOTRANSPARENTE.png"
                    className={styles.logoTransparente}
                    alt="Logo"
                />
            </div>

            <div className={styles.centralizer}>
                <div className={styles.formBox}>
                    <h2 className={styles.title}>Recuperação de senha</h2>
                    <div className={styles.circle}>
                        <img
                            className={styles.lock}
                            src="src/assets/lock.png"
                            alt="Cadeado"
                        />
                    </div>
                    <p className={styles.subtitle}>
                        Insira o código enviado ao seu email.
                    </p>
                    <input
                        type="text"
                        placeholder="Código"
                        className={styles.input}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                    <button className={styles.botaoContinuar} onClick={validarCodigo}>
                        <p className={styles.continuar}>Continuar</p>
                    </button>
                    <div className={styles.divisor}>
                        <div className={styles.barraCinza} />
                        <h1 className={styles.divisorText}>OU</h1>
                        <div className={styles.barraCinza} />
                    </div>
                    <button
                        className={styles.botaoCadastrar}
                        onClick={irParaRegistrar}
                    >
                        <p className={styles.continuar}>Cadastrar</p>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
