<template>
    <div class="listInfoDetail body_main" v-loading.fullscreen.lock="isLoading">
        <imgInfo ref="imgInfo" />
        <div class="right_table">
            <ul>
                <li>
                    <h3>01项目前提</h3>
                    <div>
                        <span><i class="importantData">*</i>时间:</span>
                        <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            value-format="yyyy-MM-dd"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>填充内容:</span>
                        <textarea v-model="projectFlow.info1"></textarea>
                    </div>
                </li>
                <li>
                    <h3>02方案确认</h3>
                    <div>
                        <span><i class="importantData">*</i>时间:</span>
                        <el-date-picker
                            v-model="value2"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>填充内容:</span>
                        <textarea v-model="projectFlow.info2"></textarea>
                    </div>
                </li>
                <li>
                    <h3>03造型决定</h3>
                    <div>
                        <span><i class="importantData">*</i>时间:</span>
                        <el-date-picker
                            v-model="value3"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>填充内容:</span>
                        <textarea v-model="projectFlow.info3"></textarea>
                    </div>
                </li>
                <li>
                    <h3>04生准启动</h3>
                    <div>
                        <span><i class="importantData">*</i>时间:</span>
                        <el-date-picker
                            v-model="value4"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>填充内容:</span>
                        <textarea v-model="projectFlow.info4"></textarea>
                    </div>
                </li>
                <li>
                    <h3>05生准条件确认</h3>
                    <div>
                        <span><i class="importantData">*</i>时间:</span>
                        <el-date-picker
                            v-model="value5"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>填充内容:</span>
                        <textarea v-model="projectFlow.info5"></textarea>
                    </div>
                </li>
                <li>
                    <h3>06试生产</h3>
                    <div>
                        <span><i class="importantData">*</i>时间:</span>
                        <el-date-picker
                            v-model="value6"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>填充内容:</span>
                        <textarea v-model="projectFlow.info6"></textarea>
                    </div>
                </li>
            </ul>
            <footer>
                <el-button type="primary" @click="editPm_project_orderDetail()">提交</el-button>
                <el-button type="primary" @click="$router.back(-1)">返回</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import imgInfo from './timeTable';
import VerificationData from '../../../components/VerificationData';
export default {
    name:'listInfoDetail',
    components:{imgInfo},
    
    data(){
        return{
            value1:["2019-09-03", "2019-09-27"],
            
            value2:[],
            value3:[],
            value4:[],
            value5:[],
            value6:[],
            projectFlow:{},
            fileItemIndex: {},
            isLoading: true,
        }
    },
    methods:{
        getPm_project_orderList(ID){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getPm_project_orderList + ID + '/').then(res =>{
                this.projectFlow = res.data;
                
                this.value1=[res.data.start1?res.data.start1:'',res.data.end1?res.data.end1:''];
                this.value2 = [res.data.start2?res.data.start2:'', res.data.end2?res.data.end2:''];
                this.value3 = [res.data.start3?res.data.start3:'', res.data.end3?res.data.end3:''];
                this.value4 = [res.data.start4?res.data.start4:'', res.data.end4?res.data.end4:''];
                this.value5 = [res.data.start5?res.data.start5:'', res.data.end5?res.data.end5:''];
                this.value6 = [res.data.start6?res.data.start6:'', res.data.end6?res.data.end6:''];
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editPm_project_orderDetail(){
            this.projectFlow.start1 = this.value1[0]?this.value1[0]:'';this.projectFlow.end1 = this.value1[1]?this.value1[1]:'';
            this.projectFlow.start2 = this.value2[0]?this.value2[0]:'';this.projectFlow.end2 = this.value2[1]?this.value2[1]:'';
            this.projectFlow.start3 = this.value3[0]?this.value3[0]:'';this.projectFlow.end3 = this.value3[1]?this.value3[1]:'';
            this.projectFlow.start4 = this.value4[0]?this.value4[0]:'';this.projectFlow.end4 = this.value4[1]?this.value4[1]:'';
            this.projectFlow.start5 = this.value5[0]?this.value5[0]:'';this.projectFlow.end5 = this.value5[1]?this.value5[1]:'';
            this.projectFlow.start6 = this.value6[0]?this.value6[0]:'';this.projectFlow.end6 = this.value6[1]?this.value6[1]:'';
            if(!VerificationData.VerificationData(this.projectFlow)) return;
            this.isLoading = true;
            this.$http.put(this.$conf.env.editPm_project_orderDetail + this.fileItemIndex.id + '/', this.projectFlow).then(res =>{
                console.log(res)
                 if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    setTimeout(()=>{
                        this.getPm_project_orderList(this.fileItemIndex.id);
                        this.$refs.imgInfo.getPm_project_productFlow(this.fileItemIndex.id)
                    },100)
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    watch:{
        fileItemIndex(newData, oldData){
            this.getPm_project_orderList(this.fileItemIndex.id);
        },
        value6(newData, oldData){
            console.log(newData)
        }
    }
}
</script>
<style lang="scss" >
.listInfoDetail{
    padding: .14rem .34rem .18rem;
    display: flex;
    .imgInfo{
        height: 97%;
        position: relative;
        .el-dropdown{
            position: absolute;
            top: 0;
            right: 0;
            .el-dropdown-link{
                // line-height: .52rem;
                margin-top: .24rem;
                margin-right: .34rem;
                font-size: .2rem;
                display: block;
                color: #08a695; 
            }
        }
    }
    .right_table{
        width: 64%;
        ul{
            padding-top: .5rem;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: .52rem;
            li{
                width: 49.7%;
                display: flex;
                flex-direction: column;
                h3{
                    font-size: .18rem;
                    margin-bottom: .32rem;
                }
                div{
                    display: flex;
                    div{
                        margin-bottom: .22rem;
                        width: 4rem;
                        span{
                            display: flex;
                            align-items: center;
                            font-size: .2rem;
                        }
                    }
                    input{
                        height: .36rem;
                        // width: 3.5rem;
                        // border:1px solid #ccc;
                        font-size: .16rem;
                    }
                    textarea{
                         width: 4rem;
                        border:1px solid #ccc;
                        height: 1.3rem;
                        font-size: .16rem;
                        padding: .04rem;
                    }
                    
                }
                
            }
            li>div>span{
                display: block;
                width: 1.12rem;
                text-align: right;
                font-size: .16rem;
                margin-right: .1rem;
            }
             li:first-child{
                span,h3{
                    color: #51c3f0;
                }
            }
            li:nth-child(2){
                span,h3{
                    color: #ef4e89;
                }
            }
            li:nth-child(3){
                span,h3{
                    color: #842e91;
                }
            } 
            li:nth-child(4){
                span,h3{
                    color: #f8a15a;
                }
            }
            li:nth-child(5){
                span,h3{
                    color: #4485ad ;
                }
            }
            li:nth-child(6){
                span,h3{
                    color: #83c77c;
                }
            }
        }
        footer{
            justify-content: flex-end;
            display: flex;
            margin-right: 1.24rem;
            margin-top: .24rem;
            button{
                padding: .1rem .4rem!important;
                background: #08a695; 
                font-size: .2rem;
            }
        }
    }
}
 .imgInfo_listInfo_element{
         margin-left: -.68rem;
        
         li{
              color: #08a695;
            font-size: .16rem;
         }
    }
</style>