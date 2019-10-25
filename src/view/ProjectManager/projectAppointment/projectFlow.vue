<template>
    <div class="projectFlow body_main"  v-loading.fullscreen.lock="isloading">
        <header class="proposer_index_header" style="justify-content:flex-start">
            <div>
                <h3>项目流程</h3>
                <div>
                    <span class="goBack underline" @click="$router.back(-1)">返回</span>
                    <span class="goBack underline" @click="goHome">首页</span>
                </div>
            </div>
            
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>{{projectDetail.name}}</p></div>
            <div class="projectOk">
                <img v-show="projectDetail.status == 8" src="../../../assets/img/projectManage/flow/projectOk.png" alt="">
            </div>
            <div class="main_list">
                <ul class="flow">
                    <li @click="goprojectmanage()"><img src="../../../assets/img/project/flow/projectManage.png" alt=""><span>试验管理</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goInternalAppointment()"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>预约内部试验</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goScheduleTest()"><img src="../../../assets/img/gauger/flow/schedule.png" alt=""><span>试验进度</span></li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goProjectPaper()">
                        <img src="../../../assets/img/Equipmentengineer/malfunction/equipment.png" alt="">
                        <span>项目报告</span>
                        <img class="result" v-if="projectDetail.result == 2" src="../../../assets/img/projectManage/flow/unqualified.png" alt="">
                        <img class="result" v-if="projectDetail.result == 3" src="../../../assets/img/projectManage/flow/qualified.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'projectFlow',
    data(){
        return{
            isloading: true,
            projectDetail:{}
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'gaugerIndex'})
        },
        goprojectmanage(){
            this.$router.push({path:'/ProjectManager/projectManageTest',query:{equipmentID:this.$route.query.equipmentID,equipmentName: this.projectDetail.name}})
        },
        goInternalAppointment(){
            this.$router.push({path:'/ProjectManager/InternalAppointment',query:{equipmentID:this.$route.query.equipmentID,equipmentName: this.projectDetail.name}})
        },
        goScheduleTest(){
            this.$router.push({path:'/ProjectManager/scheduleTest',query:{equipmentID:this.$route.query.equipmentID,equipmentName: this.projectDetail.name}})
        },
        goProjectPaper(){
            this.$router.push({path:'/ProjectManager/projectPaper',query:{equipmentID:this.$route.query.equipmentID,equipmentName: this.projectDetail.name,equipmentreport_result: this.projectDetail.report_result,equipmentreport:this.projectDetail.report}})
        },
        getProject_appointinfoFlow(){
            this.$http.get(this.$conf.env.getProject_appointinfoFlow + this.$route.query.equipmentID + '/').then(res =>{
                this.projectDetail = res.data;
                this.isloading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getProject_appointinfoFlow()
    }
}
</script>
<style lang="scss" scoped>
.projectFlow{
     padding-top: .42rem;
     overflow-y: scroll;
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
        .projectOk{
            display: flex;
            justify-content: flex-end;
            margin-bottom: .58rem;
            height: 2rem;
            img{
                // width: 2rem;
                height: 2rem;
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
             .flow li:last-child{
                position: relative;
                .result{
                    position: absolute;
                    top: .2rem;
                    left: .2rem;
                    width: 1rem;
                    height: auto;
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
.projectFlow::-webkit-scrollbar{
    display: none;
}
</style>