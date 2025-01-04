import styles from "./RecuperaSenha.module.css";

import Footer from "../../../shared/components/Footer/Footer";

export default function RecuperaSenha() {
    return (
        <div className={styles.background}>
            <div className={styles.centralizer}>

                <div className={styles.logoContainer}>
                    <img src="src/assets/LOGOTRANSPARENTE.png" className={styles.logoTransparente} />
                </div>

                <div className={styles.formBox}>
                    <h2 className={styles.title}>recuperação de senha</h2>
                    <div className={styles.circle}>
                        <img className={styles.lock} src="src/assets/lock.png"></img>
                    </div>
                    <input type="email" placeholder="insira o seu email" className={styles.input}/>
                    <button className={styles.botaoContinuar}>
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