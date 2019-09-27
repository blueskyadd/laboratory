<template>
    <div class="tester_detail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="tester_index_header">
            <h3>试验员安排</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="main_box">
                 <div class="taskName" style="margin-bottom: .3rem;">
                    <span>试验名称：</span>
                    <p class="ProjectName">{{testeresString.name}}</p>
                    <span >试验编号：</span>
                    <p class="companyName">{{testeresString.experiment_num}}</p>
                </div>
                <div class="taskName" style="margin-bottom: .25rem;">
                    <span>试验类型：</span>
                    <p class="ProjectName">{{testeresString.project_type}}</p>
                    <span >试验开始时间：</span>
                    <p class="companyName">{{testeresString.start_time}}</p>
                    <span >预计试验结束时间：</span>
                    <el-date-picker
                        v-model="testeresString.end_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="table_box">
                    <span class="underline" @click="addTesteres()">新增</span>
                    <el-table :data="testeresString.testeres" :cell-style="changecolor" height="calc(100% - 1.1rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading_box'>
                        <el-table-column prop="tester" min-width="20%" label="试验员" header-align='center'  align='center'> </el-table-column>
                        <el-table-column prop="on_duty"  label="值守" min-width="20%" header-align='center'  align='center'> </el-table-column>
                        <el-table-column    label="操作" header-align='right' align='right' class-name="rightText_report">
                            <template slot-scope="scoped">
                                <span class="underline deletemanagement" style="margin-right:0!important" @click="deleteTesteres(scoped.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- <footer>
                <el-button type="primary" @click="$refs.popUp.dialogVisible = false">确定</el-button>
            </footer> -->
        </div>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span><i class="importantData">*</i>实验员：</span>
                        <el-select v-model="testeresDetail.tester"  popper-class='principal_element' placeholder="选择实验员">
                            <el-option
                            v-for="item in testeresList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span><i class="importantData">*</i>值守：</span>
                        <el-select v-model="testeresDetail.on_duty"  popper-class='principal_element' placeholder="是否值守">
                        <el-option
                        v-for="item in on_dutyList"
                        :key="item.id"
                        :label="item.lable"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="createdTestuserInfo()">完成</el-button></li>
                </ul>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../../components/common/popUp';
import VerificationData from '../../../../../../components/VerificationData';
export default {
    name:'tester',
    components:{popUp},
    inject:['reload'],
    data(){
        return{
            isLoading: true,
            testeresString:{},
            testeresDetail: { "tester":'',"on_duty":'',"experiment":this.$route.query.equipmentID*1 },
            on_dutyList:[{"lable": '是',"id": true},{ "lable": '否', "id": false }],
            testeresList:[],
            isLoading_box: false,
            popUptitle: '新增',
        }
    },
    methods:{
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
         changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        addTesteres(){
            this.getTestuserList();
            this.$refs.popUp.dialogVisible = true;
            this.testeresDetail = { "tester":'',"on_duty":'',"experiment":this.$route.query.equipmentID*1 };
        },
        getEquipment_testersDetail(){
            this.$http.get(this.$conf.env.getEquipment_testersDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.isLoading = false;
                res.data.end_time = res.data.end_time.split(' ')[0]+'T'+res.data.end_time.split(' ')[1]
                this.testeresString = res.data;
            }).catch( err =>{
                this.isLoading = false;
            })
        },
        //试验员列表
        getTestuserList(){
            this.$http.get(this.$conf.env.getTestuserList).then( res =>{
                this.testeresList = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //创建
        createdTestuserInfo(){
            if(!VerificationData.VerificationData(this.testeresDetail)) return;
            this.$http.post(this.$conf.env.createdTestuserInfo, this.testeresDetail).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        //删除
        deleteTesteres(ID){
            this.$confirm('此操作将删除试验员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteTesteres + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        this.reload();
                    }else{
                        this.$message({ message: '删除失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    if(err.response.status == '400'){
                        this.$message({ message:err.response.data, type: 'warning'});   
                    }else{
                        this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });          
            });
        }
    },
    mounted(){
        this.getEquipment_testersDetail()
    }
}
</script>
<style lang="scss">
.tester_detail{
     padding-top: .42rem;
    .tester_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .42rem;
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
        height: calc(100% - 1.5rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .main_box{
            height: calc(100% - .5rem);
        }
        .table_box{
            height: calc(100% - 1rem);
            .underline{
                font-size: .26rem;
                float: right;
                margin: 0 .46rem .12rem 0;
            }
        }
        .taskName{
            p{
                color: #999;
                margin-right: 1.5rem;
            }
            .ProjectName{
                max-width: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .taskName{
                align-items: center;
            }
        }
            //斑马线
        .warning-row{
            background:#f6f6f6;
        }
        
        footer{
            align-self:flex-end;
            margin-right: .46rem;
            height: .6rem;
            display: flex;
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
                background: #08a795;
                border: 0;
            }
        }
    }
     .el-dialog{
            height: 35% !important;
            li:last-child{
                padding-top: .24rem;
            }
        }
    
}
</style>
