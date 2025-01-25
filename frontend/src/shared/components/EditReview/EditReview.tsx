import styles from "./EditReview.module.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Star, X } from "lucide-react";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: Review | null;
    onSave: (updatedReview: {
      nota: number;
      titulo: string;
      comentario: string;
    }) => void;
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
  
  const EditReviewModal = ({ isOpen, onClose, review, onSave }: EditModalProps) => {
    const [editRating, setEditRating] = useState(review?.nota || 0);
    const [editTitle, setEditTitle] = useState(review?.titulo || "");
    const [editComment, setEditComment] = useState(review?.comentario || "");
    const [hoverRating, setHoverRating] = useState(0);
  
    useEffect(() => {
      if (review) {
        setEditRating(review.nota);
        setEditTitle(review.titulo);
        setEditComment(review.comentario);
      }
    }, [review]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        nota: editRating,
        titulo: editTitle,
        comentario: editComment,
      });
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalHeader}>
          <h2>Editar Avaliação</h2>
          <button onClick={onClose} className={styles.closeModalButton}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={styles.star}
                fill={star <= (hoverRating || editRating) ? "#FFD700" : "none"}
                stroke={star <= (hoverRating || editRating) ? "#FFD700" : "#666"}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setEditRating(star)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
  
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título da avaliação"
            className={styles.formInput}
            required
          />
  
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            placeholder="Seu comentário"
            className={styles.formTextarea}
            required
          />
  
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    );
  };
  
  export default EditReviewModal;