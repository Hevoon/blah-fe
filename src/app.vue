<template>
  <div
    class="app"
    v-loading.fullscreen.lock="Loading"
    element-loading-background="rgba(255,255,255,1)"
  >
    <Head />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Head from './views/head/head.vue'

export default {
    components: {
        Head
    },
    data() {
        return {
            Loading: false
        }
    },
    watch: {
        '$route': function (to, from) {
            this.Loading = true
            let self = this
            setTimeout(() => {
                self.Loading = false
            }, 500)
        }
    }
}
</script>

<!--不可以使用type属性-->
<style lang="less" scoped>
    .app {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background-color: white;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>

