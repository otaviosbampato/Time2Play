import styles from "./InputSenha.module.css"
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type InputSenhaProps = { placeholdersenha: string, senha: string,
    setSenha: React.Dispatch<React.SetStateAction<string>>;  }

export default function InputSenha({ placeholdersenha, senha, setSenha }: InputSenhaProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword); // Alterna a visibilidade da senha
    };

    return (
        <div className={styles.inputContainer}>
            <input placeholder={placeholdersenha} className={styles.input} type={showPassword ? "text" : "password"}/>
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.mostrarSenha}
            >
                {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
        </div>
    )
}