import React from "react";
import Header from "../../../../shared/components/HeaderCliente/Header";
import styles from "./ConfiguracoesPerfil.module.css";

import historico from "../../../../assets/historico.png";
import cadeado from "../../../../assets/cadeado.png";
import caneta from "../../../../assets/caneta.png";

interface ConfiguracoesPerfilProps {
  nome: string;
  email: string;
  senha: string;
}

const ConfiguracoesPerfil: React.FC<ConfiguracoesPerfilProps> = ({
  nome,
  email,
  senha,
}) => {
  const [nomeInput, setNomeInput] = React.useState(nome);
  const [emailInput, setEmailInput] = React.useState(email);
  const [senhaInput, setSenhaInput] = React.useState(senha);

  const handleSalvar = () => {
    console.log("Salvo");
  };

  return (
    <>
      <Header currentTab="Inicio" />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul className={styles.menu}>
            <li className={`${styles.menuItem} ${styles.active}`}>
              <img src={caneta} alt="Editar perfil" className={styles.icon} />
              Editar perfil
            </li>
            <li className={styles.menuItem}>
              <img src={cadeado} alt="Segurança" className={styles.icon} />
              Segurança
            </li>
            <li className={styles.menuItem}>
              <img src={historico} alt="Meu histórico" className={styles.icon} />
              Meu histórico
            </li>
          </ul>
        </aside>
        <main className={styles.main}>
          <form className={styles.form}>
            <div className={styles.header}>
              <h1 className={styles.title}>Editar perfil</h1>
              <img
                src="https://plus.unsplash.com/premium_photo-1677087121676-2acaaae5b3c8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2VtJTIwcXVhZHJhZGF8ZW58MHx8MHx8fDA%3D"
                alt="Imagem de perfil"
                className={styles.profileImage}
              />
            </div>
            <label className={styles.label}>
              Nome
              <input
                type="text"
                value={nomeInput}
                onChange={(e) => setNomeInput(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Email
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Senha
              <input
                type="password"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
                className={styles.input}
              />
            </label>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.saveButton}>
                Salvar
              </button>
              <button type="button" className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default ConfiguracoesPerfil;
