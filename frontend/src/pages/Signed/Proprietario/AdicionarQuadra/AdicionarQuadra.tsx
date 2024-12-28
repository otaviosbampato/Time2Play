import React, { useState } from "react";

import Header from "../../../../shared/components/HeaderProprietario/Header";
import CarrosselImagens from "../../../../shared/components/CarrosselImagens/CarrosselImagens";
import uploadDeFoto from "../../../../assets/uploadDeFoto.png";

import "./AdicionarQuadra.css";
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
    <div className="adicionar-quadra">
      <Header currentTab="adicionarQuadra" />

      <h2>Adicione uma nova quadra:</h2>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-line">
            <div className="form-group">
              <label htmlFor="localizacao">Localização *</label>
              <input
                type="text"
                id="localizacao"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                placeholder="Loc"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="esporte">Esporte *</label>
              <select
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

          <div className="form-line">
            <div className="form-group">
              <label htmlFor="descricao">Descrição *</label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição sobre a quadra"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço por hora *</label>
              <input
                type="range"
                id="preco"
                min={10}
                max={200}
                step={5}
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
              />
              <p>R${preco},00 / hora</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imagem" className="upload-label">
              <div className="upload-button-container">
                <div className="icon-wrapper">
                  <img src={uploadDeFoto} style={{ width: 20, height: 20 }} />
                </div>
                <div>Adicionar imagem</div>
              </div>
            </label>

            <input
              type="file"
              id="imagem"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
          </div>

          <CarrosselImagens images={imagens} onRemoveImage={removeImage} />

          <div className="submit-button-container">
            <button type="submit" className="submit-button">
              Cadastrar quadra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarQuadra;
