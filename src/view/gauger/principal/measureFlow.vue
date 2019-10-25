<template>
    <div class="measureFlow body_main" v-loading.fullscreen.lock="isLoading">
        <header class="measureFlow_index_header">
            <h3>计量流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>{{meteringSection.name}}</p></div>
            <div class="img_bg">
                <img src="../../../assets/img/gauger/flow/overFlow.png" alt="">
            </div>
            <div class="main_list">
                <ul class="flow">
                    <li @click="goProposer()"><img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt=""><span>申请计量</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li >
                        <a download="合同签署" :href="meteringSection.compact">
                            <img src="../../../assets/img/Equipmentengineer/malfunction/contract.png" alt=""><span>合同签署</span>
                        </a>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goSchedule()"><img src="../../../assets/img/gauger/flow/schedule.png" alt=""><span>计量进度</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goReport()"><img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt=""><span>计量报告</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'measureFlow',
    data(){
        return{
            meteringSection: {},
            isLoading: true,
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'gaugerIndex'});
        },
        goProposer(){
            if(this.meteringSection.status == 0){
                this.$router.push({path:'/gaugerIndex/proposer', query:{equipmentID: this.$route.query.equipmentID}});
            }else{
                this.$message({ message:'此设备已申请' , type: 'warning'}); 
            }
        },
        goSchedule(){
            this.$router.push({path:'/gaugerIndex/schedule', query:{equipmentID: this.$route.query.equipmentID}});
        },
        goReport(){
            this.$router.push({path:'/gaugerIndex/measureFlowReport' , query:{equipmentID: this.$route.query.equipmentID}});
        },
        getGauger_meteringFlow(){
            this.$http.get(this.$conf.env.getGauger_meteringFlow + this.$route.query.equipmentID + '/').then( res =>{
                this.meteringSection = res.data;
                this.isLoading = false;
            }).catch( err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getGauger_meteringFlow()
    }
}
</script>
<style lang="scss" scoped>
.measureFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .measureFlow_index_header{
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
        padding: 0 .58rem;
        .titleEquipment{
            display: flex;
            span{
                font-size: .24rem;
                color: #333333;
            }
            p{
                font-size: .24rem;
                color: #07A695
            }
        }
        .img_bg{
            margin-bottom: 2.14rem;
            overflow: hidden;
            margin-top: -.76rem;
            img{
                float: right;
            }
        }
        .main_list{
            display: flex;
            // align-items: center;
            // padding-left: 2.26rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            ul{
                display: flex;
                li{
                    background:#fff;
                    width: 2.4rem;
                    height: 2.28rem;
                    box-shadow:0px .05rem .05rem 0px rgba(12,3,6,0.3);
                    border-radius: .05rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: .22rem;
                    border: 1px solid #07A695;
                    img{
                        width: 1.25rem;
                        height: 1.25rem;
                        margin-bottom: .37rem;
                    }
                    span{
                        font-size: .3rem;
                        color: #07A695;
                    }
                }
                li:hover{
                    background:#fff;
                   span{
                       color: #07A695;
                   }

                }
            }
            .flow li:nth-child(2n){
                position: inherit;
                width: 1.18rem;
                display: flex;
                align-items: center;
                background: #fff;
                border:0;
                box-shadow: none;
                overflow: hidden;
                img{
                    width: 1.18rem;
                    height: auto;
                    display: block;
                    margin: auto;
                    margin-right: -.02rem;
                }
            }
            .flow li:nth-child(2n):hover{
                background:#fff;
                span{
                    color: #07A695;
                }
            }
            .flow li:nth-child(5){
                img{
                    width: .93rem;
                    height: 1.23rem;
                }
            }
            p{
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(7,166,149,1);
                font-size: .24rem;
                margin-left: 10.78rem;
                padding-top: .52rem;
            }
        }
    }
}
.measureFlow::-webkit-scrollbar{
    display: none;
}
</style>