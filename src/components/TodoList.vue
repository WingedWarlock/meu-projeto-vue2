<template>
  <div class="todo-container">
    <h1>Lista de Tarefas</h1>

    <form @submit.prevent="adicionarTarefa">
      <input
        v-model="novaTarefa"
        placeholder="Digite uma nova tarefa"
        required
      />
      <button type="submit">Adicionar</button>
    </form>

    <ul>
      <li
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :class="{ concluida: tarefa.concluida }"
      >
        <input
          type="checkbox"
          v-model="tarefa.concluida"
          @change="marcarConcluida(tarefa)"
        />
        {{ tarefa.descricao }}
        <button @click="removerTarefa(tarefa.id)">🗑</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api"

export default {
  data() {
    return {
      tarefas: [],
      novaTarefa: ""
    }
  },
  methods: {
    async carregarTarefas() {
      try {
        const res = await api.get("/tarefas")
        this.tarefas = res.data
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error)
      }
    },

    async adicionarTarefa() {
      if (!this.novaTarefa.trim()) return

      try {
        const res = await api.post("/tarefas", {
          descricao: this.novaTarefa
        })
        this.tarefas.push(res.data)
        this.novaTarefa = ""
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error)
      }
    },

    async marcarConcluida(tarefa) {
      try {
        await api.put(`/tarefas/${tarefa.id}`, {
          concluida: tarefa.concluida
        })
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error)
      }
    },

    async removerTarefa(id) {
      try {
        await api.delete(`/tarefas/${id}`)
        this.tarefas = this.tarefas.filter(t => t.id !== id)
      } catch (error) {
        console.error("Erro ao remover tarefa:", error)
      }
    }
  },
  mounted() {
    this.carregarTarefas()
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
  text-align: center;
}

input[type="text"],
button {
  margin: 0.5rem;
  padding: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.concluida {
  text-decoration: line-through;
  color: gray;
}
</style>