<template>
  <div class="error-layout">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "error"
  }
</script>

<style lang="scss" scoped>
  .error-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error-title {
    margin-top: 4rem;
    color: red;
    margin-bottom: 1rem;
  }
</style>
