<template>
    <div class="reportDetail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="reportDetail_index_header">
            <h3>试验详情</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text two_child">
                    <span>项目名称：</span>
                    <p class="reportDetail_name">{{$route.query.equipmentName}}</p>
                    <span>公司部门：</span>
                    <p>{{labManagrInfo.company}}-{{labManagrInfo.department}}</p>
                </div>
                <div class="mian_text two_child ">
                    <span>试验名称：</span>
                    <p class="reportDetail_name">{{projectDetail.name}}</p>
                    <span>试验编号：</span>
                    <p class="reportDetail_name">{{projectDetail.experiment_num}}</p>
                </div>
                <div class="mian_text two_child ">
                    <span>试验结果：</span>
                    <p class="reportDetail_name">{{projectDetail.status}}</p>
                </div>
                <div class="information">
                    <div class="information_list ">
                        <div class="scroll_list">
                            <div class="mian_text two_child" v-for="item in projectDetail.interflows" :key="item.id">
                                <span>{{item.user}}：</span>
                                <p>{{item.text}}</p>
                            </div>
                        </div>
                        
                    </div>
                   <footer>
                       <span>我：</span>
                       <input type="text" v-model="intro">
                       <el-button type="primary" @click="sentProject_report">发送</el-button>
                   </footer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'reportDetail',
    data(){
        return{
            isLoading: true,
            intro:'',
            projectDetail:{},
            labManagrInfo:{}
        }
    },
    methods:{
        getProject_reportDetail(){
            this.$http.get(this.$conf.env.getProject_reportDetail  + this.$route.query.equipmentID +'/').then(res =>{
                this.isLoading = false;
                this.projectDetail = res.data;
                this.$nextTick(() => {
                    var container = document.getElementsByClassName('scroll_list')[0];
                    container.scrollTop = container.scrollHeight;
                })
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        sentProject_report(){
            if(!this.intro){
                 this.$message({ message:'写点内容在发送吧' , type: 'warning'});
            }else{
                this.isLoading = true;
                this.$http.put(this.$conf.env.sentProject_report+ this.$route.query.equipmentID +'/',{'intro':this.intro}).then(res =>{
                    this.intro = '';
                    this.getProject_reportDetail()
                }).catch(err =>{
                    this.isLoading = false;
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                })
            }
        },
        getProject_users(){
            this.$http.get(this.$conf.env.getProject_users).then(res =>{
                this.labManagrInfo = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
    },
    mounted(){
        this.getProject_reportDetail();
        this.getProject_users();
    }
}
</script>
<style lang="scss" scoped>
.reportDetail{
     padding-top: .42rem;
     overflow-y: scroll;
    .reportDetail_index_header{
        padding-left: .41rem;
        height: .38rem;
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
        height: 100%;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .reportDetail_name{
                width: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .reportDetail_time{
                width: 2.5rem;
            }
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                // height: .5rem;
                padding: .2rem 0;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
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
                    flex: 1;
                }
            }
            .information{
                border: 1px solid #333;
                height: 6.6rem;
                padding: 0.18rem .26rem 0;
                .information_list{
                    height: 85%;
                    overflow: hidden;
                    .scroll_list{
                        height: 100%;
                        overflow-y: scroll;
                        .mian_text{
                            list-style: .46rem;
                        }
                    }
                }
                footer{
                    height: .84rem ;
                    display: flex;
                    align-items: center;
                    span{
                        font-size: .2rem;
                    }
                    input{
                        height: .3rem;
                        border: 1px solid #999;
                        margin-right: .64rem;
                        width: 13.86rem;
                        font-size: .24rem;
                        padding: 0 .05rem;
                    }
                    button{
                        font-size: .3rem;
                        padding: .12rem .24rem;
                        background: #08a695;
                    }
                }
            }
            
        }
        
    }
}
.reportDetail::-webkit-scrollbar{
    display: none;
}
</style>