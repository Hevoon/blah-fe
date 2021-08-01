<template>
    <div class="info">
        <div class="info-role-img">
            <img src="../../../statics/images/info.jpg">
            <h2>Hevoon</h2>
        </div>
        <div class="info-text">
            <img class="info-github" src="../../../statics/images/GitHub.png">
            <div class="info-title">github:</div>
            <div class="info-i">Hevoon LI</div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.commit('changeTurnBlack')
        }
    }
</script>

<style TYPE="text/less" lang="less" scoped>
    .info {

        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.07);
        padding-top: 70px;
        .info-role-img {
            margin-top: 50px;
            height: 48%;
            img {
                margin: 0 auto;
                display: block;
                height: 90%;
                border-radius: 50%;
            }
            h2 {
                text-align: center;
                font-size: 35px;
            }
        }
        .info-text {
            cursor: default;
            text-align: center;
            font-weight: 200;
            width: 100%;
            height: 100px;
            margin-top: 7%;
            float: left;
            color: black;
            animation: turn 2s;
            background-color: rgba(0, 0, 0, 0.1);
            .info-title {
                width: 6%;
                text-align: right;
                height: 100px;
                float: left;
                line-height: 100px;
                font-size: 30px;
            }
            .info-i {
                width: 15%;
                padding-left: 10px;
                height: 100px;
                float: left;
                line-height: 100px;
                text-align: left;
                font-size: 30px;
            }
            .info-github {
                height: 90%;
                margin-top: 5px;
                float: left;
                margin-left: 40%;
            }
        }
    }

    @keyframes turn {
        from {
            transform: translateX(-100%)
        }
        to {
            transform: translateX(0)
        }
    }
</style>