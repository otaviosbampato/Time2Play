import styles from "./CadastroCliente.module.css";

import Footer from "../../../../shared/components/Footer/Footer.tsx";
import InputSenha from "../../../../shared/components/InputSenha/InputSenha.tsx";

export default function CadastroCliente() {
    return (
        <div className={styles.background}>

            <div className={styles.logoContainer}>
                <img src="src/assets/LOGOTRANSPARENTE.png" className={styles.logoTransparente} />
            </div>

            <div className={styles.centralizer}>


                <div className={styles.formBox}>
                    <div style={{ height: "8%", paddingTop: "20px" }}>
                        <img className={styles.logo} src="src/assets/logo-README.png" />
                    </div>
                    <h2 className={styles.title}>Cadastro</h2>
                    <input type="text" placeholder="nome" className={styles.input} />
                    <input type="email" placeholder="email" className={styles.input} />
                    <input type="password" placeholder="senha" className={styles.input} />
                    <div className={styles.bottomTextDiv}>
                        <span className={styles.bottomText}>
                            Ao se cadastrar, você afirma que concorda com a nossa <a href="">Política de Privacidade</a> e <a href="https://google.com" target="_blank">Termos de Uso.</a>
                        </span>
                    </div>
                    <button className={styles.botaoContinuar}>
                        <p>cadastrar</p>
                    </button>
                    <div className={styles.divisor}/>
                    <a href="" className={styles.loginPrompt}>Já possui uma conta? Login</a>
                    <button className={styles.botaoCadastrar}>
                        <p style={{textDecoration: "underline"}}>quero anunciar quadras</p>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}