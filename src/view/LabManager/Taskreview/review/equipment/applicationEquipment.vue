<template>
    <div class="applicationEquipment body_main" v-loading.fullscreen.lock="isLoading">
        <header class="applicationEquipment_index_header">
            <h3>申请设备</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>设备名称：</span>
                    <p>{{equipmentSection.name}}</p>
                </div>
                <div class="mian_text two_child ">
                    <span>申请时间：</span>
                    <p>{{equipmentSection.create_time}}</p>
                </div>
                <div class="mian_text textarea">
                    <span>申请原因</span>
                    <div class="disabled">
                        <textarea name="" disabled  maxlength="800" v-model="equipmentSection.cause" placeholder="需求设备量大" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{equipmentSection.cause.length}}/800</p>
                    </div>
                </div>
                <div class="main_list updata">
                    <span class="file_title">采购技术指导书:</span>
                    <div class="file_box">
                        <div>
                            <span class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{equipmentSection.databook}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" class="primary_err" @click="editApplyEquipment(0)">退回</el-button>
                <el-button type="primary" @click="editApplyEquipment(2)">同意</el-button> 
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'applicationEquipment',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            equipmentSection:{
                "cause":'',
                "create_time":'',
                "databook":'',
                "name":'',
                "status":'',
                "num":'',
            },
             isLoading:true,
        }
    },
    mounted(){
        this.getApplyEquipmentDetail()
    },
    methods:{
        getApplyEquipmentDetail(){
            this.$http.get(this.$conf.env.getApplyEquipmentDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.equipmentSection = res.data
                 this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editApplyEquipment(number){
            this.isLoading = true;
            this.$http.put(this.$conf.env.editApplyEquipment + this.$route.query.equipmentID + '/',{"status":number}).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '审批成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back();
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
.applicationEquipment{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationEquipment_index_header{
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
.applicationEquipment::-webkit-scrollbar{
    display: none;
}
</style>