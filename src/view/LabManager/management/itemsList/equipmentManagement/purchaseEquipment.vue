<template>
    <div class="purchaseEquipment body_main" v-loading.fullscreen.lock="isLoading">
        <header class="purchaseEquipment_index_header">
            <h3>设备采购</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>{{EquipmentpurchaseName}}</p></div>
            <div class="main_list">
                <ul>
                    <li @click="goapplicationEquipment" @mouseover="isapplyEquipment = false" @mouseout="isapplyEquipment = true" :style="{background:isapplyEquipment? '#fff':'#07A695'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/applyEquipment.png" alt="" v-if="isapplyEquipment">
                        <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/applyEquipment_actively.png" alt="" v-else>
                        <span :style="{color:isapplyEquipment?'#07A695': '#fff'}">申请设备</span>
                    </li>
                    <li>
                        <img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt="">
                    </li>
                    <li @mouseover="iscontract= false" @mouseout="iscontract = true" :style="{background:iscontract? '#fff':'#07A695'}">
                        <a :href="EquipmentpurchaseContract" download="w3logo">
                            <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract.png" alt="" v-if="iscontract">
                            <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract_actively.png" alt="" v-else>
                            <span :style="{color:iscontract?'#07A695': '#fff'}">合同</span>
                        </a>
                    </li>
                    <li>
                        <img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt="">
                    </li>
                    <li @mouseover="islookReport = false" @mouseout="islookReport = true" :style="{background:islookReport? '#fff':'#07A695'}">
                        <a :href="EquipmentpurchaseLookReport" download="w3logo">
                            <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport.png" alt="" v-if="islookReport">
                            <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport_actively.png" alt="" v-else>
                            <span :style="{color:islookReport?'#07A695': '#fff'}">试验报告</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'purchaseEquipment',
    data(){
        return{
            cause: '',
            isLoading: true,
            isapplyEquipment: true,
            iscontract: true,
            islookReport:true,
            EquipmentpurchaseName:'',
            EquipmentpurchaseContract:'',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'LabManagerIndex'})
        },
        goapplicationEquipment(){
            this.$router.push({name:'applicationEquipment'})
        },
        
        getEquipmentpurchaseInfo(){
            this.$http.get(this.$conf.env.getEquipmentpurchaseInfo + this.$route.query.EquipmentpurchaseID +  '/').then( res =>{
                this.EquipmentpurchaseName = res.data.name;
                this.EquipmentpurchaseContract = res.data.contract;
                this.EquipmentpurchaseLookReport = res.data.equipment_debug;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getEquipmentpurchaseInfo();
    }
}
</script>
<style lang="scss" scoped>
.purchaseEquipment{
     padding-top: .42rem;
     overflow-y: scroll;
    .purchaseEquipment_index_header{
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
            margin-bottom: 2.58rem;
            span{
                font-size: .24rem;
                color: #333333;
            }
            p{
                font-size: .24rem;
                color: #07A695
            }
        }
        .main_list{
            ul{
                display: flex;
                display: flex;
                // justify-content: ;
                padding: 0 25%;
                li{
                    position: relative;
                    background:#fff;
                    width: 31%;
                    height: 2.28rem;
                    box-shadow:0px .05rem .05rem 0px rgba(12,3,6,0.3);
                    border-radius: .05rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: .22rem;
                    border: 1px solid #07A695;
                    a{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
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
                   background:#07A695;
                   span{
                       color: #fff;
                   }
                }
                li:nth-child(2), li:nth-child(4){
                    position: inherit;
                    width: 18%;
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
                 li:nth-child(2):hover, li:nth-child(4):hover{
                     background: #fff;
                 }
            }
        }
    }
}
.purchaseEquipment::-webkit-scrollbar{
    display: none;
}
</style>