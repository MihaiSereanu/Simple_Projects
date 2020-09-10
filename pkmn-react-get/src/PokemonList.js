import React from "react";
import "./Pokemon.css";

export default function PokemonList({ pokemon }) {
  return (
    <div class="pokmeon-names">
      {pokemon.map(p => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}
