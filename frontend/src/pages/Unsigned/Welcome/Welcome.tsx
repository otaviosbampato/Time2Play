import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import Axios from "../../../shared/context/Axios";

import "./Welcome.css";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthProvider';

function Welcome() {

    const navigate = useNavigate();
    const auth = useAuth();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
    const [isModalOpen3, setIsModalOpen3] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const images = [
        "src/assets/futebol.jpg",
        "src/assets/voleipraia.jpg",
        "src/assets/basquete.jpg",
        "src/assets/beach.jpg",
        "src/assets/tenis.jpg",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword); // Alterna a visibilidade da senha
    };

  const login = async () => {
    try {
      const response = await Axios.post("auth/login", {
        email: email,
        senha: password,
      });

      if (response) {
        const token = response.data.token;

        auth.setEstaLogado(true);
        auth.setToken(token);
        auth.setId(response.data.usuario.id);

        if (response.data.usuario.tipoConta == "cliente") {
            auth.setIsProprietario(false);
            navigate("/verQuadras");
        } 

        if (response.data.usuario.tipoConta == "proprietario") {
            auth.setIsProprietario(true);
            navigate("/minhasQuadras");
        }
        
      }
      console.log(response.data);
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      window.alert("erro ao logar");
    }
  };


    return (
        <div className="background">

            <div className="metadeEsquerda">
                <img src="src/assets/logo-README.png" className="logo" />
                <div style={{ display: "flex", justifySelf: "center", flexDirection: 'column', marginTop: '3%' }}>
                    <h1 className="title">Procurando uma quadra?</h1>
                    <h2 className="sub-title">Achou!</h2>
                </div>

                <div className="formContainer">

                    <div className='formsDiv'>
                        <label className='formsTitle' htmlFor="">email</label>
                        <input className='input' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label className='formsTitle' htmlFor="">senha</label>

                        <div className='boxSenhaInput'>
                                <input
                                    className='inputSenha input'
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='mostrarSenha'
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                        </div>

                    </div>

                    <div className='formsDiv'>

                        <div style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between',
                            paddingTop: '3%', paddingBottom: '3%'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'transform 0.2s ease', transform: isChecked ? 'scale(1.05)' : 'scale(1)', }} onClick={() => setIsChecked(!isChecked)}>
                                <div>
                                    <input type="radio"style={{ 
                                        accentColor: '#01362a', 
                                        transition: 'transform 0.2s ease, background-color 0.2s ease', // Smooth animation
                                        transform: isChecked ? 'scale(1.2)' : 'scale(1)', // Scale-up effect
                                    }} 
                                    checked={isChecked} onChange={() => setIsChecked(!isChecked)}
                                    
                                    />
                                </div>
                                <div>
                                    <p className='manterLogado'>manter logado</p>
                                </div>
                            </div>
                            <button className="esqueceuSuaSenha" type="submit" onClick={() => navigate("/recuperaSenha")}>esqueceu sua senha?</button>
                        </div>

                    </div>


                    <div className='formsDiv'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                            <button className="formsButton" type="submit" onClick={login}>Login</button>
                            <button className="formsButton formsButtonRegistrar" type="submit" onClick={() => navigate("/cadastroCliente")}>Registrar</button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="metadeDireita">
                <div
                    className={`image ${currentImageIndex === 0 ? "visible" : ""}`}
                    style={{ backgroundImage: `url(${images[0]})` }}
                ></div>
                <div
                    className={`image ${currentImageIndex === 1 ? "visible" : ""}`}
                    style={{ backgroundImage: `url(${images[1]})` }}
                ></div>
                <div
                    className={`image ${currentImageIndex === 2 ? "visible" : ""}`}
                    style={{ backgroundImage: `url(${images[2]})` }}
                ></div>
                <div
                    className={`image ${currentImageIndex === 3 ? "visible" : ""}`}
                    style={{ backgroundImage: `url(${images[3]})` }}
                ></div>
                <div
                    className={`image ${currentImageIndex === 4 ? "visible" : ""}`}
                    style={{ backgroundImage: `url(${images[4]})` }}
                ></div>
            </div>

            {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal">
                    <h2 className="modal-title">Recuperação de Senha</h2>
                    <div className='modal-input-container'>
                        <p className='modal-text'>Digite seu e-mail</p>
                        <input
                            type="email"
                            className="modal-input"
                        />
                    </div>
                    <div className='modal-button-container'>
                        <button className="modal-button" onClick={() => {
                            setIsModalOpen2(true) 
                            setIsModalOpen(false)
                        }}> Enviar </button>
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
            )}

            
            {isModalOpen2 && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 className="modal-title">Verificação!</h2>
                        <div className='modal-input-container'>
                            <p className='modal-text'>Digite o token no seu e-mail</p>
                            <input
                                type="email"
                                className="modal-input"
                            />
                        </div>
                        <div className='modal-button-container'>
                        <button className="modal-button" onClick={() => {
                            setIsModalOpen3(true) 
                            setIsModalOpen2(false)
                        }}> Próximo </button>
                            <button className="modal-close-button" onClick={() => setIsModalOpen2(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen3 && (
                <div className="modal-overlay">
                    <div className="modal-larger">
                        <h2 className="modal-title">Troque sua senha!</h2>
                        <div className='modal-input-container'>
                            <p className='modal-text'>Digite sua nova senha</p>
                            <input
                                type="password"
                                className="modal-input"
                            />
                            <p className='modal-text'>Confirme sua senha</p>
                            <input
                                type="password"
                                className="modal-input"
                            />
                        </div>
                        <div className='modal-button-container'>
                            <button className="modal-button" onClick={() => setIsModalOpen3(false)}> Confirmar </button>
                            <button className="modal-close-button" onClick={() => setIsModalOpen3(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default Welcome;