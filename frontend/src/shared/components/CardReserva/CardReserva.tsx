import React from "react";
import styles from "./CardReserva.module.css"; // Estilo separado

interface CardReservaProps {
  nomeCliente: string;
  horario: string;
  onExcluir: () => void;
}

const CardReserva: React.FC<CardReservaProps> = ({
  nomeCliente,
  horario,
  onExcluir,
}) => {
  return (
    <div className={styles.cardReserva}>
      <div className={styles.cardContent}>
        <p className={styles.clienteNome}>Nome do cliente</p>
        <p>{nomeCliente}</p>
        <p className={styles.horario}>Horário: {horario}</p>
      </div>
      <div>
        <button className={styles.btnExcluir} onClick={onExcluir}>
          Excluir reserva
        </button>
      </div>
    </div>
  );
};

export default CardReserva;
