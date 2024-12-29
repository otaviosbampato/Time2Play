import React from "react";
import styles from "./CardReview.module.css";

interface AvaliacaoCardProps {
  estrelas: number;
  comentario: string; 
  nome: string; 
}

const AvaliacaoCard: React.FC<AvaliacaoCardProps> = ({
  estrelas,
  comentario,
  nome,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.estrelas}>
        {Array.from({ length: estrelas }, (_, index) => (
          <span key={index} className={index < estrelas ? styles.active : ""}>
            ★
          </span>
        ))}
      </div>
      <p className={styles.comentario}>{comentario}</p>
      <div className={styles.usuario}>
        <p className={styles.nome}>{nome}</p>
      </div>
    </div>
  );
};

export default AvaliacaoCard;
