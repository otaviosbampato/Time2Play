import styles from "./RecuperaSenha3.module.css";
import { useState } from "react";

import Footer from "../../../shared/components/Footer/Footer.tsx";
import Axios from "../../../shared/context/Axios.tsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecuperaSenha() {
    const location = useLocation();
    const navigation = useNavigate();
    const email = location.state.email;

    const [senha, setSenha] = useState<string>();
    const [senhaConfirmada, setSenhaConfirmada] = useState<string>();

    const redefinirSenha = async () => {
        if (senha !== senhaConfirmada) {
            window.alert("Senhas diferentes");
            return;
        }

        try {
            const response = await Axios.post("auth/recuperarSenha", {
                email,
                newPassword: senha
            });

            console.log(response.data);

            console.log("Senha trocada com sucesso");
            window.alert("Senha trocada com sucesso");

            navigation("/");
        } catch (error) {
            console.log(error);
            window.alert("Erro ao recuperar senha");
        }
    };

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
                    <h2 className={styles.title}>Recuperação de Senha</h2>
                    <div className={styles.circle}>
                        <img
                            className={styles.lock}
                            src="src/assets/lock.png"
                            alt="Cadeado"
                        />
                    </div>
                    <p className={styles.subtitle}>
                        Insira a nova senha e confirme abaixo.
                    </p>
                    <input
                        type="password"
                        placeholder="Senha"
                        className={styles.input}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                        className={styles.input}
                        onChange={(e) => setSenhaConfirmada(e.target.value)}
                    />
                    <button className={styles.botaoContinuar} onClick={redefinirSenha}>
                        <p className={styles.continuar}>Continuar</p>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
