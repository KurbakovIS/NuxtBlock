<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{post.title}}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{new Date(post.date).toLocaleString()}}
        </small>
        <small>
          <i class="el-icon-view"> {{post.views}}</i>
        </small>
      </div>
      <div class="post-img">
        <img :src="post.imageUrl"
             alt="post image">
      </div>
    </header>
    <main class="post-content">
      <vue-markdown>{{post.text}}</vue-markdown>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        :postId="post._id"
        @created="createCommentHandler"/>

      <div class="comments" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
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
    data() {
      return {
        canAddComment: true
      }
    },
    validate({params}) {
      return !!params.id
    },
    async asyncData({store, params}) {
      const post = await store.dispatch('post/fetchById', params.id);
      await store.dispatch('post/addView', post);
      return {post: {...post, views: ++post.views}}
    },
    methods: {
      createCommentHandler(comment) {
        this.post.comments.unshift(comment);
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
