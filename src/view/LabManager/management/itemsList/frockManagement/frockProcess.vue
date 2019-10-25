<template>
    <div class="frockProcess body_main" v-loading.fullscreen.lock="isLoading">
        <header class="frockProcess_index_header">
            <h3>工装流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul>
                    <li   :style="{background:islookReport? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport.png" alt="" v-if="!islookReport">
                        <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport_actively.png" alt="" v-else>
                        <span :style="{color:islookReport? '#fff':'#07A695'}">申请工装</span>
                    </li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt="" ></li>
                    <li  :style="{background:iscontract? '#07A695':'#fff'}">
                        <a :href="contractUrl" download="合同">
                            <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract.png" alt="" v-if="!iscontract">
                            <img src="../../../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract_actively.png" alt="" v-else>
                            <span :style="{color:iscontract?'#fff':'#07A695'}">合同</span>
                        </a>
                    </li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt="" ></li>
                    <li  :style="{background:isUplaod? '#07A695':'#fff'}">
                        <a :href="reportUrl" download="调试报告">
                            <img src="../../../../../assets/img/LabManager/management/equipment/frockProcess/updataFile.png" alt="" v-if="!isUplaod">
                            <img src="../../../../../assets/img/LabManager/management/equipment/frockProcess/updataFile_actively.png" alt="" v-else>
                            <span :style="{color:isUplaod?'#fff':'#07A695'}">上传调试报告</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { get } from 'http';
export default { 
    name:'frockProcess',
    data(){
        return{
            isLoading: true,
            islookReport:true,
            iscontract: false,
            isUplaod:false,
            contractUrl: '',
            reportUrl: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'LabManagerIndex'})
        },
        getFrockApplyDetailInfo(){
            this.$http.get(this.$conf.env.getFrockApplyDetailInfo + this.$route.query.frockID ).then( res =>{
                this.contractUrl = res.data.contract?res.data.contract:'';
                this.iscontract = res.data.contract? true: false;
                this.reportUrl = res.data.report?res.data.report:'';
                this.isUplaod = res.data.report?true: false;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
            })
        },
    },
    mounted(){
        this.getFrockApplyDetailInfo()
    }
}
</script>
<style lang="scss" scoped>
.frockProcess{
     padding-top: .42rem;
     overflow-y: scroll;
    .frockProcess_index_header{
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
            margin-top: 3.20rem;
            ul{
                display: flex;
                display: flex;
                padding: 0 22%;
                li{
                    position: relative;
                    background:#fff;
                    width: 33%;
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
                li:nth-child(2), li:nth-child(4){
                    position: inherit;
                   width: 21%;
                    display: flex;
                    align-items: center;
                    background: #fff;
                    border:0;
                    box-shadow: none;
                    overflow: hidden;
                    img{
                        width: 100%;
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
.frockProcess::-webkit-scrollbar{
    display: none;
}
</style>