<template>
    <div class="historyEditDeteil body_main" v-loading.fullscreen.lock="isLoading">
        <header class="historyEditDeteil_index_header">
            <h3>{{equipmentDetail.name}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="historyEditDeteil_mian">
                <div class="main_list">
                    <div><span>公司名称：</span><p>{{equipmentDetail.company}}</p></div>
                    <div><span>部门：</span><p>{{equipmentDetail.department}}</p></div>
                    <div><span>创建人：</span><p>{{equipmentDetail.manager}}</p></div>
                </div>
                <div class="main_list">
                    <div><span>项目类型</span><input v-model="equipmentDetail.project_type" placeholder="项目类型" type="text"></div>
                </div>
                 <div class="main_list projectTime">
                    <div>
                        <span>项目开始时间</span>
                        <el-date-picker
                            v-model="equipmentDetail.create_time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span>项目截止时间</span>
                        <el-date-picker
                            v-model="equipmentDetail.report_time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="main_list textarea">
                <div>
                    <span>项目简介</span>
                    <div>
                        <textarea name="" v-model="equipmentDetail.intro" maxlength="800" placeholder="输入项目简介" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{equipmentDetail.intro.length}}/800</p>
                    </div>
                </div>
            </div>
            </div>
            <!-- <footer>
                <el-button type="primary" >保存</el-button>
            </footer> -->
        </div>
    </div>
</template>
<script>
export default {
    name:'historyEditDeteil' ,
    data(){
        return{
            isLoading: true,
            equipmentDetail:{}
        }
    },
    methods:{
        getmeasure_finishproject(){
            this.$http.get(this.$conf.env.getmeasure_finishproject + this.$route.query.equipmentID + '/').then(res =>{
                this.equipmentDetail = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getmeasure_finishproject()
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
                    align-items: center;
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
                    align-items: flex-start;
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