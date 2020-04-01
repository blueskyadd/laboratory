<template>
    <div class="NewEquipmentFlow body_main" v-loading.fullscreen.lock="isLoading">
        <header class="NewEquipmentFlow_index_header">
            <h3>设备流程</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="titleEquipment"><span>设备名称：</span><p>{{equipmentSection.name}}</p></div>
            <div class="main_list">
                <ul class="flow">
                    <li @click="goProposerEquipment()" @mouseover="isapplyEquipment = false" @mouseout="isapplyEquipment = true" :style="{background:isapplyEquipment? '#fff':'#07A695'}">
                        <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/applyEquipment.png" alt="" v-if="isapplyEquipment">
                        <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/applyEquipment_actively.png" alt="" v-else>
                        <span :style="{color:isapplyEquipment?'#07A695': '#fff'}">申请设备</span>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <!-- <li @click="godocumentEquipment()">
                        <img src="../../../assets/img/Equipmentengineer/malfunction/contract.png" alt="">
                        <span>上传合同</span>
                    </li> -->
                    <li @mouseover="iscontract= false" @mouseout="iscontract = true" :style="{background:iscontract? '#fff':'#07A695'}">
                        <a :href="contract" download="合同">
                            <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract.png" alt="" v-if="iscontract">
                            <img src="../../../assets/img/LabManager/management/equipment/purchaseEquipment/contract_actively.png" alt="" v-else>
                            <span :style="{color:iscontract?'#07A695': '#fff'}">合同</span>
                        </a>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="goUpdataReport()" @mouseover="isUplaod= false" @mouseout="isUplaod = true" :style="{background:isUplaod? '#fff':'#07A695'}">
                        <img src="../../../assets/img/LabManager/management/equipment/frockProcess/updataFile.png" alt="" v-if="isUplaod">
                        <img src="../../../assets/img/LabManager/management/equipment/frockProcess/updataFile_actively.png" alt="" v-else>
                        <span :style="{color:isUplaod?'#07A695': '#fff'}">上传调试报告</span>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="gomaintenanceRecord()">
                        <span>填写下次保养时间</span>
                        <img src="../../../assets/img/Equipmentengineer/malfunction/time.png" alt="">
                        <div>
                            <el-date-picker
                                v-model="equipmentSection.next_upkeep_time"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </li>
                    <li><img src="../../../assets/img/LabManager/management/equipment/arrows.png" alt=""></li>
                    <li @click="gomaintenanceRecord()">
                        <span>填写下次计量时间</span>
                        <img src="../../../assets/img/Equipmentengineer/malfunction/time.png" alt="">
                        <div>
                            <el-date-picker
                                v-model="equipmentSection.next_metering_time"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </li>
                </ul>
                <p>提示：请填写下次保养时间、下次计量时间</p>
            </div>
            <footer class="footer_button">
                <el-button type="primary" @click="updataEquipment_applyTime()">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'NewEquipmentFlow',
    inject:['reload'],
    data(){
        return{
            isLoading: true,
            isapplyEquipment: true,
            iscontract: true,
            isUplaod: true,
            isUpkeep:true,
            equipmentSection:{},
            contract: '',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'EquipmentengineerIndex'})
        },
        goProposerEquipment(){
            if(this.equipmentSection.status == 3){
                this.$router.push({name:'proposerEquipment'})
            }else{
                this.$message({ message:'已不可申请设备' , type: 'warning'});
            }
        },
        godocumentEquipment(){
            this.$router.push({name:'documentEquipment'})
        },
        goUpdataReport(){
            this.$router.push({path:'/Equipmentengineer/updataReport',  query:{ equipmentID: this.$route.query.equipmentID }})
        },
        goRecord(){
            this.$router.push({name:'record'})
        },
        goMaintain(){
            this.$router.push({name:'maintain'})
        },
        getMyequipment_applyNumberDetail(){
            this.$http.get(this.$conf.env.getMyequipment_applyNumberDetail + this.$route.query.equipmentID + '/').then( res =>{
                this.isLoading =  false;
                this.equipmentSection = res.data;
                console.log(res)
            }).catch(err =>{
                this.isLoading = false;
            })
        },
        updataEquipment_applyTime(){
            if(!this.equipmentSection.next_upkeep_time){
                this.$message({ message:'请填写下次保养时间再保存' , type: 'warning'});
            }else if(!this.equipmentSection.next_metering_time){
                this.$message({ message:'请填写下次计量时间再保存' , type: 'warning'});
            }else{
                this.$http.put(this.$conf.env.updataEquipment_applyReport + this.$route.query.equipmentID + '/',{
                    "next_upkeep_time": this.equipmentSection.next_upkeep_time,
                    "next_metering_time": this.equipmentSection.next_metering_time
                }).then(res =>{
                    if(res.status == '200'){
                        this.$message({ message: '保存成功', type: 'success'});
                        this.reload()
                    }else{
                        this.$message({ message: '保存失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                })
            }
        }
    },
    mounted(){
        this.getMyequipment_applyNumberDetail()
    }
}
</script>
<style lang="scss">
.NewEquipmentFlow{
     padding-top: .42rem;
     overflow-y: scroll;
    .NewEquipmentFlow_index_header{
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
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: .6rem;
            ul{
                display: flex;
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
            .flow li:last-child,li:nth-child(7){
                img{
                    width: .93rem;
                    height: .82rem;
                }
                span{
                    font-size: .22rem;
                    margin-bottom: .21rem;
                }
                div{
                    width: 1.38rem;
                    height: .4rem;
                    border: 1px solid #07A695;
                    text-align: center;
                    line-height: .4rem;
                    display: flex;
                    align-items: center;
                    div{
                        border: 0;
                    }
                    .el-input__inner{
                        cursor: pointer;
                        width: 94%!important;
                        height: 90%!important;
                        border: 0;
                        padding: 0 .04rem;
                        font-size: .22rem!important;
                        font-family:MicrosoftYaHei;
                        font-weight:400!important;
                        color:rgba(7,166,149,1);
                    }
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
                padding-top: .52rem;
                align-self: flex-end;
                // margin-right: 7%;
            }
        }
    }
}
.NewEquipmentFlow::-webkit-scrollbar{
    display: none;
}
</style>