<template>
    <div class="news-info">
        <h1 class="news-h1">小之子查题系统</h1>
    </div>
</template>

<script>

</script>

<style lang="less" TYPE="text/less" scoped>
    .news-info {
        width: 100%;
        height: 100%;
        background: url("../../../statics/images/background.jpg") no-repeat;
        background-size: 100%;
    }

    .news-h1 {
        width: 100%;
        height: 80px;
        font-size: 60px;
        font-weight: bold;
        color: white;
        margin-top: -24px;
        position: absolute;
        top: 50%;
        text-align: center;
        animation: turn 2s;
    }

    @keyframes turn {
        from {
            transform: translateY(-100px)
        }
        to {
            transform: translateY(0)
        }
    }

</style>