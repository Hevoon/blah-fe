<template>
  <div class="head">
    <ul class="head-ul">
      <router-link :to="home">
        <li :class="headColor" @click="changeTurn">
          主页
        </li>
      </router-link>
      <router-link v-for="(li, index) in ul" :key="index" :to="li.path">
        <li :class="headColor" @click="changeTurnOff" :key="index">
          {{ li.title }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: { name: 'show' },
      ul: [
        {
          path: { name: 'now' },
          title: '获取题目',
        },
        {
          path: { name: 'create' },
          title: '增加题目',
        },
      ],
    }
  },
  computed: {
    headColor() {
      return {
        'head-li': true,
        headWhite: this.$store.state.turn,
        headBlack: !this.$store.state.turn,
      }
    },
  },
  methods: {
    changeTurn() {
      this.$store.commit('changeTurnWhite')
    },
    changeTurnOff() {
      this.$store.commit('changeTurnBlack')
    },
  },
}
</script>

<style lang="less" TYPE="text/less">
.head {
  width: 100%;
  height: 70px;
  position: absolute;
  background: transparent;
  z-index: 1;
}

.head-ul {
  background: transparent;
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 50%;
  margin: 0 auto;
}

.head-li {
  cursor: pointer;
  background: transparent;
  float: left;
  height: 100%;
  width:200px;
  text-align:center;
  // width: 10%;
  line-height: 70px;
  // margin-right: 5%;
  font-size: 18px;
  animation: head 2s;
  font-weight: 200;
  text-align: center;
  text-decoration: none;
  list-style: none;
  transition: color 0.5s;
}

.headWhite {
  transition: all 0.5s;
  color: white;
  &:hover {
    color: black;
  }
}

.headBlack {
  transition: color 0.5s;
  color: black;
  &:hover {
    color: white;
  }
}

@keyframes head {
  from {
    color: transparent;
  }
}
</style>
