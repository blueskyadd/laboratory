<template>
    <div class="LaboratoryMaintenanceProcess body_main">
        <header class="LaboratoryMaintenanceProcess_index_header">
            <h3>维修流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul>
                    <li @click="goMalffunctionDetail()"  @mouseover="ismalfunction = true" @mouseout="ismalfunction = false" :style="{background:ismalfunction? '#07A695':'#fff'}">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/malfunction.png"  v-if="!ismalfunction">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/malfunction_actively.png" alt="" v-else>
                        <span :style="{color:ismalfunction? '#fff':'#07A695'}">故障现象</span>
                    </li>
                    <li><img src="../../.../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="gomalfunctionChange()" @mouseover="ismaintain = true" @mouseout="ismaintain = false" :style="{background:ismaintain? '#07A695':'#fff'}">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/maintain.png" alt="" v-if="!ismaintain">
                        <img src="../../../../assets/img/LabManager/management/equipment/maintenanceProcess/maintain_actively.png" alt="" v-else>
                        <span :style="{color:ismaintain? '#fff':'#07A695'}">维修工具、材料</span>
                    </li>
                    <li><img src="../../.../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @mouseover="islookReport = true" @mouseout="islookReport = false" :style="{background:islookReport? '#07A695':'#fff'}">
                        <a :href="reportDownUrl" download="维修报告">
                            <img src="../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport.png" alt="" v-if="!islookReport">
                            <img src="../../../../assets/img/LabManager/management/equipment/purchaseEquipment/lookReport_actively.png" alt="" v-else>
                            <span :style="{color:islookReport? '#fff':'#07A695'}">查看维修报告</span>
                         </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default { 
    name:'LaboratoryMaintenanceProcess',
    data(){
        return{
            ismalfunction: false,
            ismaintain:false,
            reportDownUrl:'',
            islookReport: false
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'LabManagerIndex'})
        },
        getmaintenanceRecordDetailInfo(){
            this.$http.get(this.$conf.env.getmaintenanceRecordDetailInfo + this.$route.query.maintenanceProcessID + '/').then( res =>{
                this.reportDownUrl = res.data.report;
            }).catch(err =>{
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        goMalffunctionDetail(){
            this.$router.push({path:'/Equipmentengineer/malfunctionDetail',query:{equipmentID: this.$route.query.maintenanceProcessID}})
        },
        gomalfunctionChange(){
            this.$router.push({path:'/Equipmentengineer/malfunctionChange',query:{equipmentID: this.$route.query.maintenanceProcessID}})
        }
    },
    mounted(){
        this.getmaintenanceRecordDetailInfo()
    }
}
</script>
<style lang="scss" scoped>
.LaboratoryMaintenanceProcess{
     padding-top: .42rem;
     overflow-y: scroll;
    .LaboratoryMaintenanceProcess_index_header{
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
            margin-top: 3.2rem;
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
.LaboratoryMaintenanceProcess::-webkit-scrollbar{
    display: none;
}
</style>