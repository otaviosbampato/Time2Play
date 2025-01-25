import styles from "./RecuperaSenha2.module.css";
import {useState} from "react";

import Footer from "../../../shared/components/Footer/Footer.tsx";


import Axios from "../../../shared/context/Axios.tsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecuperaSenha() {
    const location = useLocation();
    const navigation = useNavigate();
    const email = location.state.email;

    const [codigo, setCodigo] = useState<String>();
    const [senha, setSenha] = useState<String>();
    const [senhaConfirmada, setSenhaConfirmada] = useState<String>();

    const redefinirSenha = async () => {

        if (senha !== senhaConfirmada) {
            window.alert("Senhas diferentes")
            return;
        }

        try {
            const response = await Axios.post("auth/recuperarSenha", {
                email, token: codigo, newPassword: senha
            })

            console.log(response.data);

            console.log("Senha trocada com sucesso")
            window.alert("Senha trocada com sucesso")

            navigation("/");
        } catch (error) {
            console.log(error)
            window.alert("Erro ao recuperar senha")
        }
    }
    
    return (
        <div className={styles.background}>

            <div className={styles.logoContainer}>
                <img src="src/assets/LOGOTRANSPARENTE.png" className={styles.logoTransparente} />
            </div>

            <div className={styles.centralizer}>

                
                <div className={styles.formBox}>
                    <h2 className={styles.title}>recuperação de senha</h2>
                    <div className={styles.circle}>
                        <img className={styles.lock} src="src/assets/lock.png"></img>
                    </div>
                    <p className={styles.subtitle}>insira o código enviado ao seu email.</p>
                    <input type="text" placeholder="código" className={styles.input} onChange={(e) => setCodigo(e.target.value)}
                    />
                    <input type="password" placeholder="senha" className={styles.input} onChange={(e) => setSenha(e.target.value)}/>
                    <input type="password" placeholder="confirmar senha" className={styles.input} onChange={(e) => setSenhaConfirmada(e.target.value)}/>
                    <button className={styles.botaoContinuar} onClick={redefinirSenha}>
                        <p className={styles.continuar}>continuar</p>
                    </button>
                    <div className={styles.divisor}>
                        <div className={styles.barraCinza}/>
                        <h1 className={styles.divisorText}>OU</h1>
                        <div className={styles.barraCinza}/>
                    </div>
                    <button className={styles.botaoCadastrar}>
                        <p className={styles.continuar}>cadastrar</p>
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
