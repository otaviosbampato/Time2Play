import Header from "../../../../shared/components/HeaderProprietario/Header";

import { useState } from "react";
import CardReserva from "../../../../shared/components/CardReserva/CardReserva";
import DateSelector from "../../../../shared/components/DateSelector/DateSelector";
import styles from "./VerReservas.module.css";

export default function VerReservas() {
  const [selectedDate, setSelectedDate] = useState<String>("");

  const reservas = [
    { id: 1, nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 2, nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 3, nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 4, nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 5, nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 6, nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 7, nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 8, nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 9, nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 10, nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 11, nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 12, nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
  ];

  const handleExcluirReserva = (id: number) => {
    console.log(`Reserva com ID ${id} excluída.`);
  };

  return (
    <div className={styles.container}>
      <Header currentTab="minhasQuadras" />
      <h2 className={styles.titulo}>Reservas realizadas na quadra</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: 40
        }}
      >
        <DateSelector onChange={(date: String) => setSelectedDate(date)} />
      </div>

      <div className={styles.reservasContainer}>
        {reservas.map((reserva) => (
          <CardReserva
            key={reserva.id}
            nomeCliente={reserva.nomeCliente}
            horario={reserva.horario}
            onExcluir={() => handleExcluirReserva(reserva.id)}
          />
        ))}
      </div>
    </div>
  );
}
