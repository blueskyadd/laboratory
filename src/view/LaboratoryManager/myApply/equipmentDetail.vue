<template>
    <div class="equipmentDetail body_main">
        <header class="equipmentDetail_index_header">
            <h3>设备查看</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>老化试验箱</p></div>
            <div class="main_list">
                <ul>
                    <li @click="godocumentEquipment()"><img src="../../../assets/img/LabManager/management/equipment/purchase_tag.png" alt=""><span>设备文档</span></li>
                    <li @click="gomaintenanceRecord()"><img src="../../../assets/img/LabManager/management/equipment/purchase_tag.png" alt=""><span>维修记录</span></li>
                    <li @click="goupkeepRecord()"><img src="../../../assets/img/LabManager/management/equipment/purchase_tag.png" alt=""><span>保养记录</span></li>
                    <li @click="gomeasureRecord()"><img src="../../../assets/img/LabManager/management/equipment/purchase_tag.png" alt=""><span>计量记录</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'equipmentDetail',
    data(){
        return{
            cause: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'LaboratoryManagerIndex'})
        },
        godocumentEquipment(){
            this.$router.push({name:'LaboratoryDocumentEquipment'})
        },
        gomaintenanceRecord(){
            this.$router.push({name:'LaboratoryMaintenanceRecord'})
        },
        goupkeepRecord(){
            this.$router.push({name:'LaboratoryUpkeepRecord'})
        },
        gomeasureRecord(){
            this.$router.push({name:'LaboratoryMeasureRecord'})
        }
    }
}
</script>
<style lang="scss" scoped>
.equipmentDetail{
     padding-top: .42rem;
     overflow-y: scroll;
    .equipmentDetail_index_header{
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
.equipmentDetail::-webkit-scrollbar{
    display: none;
}
</style>