<template>
  <div>
    <h1>Аналитика по постам</h1>
    <app-analytics-chart title="Количество просмотров"
                         :data="views.data"
                         :labels="views.labels"/>
    <app-analytics-chart title="Количество комментариев"
                         :data="comments.data"
                         :labels="comments.labels"/>
  </div>
</template>

<script>
  import AppAnalyticsChart from '@/components/admin/AnalyticsChart'

  export default {
    name: "index",
    layout: 'admin',
    head:{
      title:`Аналитика | ${process.env.appName}`
    },
    middleware: ['admin-auth'],
    async asyncData({store}) {
      const {views,comments} = await store.dispatch('post/getAnalytics');
      return {views,comments}
    },
    components: {AppAnalyticsChart}
  }
</script>

<style scoped>

</style>
