<template>
    <div class="historyEditDeteil body_main">
        <header class="historyEditDeteil_index_header">
            <h3>项目名称</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="historyEditDeteil_mian">
                <div class="main_list">
                    <div><span>公司名称：</span><p>二分额外为</p></div>
                    <div><span>部门：</span><p>二分额外为</p></div>
                    <div><span>创建人：</span><p>二分额外为</p></div>

                </div>
                <div class="main_list">
                    <div><span>项目名称</span><input placeholder="填写委托公司" type="text"></div>
                    <div><span>项目类型</span><input placeholder="填写负责人" type="text"></div>
                </div>
                 <div class="main_list projectTime">
                    <div>
                        <span>项目开始时间</span>
                        <el-date-picker
                            v-model="statusTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span>项目截止时间</span>
                        <el-date-picker
                            v-model="statusTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="main_list textarea">
                <div>
                    <span>项目简介</span>
                    <div>
                        <textarea name="" v-model="cause" maxlength="800" placeholder="输入项目简介" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{cause.length}}/800</p>
                    </div>
                </div>
            </div>
            </div>
            <footer>
                <el-button type="primary" >保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'historyEditDeteil' ,
    data(){
        return{
            fileName: '',//文件名称
            file:{},
            cause: '',
            statusTime:'',

        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        deleteFile(){
            this.file = {};
            this.fileName = '';
        }
    }
}
</script>
<style lang="scss">
.historyEditDeteil{
     padding-top: .42rem;
    .historyEditDeteil_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .52rem;
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
        padding:0  1.9rem .87rem .59rem;
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
         .historyEditDeteil_mian{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .main_list{
                display: flex;
                margin-bottom: .2rem;
                div{
                    display: flex;
                    margin-right: 1.45rem;
                    
                    p{
                        font-size: .23rem;
                        color: #666;
                    }
                    input{
                        width: 3rem;
                        height: .48rem;
                        font-size: .22rem;
                        border:1px solid #cccccc;
                        padding: 0 .15rem;
                        font-weight: 200;
                    }
                    input::placeholder{
                        color: #989898;
                    } 
                }
                
            }
             .main_list > div>span{
                    font-size: .24rem;
                    color: #333;
                    width:1.32rem;
                }
            .projectTime{
                input{
                    padding: 0 .3rem!important;
                }
            }
            .projectTime>div>span{
                width: 1.7rem!important;
            }
            textarea{
                border:0;
                width: 9.56rem;
                height: 2.66rem;
                font-size: .2rem;
            }
            .textarea{
                margin-top: .45rem;
                height: auto;
                div{
                    div{
                        margin-left: .19rem;
                        position: relative;
                        border: 1px solid #cccccc;
                        padding: .16rem .3rem;
                        display: initial;
                    }
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
                background: #08a695;
            }
        }
    }
}
</style>