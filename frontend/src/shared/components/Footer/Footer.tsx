import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <img src="src/assets/logofooter.png" className={styles.logo} />
            </div>
            <div>
                <img src="src/assets/copyright.png" className={styles.copyright} />
            </div>
            
            <p className={styles.dataEDireitos}>2025 - Todos os direitos reservados.</p>
            <div className={styles.divLinks}>

                <a href="https://www.figma.com/design/PimWxqrNvyG3GYz03faFwm/Time2Play?node-id=266-537&t=rYb5RVJY30BPEYXU-0" className={styles.politicaPrivacidade} target="_blank">Política de privacidade</a>
                <a href="https://www.figma.com/design/PimWxqrNvyG3GYz03faFwm/Time2Play?node-id=266-537&t=rYb5RVJY30BPEYXU-0" className={styles.politicaPrivacidade} target="_blank">Cookies</a>
                <a href="https://www.figma.com/design/PimWxqrNvyG3GYz03faFwm/Time2Play?node-id=266-537&t=rYb5RVJY30BPEYXU-0" className={styles.politicaPrivacidade} target="_blank">Termos de uso</a>
            </div>
        </footer>
    )
}