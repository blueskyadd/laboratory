<template>
    <div class="frockFlow body_main">
        <header class="frockFlow_index_header">
            <h3>设备流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul class="flow">
                    <li @click="goProposeFeock()"><img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt=""><span>申请工装</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="godocumentEquipment()"><img src="../../../assets/img/Equipmentengineer/malfunction/contract.png" alt=""><span>合同</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goUpdatafrockReport()"><img src="../../../assets/img/Equipmentengineer/malfunction/debugging.png" alt=""><span>上传调试报告</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'frockFlow',
    data(){
        return{
            cause: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'EquipmentengineerIndex'})
        },
        goProposeFeock(){
            this.$router.push({name:'proposeFeock'})
        },
        godocumentEquipment(){
            this.$router.push({name:'documentEquipment'})
        },
        goUpdatafrockReport(){
            this.$router.push({name:'updatafrockReport'})
        },
    }
}
</script>
<style lang="scss" scoped>
.frockFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .frockFlow_index_header{
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
             margin-top: 2.82rem;
            display: flex;
            // align-items: center;
            // padding-left: 2.26rem;
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
            .flow li:last-child{
                img{
                    width: .93rem;
                    height: .82rem;
                }
                span{
                    font-size: .22rem;
                    margin-bottom: .21rem;
                }
                div{
                    font-size: .22rem;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(7,166,149,1);
                    width: 1.38rem;
                    height: .4rem;
                    border: 1px solid #07A695;
                    text-align: center;
                    line-height: .4rem;
                }
            }
             .flow li:nth-child(5){
                 img{
                     width: 1.32rem;
                     height: .98rem;
                     margin-top: .4rem;
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
.frockFlow::-webkit-scrollbar{
    display: none;
}
</style>