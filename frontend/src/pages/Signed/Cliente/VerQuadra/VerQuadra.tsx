import { useLocation } from "react-router-dom";
import styles from "./VerQuadra.module.css";
import { useState, useEffect } from "react";
import Axios from "../../../../shared/context/Axios";
import { useAuth } from "../../../../shared/context/AuthProvider";
import Modal from "react-modal";
import Header from "../../../../shared/components/HeaderCliente/Header";
import futebol from "../../../../assets/futebol.jpg";

// Configuração para acessibilidade do react-modal
Modal.setAppElement("#root");

interface Reserva {
  horarios: { dataInicio: string }[];
}

interface Quadra {
  idQuadra: number;
  fotos: { url: string }[];
  nomeQuadra: string;
  endereco: string;
  cidade: string;
  estado: string;
  precoHora: number;
}

export default function VerQuadra() {
  const location = useLocation();
  const { token, id } = useAuth();

  const quadra: Quadra = location.state.quadra; // Recebe os dados da quadra via state

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [availableHours, setAvailableHours] = useState<
    { hour: string; isBooked: boolean }[]
  >([]);

  const realizarReservas = async () => {
    try {
      window.alert(quadra.idQuadra)
      const response = await Axios.post(`/reserva/cadastrar`, {
        clienteId: id,
        quadraId: quadra.idQuadra,
        horarios: selectedHours,
        valor: selectedHours.length * quadra.precoHora
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  const getReservas = async () => {
    try {
      const response = await Axios.get(`/reserva/quadra/${quadra.idQuadra}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openDateModal = () => {
    setIsDateModalOpen(true);
  };

  const closeDateModal = () => {
    setIsDateModalOpen(false);
  };

  const openHourModal = (date: string) => {
    setSelectedDate(date);
    setIsHourModalOpen(true);
  };

  const closeHourModal = () => {
    setIsHourModalOpen(false);
  };

  const handleDateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setSelectedDate(selected);
    closeDateModal();
    openHourModal(selected);
  };

  const toggleHourSelection = (hour: string) => {
    setSelectedHours((prevSelectedHours) =>
      prevSelectedHours.includes(hour)
        ? prevSelectedHours.filter((selectedHour) => selectedHour !== hour)
        : [...prevSelectedHours, hour]
    );
  };

  const generateHourSlots = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0") + ":00";
      const isBooked = reservas.some((reserva) =>
        reserva.horarios.some(
          (horario) =>
            new Date(horario.dataInicio).getTime() ===
            new Date(`${selectedDate}T${hour}`).getTime()
        )
      );
      hours.push({ hour, isBooked });
    }
    setAvailableHours(hours);
  };

  useEffect(() => {
    if (selectedDate) {
      generateHourSlots();
    }
  }, [selectedDate, reservas]);

  useEffect(() => {
    getReservas();
  }, []);

  const totalPrice = selectedHours.length * quadra.precoHora;

  return (
    <>
      <Header currentTab="Inicio" />
      <div className={styles.container}>
        <div className={styles.quadraContent}>
          <div className={styles.imageSection}>
            {quadra.fotos.length > 0 ? (
              <img
                src={quadra.fotos[0].url}
                alt={quadra.nomeQuadra}
                className={styles.quadraImage}
              />
            ) : (
              <img src={futebol} className={styles.quadraImage} />
            )}
          </div>

          <div className={styles.detailsSection}>
            <h1 className={styles.quadraNome}>{quadra.nomeQuadra}</h1>
            <p className={styles.localizacao}>
              {quadra.endereco} - {quadra.cidade}, {quadra.estado}
            </p>
            <span className={styles.preco}>
              R$ {quadra.precoHora.toFixed(2)}/hora
            </span>

            <div className={styles.avaliacoes}>
              <span>⭐ 4.7 (35 avaliações)</span>
            </div>

            <button onClick={openDateModal} className={styles.reservarButton}>
              Reservar
            </button>

            <div className={styles.totalContainer}>
              <h3>Preço total: R$ {totalPrice.toFixed(2)}</h3>
              {selectedHours.length > 0 && (
                <button className={styles.confirmarButton} onClick={realizarReservas}>Confirmar</button>
              )}
            </div>
          </div>
        </div>

        {/* Modal para selecionar a data */}
        <Modal
          isOpen={isDateModalOpen}
          onRequestClose={closeDateModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h2>Escolha a data</h2>
          <input
            type="date"
            onChange={handleDateSelection}
            className={styles.datePicker}
          />
          <button onClick={closeDateModal} className={styles.closeButton}>
            Cancelar
          </button>
        </Modal>

        {/* Modal para selecionar os horários */}
        <Modal
          isOpen={isHourModalOpen}
          onRequestClose={closeHourModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h2>Horários disponíveis para {selectedDate}</h2>
          <div className={styles.hourGrid}>
            {availableHours.map(({ hour, isBooked }) => (
              <button
                key={hour}
                onClick={() => !isBooked && toggleHourSelection(hour)}
                className={`${styles.hourButton} ${
                  isBooked
                    ? styles.bookedHour
                    : selectedHours.includes(hour)
                    ? styles.selectedHour
                    : styles.availableHour
                }`}
                disabled={isBooked}
              >
                {hour}
              </button>
            ))}
          </div>
          <button onClick={closeHourModal} className={styles.closeButton}>
            Cancelar
          </button>
        </Modal>
      </div>
    </>
  );
}
