import React, { useState, useEffect } from 'react';
import './style.css';
import LikeModel from '../../models/like.model';

function LikeButton({ item }) {

  // Função para criar e carregar Storage caso não exista no navegador
  function loadStorage(){
    const characterDb = localStorage['likeCharacters'];
    const likeCharacters = characterDb ? JSON.parse(characterDb) : [];
    localStorage['likeCharacters'] = JSON.stringify(likeCharacters);

    return likeCharacters;
  }

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
  
    // Chama a função para ser carregado no primeiro load
    loadStorage();

    // Pega a base e armazena na variável
    const characterDb = localStorage['likeCharacters'];

    // Se houve clique no botão, muda o estado pra true
    if(characterDb.includes(item.id)){
      setIsLike(true);
    } else {
      setIsLike(false);
    }
    
    
  },[]);

  const handleLike = () => {

    // Pega novamente a base de dados
    const characterDb = localStorage['likeCharacters'];
    const likeCharacters = JSON.parse(characterDb) || [];

    // Verifica se o item já está na lista. Caso sim, ao clicar de novo, ele remove (pop). Caso não, ele adiciona (push)
    if(characterDb.includes(item.id)){
      setIsLike(false);
      likeCharacters.pop(new LikeModel(item.id, item.name, false));
    } else {
      // Após o clique, adiciona no vetor e troca o estado para true para fazer a animação
      likeCharacters.push(new LikeModel(item.id, item.name, true));
      setIsLike(true);
    }

    // Atualiza o índice
    localStorage['likeCharacters'] = JSON.stringify(likeCharacters);

  };

  return (
    <span>
      <button
        aria-hidden="true"
        type="button"
        onClick={handleLike}
        className={`bt-like like-button ${isLike ? 'liked' : ''}`}
      >
        curtiu {item.name}
      </button>

    </span>
  );
}

export default LikeButton;