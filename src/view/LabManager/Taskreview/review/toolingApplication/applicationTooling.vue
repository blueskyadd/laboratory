<template>
    <div class="applicationTooling body_main" v-loading.fullscreen.lock="isLoading">
        <header class="applicationTooling_index_header">
            <h3>申请工装</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>工装名称：</span>
                    <p>{{frockSection.create_time}}</p>
                </div>
                <div class="mian_text two_child ">
                    <span>申请时间：</span>
                    <p>{{frockSection.create_time}}</p>
                </div>
                <div class="mian_text textarea">
                    <span>申请原因</span>
                    <div class="disabled">
                        <textarea name="" disabled maxlength="800" v-model="frockSection.cause" placeholder="工装严重老化" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{frockSection.cause.length}}/800</p>
                    </div>
                </div>
                <div class="main_list updata">
                    <span class="file_title">工装文件:</span>
                    <div class="file_box">
                        <div>
                            <span class="accessory" ><img src="../../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{frockSection.databook}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" class="primary_err" @click="editApplyFrockDetail(0)">不同意</el-button>
                <el-button type="primary" @click="editApplyFrockDetail(2)">审批</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'applicationTooling',
    data(){
        return{
            frockSection:{},
            isLoading: true,
        }
    },
    mounted(){
        this.getApplyFrockDetail()
    },
    methods:{
        getApplyFrockDetail(){
            this.$http.get(this.$conf.env.getApplyFrockDetail + this.$route.query.frockID + '/').then(res =>{
                this.frockSection = res.data
                 this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editApplyFrockDetail(number){
            this.isLoading = true;
            this.$http.put(this.$conf.env.editApplyFrockDetail + this.$route.query.frockID + '/',{"status":number}).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '审批成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back(-1);
                    },100)
                }else{
                    this.$message({ message: '审批失败', type: 'warning'});              
                }

            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
.applicationTooling{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationTooling_index_header{
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
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .85rem;
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
                margin-top: .64rem;
                .file_title{
                    width: auto!important;
                    margin-bottom: .4rem;
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
.applicationTooling::-webkit-scrollbar{
    display: none;
}
</style>