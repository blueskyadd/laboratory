<template>
    <div class="LaboratoryUpkeepProcess body_main" v-loading.fullscreen.lock="isLoading">
        <header class="LaboratoryUpkeepProcess_index_header">
            <h3>保养流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul>
                    <li  @click="goupkeepProposer()" @mouseover="ismalfunction = true" @mouseout="ismalfunction = false" :style="{background:ismalfunction? '#07A695':'#fff'}">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/malfunction.png"  v-if="!ismalfunction">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/malfunction_actively.png" alt="" v-else>
                        <span :style="{color:ismalfunction? '#fff':'#07A695'}">申请保养设备</span>
                    </li>
                    <li><img src="../../.../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goupkeepChange()" @mouseover="ismaintain = true" @mouseout="ismaintain = false" :style="{background:ismaintain? '#07A695':'#fff'}">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/maintain.png" alt="" v-if="!ismaintain">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/maintain_actively.png" alt="" v-else>
                        <span>维修工具、材料</span>
                    </li>
                    <li><img src="../../.../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @mouseover="islookReport = true" @mouseout="islookReport = false" :style="{background:islookReport? '#07A695':'#fff'}">
                        <a :href="reportDownUrl" download="保养报告">
                            <img src="../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport.png" alt="" v-if="!islookReport">
                            <img src="../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport_actively.png" alt="" v-else>
                            <span>上传保养报告</span>
                         </a>
                    </li>
                </ul>
            </div>  
        </div>
    </div>
</template>
<script>
export default { 
    name:'LaboratoryUpkeepProcess',
    data(){
        return{
            cause: '',
            ismalfunction: false,
            ismaintain:false,
            reportDownUrl:'',
            islookReport: false,
            isLoading: true,
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'LabManagerIndex'})
        },
        getmaintenanceRecordDetailInfo(){
            this.$http.get(this.$conf.env.getupkeeprecordInfo + this.$route.query.maintenanceProcessID + '/').then( res =>{
                this.reportDownUrl = res.data.report;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        goupkeepProposer(){
            this.$router.push({path:'/Equipmentengineer/upkeepProposer', query:{equipmentID: this.$route.query.maintenanceProcessID,flag:1}})
        },
        goupkeepChange(){
            this.$router.push({path:'/Equipmentengineer/upkeepChange', query:{equipmentID: this.$route.query.maintenanceProcessID}})
        }
    },
    mounted(){
        this.getmaintenanceRecordDetailInfo()
    }
}
</script>
<style lang="scss" scoped>
.LaboratoryUpkeepProcess{
     padding-top: .42rem;
     overflow-y: scroll;
    .LaboratoryUpkeepProcess_index_header{
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
                // justify-content: ;
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
                li:hover{
                   background:#07A695;
                   span{
                       color: #fff;
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
.LaboratoryUpkeepProcess::-webkit-scrollbar{
    display: none;
}
</style>