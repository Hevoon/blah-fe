<template>
    <div class="section">
        <div class="section-head">
            <h1 style="float: left;font-size: 18px;color: black;font-weight: 200;width: auto;margin-left: 20px;margin-right: 10px">
                当前栏目:</h1>
            <el-select v-model="region" placeholder="新闻栏目" style="width:8%;font-size: 20px" size="small">
                <el-option v-for="(re,index) in allRegion" :key=index :value="re.region" :label="re.region"
                           style="font-size: 15px"></el-option>
            </el-select>
        </div>
        <div style="display: block;margin: 5px auto 0 auto;width: 80%;background-color: white;padding: 10px">
            <el-input
                    placeholder="请输入想要创建的栏目"
                    v-model="createRegion"
                    style="width: 15%">
            </el-input>
            <el-button type="primary" @click="createRegions()">创建栏目</el-button>
        </div>
        <el-table
                :data="tableData"
                stripe
                class="section-table"
                style="width: 80%">
            <el-table-column
                    align="center"
                    label="标题"
                    prop="title"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="分类"
                    prop="region"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="日期"
                    prop="time"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="查看"
            >
                <template slot-scope="scope">
                    <el-button
                            @click="handleEdit(scope.row)">查看
                    </el-button>
                    <el-button
                            @click="doEdit(scope.row)">修改/删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    class="receive-propose-dueout-page"
                    background
                    layout="prev, pager, next"
                    :page-size=8
                    :total="length">
            </el-pagination>
        </div>
        <el-dialog title="新闻资讯" :visible.sync="dialogTableVisible" class="section-dialog">
            <div class="section-title">{{gridData.title}}</div>
            <div class="section-desc">{{gridData.desc}}</div>
            <div class="section-bottom">{{gridData.time}}</div>
        </el-dialog>
        <el-dialog title="新闻资讯" :visible.sync="dialogTableVisibles" class="section-dialog">
            <el-form ref="form" :model="changeData" label-width="100px" class="create-form" :rules="rules">
                <el-form-item label="文章标题:" prop="title">
                    <el-input v-model="changeData.title"></el-input>
                </el-form-item>
                <el-form-item label="文章分类:" prop="region" style="width: 80%">
                    <el-select v-model="changeData.region" placeholder="请选择文章类别" style="width: 70%">
                        <el-option v-for="(re,index) in allRegion" :key="index" :value=re.region :label=re.region></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章正文:" prop="desc">
                    <el-input type="textarea" v-model="changeData.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sendEdit($event)">修改新闻</el-button>
                    <el-button type="primary" @click="deleteEdit($event)">删除新闻</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogTableVisibles: false,
                gridData: {},
                changeData: {
                    title: '11',
                    region: '',
                    desc: '',
                    id: ''
                },
                region: 'sports',
                rules: {
                    title: [
                        {required: true, message: '请输入文章标题', trigger: 'blur'},
                    ],
                    region: [
                        {required: true, message: '请选择文章栏目', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请填写文章正文', trigger: 'blur'}
                    ]
                },
                page: 1,
                createRegion: ''
            }
        },
        watch: {

            region: function () {
                // console.log(this.region)
                this.$store.commit('getAllNews', this.region)
            }
        },
        computed: {
            allRegion() {
                return this.$store.state.allRegion
            },
            length() {
                return this.$store.state.allNews.length
            },
            tableData() {
                return this.$store.state.allPageNews
            }

        },
        methods: {
            handleEdit(e) {
                this.dialogTableVisible = true;
                this.gridData = e;
            },
            //进行换页操作
            handleCurrentChange(e) {
                this.page = e;
                console.log('done');
                this.$store.commit('changePageAllNews', e);
            },
            doEdit(e) {
                this.dialogTableVisibles = true;
                this.changeData.title = e.title;
                this.changeData.region = e.region;
                this.changeData.id = e.id;
                this.changeData.desc = e.desc;
            },
            onClear() {
                this.changeData = {
                    title: '',
                    region: '',
                    desc: '',
                    id: ''
                }
            },
            sendEdit() {
                this.$refs.form.validate((valid) => {
                        if (valid) {
                            let formDate = new FormData();
                            let forms = this.changeData;
                            let self = this;
                            formDate.append('title', forms.title);
                            formDate.append('id', forms.id);
                            formDate.append('region', forms.region);
                            formDate.append('desc', forms.desc);
                            let config = {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            };
                            this.$post('/update', formDate, config).then(function () {
                                self.$store.commit('getAllNews', self.region);
                                self.dialogTableVisibles = false;
                                self.onClear();
                                self.$message({
                                    message: '已发送修改',
                                    type: 'success',
                                    center: true,
                                    customClass: 'tip',
                                    duration: 1500
                                })
                            }).then(function () {
                                console.log(self.page)
                                self.handleCurrentChange(self.page)
                            })
                        } else {
                            return false;
                        }
                    }
                )
            },
            deleteEdit() {
                let formDate = new FormData();
                let forms = this.changeData;
                let self = this;
                formDate.append('id', forms.id);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.$post('/delete', formDate, config).then(function () {
                    self.$store.commit('getAllNews', self.region);
                    self.dialogTableVisibles = false;
                    self.onClear();
                    self.$message({
                        message: '已删除',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                }).then(function () {
                    console.log(self.page)
                    self.handleCurrentChange(self.page)
                })
            },
            createRegions() {
                let formDate = new FormData();
                let self = this;
                formDate.append('region', self.createRegion);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.$post('/create_region', formDate, config).then(function () {
                    self.$store.commit('getAllRegion')
                    self.$message({
                        message: '已添加',
                        type: 'success',
                        center: true,
                        customClass: 'tip',
                        duration: 1500
                    })
                })
            }
        },
        mounted() {
            this.$store.commit('getAllNews', this.region);
            this.$store.commit('changeTurnBlack')
            this.$store.commit('getAllRegion')
        }
    }
</script>

<style TYPE="text/less" lang="less">
    .section {
        width: 100%;
        height: 100%;
        color: #768399;
        background-color: rgba(0, 0, 0, 0.07);
        padding-top: 70px;
        overflow-y: scroll;
        .section-now {
            width: 50%;
            text-align: center;
            margin: 0 auto;
        }
    }

    .section-drop {
        margin: 0 auto;
        display: block;
    }

    .section-head {
        width: 80%;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        background-color: white;
    }

    .section-table {
        overflow-y: scroll;
        margin: 20px auto 0 auto;
        border-radius: 5px;
        height: 580px;
    }

    .block {
        clear: both;
        width: 20%;
        margin: 20px auto 0 auto;
        padding: 0 auto;
        text-align: center;
    }

    .section-desc {
        height: 400px;
        text-align: left;
        overflow: hidden;
        line-height: 1.5;
        letter-spacing: 1px;
    }

    .section-title {
        margin-bottom: 20px;
        display: block;
        font-size: 30px;
    }

    .section-bottom {
        position: absolute;
        bottom: 0;
        font-weight: 500;
        margin-bottom: 10px;
        font-size: 20px;
    }

    .section-dialog {
        min-height: 200px;
        textarea {
            height: 30%
        }
    }
</style>