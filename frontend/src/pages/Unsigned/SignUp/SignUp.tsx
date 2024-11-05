import "./SignUp.css";

import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigation = useNavigate();

    return (
        <div className="container">
            <div className="formContainer">
                <div className="formBox">
                    <img src="src/assets/logo-README.png" className="logo" />
                    <div>
                        
                    </div>
                    <h1 className="formTitle">Cadastro</h1>
                    <div className="firstInputBox">
                        <input placeholder="email" className="input" />
                    </div>
                    <div className="inputBox">
                        <input placeholder="senha" type="password" className="input" />
                    </div>
                    <div className="inputBox">
                        <input placeholder="confirmar senha" type="password" className="input" />
                    </div>
                    <div className="buttonDiv">
                        <button className="buttonCadastrar">
                            <p className="buttonText">cadastrar</p>
                        </button>
                    </div>
                    <div className="bottomTextDiv">
                        <span className="bottomText">
                            Ao se cadastrar, você afirma que concorda com a nossa
                            <a href=""> Política de Privacidade</a> e <a href="https://google.com" target="_blank">Termos de Uso.</a>
                        </span>
                    </div>
                    <div className="separator"></div>

                    <div className="bottomBottomTextDiv">
                        <span className="bottomText">
                            Já possui uma conta?
                            <a href="" onClick={() => navigation("/")}> Login</a>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}