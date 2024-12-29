import React, { useState } from "react";

import Header from "../../../../shared/components/HeaderProprietario/Header";
import CardReview from "../../../../shared/components/CardReview/CardReview";
import CarrosselImagens from "../../../../shared/components/CarrosselImagens/CarrosselImagens";
import uploadDeFoto from "../../../../assets/uploadDeFoto.png";

import { Link } from "react-router-dom";

import styles from "./EditarQuadra.module.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

interface Quadra {
  id: string;
  localizacao: string;
  esporte: string;
  descricao: string;
  preco: number;
  imagens: File[];
}

interface EditarQuadraProps {
  quadra: Quadra;
}

const EditarQuadra: React.FC<EditarQuadraProps> = ({ quadra }) => {
  const [localizacao, setLocalizacao] = useState(quadra.localizacao);
  const [esporte, setEsporte] = useState(quadra.esporte);
  const [descricao, setDescricao] = useState(quadra.descricao);
  const [preco, setPreco] = useState(quadra.preco);
  const [imagens, setImagens] = useState<File[]>(quadra.imagens);

  const avaliacoes = [
    {
      estrelas: 5,
      comentario:
        "A quadra é excelente, com piso em ótimas condições e iluminação perfeita para jogos noturnos. Recomendo!",
      nome: "Lucas Ferreira",
      cargo: "Jogador de Futebol Amador",
    },
    {
      estrelas: 4,
      comentario:
        "Gostei muito da organização e limpeza do espaço. Apenas acho que poderia ter mais vagas de estacionamento.",
      nome: "Mariana Oliveira",
      cargo: "Treinadora de Vôlei",
    },
    {
      estrelas: 3,
      comentario:
        "A quadra é boa, mas o equipamento de basquete estava um pouco desgastado. Seria ótimo se fosse renovado.",
      nome: "Pedro Santos",
      cargo: "Basqueteiro",
    },
    {
      estrelas: 5,
      comentario:
        "Espaço incrível para futsal. Fui com meus amigos e todos adoraram. Pretendemos voltar em breve!",
      nome: "Ana Souza",
      cargo: "Estudante e Jogadora de Futsal",
    },
    {
      estrelas: 4,
      comentario:
        "Boa experiência! Quadra bem localizada e equipe atenciosa. Apenas a ventilação poderia ser melhor.",
      nome: "João Lima",
      cargo: "Organizador de Eventos Esportivos",
    },
  ];

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
      setImagens((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quadra atualizada com sucesso!");
  };

  return (
    <div className={styles.editarQuadra}>
      <Header currentTab="minhasQuadras" />

      <h2 className={styles.title}>Informações sobre a quadra:</h2>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
              <label className={styles.label} htmlFor="descricao">
                Descrição *
              </label>
              <textarea
                className={styles.textarea}
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
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

          <CarrosselImagens images={imagens} onRemoveImage={removeImage} />

          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton}>
              Atualizar quadra
            </button>
            <Link className={styles.submitButton} to="/verReservas">Visualizar reservas</Link>
            <button className={styles.deleteButton}>Excluir quadra</button>{" "}
            {/* colocar modal de confirmação*/}
          </div>
        </form>

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
            {avaliacoes.map((avaliacao, index) => (
              <div
                key={index}
                style={{
                  padding: "0 10px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <CardReview
                  key={index}
                  estrelas={avaliacao.estrelas}
                  comentario={avaliacao.comentario}
                  nome={avaliacao.nome}
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
