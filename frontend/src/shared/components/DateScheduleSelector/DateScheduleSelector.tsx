import React, { useState } from "react";
import styles from "./DateScheduleSelector.module.css";
import Axios from "../../context/Axios";
import { useAuth } from "../../context/AuthProvider";

interface Hour {
  hora: string;
  disponivel: boolean;
}

interface DateScheduleSelectorProps {
  quadraId: number;
  onScheduleSelect: (selectedHours: string[]) => void;
}

const DateScheduleSelector: React.FC<DateScheduleSelectorProps> = ({
  quadraId,
  onScheduleSelect,
}) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<Hour[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  const {token} = useAuth();

  const fetchSchedule = async (date: string) => {
    try {
      const response = await Axios.get(`/reserva/quadra/${quadraId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSchedule(response.data.disponibilidade || []);
      setScheduleModalVisible(true);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    fetchSchedule(date);
  };

  const toggleHourSelection = (hour: string) => {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  const handleConfirmSelection = () => {
    onScheduleSelect(selectedHours);
    setScheduleModalVisible(false);
    setSelectedHours([]);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setDatePickerVisible(!datePickerVisible)}
      >
        {selectedDate ? `Selecionar outro dia` : "Selecionar dia"}
      </button>

      {/* Seletor de data */}
      {datePickerVisible && (
        <input
          type="date"
          className={styles.datePicker}
          onChange={handleDateChange}
        />
      )}

      {/* Modal de horários */}
      {scheduleModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>
              Horários para {selectedDate?.split("-").reverse().join("/")}
            </h2>
            <div className={styles.scheduleList}>
              {schedule.map((item) => (
                <button
                  key={item.hora}
                  className={`${styles.hourButton} ${
                    item.disponivel ? styles.available : styles.unavailable
                  } ${selectedHours.includes(item.hora) && styles.selected}`}
                  disabled={!item.disponivel}
                  onClick={() => toggleHourSelection(item.hora)}
                >
                  {item.hora}
                </button>
              ))}
            </div>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmSelection}
            >
              Confirmar Seleção
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setScheduleModalVisible(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateScheduleSelector;
