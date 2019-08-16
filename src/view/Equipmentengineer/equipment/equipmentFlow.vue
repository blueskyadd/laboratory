<template>
    <div class="equipmentFlow body_main">
        <header class="equipmentFlow_index_header">
            <h3>设备流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>老化试验箱</p></div>
            <div class="main_list">
                <ul class="flow">
                    <li @click="gopurchaseEquipment()"><img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt=""><span>申请设备</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="godocumentEquipment()"><img src="../../../assets/img/Equipmentengineer/malfunction/contract.png" alt=""><span>合同</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="gomaintenanceRecord()"><img src="../../../assets/img/Equipmentengineer/malfunction/debugging.png" alt=""><span>上传调试报告</span></li>
                    
                </ul>
                <ul class="arrows">
                    <li><img src="../../../assets/img/Equipmentengineer/malfunction/arrowsTop.png" alt=""></li>
                    <li @click="goupkeepRecord()"><img src="../../../assets/img/Equipmentengineer/malfunction/maintain.png" alt=""><span>保养记录</span></li>
                    <li><img src="../../../assets/img/Equipmentengineer/malfunction/arrowsBottom.png" alt=""></li>
                    <li @click="gomeasureRecord()"><img src="../../../assets/img/Equipmentengineer/malfunction/service.png" alt=""><span>维修记录</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'equipmentFlow',
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
.equipmentFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .equipmentFlow_index_header{
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
            // margin-bottom: 2.58rem;
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
            display: flex;
            align-items: center;
            padding-left: 2.26rem;
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
            .flow li:nth-child(2),.flow li:nth-child(4),.arrows li:nth-child(1),.arrows li:nth-child(3){
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
            .flow li:nth-child(2):hover,.flow li:nth-child(4):hover,.arrows li:nth-child(1):hover,.arrows li:nth-child(3):hover{
                background:#fff;
                span{
                    color: #07A695;
                }
            }
            .flow{
                margin-right: -1.76rem;
                z-index: 2;
            }
            .arrows{
                // margin-left: -1.73rem;
                width: 4.9rem;
                flex-wrap: wrap;
                li:nth-child(1),li:nth-child(3){
                    width: 2.44rem;
                    height: .94rem;
                    img{
                        width: 100%;
                    }
                    padding: 0;
                    // margin-bottom: 2.4rem;
                }
                li:nth-child(1){
                    margin-top: .95rem;
                }
                li:nth-child(2){
                    margin-bottom: 1.29rem;
                }
                li:nth-child(3){
                    margin-top: .65rem;
                }
            }
        }
    }
}
.equipmentFlow::-webkit-scrollbar{
    display: none;
}
</style>