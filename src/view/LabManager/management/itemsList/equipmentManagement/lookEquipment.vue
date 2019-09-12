<template>
    <div class="lookEquipment body_main" v-loading.fullscreen.lock="isLoading">
        <header class="lookEquipment_index_header">
            <h3>设备查看</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>{{equipmentName}}</p></div>
            <div class="main_list">
                <ul>
                    <li @click="gopurchaseEquipment()" @mouseover="isImgFlowpurchase = true" @mouseout="isImgFlowpurchase = false" :style="{background:isImgFlowpurchase? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/purchase_tag.png" alt="" v-if="!isImgFlowpurchase">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/purchase_tag_actively.png" alt="" v-else>
                        <span  :style="{color:isImgFlowpurchase? '#fff':'#07A695'}">设备采购</span>
                    </li>
                    <li @click="godocumentEquipment()"  @mouseover="isImgFlowequipmentText = true" @mouseout="isImgFlowequipmentText = false" :style="{background:isImgFlowequipmentText? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/equipmentText.png" alt="" v-if="!isImgFlowequipmentText">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/equipmentText_actively.png" alt="" v-else>
                        <span :style="{color:isImgFlowequipmentText? '#fff':'#07A695'}">设备文档</span>
                    </li>
                    <li @click="gomaintenanceRecord()"  @mouseover="isImgFlowmaintenance = true" @mouseout="isImgFlowmaintenance = false" :style="{background:isImgFlowmaintenance? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/maintenance.png" alt="" v-if="!isImgFlowmaintenance">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/maintenance_actively.png" alt="" v-else>
                        <span :style="{color:isImgFlowmaintenance? '#fff':'#07A695'}">维修记录</span>
                    </li>
                    <li @click="goupkeepRecord()" @mouseover="isImgFlowmaintenanceInfo = true" @mouseout="isImgFlowmaintenanceInfo = false" :style="{background:isImgFlowmaintenanceInfo? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/maintenanceInfo.png" alt="" v-if="!isImgFlowmaintenanceInfo">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/maintenanceInfo_actively.png" alt="" v-else>
                        <span :style="{color:isImgFlowmaintenanceInfo? '#fff':'#07A695'}">保养记录</span>
                    </li>
                    <li @click="gomeasureRecord()" @mouseover="isImgFlowmeasure = true" @mouseout="isImgFlowmeasure = false" :style="{background:isImgFlowmeasure? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/measure.png" alt="" v-if="!isImgFlowmeasure">
                        <img src="../../../../../assets/img/LabManager/management/equipment/flow/measure_actively.png" alt="" v-else>
                        <span :style="{color:isImgFlowmeasure? '#fff':'#07A695'}">计量记录</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'lookEquipment',
    data(){
        return{
            cause: '',
            equipmentName:'',
            isImgFlowpurchase: false,
            isImgFlowequipmentText: false,
            isImgFlowmaintenance:false,
            isImgFlowmaintenanceInfo: false,
            isImgFlowmeasure: false,
            isLoading: true,
            EquipmentpurchaseID:'',
            equipmentNum:'',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'LabManagerIndex'})
        },
        gopurchaseEquipment(){
            this.$router.push({path:'/purchaseEquipment',query:{EquipmentpurchaseID: this.EquipmentpurchaseID}})
        },
        godocumentEquipment(){
            this.$router.push({name:'documentEquipment'})
        },
        gomaintenanceRecord(){
             this.$router.push({path:'/maintenanceRecord',query:{EquipmentpurchaseID: this.EquipmentpurchaseID,equipmentNum:this.equipmentNum,equipmentName: this.equipmentName}})
        },
        goupkeepRecord(){
            this.$router.push({path:'/upkeepRecord',query:{EquipmentpurchaseID: this.EquipmentpurchaseID,equipmentNum:this.equipmentNum,equipmentName: this.equipmentName}})
        },
        gomeasureRecord(){
            this.$router.push({path:'/measureRecord',query:{EquipmentpurchaseID: this.EquipmentpurchaseID,equipmentNum:this.equipmentNum,equipmentName: this.equipmentName}})
        },
        getEquipmentFlow(){
            this.$http.get(this.$conf.env.getEquipmentFlow + this.$route.query.equipmentID + '/').then( res =>{
                this.equipmentName = res.data.name;
                this.EquipmentpurchaseID = res.data.apply_for;
                this.equipmentNum = res.data.num;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
            })
        }
    },
    mounted(){
        this.getEquipmentFlow()
    }
}
</script>
<style lang="scss" scoped>
.lookEquipment{
     padding-top: .42rem;
     overflow-y: scroll;
    .lookEquipment_index_header{
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
                width: 100%;
                display: flex;
                justify-content: space-around;
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
                   background:#07A695;
                   span{
                       color: #fff;
                   }
                }
            }
        }
    }
}
.lookEquipment::-webkit-scrollbar{
    display: none;
}
</style>