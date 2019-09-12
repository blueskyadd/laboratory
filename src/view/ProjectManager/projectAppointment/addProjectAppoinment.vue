<template>
    <div class="addProjectAppoinment body_main">
        <header class="addProjectAppoinment_index_header">
            <h3>{{titleProject}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>公司名称：</span>
                    <p class="guaranteeName">而非附件人家鹅肉</p>
                    <span>部门：</span>
                    <p>而非附件人家鹅肉</p>
                </div>
                <div class="mian_text first_child">
                    <span>项目名称：</span>
                    <el-select v-model="value" placeholder="请选择项目名称">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="margin-left:.24rem">项目类型：</span>
                    <el-select v-model="value" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="mian_text two_child ">
                    <span>项目开始时间：</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        placeholder="项目开始时间">
                    </el-date-picker>
                    <span style="margin-left:.24rem">项目结束时间：</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        placeholder="项目结束时间">
                    </el-date-picker>
                </div>
                <div class="mian_text textarea">
                    <span>项目简介</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="cause" placeholder="请输入项目简介" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{cause.length}}/800</p>
                    </div>
                </div>
                <div class="main_list updata">
                    <span class="file_title" style="margin-bottom:0.16rem">试验样件</span>
                    <div class="file_box">
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div class="fileBox">
                            <div><span @click="updataFileChange"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                        </div>
                    </div>
                    <P class="warnning">提示：创建试验前请将样件送至物料仓库审核，否则不能进行正常预约！</P>
                </div>
            </div>
            <footer>
                <el-button type="primary">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import Repairs from '../../../components/common/repairs';
export default {
    name:'addProjectAppoinment',
    components:{Repairs},
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
        value: '',
        statusTime:'',
        visible: false,
        titleProject: this.$route.query.flag == 1 ? '创建项目' : '编辑项目'
        }
    },
    methods:{
        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //上传按钮
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
        changeHiden(){
            console.log('aaa')
            this.visible = false
        }
    }
}
</script>
<style lang="scss" scoped>
.addProjectAppoinment{
     padding-top: .42rem;
     overflow-y: scroll;
    .addProjectAppoinment_index_header{
        padding-left: .41rem;
        height: .18rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .38rem;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        // 公共span
        span{
            font-size: .23rem;
            cursor:pointer;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
        }
    }
    .main{
        display: flex;
        height: calc(100% - 2.8rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .el-input{
                width: 4rem;
            }
            .guaranteeName{
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .7rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                textarea{
                    border:0;
                    width: 9.56rem;
                    height: 2.66rem;
                    font-size: .2rem;
                }
                textarea::placeholder{
                    color: #ccc;
                }
                
                textarea::-webkit-scrollbar{
                    width: .1rem;
                    height: .1rem;
                    background-color: #F5F5F5;
                }
                
                /*定义滚动条轨道 内阴影+圆角*/
                textarea::-webkit-scrollbar-track {
                    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #fff;
                }
                
                /*定义滑块 内阴影+圆角*/
                textarea::-webkit-scrollbar-thumb{
                    border-radius: .1rem;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: #ccc;
                }

            }
            .updata{
                display: flex;
                margin-top: .14rem;
                flex-direction: column;
                .warnning{
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(7,166,149,1);
                    font-size: .2rem;
                    padding-top: .42rem;
                }
                .file_title{
                    width: auto!important;
                    margin-bottom: .14rem;
                    font-size: .24rem;
                    color: #333333;
                    margin-right: .26rem;
                }
                .file_box{
                    flex-direction: column;
                    
                    div{
                        margin-right: 0.27rem;
                        align-items: flex-end;
                        display: flex;
                        div{
                        width: .8rem;
                        height: .8rem;
                        border:1px dashed #08a695;
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            width: 50%;
                            height: 50%;
                            cursor: pointer;
                            display: block;
                            display: flex;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        }
                    }
                    .accessory{
                        width: .65rem;
                        height: .6rem;
                        display: flex;
                        margin-right: .12rem;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        font-size: .22rem;
                        color: #666666;
                        margin-top: .6rem;
                    }
                    .deleteFile{
                        color: #f20000;
                        margin-left: 1.06rem;
                        line-height: .23rem;
                        margin-top: .13rem;
                        font-size: .23rem;
                        display: block;
                    }
                    
                }
                
            }
            .first_child{
                p{
                    color:#333;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
            .textarea{
                margin-top: .05rem;
                height: auto;
                align-items: flex-start;
                div{
                    margin-left: .19rem;
                    position: relative;
                    border: 1px solid #cccccc;
                    padding: .16rem .3rem;
                }
                p{
                    color: #08a695;
                    position: absolute;
                    bottom: .1rem;
                    right: .2rem;
                }
            }
            
        }
        
        footer{
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:first-child{
                background: #f10000;
                border: 0;
            }
            button:last-child{
                background: #08a695;
            }
        }
    }
}
.addProjectAppoinment::-webkit-scrollbar{
    display: none;
}
</style>