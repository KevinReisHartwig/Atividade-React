import { useState } from "react";

import Perfil from "./components/Perfil";
import ReposList from "./components/ReposList";

function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');

  return (
    <>
      <div className="container">
      <input type="text" placeholder="Nome do github" onBlur={(e) => setNomeUsuario(e.target.value)} />
      <button>Buscar</button>
      </div>
      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}

    </>
  )
}

export default App