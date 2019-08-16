<template>
    <div class="purchaseEquipment body_main">
        <header class="purchaseEquipment_index_header">
            <h3>设备采购</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>老化试验箱</p></div>
            <div class="main_list">
                <ul>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>申请设备</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>合同</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>试验报告</span></li>
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
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'index'})
        },
        gopurchaseEquipment(){
            this.$router.push({name:'purchaseEquipment'})
        },
        
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
                padding: 0 4.82rem;
                li{
                    position: relative;
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
                li:nth-child(2), li:nth-child(4){
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