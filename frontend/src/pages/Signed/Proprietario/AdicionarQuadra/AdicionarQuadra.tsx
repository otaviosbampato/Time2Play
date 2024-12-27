import React, { useState } from "react";
import Header from "../../../../shared/components/HeaderProprietario/Header";
import "./AdicionarQuadra.css";

const AdicionarQuadra: React.FC = () => {
  const [localizacao, setLocalizacao] = useState("");
  const [esporte, setEsporte] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(75); // Valor inicial
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      localizacao,
      esporte,
      descricao,
      preco,
      imagem,
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
            <label htmlFor="imagem">Imagens da quadra *</label>
            <input
              type="file"
              id="imagem"
              onChange={(e) =>
                setImagem(e.target.files ? e.target.files[0] : null)
              }
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarQuadra;
