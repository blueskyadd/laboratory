<template>
    <div class="testProcess body_main" v-loading.fullscreen.lock="isLoading">
        <header class="testProcess_index_header">
            <h3>试验流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
             <div class="titleEquipment"><span>试验名称：</span><p>{{equipmentSaction.name}}</p></div>
            <div class="main_list">
                <ul>
                    <li @click="environmentActive()" @mouseover="isEnvironment = true" @mouseout="isEnvironment = false" :style="{background:isEnvironment? '#07A695':'#fff'}">
                        <img style="margin-right: -30%;" src="../../../../../assets/img/Testengineer/projectProcess/environmentActive.png"  v-if="!isEnvironment">
                        <img style="margin-right: -30%;" src="../../../../../assets/img/Testengineer/projectProcess/environment.png" alt="" v-else>
                        <span :style="{color:isEnvironment? '#fff':'#07A695'}">试验环境搭建</span>
                    </li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="gotester()" @mouseover="isTestproject = true" @mouseout="isTestproject = false" :style="{background:isTestproject? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/Testengineer/projectProcess/testProject.png"  v-if="!isTestproject">
                        <img src="../../../../../assets/img/Testengineer/projectProcess/testProject_actively.png" alt="" v-else>
                        <span :style="{color:isTestproject? '#fff':'#07A695'}">试验员安排</span>
                    </li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goupTestdata()" @mouseover="isUplaod= true" @mouseout="isUplaod = false" :style="{background:isUplaod? '#07A695':'#fff'}">
                        <img src="../../../../../assets/img/LabManager/management/equipment/frockProcess/updataFile.png" alt="" v-if="!isUplaod">
                        <img src="../../../../../assets/img/LabManager/management/equipment/frockProcess/updataFile_actively.png" alt="" v-else>
                        <span :style="{color:isUplaod?'#fff':'#07A695'}">试验数据</span>
                    </li>
                    <li><img src="../../.../../../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goExperimental_result()">
                        <span :style="{color: equipmentSaction.result == '不合格' ? '#f10956':''}">{{equipmentSaction.result || '暂无'}}</span>
                        <span>试验结果分析</span>
                    </li>
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
            isEnvironment: false,
            isTestproject: false,
            isUplaod: false,
            isLoading: true,
            equipmentSaction:{}
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'TestengineerIndex'})
        },
        environmentActive(){
            this.$router.push({'path':'/Testengineer/environmentActive', query:{"equipmentID": this.$route.query.equipmentID,equipmentName: this.equipmentSaction.name}})
        },
        //实验室管理员
        gotester(){
            this.$router.push({'path':'/Testengineer/tester',query:{equipmentID: this.$route.query.equipmentID}})
        },
        //上传实验文件
        goupTestdata(){
            this.$router.push({'name':'upTestdata'})
        },
        //试验结果分析
        goExperimental_result(){
            this.$router.push({path:'/Testengineer/experimental_result',query:{"equipmentID": this.$route.query.equipmentID}})
        },
        getEquipment_finishexperimentDetail(){
            this.$http.get(this.$conf.env.getEquipment_finishexperimentDetail + this.$route.query.equipmentID + '/').then( res =>{
                console.log(res)
                this.equipmentSaction = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                console.log(err.response)
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getEquipment_myexperiment(){
             this.$http.get(this.$conf.env.getEquipment_myexperiment + this.$route.query.equipmentID + '/').then( res =>{
                console.log(res)
                this.equipmentSaction = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                console.log(err.response)
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        
        if(this.$route.query.flag){
            this.getEquipment_myexperiment();
        }else{
            this.getEquipment_finishexperimentDetail();
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
                        height: 1.2rem;
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
                  li:nth-child(4){

                  }
                 li:last-child{
                     justify-content: space-around;
                 }
            }
        }
    }
}
.testProcess::-webkit-scrollbar{
    display: none;
}
</style>