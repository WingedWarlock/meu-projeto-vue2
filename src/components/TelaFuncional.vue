<template>
<div class="container">
 <h1>Comentários</h1>
 <hr />
 <div class="form-todo form-group">
    <p>
        <input placeholder="nome" type="text" name="author"
        class="form-control" v-model="name" />
    </p>
    <p>
        <textarea placeholder="Comentário" name="message"
        class="form-control" v-model="message"></textarea>
    </p>
    <button v-on:click="addComment" type="submit" class="btn btn-primary">Comentar</button>
 </div>
 <div class="list-group">
    <div class="list-group-item" v-for="(comment, index) in allComments" :key="comment.name">
        <span class="comment_author">Autor: <strong>{{ comment.name }}</strong></span>
        <p>{{ comment.message }}</p>
        <div>
            <a href="#" title="Excluir" v-on:click.prevent="removeComment(index)">Excluir</a>
        </div>
        <hr />
    </div>
 </div>
 <hr />
</div>
</template>

<script>
import comentarioService from '@/services/comentarioService';

export default {
  data() {
    return {
      comments: [],
      name: '',
      message: ''
    };
  },
  mounted() {
    this.carregarComentarios();
  },
  methods: {
    carregarComentarios() {
      comentarioService.listar().then(res => {
        this.comments = res.data;
      });
    },
    addComment() {
      if (this.message.trim() === '') return;

      const novoComentario = {
        name: this.name,
        message: this.message
      };

      comentarioService.adicionar(novoComentario).then(() => {
        this.carregarComentarios();
        this.name = '';
        this.message = '';
      });
    },
    removeComment(index) {
      const id = this.comments[index].id;
      comentarioService.excluir(id).then(() => {
        this.carregarComentarios();
      });
    }
  },
  computed: {
    allComments() {
      return this.comments.map(comment => ({
        ...comment,
        name: comment.name.trim() === '' ? 'Anônimo' : comment.name
      }));
    }
  }
};
</script>