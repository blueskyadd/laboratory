<template>
    <div class="frockFlow body_main" v-loading.fullscreen.lock="isLoading">
        <header class="frockFlow_index_header">
            <h3>设备流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul class="flow">
                    <li @click="goProposeFeock()"  :style="{background:!isapplyFrock? '#fff':'#07A695'}">
                        <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/applyEquipment.png" alt="" v-if="!isapplyFrock">
                        <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/applyEquipment_actively.png" alt="" v-else>
                        <span :style="{color:!isapplyFrock?'#07A695': '#fff'}">申请详情</span>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li  :style="{background:!iscontract? '#fff':'#07A695'}">
                        <a :href="contractUrl" download="合同">
                            <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract.png" alt="" v-if="!iscontract">
                            <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract_actively.png" alt="" v-else>
                            <span :style="{color:!iscontract?'#07A695': '#fff'}">合同</span>
                        </a>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="isUplaod&&goUpdatafrockReport()" :style="{background:!isUplaod? '#fff':'#07A695'}">
                        <img src="../../../assets/img/LabManager/management/equipment/frockProcess/updataFile.png" alt="" v-if="!isUplaod">
                        <img src="../../../assets/img/LabManager/management/equipment/frockProcess/updataFile_actively.png" alt="" v-else>
                        <span :style="{color:!isUplaod?'#07A695': '#fff'}">上传调试报告</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'frockFlow',
    data(){
        return{
            isapplyFrock: true,
            iscontract: false,
            isUplaod: false,
            contractUrl: '',
            isLoading: true,
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'EquipmentengineerIndex'})
        },
        goProposeFeock(){
            if(!this.isapplyFrock){
                this.$message({ message:'暂时不可以申请设备哦' , type: 'warning'}); 
            }else{
                this.$router.push({path:'/Equipmentengineer/proposeFeock', query:{"equipmentID": this.$route.query.equipmentID}})
            }
        },
        goUpdatafrockReport(){
            this.$router.push({path:'/Equipmentengineer/updatafrockReport', query:{"equipmentID": this.$route.query.equipmentID}})
        },
        getApplyequipment_frockDetail(){
            this.$http.get(this.$conf.env.getApplyequipment_frockDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.isLoading =  false;
                this.contractUrl = res.data.contract;
                if(res.data.status  == 3 ||  res.data.status  > 3){
                    this.iscontract = true;
                    this.isUplaod = true;
                }
            }).catch( err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getApplyequipment_frockDetail()
    }
}
</script>
<style lang="scss" scoped>
.frockFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .frockFlow_index_header{
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
        .main_list{
             margin-top: 2.82rem;
            display: flex;
            // align-items: center;
            // padding-left: 2.26rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            ul{
                display: flex;
                // width: 100%;
                // display: flex;
                // height: 6.09rem;
                // justify-content: space-around;
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
            .flow li:last-child{
                img{
                    width: .93rem;
                    height: .82rem;
                }
                span{
                    font-size: .22rem;
                    margin-bottom: .21rem;
                }
                div{
                    font-size: .22rem;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(7,166,149,1);
                    width: 1.38rem;
                    height: .4rem;
                    border: 1px solid #07A695;
                    text-align: center;
                    line-height: .4rem;
                }
            }
             .flow li:nth-child(5){
                 img{
                     width: 1.32rem;
                     height: .98rem;
                     margin-top: .4rem;
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
.frockFlow::-webkit-scrollbar{
    display: none;
}
</style>