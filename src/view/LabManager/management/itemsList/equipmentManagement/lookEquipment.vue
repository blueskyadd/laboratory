<template>
    <div class="lookEquipment body_main">
        <header class="lookEquipment_index_header">
            <h3>设备查看</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>老化试验箱</p></div>
            <div class="main_list">
                <ul>
                    <li @click="gopurchaseEquipment()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>设备采购</span></li>
                    <li @click="godocumentEquipment()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>设备文档</span></li>
                    <li @click="gomaintenanceRecord()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>维修记录</span></li>
                    <li @click="goupkeepRecord()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>保养记录</span></li>
                    <li @click="gomeasureRecord()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>计量记录</span></li>
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
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'index'})
        },
        gopurchaseEquipment(){
            this.$router.push({name:'purchaseEquipment'})
        },
        godocumentEquipment(){
            this.$router.push({name:'documentEquipment'})
        },
        gomaintenanceRecord(){
            this.$router.push({name:'maintenanceRecord'})
        },
        goupkeepRecord(){
            this.$router.push({name:'upkeepRecord'})
        },
        gomeasureRecord(){
            this.$router.push({name:'measureRecord'})
        }
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