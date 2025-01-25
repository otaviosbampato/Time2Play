import styles from "./FilterInputs.module.css";

interface FilterInputsProps {
  nome: string;
  setNome: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
  esporte: string;
  setEsporte: (value: string) => void;
  onSearch: () => void;
}

export default function FilterInputs({
  nome,
  setNome,
  cidade,
  setCidade,
  esporte,
  setEsporte,
  onSearch,
}: FilterInputsProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.mainSearch}>
        <input
          type="text"
          placeholder="Procurar por nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={onSearch} className={styles.searchButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      <div className={styles.filterInputs}>
        <div className={styles.filterGroup}>
          <label>Onde</label>
          <input
            type="text"
            placeholder="Procure localização"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>

        <div className={styles.divider}></div>

        <div className={styles.filterGroup}>
          <label>Esporte</label>
          <input
            type="text"
            placeholder="O que você vai jogar?"
            value={esporte}
            onChange={(e) => setEsporte(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
