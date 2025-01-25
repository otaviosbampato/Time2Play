import styles from "./VerReservas.module.css";

import Header from "../../../../shared/components/HeaderCliente/Header";

import { useEffect, useState } from "react";
import CardReservaCliente from "../../../../shared/components/CardReservaCliente/CardReservaCliente";
import DateSelector from "../../../../shared/components/DateSelector/DateSelector";
import futebol from "../../../../assets/futebol.jpg";

import Axios from "../../../../shared/context/Axios";
import { useAuth } from "../../../../shared/context/AuthProvider";

interface Quadra {
  idQuadra: number;
  nomeQuadra: string;
  precoHora: number;
  cidade: string;
  estado: string;
  endereco: string;
  esporte: string;
  fotos: string[];
  proprietarioId: number;
}

interface Horario {
  idHorario: number;
  dataInicio: string;
  dataFim: string;
  reservaId: number;
}

interface Cliente {
  email: string;
  nome: string;
}

interface Reserva {
  idReserva: number;
  data: string;
  clienteId: number;
  transacaoId: number;
  quadraId: number;
  quadra: Quadra;
  horarios: Horario[];
  cliente: Cliente;
}

export default function VerReservas() {
  const { token } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    getReservas();
  }, []);

  const getReservas = async () => {
    try {
      const response = await Axios.get("/reserva/cliente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  const handleExcluirReserva = async (id: number) => {
    try {
      const response = await Axios.delete(`/reserva/cancelar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      window.alert("Reserva cancelada com sucesso ");
    } catch (error) {
      window.alert("Erro ao excluir reserva");
    }
  };

  return (
    <div className={styles.container}>
      <Header currentTab="quadrasAlugadas" />

      <h2 className={styles.titulo}>Reservas realizadas por você</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: 40,
        }}
      >
        <DateSelector onChange={(date: string) => setSelectedDate(date)} />
      </div>

      <div className={styles.reservasContainer}>
        {reservas.map((reserva) => (
          <CardReservaCliente
            key={reserva.idReserva}
            foto={reserva.quadra.fotos[0] || futebol} // Usa a primeira foto ou imagem padrão
            nomeQuadra={reserva.quadra.nomeQuadra}
            nomeCliente={reserva.cliente.nome} // Ajusta para o identificador do cliente
            horario={reserva.horarios
              .map(
                (horario) =>
                  `${new Date(
                    horario.dataInicio
                  ).toLocaleTimeString()} - ${new Date(
                    horario.dataFim
                  ).toLocaleTimeString()}`
              )
              .join(", ")} // Formata os horários como string
            onExcluir={() => handleExcluirReserva(reserva.idReserva)}
          />
        ))}
      </div>
    </div>
  );
}
