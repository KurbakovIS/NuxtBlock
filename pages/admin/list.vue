<template>
  <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column prop="title"
                     label="Название"/>
    <el-table-column
      label="Дата">
      <template slot-scope="{row:{date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ date| date('date') }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Просмотры">
      <template slot-scope="{row:{views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>


    <el-table-column label="Комментарии">
      <template slot-scope="{row:{comments}}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Действие">
      <template slot-scope="{row}">
        <el-tooltip effect="dark" content="Изменить" placement="top">
          <el-button
            icon="el-icon-edit"
            circle
            type="primary"
            @click="open(row._id)"/>
        </el-tooltip>

        <el-tooltip effect="dark" content="Удалить" placement="top">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="remove(row._id)"/>
        </el-tooltip>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "list",
    layout: 'admin',
    middleware: ['admin-auth'],
    head:{
      title:`Все посты | ${process.env.appName}`
    },
    async asyncData({store}) {
      return await store.dispatch('post/fetchAdmin')
    },
    methods: {
      open(id) {
        this.$router.push(`/admin/post/${id}`)
      },
      async remove(id) {
        try {
          await this.$confirm('Удалить пост', 'Внимание!', {
            confirmButtonText: 'Да',
            cancelButtonText: 'Отмена',
            type: 'warning'
          });
          await this.$store.dispatch('post/remove', id);
          this.posts = this.posts.filter(p => p._id !== id);
          this.$message.success('Пост удален')
        } catch (e) {

        }
      }
    }
  }
</script>

<style scoped>

</style>
