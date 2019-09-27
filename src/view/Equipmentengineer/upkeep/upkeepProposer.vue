<template>
    <div class="upkeepProposer body_main" v-loading.fullscreen.lock="isLoading">
        <header class="upkeepProposer_index_header">
            <h3>申请保养</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>设备名称：</span>
                    <p class="upkeepProposer_name">{{equipmentSection.name}}</p>
                    <span>设备编号：</span>
                    <p class="upkeepProposer_number">{{equipmentSection.num}}</p>
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>保养开始时间：</span>
                    <el-date-picker
                        v-model="equipmentSection.start_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span><i class="importantData">*</i>保养截止时间：</span>
                    <el-date-picker
                        v-model="equipmentSection.end_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="editEquipment_upkeepDetail">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../components/VerificationData';
export default {
    name:'upkeepProposer',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            isLoading: true,
            equipmentSection:{}
        }
    },
    mounted(){
        this.getEquipment_upkeepDetail()
    },
    methods:{
        getEquipment_upkeepDetail(){
            this.$http.get(this.$conf.env.getEquipment_upkeepDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.isLoading = false;
                res.data.start_time = res.data.start_time.split(' ')[0]+'T'+res.data.start_time.split(' ')[1]
                res.data.end_time = res.data.end_time.split(' ')[0]+'T'+res.data.end_time.split(' ')[1]
                this.equipmentSection= res.data;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editEquipment_upkeepDetail(){
            delete this.equipmentSection.status;
            if(!VerificationData.VerificationData(this.equipmentSection)) return;
            delete this.equipmentSection.name;
            delete this.equipmentSection.num;
            this.$http.post(this.$conf.env.editEquipment_upkeepDetail, this.equipmentSection).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back(-1)
                    },200)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss">
.upkeepProposer{
    
     padding-top: .42rem;
     overflow-y: scroll;
    .upkeepProposer_index_header{
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
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .upkeepProposer_name{
            width: 2.51rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .upkeepProposer_number{
            color: #07a695!important;
        }
        .el-input{
            width: auto !important;
            margin-right: .88rem;
        }
        .inputText{
            border: 1px solid #ccc;
            margin-right: .88rem;
            padding: 0 .15rem;
            width: 3.7rem;
        }
        .el-input__inner, input{
            height: .52rem; 
            width: 4rem;
            font-size: .2rem;
            font-weight: 200;
        }
            // }
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .68rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }

            }
            
            .first_child{
                p{
                    color:#333;
                }
                .upkeepProposerName{
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
           
        }
        
        footer{
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:last-child{
                background: #08a695;
            }
        }
    }
}
.upkeepProposer::-webkit-scrollbar{
    display: none;
}
</style>