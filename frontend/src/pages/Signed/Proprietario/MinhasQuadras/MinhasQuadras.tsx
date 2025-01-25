import { useState, useEffect } from "react";
import { useAuth } from "../../../../shared/context/AuthProvider";
import Axios from "../../../../shared/context/Axios";
import styles from "./MinhasQuadras.module.css";

import Header from "../../../../shared/components/HeaderProprietario/Header";
import FilterInputs from "../../../../shared/components/FiltrosInputQuadra/FiltrosInputQuadra";
import Spinner from "../../../../shared/components/Spinner/Spinner";

import { useNavigate } from "react-router-dom";

interface Foto {
  url: string;
  publicId: string;
}

interface Quadra {
  idQuadra: number;
  nomeQuadra: string;
  precoHora: number;
  cidade: string;
  estado: string;
  endereco: string;
  esporte: string;
  fotos: Foto[];
  proprietarioId: number;
}

export default function MinhasQuadras() {
  const { token } = useAuth();

  const navigate = useNavigate();

  const [quadras, setQuadras] = useState<Quadra[]>([]);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [esporte, setEsporte] = useState("");

  const handleSearch = async () => {
    try {
      const nomeParam = nome.trim() || "all";
      const cidadeParam = cidade.trim() || "all";
      const esporteParam = esporte.trim() || "all";

      const response = await Axios.get(
        `/quadra/minhasQuadras/${nomeParam}/${cidadeParam}/${esporteParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuadras(response.data);
    } catch (error) {
      console.error("Erro ao buscar quadras:", error);
    }
  };

  const getQuadras = async () => {
    try {
      const response = await Axios.get("/quadra/minhasQuadras/all/all/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setQuadras(response.data);
    } catch (error) {
      console.error("Erro ao carregar quadras:", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    getQuadras();
  }, [token]);

  return (
    <>
      <Header currentTab="minhasQuadras" />
      <div className={styles.container}>
        <FilterInputs
          nome={nome}
          setNome={setNome}
          cidade={cidade}
          setCidade={setCidade}
          esporte={esporte}
          setEsporte={setEsporte}
          onSearch={handleSearch}
        />

        <br />
        <br />

        {loading ? (
          <div className={styles.loading}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.quadrasGrid}>
            {quadras.map((quadra) => (
              <div
                key={quadra.idQuadra}
                className={styles.quadraCard}
                onClick={() => {
                  navigate(`/editarQuadra`, {
                    state: {
                      id: quadra.idQuadra,
                      localizacao: quadra.endereco,
                      esporte: quadra.esporte,
                      nomeQuadra: quadra.nomeQuadra,
                      preco: quadra.precoHora,
                      imagens: quadra.fotos,
                    },
                  })
                }}
              >
                <div className={styles.imageContainer}>
                  {quadra.fotos.length > 0 ? (
                    <img
                      src={quadra.fotos[0].url}
                      alt={quadra.nomeQuadra}
                      className={styles.quadraImage}
                    />
                  ) : (
                    <div className={styles.noImage}>
                      <span>Sem foto</span>
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div>
                    <h2 className={styles.quadraNome}>{quadra.nomeQuadra}</h2>
                    {/* <p>{}</p> */}
                  </div>

                  <div className={styles.esporteTag}>
                    {quadra.esporte.charAt(0).toUpperCase() +
                      quadra.esporte.slice(1)}
                  </div>

                  <p className={styles.localizacao}>
                    {quadra.cidade} - {quadra.estado}
                  </p>
                  <p className={styles.endereco}>{quadra.endereco}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.preco}>
                      R$ {quadra.precoHora.toFixed(2)}/hora
                    </span>
                    {/* <button className={styles.reservarButton}>Reservar</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
