import { useLocation } from "react-router-dom";
import styles from "./VerQuadra.module.css";
import { useState, useEffect } from "react";
import Axios from "../../../../shared/context/Axios";
import { useAuth } from "../../../../shared/context/AuthProvider";
import Modal from "react-modal";
import Header from "../../../../shared/components/HeaderCliente/Header";
import futebol from "../../../../assets/futebol.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardReview from "../../../../shared/components/CardReview/CardReview";
import { Star, Trash2, Edit2 } from "lucide-react";

import EditReview from "../../../../shared/components/EditReview/EditReview";
import ReservationModal from "../../../../shared/components/ReservationModal/ReservationModal";

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

interface Review {
  idReview: number;
  nota: number;
  titulo: string;
  comentario: string;
  data: string;
  quadraId: number;
  clienteId: number;
}

export default function VerQuadra() {
  const location = useLocation();
  const { token, id } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const quadra: Quadra = location.state.quadra; // Recebe os dados da quadra via state

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [media, setMedia] = useState<number>();
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [availableHours, setAvailableHours] = useState<
    { hour: string; isBooked: boolean }[]
  >([]);

  const handleReservationSubmit = (date: string, hours: string[]) => {
    setSelectedDate(date);
    setSelectedHours(hours);
    setIsReservationModalOpen(false);
    
    const totalPrice = hours.length * quadra.precoHora;
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // Quantos cards deslizar ao mesmo tempo
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `/review/realizar`,
        {
          quadraId: quadra.idQuadra,
          nota: rating,
          titulo: reviewTitle,
          comentario: reviewComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      window.alert("Review realizada com sucesso");
      setRating(0);
      setReviewTitle("");
      setReviewComment("");
      getReviews();
    } catch (error) {
      window.alert("Erro ao realizar reserva");
      console.error(error);
    }
  };

  const realizarReservas = async () => {
    try {
      window.alert(quadra.idQuadra);
      const response = await Axios.post(
        `/reserva/cadastrar`,
        {
          clienteId: id,
          quadraId: quadra.idQuadra,
          horarios: selectedHours,
          valor: selectedHours.length * quadra.precoHora,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getReviews = async () => {
    try {
      const response = await Axios.get(
        `/review/visualizar/${quadra.idQuadra}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedia(response.data.media);
      setReviews(response.data.reviews);

      console.log(id);

      const filteredReviews = response.data.reviews.filter(
        (review: Review) => review.clienteId === Number(id)
      );

      setUserReviews(filteredReviews);
      console.log("Filtered" + filteredReviews);

      console.log(response.data);
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

  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await Axios.delete(`/review/cancelar/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("Review deletada com sucesso");
      getReviews();
    } catch (error) {
      window.alert("Erro ao excluir review");
      console.error("Error deleting review:", error);
    }
  };

  const handleUpdateReview = async (updatedReview: {
    nota: number;
    titulo: string;
    comentario: string;
  }) => {
    if (!selectedReview) return;

    try {
      await Axios.put(
        `/review/editar/${selectedReview.idReview}`,
        {
          nota: updatedReview.nota,
          titulo: updatedReview.titulo,
          comentario: updatedReview.comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.alert("Review editada com sucesso");
      setIsEditModalOpen(false);
      getReviews();
    } catch (error) {
      window.alert("Erro ao editar review");
      console.error("Error updating review:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      generateHourSlots();
    }
  }, [selectedDate, reservas]);

  useEffect(() => {
    getReservas();
    getReviews();
  }, []);

  const totalPrice = selectedHours.length * quadra.precoHora;

  return (
    <>
      <Header currentTab="Inicio" />
      <div className={styles.pageContainer}>
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
                <img
                  src={futebol}
                  className={styles.quadraImage}
                  alt="Default"
                />
              )}
            </div>

            <div className={styles.detailsSection}>
              <h1 className={styles.quadraNome}>{quadra.nomeQuadra}</h1>
              <p className={styles.localizacao}>
                {quadra.endereco} - {quadra.cidade}, {quadra.estado}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span className={styles.preco}>
                    R$ {quadra.precoHora.toFixed(2)}/hora
                  </span>
                </div>

                <div className={styles.avaliacoes}>
                  <div>
                    <Star
                      size={32}
                      className={styles.star}
                      fill={"#FFD700"}
                      stroke={"#FFD700"}
                    />
                  </div>
                  <div>{media} (x avaliações)</div>
                </div>
              </div>

              <div>
                <button
                  className={styles.reservationButton}
                  onClick={() => setIsReservationModalOpen(true)}
                >
                  <div className={styles.label}>Data e Horário</div>
                  <div className={styles.value}>
                    {selectedDate
                      ? `${selectedDate} - ${selectedHours.join(", ")}`
                      : "Selecionar"}
                  </div>
                </button>
              </div>

              <button onClick={openDateModal} className={styles.reservarButton}>
                Reservar
              </button>

              <div className={styles.totalContainer}>
                <h3>Total a ser pago: R$ {totalPrice.toFixed(2)}</h3>
                {selectedHours.length > 0 && (
                  <button
                    className={styles.confirmarButton}
                    onClick={realizarReservas}
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.carouselSection}>
            {reviews.length > 0 && (
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding"
                partialVisible={true}
                centerMode={false}
              >
                {reviews.map((review) => (
                  <div key={review.idReview} className={styles.reviewCard}>
                    <CardReview
                      estrelas={review.nota}
                      comentario={review.comentario}
                      nome={review.titulo}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>

        <div className={styles.reviewFormSection}>
          <h2 className={styles.sectionTitle}>Deixe sua avaliação</h2>
          <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
            <div className={styles.starRating}>
              <div style={{ fontFamily: "Poppins" }}>Sua nota:</div>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={styles.star}
                  fill={star <= (hoverRating || rating) ? "#FFD700" : "none"}
                  stroke={star <= (hoverRating || rating) ? "#FFD700" : "#666"}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Título da avaliação"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Compartilhe sua experiência..."
                className={styles.formTextarea}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Enviar Avaliação
            </button>
          </form>
        </div>

        {userReviews.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className={styles.userReviewsSection}>
              <h2 className={styles.sectionTitle}>Suas Avaliações</h2>
              <div className={styles.userReviewsGrid}>
                {userReviews.map((review) => (
                  <div key={review.idReview} className={styles.userReviewCard}>
                    <div className={styles.reviewHeader}>
                      <h3>{review.titulo}</h3>
                      <div className={styles.reviewActions}>
                        <button
                          onClick={() => handleEditClick(review)}
                          className={styles.actionButton}
                          title="Editar"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.idReview)}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Excluir"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.reviewStars}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={20}
                          fill={index < review.nota ? "#FFD700" : "none"}
                          stroke={index < review.nota ? "#FFD700" : "#666"}
                        />
                      ))}
                    </div>
                    <p className={styles.reviewComment}>{review.comentario}</p>
                    <span className={styles.reviewDate}>
                      {new Date(review.data).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <EditReview
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          review={selectedReview}
          onSave={handleUpdateReview}
        />

        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          onSubmit={handleReservationSubmit}
          availableHours={availableHours}
          precoHora={quadra.precoHora}
        />
      </div>
    </>
  );
}
