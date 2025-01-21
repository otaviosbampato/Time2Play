import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./ReservationModal.module.css"; // Importa o CSS Module

Modal.setAppElement("#root");
interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (date: string, hours: string[]) => void;
    availableHours: { hour: string; isBooked: boolean }[];
    precoHora: number;
  }
  
  const ReservationModal: React.FC<ReservationModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    availableHours,
    precoHora
  }) => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedHours, setSelectedHours] = useState<string[]>([]);
  
    const toggleHourSelection = (hour: string) => {
      setSelectedHours((prev) =>
        prev.includes(hour)
          ? prev.filter((h) => h !== hour)
          : [...prev, hour]
      );
    };
  
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value);
    };
  
    const handleConfirm = () => {
      onSubmit(selectedDate, selectedHours);
      setSelectedDate("");
      setSelectedHours([]);
    };
  
    const totalPrice = selectedHours.length * precoHora;
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Selecione a Data e Horários</h2>
  
        <div className={styles.selectionContainer}>
          <div className={styles.row}>
            <div className={styles.cell}>
              <span>Data</span>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className={styles.dateInput}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>
  
        {selectedDate && (
          <div className={styles.selectionContainer}>
            <h3>Horários Disponíveis</h3>
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
          </div>
        )}
  
        {selectedDate && selectedHours.length > 0 && (
          <div className={styles.summaryContainer}>
            <h3>Resumo da Reserva</h3>
            <div className={styles.row}>
              <div className={styles.cell}>
                <span>Data</span>
                <strong>{selectedDate}</strong>
              </div>
              <div className={styles.cell}>
                <span>Horário(s)</span>
                <strong>{selectedHours.join(", ")}</strong>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.cell}>
                <span>Tempo total</span>
                <strong>{selectedHours.length}h</strong>
              </div>
              <div className={styles.cell}>
                <span>Valor total</span>
                <strong>R$ {totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        )}
  
        <div className={styles.actionButtons}>
          <button onClick={onClose} className={styles.closeButton}>
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className={styles.confirmarButton}
            disabled={!selectedDate || selectedHours.length === 0}
          >
            Confirmar
          </button>
        </div>
      </Modal>
    );
  };
  
  export default ReservationModal;