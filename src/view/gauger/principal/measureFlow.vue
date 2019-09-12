<template>
    <div class="measureFlow body_main">
        <header class="measureFlow_index_header">
            <h3>计量流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>老化试验箱</p></div>
            <div class="main_list">
                <ul class="flow">
                    <li @click="goProposer()"><img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt=""><span>申请计量</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="godocumentEquipment()"><img src="../../../assets/img/Equipmentengineer/malfunction/contract.png" alt=""><span>合同签署</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goSchedule()"><img src="../../../assets/img/gauger/flow/schedule.png" alt=""><span>计量进度</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goReport()"><img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt=""><span>计量报告</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'measureFlow',
    data(){
        return{
            cause: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'gaugerIndex'})
        },
        goProposer(){
            this.$router.push({name:'proposer'})
        },
        godocumentEquipment(){
            this.$router.push({name:'documentEquipment'})
        },
        goSchedule(){
            this.$router.push({name:'schedule'})
        },
        goReport(){
            this.$router.push({name:'measureFlowReport'})
        },
    }
}
</script>
<style lang="scss" scoped>
.measureFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .measureFlow_index_header{
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
            display: flex;
            // align-items: center;
            padding-left: 2.26rem;
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
            .flow li:nth-child(5){
                img{
                    width: .93rem;
                    height: 1.23rem;
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
.measureFlow::-webkit-scrollbar{
    display: none;
}
</style>