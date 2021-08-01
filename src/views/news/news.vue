<template>
  <div class="news-info">
    <el-button type="primary" class="card-button" @click="onClick($event)"
      >获取题目</el-button
    >
    <div class="card-div">
      <el-card v-for="(one, index) in pageData" :key="index" class="card">
        <div class="card-bottom">题目类别:{{ one.category }}</div>
        <div class="card-title">
          <b>{{ one.name }}</b>
        </div>
        <div class="card-desc">内容:{{ one.content }}</div>
      </el-card>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        class="receive-propose-dueout-page"
        background
        layout="prev, pager, next"
        :page-size="8"
        :total="length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      tableDataLength: 10,
    }
  },
  computed: {
    length() {
      return this.$store.state.news.length
    },
    pageData() {
      return this.$store.state.pageNews
    },
  },
  methods: {
    //进行换页操作
    handleCurrentChange(e) {
      this.$store.commit('changePageNews', e)
    },
    onClick(e) {
      this.$store.commit('getNowNews')
    },
  },
  mounted() {
    // this.$store.commit('getNowNews')
    this.$store.commit('changeTurnBlack')
  },
}
</script>

<style lang="less" TYPE="text/less">
.news-info {
  width: 100%;
  height: 100%;
  color: #768399;
  background-color: rgba(0, 0, 0, 0.07);
  padding-top: 50px;
  position: relative;
  .card-button {
    position: fixed;
    top: 80px;
    left: 15px;
  }
  .card-div {
    float: left;
    width: 90%;
    height: 90%;
    overflow: auto;
    margin-left: 5%;
    margin-top: 20px;
    padding: 10px;
  }

  .card {
    width: 20%;
    float: left;
    margin-left: 2.5%;
    margin-right: 2.5%;
    height: 300px;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
  }

  .card-desc {
    max-height: 60%;
    text-align: left;
    display: block;
    overflow-y: auto;
  }
  .el-card__body {
    height: 100% !important;
    padding: 10px;
  }

  .card-title {
    max-height: 30%;
    min-height: 15%;
    display: block;
    font-size: 16px;
    line-height: 16px;
  }

  .card-bottom {
    font-size: 13px;
    line-height: 13px;
    color: #999;
    height: 10%;
    font-weight: 500;
    display: block;
  }
  .block {
    clear: both;
    width: 5%;
    margin: 0 auto 0 auto;
    padding: 0 auto;
    text-align: center;
  }
}
</style>
