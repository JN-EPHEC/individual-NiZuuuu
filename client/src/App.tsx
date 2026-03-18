import { useEffect, useState } from "react";

// On met à jour l'interface avec les bons noms de colonnes
interface User {
  id: number;
  nom: string;    // <--- C'était "name" avant
  prenom: string; // <--- On l'ajoute !
}

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {data.map((item) => (
          // On affiche le prénom et le nom
          <li key={item.id}>
            {item.prenom} {item.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;