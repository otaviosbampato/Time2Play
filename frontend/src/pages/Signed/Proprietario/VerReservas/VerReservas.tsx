import Header from "../../../../shared/components/HeaderProprietario/Header";
import { useEffect, useState } from "react";
import CardReserva from "../../../../shared/components/CardReserva/CardReserva";
import DateSelector from "../../../../shared/components/DateSelector/DateSelector";
import styles from "./VerReservas.module.css";
import Axios from "../../../../shared/context/Axios";
import { useAuth } from "../../../../shared/context/AuthProvider";
import { useLocation } from "react-router-dom";

interface Horario {
  idHorario: number;
  dataInicio: string;
  dataFim: string;
  reservaId: number;
}

interface Cliente {
  idCliente: number;
  email: string;
  nome: string;
}

interface Transacao {
  idTransacao: number;
  valor: number;
  status: string;
  metodoPagamento: string;
  data: string;
}

interface Reserva {
  idReserva: number;
  data: string;
  clienteId: number;
  quadraId: number;
  cliente: Cliente;
  horarios: Horario[];
  transacao: Transacao;
}

export default function VerReservas() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const { token } = useAuth();

  const location = useLocation();

  const idQuadra = location.state;

  useEffect(() => {
    getReservas();
  }, []);

  const getReservas = async () => {
    try {
      const response = await Axios.get(`/reserva/quadra/${idQuadra}`, {
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

  const handleExcluirReserva = (id: number) => {
    try {
      const response = Axios.delete(`/reserva/excluir/${idQuadra}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response);
      window.alert("Reserva excluída com sucesso")
    } catch (error) {
      console.log(error)
      window.alert("Erro ao excluir reserva")
    }
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
          marginBottom: 40,
        }}
      >
        <DateSelector onChange={(date: string) => setSelectedDate(date)} />
      </div>

      <div className={styles.reservasContainer}>
        {reservas.map((reserva) => (
          <CardReserva
            key={reserva.idReserva}
            nomeCliente={reserva.cliente.nome}
            horario={`${new Date(reserva.horarios[0].dataInicio).toLocaleTimeString()} - ${new Date(
              reserva.horarios[reserva.horarios.length - 1].dataFim
            ).toLocaleTimeString()}`}
            onExcluir={() => handleExcluirReserva(reserva.idReserva)}
          />
        ))}
      </div>
    </div>
  );
}
