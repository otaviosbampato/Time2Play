import React, { useState } from "react";

import Header from "../../../../shared/components/HeaderProprietario/Header";
import CarrosselImagens from "../../../../shared/components/CarrosselImagens/CarrosselImagens";
import uploadDeFoto from "../../../../assets/uploadDeFoto.png";

import styles from "./AdicionarQuadra.module.css";
import "react-multi-carousel/lib/styles.css";

const AdicionarQuadra: React.FC = () => {
  const [localizacao, setLocalizacao] = useState("");
  const [esporte, setEsporte] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(75);
  const [imagens, setImagens] = useState<File[]>([]);

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
    console.log({
      localizacao,
      esporte,
      descricao,
      preco,
    });
    alert("Quadra adicionada com sucesso!");
  };

  return (
    <div className={styles.adicionarQuadra}>
      <Header currentTab="adicionarQuadra" />

      <h2 className={styles.title}>Adicione uma nova quadra:</h2>

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
                placeholder="Loc"
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
              Cadastrar quadra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarQuadra;
