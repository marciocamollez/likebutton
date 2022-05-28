function LikeModel(id, nome, isLike) {
    this.id = id;
    this.nome = nome;
    this.isLike = isLike;
  
    return {
      id: id,
      nome: nome,
      isLike: isLike
    };
  }
  
  export default LikeModel;
  