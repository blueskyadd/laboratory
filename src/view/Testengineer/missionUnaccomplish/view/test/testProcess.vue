<template>
    <div class="testProcess body_main">
        <header class="testProcess_index_header">
            <h3>保养流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
             <div class="titleEquipment"><span>设备名称：</span><p>老化试验箱</p></div>
            <div class="main_list">
                <ul>
                    <li @click="environmentActive()"><img style="margin-left: .7rem;" src="../../../../../assets/img/Testengineer/projectProcess/environmentActive.png" alt=""><span>试验环境搭建</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="gotester()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>试验员安排</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goupTestdata()"><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>上传试验数据</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>试验结果分析</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default { 
    name:'testProcess',
    data(){
        return{
            cause: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'TestengineerIndex'})
        },
        environmentActive(){
            this.$router.push({'name':'environmentActive'})
        },
        //实验室管理员
        gotester(){
            this.$router.push({'name':'tester'})
        },
        //上传实验文件
        goupTestdata(){
            this.$router.push({'name':'upTestdata'})
        }
        
    }
}
</script>
<style lang="scss" scoped>
.testProcess{
     padding-top: .42rem;
     overflow-y: scroll;
    .testProcess_index_header{
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
                padding: 0 2.72rem;
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
                        // width: 1.25rem;
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
                li:nth-child(2), li:nth-child(4),li:nth-child(6){
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
.testProcess::-webkit-scrollbar{
    display: none;
}
</style>