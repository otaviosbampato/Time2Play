import styles from "./VerReservas.module.css";

import Header from "../../../../shared/components/HeaderProprietario/Header";

import { useState } from "react";
import CardReservaCliente from "../../../../shared/components/CardReservaCliente/CardReservaCliente";
import DateSelector from "../../../../shared/components/DateSelector/DateSelector";
import futebol from "../../../../assets/futebol.jpg"

export default function VerReservas() {
  const [selectedDate, setSelectedDate] = useState<String>("");

  const reservas = [
    { id: 1, foto: futebol, nomeQuadra: "quadra de fut", nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 2, foto: futebol, nomeQuadra: "quadra de baska", nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 3, foto: futebol, nomeQuadra: "quadra de beach", nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 4, foto: futebol, nomeQuadra: "quadra de volei", nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 5, foto: futebol, nomeQuadra: "quadra de paosd", nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 6, foto: futebol, nomeQuadra: "quadra de yes", nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 7, foto: futebol, nomeQuadra: "quadra de no", nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 8, foto: futebol, nomeQuadra: "quadra de t", nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 9, foto: futebol, nomeQuadra: "quadra de s", nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 10, foto: futebol, nomeQuadra: "quadra de v", nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
    { id: 11, foto: futebol, nomeQuadra: "quadra de fu", nomeCliente: "João Silva", horario: "12h - 13h" },
    { id: 12, foto: futebol, nomeQuadra: "quadra de futt", nomeCliente: "Maria Oliveira", horario: "13h - 14h" },
  ];

  const handleExcluirReserva = (id: number) => {
    console.log(`Reserva com ID ${id} excluída.`);
  };

  return (
    <div className={styles.container}>
      <Header currentTab="minhasQuadras" />

      <h2 className={styles.titulo}>Reservas realizadas por você</h2>

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
          <CardReservaCliente
            key={reserva.id}
            foto={reserva.foto}
            nomeQuadra={reserva.nomeQuadra}
            nomeCliente={reserva.nomeCliente}
            horario={reserva.horario}
            onExcluir={() => handleExcluirReserva(reserva.id)}
          />
        ))}
      </div>
    </div>
  );
}