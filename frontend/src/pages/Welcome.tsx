import React, { useState, useEffect } from 'react';

import "./Welcome.css";

function Welcome() {

    const [showPassword, setShowPassword] = useState(false);

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


    return (
        <div className="background">

            <div className="metadeEsquerda">
                <img src="src/assets/logo1.png" className="logo" />
                <div style={{ display: "flex", justifySelf: "center", flexDirection: 'column', marginTop: '2%' }}>
                    <h1 className="title">Procurando uma quadra?</h1>
                    <h2 className="sub-title">Achou!</h2>
                </div>

                <div className="formContainer">
                    <div className='formsDiv'>
                        <label className='formsTitle' htmlFor="">email</label>
                        <input className='input' type="text" />

                        <label className='formsTitle' htmlFor="">senha</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className='input'
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>

                    <div className='formsDiv'>

                        <div style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between',
                            paddingTop: '3%', paddingBottom: '3%'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <input type="radio" />
                                <p className='manterLogado'>manter logado</p>
                            </div>
                            <button className="esqueceuSuaSenha" type="submit">esqueceu sua senha?</button>
                        </div>

                    </div>


                    <div className='formsDiv'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                            <button className="formsButton" type="submit">Login</button>
                            <button className="formsButton formsButtonRegistrar" type="submit">Registrar</button>
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


        </div >
    )
}

export default Welcome;