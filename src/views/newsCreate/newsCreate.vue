<template>
  <div class="create">
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      class="create-form"
      :rules="rules"
    >
      <el-form-item label="题目名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="题目类别:" prop="category" style="width: 80%">
        <el-input v-model="form.category"></el-input>
      </el-form-item>
      <el-form-item label="题目内容:" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item class="form-setting">
        <el-button
          type="primary"
          class="form-button"
          style="margin-left: 38%;"
          @click="onSubmit($event)"
          >新增题目</el-button
        >
        <el-button class="form-button" @click="onClear">清除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        category: '',
        content: '',
      },
      rules: {
        name: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请填写题目类别', trigger: 'blur' },
        ],
        content: [{ message: '请填写题目内容', trigger: 'blur' }],
      },
    }
  },
  computed: {
    // allRegion() {
    //     return this.$store.state.allRegion
    // },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formDate = new FormData()
          let form = this.form
          let self = this
          formDate.append('name', form.name)
          formDate.append('category', form.category)
          formDate.append('content', form.content)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          this.$post('/addTopic', formDate, config)
            .then(function() {
              self.onClear()
              self.$message({
                message: '已发送',
                type: 'success',
                center: true,
                customClass: 'tip',
                duration: 1500,
              })
            })
            .catch((e) => console.log(e))
        } else {
          return false
        }
      })
    },
    onClear() {
      this.form = {
        name: '',
        category: '',
        content: '',
      }
    },
    customError() {
      throw new Error('error')
    },
  },
  mounted() {
    this.$store.commit('changeTurnBlack')
    // this.$store.commit('getAllRegion')
  },
}
</script>

<style lang="less" TYPE="text/less" scoped>
.create {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.07);
  padding-top: 70px;
  .el-input {
    width: 300px;
  }
  .form-button {
    float: left;
    display: block;
  }
  .form-button span {
    cursor: pointer;
  }

  .tip {
    z-index: 0;
    position: absolute;
    top: 10%;
  }

  textarea {
    height: 200px;
    width: 90%;
  }
}

.create-form {
  width: 80%;
  height: 80%;
  margin: 20px auto 0 auto;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 1px 1px 1px 1px #dddddd;
  padding: 50px 30px 20px 30px;
  position: relative;
}
.form-setting {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
</style>
