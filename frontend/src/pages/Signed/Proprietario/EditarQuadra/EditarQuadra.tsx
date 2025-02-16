import React, { useEffect, useState } from "react";

import Header from "../../../../shared/components/HeaderProprietario/Header";
import CardReview from "../../../../shared/components/CardReview/CardReview";
import CarrosselImagens from "../../../../shared/components/CarrosselImagens/CarrosselImagens";

import uploadDeFoto from "../../../../assets/uploadDeFoto.png";

import { useLocation } from "react-router-dom";

import styles from "./EditarQuadra.module.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

import { useNavigate } from "react-router-dom";
import Axios from "../../../../shared/context/Axios";
import { useAuth } from "../../../../shared/context/AuthProvider";

interface Imagem {
  url: string;
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

const EditarQuadra = () => {
  const location = useLocation();

  const [localizacao, setLocalizacao] = useState(location.state.localizacao);
  const [esporte, setEsporte] = useState(location.state.esporte);
  const [nomeQuadra, setnomeQuadra] = useState(location.state.nomeQuadra);
  const [preco, setPreco] = useState(location.state.preco);
  const [imagens, setImagens] = useState<Imagem[]>(location.state.imagens);
  const [imagensCarregadas, setImagensCarregadas] = useState<File[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const navigation = useNavigate();
  const { token } = useAuth();
  const idQuadra = location.state.id;

  useEffect(() => {
    getReviews();
  }, []);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImagensCarregadas((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImageCarregada = (index: number) => {
    setImagensCarregadas((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const excluirQuadra = async () => {
    try {
      const response = await Axios.delete(`/quadra/excluir/${idQuadra}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.alert("Quadra excluida com sucesso");
      console.log(response.data);

      navigation("/minhasQuadras");
    } catch (error) {
      console.log(error);
      window.alert("Erro ao excluir quadra");
    }
  };

  const atualizarQuadra = async () => {
    try {
      const response = await Axios.put(
        `/quadra/editar/${idQuadra}`,
        {
          nomeQuadra: nomeQuadra,
          precoHora: preco,
          esporte: esporte,
          endereco: localizacao,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (imagensCarregadas.length > 0) {
        const formData = new FormData();
        imagensCarregadas.forEach((imagem) => {
          formData.append("images", imagem);
        });

        const imagensResponse = await Axios.put(
          `/quadra/atualizarQuadra/${idQuadra}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(imagensResponse);
      }

      window.alert("Quadra atualizada com sucesso");
      console.log(response.data);

      navigation("/minhasQuadras");
    } catch (error) {
      console.log(error);
      window.alert("Erro ao atualizar quadra");
    }
  };

  const getReviews = async () => {
    try {
      const response = await Axios.get(`/review/visualizar/${idQuadra}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data.reviews);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.editarQuadra}>
      <Header currentTab="minhasQuadras" />

      <h2 className={styles.title}>Informações sobre a quadra:</h2>

      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.formLine}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="localizacao">
                Localização *
              </label>
              <input
                className={styles.input}
                type="text"
                id="localizacao"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                placeholder="Localização"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="esporte">
                Esporte *
              </label>
              <select
                className={styles.select}
                id="esporte"
                value={esporte}
                onChange={(e) => setEsporte(e.target.value)}
                required
              >
                <option value="" disabled>
                  Esporte
                </option>
                <option value="futebol">Futebol</option>
                <option value="basquete">Basquete</option>
                <option value="vôlei">Vôlei</option>
                <option value="tênis">Tênis</option>
              </select>
            </div>
          </div>

          <div className={styles.formLine}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="nomeQuadra">
                Nome da quadra *
              </label>
              <textarea
                className={styles.textarea}
                id="nomeQuadra"
                value={nomeQuadra}
                onChange={(e) => setnomeQuadra(e.target.value)}
                placeholder="Descrição sobre a quadra"
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="preco">
                Preço por hora *
              </label>
              <input
                className={styles.rangeInput}
                type="range"
                id="preco"
                min={10}
                max={200}
                step={5}
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
              />
              <p className={styles.priceText}>R${preco},00 / hora</p>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imagem" className={styles.uploadLabel}>
              <div className={styles.uploadButtonContainer}>
                <div className={styles.iconWrapper}>
                  <img src={uploadDeFoto} style={{ width: 20, height: 20 }} />
                </div>
                <div>Adicionar imagem</div>
              </div>
            </label>

            <input
              className={styles.fileInput}
              type="file"
              id="imagem"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
          </div>

          <CarrosselImagens
            images={imagens}
            onRemoveImage={removeImage}
            title="Imagens da quadra"
          />

          <CarrosselImagens
            images={imagensCarregadas.map((file) => ({
              url: URL.createObjectURL(file),
            }))}
            onRemoveImage={removeImageCarregada}
            title="Novas imagens"
          />

          <div className={styles.submitButtonContainer}>
            <button className={styles.submitButton} onClick={atualizarQuadra}>
              Atualizar quadra
            </button>
            <button
              className={styles.submitButton}
              onClick={() => navigation("/verReservas", { state: idQuadra })}
            >
              Visualizar reservas
            </button>
            <button className={styles.deleteButton} onClick={excluirQuadra}>
              Excluir quadra
            </button>{" "}
            {/* colocar modal de confirmação*/}
          </div>
        </div>

        <div>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            keyBoardControl
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding"
            partialVisible={true}
            centerMode={false}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  padding: "0 10px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <CardReview
                  key={review.idReview}
                  estrelas={review.nota}
                  comentario={review.comentario}
                  nome={review.titulo}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default EditarQuadra;
