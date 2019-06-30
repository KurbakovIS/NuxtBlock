<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="controls"
             @submit.native.prevent="onSubmit"
             :rules="rules"
             ref="form">

      <h2>{{post.title}}</h2>

      <el-form-item label="текст в формате .md или .html" prop="text">
        <el-input v-model.trim="controls.text"
                  type="textarea"
                  resize="none"
                  :rows="10"/>
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>
              {{ post.date | date}}
            </span>
        </small>

        <small>
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>
      <el-form-item>

        <el-button type="primary"
                   round
                   :loading=loading
                   native-type="submit"
        >
          Обновить
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: `${this.post.title} | ${process.env.appName}`
      }
    },
    layout: 'admin',
    middleware: ['admin-auth'],
    validate({params}) {
      return !!params.id
    },
    async asyncData({store, params}) {
      const post = await store.dispatch('post/fetchAdminById', params.id);
      return {post}
    },
    data() {
      return {
        loading: false,
        controls: {
          text: ''
        },
        rules: {
          text: [
            {required: true, message: 'Текст не должен быть пустым', trigger: 'blur'},
          ],

        },
      }
    },
    mounted() {
      this.controls.text = this.post.text
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true;

            try {
              const formData = {
                text: this.controls.text,
                id: this.post._id
              };
              await this.$store.dispatch('post/update', formData);
              this.$message.success('Пост обновлен');
              this.controls.text = '';
              this.loading = false
            } catch (e) {
              this.loading = false
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-wrap {
    width: 600px;
  }

  .mr {
    margin-right: 2rem;
  }
</style>
