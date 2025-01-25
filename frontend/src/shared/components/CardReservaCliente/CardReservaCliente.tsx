import React from "react";
import styles from "./CardReservaCliente.module.css";

interface CardReservaProps {
  nomeCliente: string;
  horario: string;
  nomeQuadra: string;
  foto: any;
  onExcluir: () => void;
}

const CardReservaCliente: React.FC<CardReservaProps> = ({
  nomeCliente,
  nomeQuadra,
  foto,
  horario,
  onExcluir,
}) => {
  return (
    <div className={styles.cardReserva}>
      <div className={styles.cardContent}>
        <p className={styles.nomeQuadra}>{nomeQuadra}</p>
        <p className={styles.horario}>Horário: {horario}</p>
        <p className={styles.nomeCliente}>Nome do cliente: {nomeCliente}</p>
        <button className={styles.btnExcluir} onClick={onExcluir}>
          Excluir reserva
        </button>
      </div>
      <img src={foto} className={styles.fotoCard} alt="Quadra" />
    </div>
  );
};

export default CardReservaCliente;
