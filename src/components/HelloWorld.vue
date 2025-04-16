<template>
  <div>
    <h1>Olá Vue 2, direto do IntelliJ! 🎉</h1>
    <input v-model="mensagem" placeholder="Digite algo..." />
    <p>Você digitou: {{ mensagem }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mensagem: ''
    }
  }
}
</script>