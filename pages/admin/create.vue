<template>
  <el-form :model="controls"
           @submit.native.prevent="onSubmit"
           :rules="rules"
           ref="form">

    <h1 class="mb">Создать новый пост</h1>

    <el-form-item label="Введите название поста" prop="title">
      <el-input v-model.trim="controls.title"/>
    </el-form-item>


    <el-form-item label="текст в формате .md или .html" prop="text">
      <el-input v-model="controls.text"
                type="textarea"
                resize="none"
                :rows="10"/>
    </el-form-item>

    <el-form-item>

      <el-dialog
        title="Предпросмотр"
        :visible.sync="previewDialog">
        <div :key="controls.text">
          <vue-markdown>{{controls.text}}</vue-markdown>
        </div>
      </el-dialog>

      <el-upload
        class="mb"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleImageChange"
        :auto-upload="false"
        ref="upload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Перетащите картинку или <em>нажмите</em></div>
        <div class="el-upload__tip" slot="tip"> Файлы с расширением jpg/png</div>
      </el-upload>

      <el-button type="success"
                 class="mb"
                 plain
                 @click="previewDialog=true"
      >
        Предпросмотр
      </el-button>
      <el-button type="primary"
                 round
                 :loading=loading
                 native-type="submit"
      >
        Создать пост
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    name: "create",
    layout: 'admin',
    middleware: ['admin-auth'],
    data() {
      return {
        image: null,
        previewDialog: false,
        loading: false,
        controls: {
          text: '',
          title: ''
        },
        rules: {
          text: [
            {required: true, message: 'Текст не должен быть пустым', trigger: 'blur'},
          ],
          title: [
            {required: true, message: 'Назвние поста не должно быть пустым', trigger: 'blur'},
          ],

        },
      }
    },
    methods: {
      handleImageChange(file, fileList) {
        this.image = file.raw
      },
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid && this.image) {
            this.loading = true;

            try {
              const formData = {
                text: this.controls.text,
                title: this.controls.title,
                image: this.image,
              };
              await this.$store.dispatch('post/create', formData);

              this.controls.text = '';
              this.controls.title = '';
              this.image = null;
              this.$refs.upload.clearFiles();

              this.$message.success('Пост создан');
              this.loading = false
            } catch (e) {
            } finally {
              this.loading = false
            }
          } else {
            this.$message.warning('Форма не валидна')
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
