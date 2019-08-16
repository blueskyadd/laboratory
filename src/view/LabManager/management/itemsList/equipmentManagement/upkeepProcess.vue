<template>
    <div class="upkeepProcess body_main">
        <header class="upkeepProcess_index_header">
            <h3>保养流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="main_list">
                <ul>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>申请保养设备</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>维修工具、材料</span></li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li><img src="../../../../../assets/img/LabManager/management/equipment/purchase.gif" alt=""><span>上传保养报告</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default { 
    name:'upkeepProcess',
    data(){
        return{
            cause: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'index'})
        },
        
    }
}
</script>
<style lang="scss" scoped>
.upkeepProcess{
     padding-top: .42rem;
     overflow-y: scroll;
    .upkeepProcess_index_header{
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
            margin-top: 3.20rem;
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
.upkeepProcess::-webkit-scrollbar{
    display: none;
}
</style>