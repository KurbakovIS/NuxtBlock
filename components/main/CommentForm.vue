<template>
  <el-form :model="controls"
           @submit.native.prevent="onSubmit"
           :rules="rules"
           ref="form">

    <h1>Добавить комментарий</h1>

    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model.trim="controls.name"/>
    </el-form-item>

    <el-form-item label="Текст комментария" prop="text">
      <el-input
        v-model.trim="controls.text"
        type="textarea"
        resize="none"
        :rows="2"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 round
                 :loading = loading
                 native-type="submit"
      >
        Добавить комментарий
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    name: "CommentForm",
    data() {
      return {
        loading: false,
        controls: {
          name: '',
          text: ''
        },
        rules: {
          name: [
            {required: true, message: 'Имя не должно быть пустым', trigger: 'blur'},
          ],
          text: [
            {required: true, message: 'Введите ваш комментарий', trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true;

            const formData = {
              name: this.controls.name,
              text: this.controls.text,
              postId: ''
            };
            try {
              setTimeout(() => {
                this.$message.success('Комментарий добавлен');
                this.$emit('created');
              }, 2000)
            } catch (e) {
              console.log(e);
              this.loading = false
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
