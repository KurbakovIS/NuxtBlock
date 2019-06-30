<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>Post title</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{new Date().toLocaleString()}}
        </small>
        <small>
          <i class="el-icon-view"></i>
          42
        </small>
      </div>
      <div class="post-img">
        <img src="http://animalworld.com.ua/images/2014/July/Foto/Rduj/Rdj_1.jpg" alt="">
      </div>
    </header>
    <main class="post-content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi corporis ducimus, eos fugiat id incidunt natus
        non perspiciatis placeat porro possimus quam quia sed, tenetur, veniam! Doloribus exercitationem officia
        ullam.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores commodi corporis dolorem doloremque esse
        est eveniet harum hic ipsum iste maiores nisi non nostrum numquam odio perferendis sapiente temporibus,
        voluptate?</p>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createCommentHandler"/>

      <div class="comments" v-if="true">
        <app-comment
          v-for="comment in 4"
          :key="comment"
          :comment="comment">
        </app-comment>
      </div>
      <div v-else class="text-center">Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
  import AppComment from '@/components/main/Comment'
  import AppCommentForm from '@/components/main/CommentForm'

  export default {
    name: "_id",
    data() {
      return {
        canAddComment: true
      }
    },
    validate({params}) {
      return !!params.id
    },
    methods: {
      createCommentHandler() {
        this.canAddComment = false
      }
    },
    components: {AppComment, AppCommentForm}
  }
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    align-items: center;
  }

  .post-content {
    margin-bottom: 2rem;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-img img {
    width: 100%;
    height: auto;
  }
</style>
