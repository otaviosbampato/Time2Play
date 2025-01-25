import { useContext, createContext, useState, ReactNode } from "react";

interface AuthContextType {
  estaLogado: boolean;
  setEstaLogado: (value: boolean) => void;
  token: string;
  setToken: (value: string) => void;
  id: string;
  setId: (value: string) => void;
  isProprietario: boolean;
  setIsProprietario: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [estaLogado, setEstaLogado] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [isProprietario, setIsProprietario] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ estaLogado, setEstaLogado, token, setToken, isProprietario, setIsProprietario, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
