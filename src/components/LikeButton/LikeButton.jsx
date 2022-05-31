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
      // Pega o id do que foi clicado pra descurtir e compara se existe na lista, caso sim ele filtra, removendo o clicado e atualizando o novo array
      const filtered = likeCharacters.filter(a => a.id !== item.id ) ;
      // Atualiza o índice
      localStorage['likeCharacters'] = JSON.stringify(filtered);
      //console.log(filtered);

    } else {
      // Após o clique, adiciona no vetor e troca o estado para true para fazer a animação
      likeCharacters.push(new LikeModel(item.id, item.name, true));
      setIsLike(true);
      // Atualiza o índice
      localStorage['likeCharacters'] = JSON.stringify(likeCharacters);
    }

    
    
    // console.log("oi" + likeCharacters.length);

  };

  return (
    <span>
      <button
        aria-hidden="true"
        type="button"
        onClick={handleLike}
        className={`bt-like like-button ${isLike ? 'liked' : ''}`}
      >
       
      </button>

    </span>
  );
}

export default LikeButton;