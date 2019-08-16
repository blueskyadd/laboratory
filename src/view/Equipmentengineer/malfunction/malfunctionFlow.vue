<template>
    <div class="malfunctionFlow body_main">
        <header class="malfunctionFlow_index_header">
            <h3>设备流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul class="flow">
                    <li @click="goMalfunctionDetail()"><img src="../../../assets/img/Equipmentengineer/malfunction/malfunction.png" alt=""><span>故障现象</span></li>

                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goMalfunctionChange()"><img src="../../../assets/img/Equipmentengineer/malfunction/changeEquipment.png" alt=""><span>维修工具、材料</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goMalfunctionReport()"><img src="../../../assets/img/Equipmentengineer/malfunction/lookReport.png" alt=""><span>上传维修报告</span></li>
                </ul>
                <p>提示：请扫描设备二维码开始维修</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'malfunctionFlow',
    data(){
        return{
            cause: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'EquipmentengineerIndex'})
        },
        goMalfunctionDetail(){
            this.$router.push({name:'malfunctionDetail'})
        },
        goMalfunctionChange(){
            this.$router.push({name:'malfunctionChange'})
        },
        goMalfunctionReport(){
            this.$router.push({name:'malfunctionReport'})
        },
    }
}
</script>
<style lang="scss" scoped>
.malfunctionFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .malfunctionFlow_index_header{
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
             margin-top: 2.58rem;
            display: flex;
            justify-content: center;
            flex-direction: column;
            // align-items: center;
            // padding-left: 2.26rem;
            ul{
                display: flex;
                width: 100%;
                justify-content: center;
                // display: flex;
                // height: 6.09rem;
                // justify-content: space-around;
                li{
                    cursor: pointer;
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
            p{
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(7,166,149,1);
                font-size: .2rem;
                margin-left: 4.6rem;
                padding-top: .43rem;
            }
        }
    }
}
.malfunctionFlow::-webkit-scrollbar{
    display: none;
}
</style>