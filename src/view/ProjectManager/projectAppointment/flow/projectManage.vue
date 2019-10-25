<template>
    <div  class="body_main projectManageTest_index">
        <!-- 公共头部 -->
        <header class="proposer_index_header">
            <div>
                 <h3>任务审核</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
                <div class="projectManageTest_index_header_link">
                    <!-- <router-link class="underline"  to="/ProjectManager/addProjectTest?flag=1" tag="span">创建试验</router-link> -->
                    <span  class="underline" @click="gocreatedTest">创建试验</span>
                </div>
                
            </div>
           
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p>{{$route.query.equipmentName}}</p>
        </div>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="100%"  style="width: 100%"  :row-class-name="tabRowClassName"  v-loading="isLoading">
                <el-table-column prop="experiment_num" label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="project_type" label="实验类型" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="cycle" label="试验周期" header-align='center'  align='center'> </el-table-column>
                <el-table-column   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped">
                        <span class="underline"  @click="scoped.row.status  ==1&&allocation(scoped)" :style="{'color':scoped.row.status  ==1 ?'':'#999!important','cursor':scoped.row.status  ==1 ?'':'not-allowed'}"  style="margin-right:.24rem;">编辑</span>
                        <span class="underline"  @click="scoped.row.status  ==0&&deleteProject_experiment(scoped.row.id)" :style="{'color':scoped.row.status  ==0 ?'':'#999!important','cursor':scoped.row.status  ==0 ?'':'not-allowed'}">删除</span> </template>
                </el-table-column>
            </el-table>
        </div>
         <div class="pagination">
            <span class="pagesize">共{{Math.ceil(totalSum/page_size)}}页</span>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="CurrentChange"
                :page-size="page_size"
                layout="prev, pager, next"
                :total="totalSum">
            </el-pagination>
            <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'projectManageTest',
    data(){
        return{
             tableData: [],
             isLoading:true,//加载动画
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            CurrentChange:1,
        }
    },
    methods:{
        gocreatedTest(){
            this.$router.push({path:'/ProjectManager/addProjectTest?flag=1',query:{equipmentID:this.$route.query.equipmentID}})
        },
         changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        allocation(data){
            this.$router.push({path:'/ProjectManager/addProjectTest?flag=2',query:{equipmentID:data.row.id}})
        },
         /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getProject_experiment(this.CurrentChange);
        },
        getProject_experiment(pageNumber){
             pageNumber = pageNumber ?  pageNumber : 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_experiment +this.$route.query.equipmentID+ '&page_size=' +this.page_size : this.$conf.env.getProject_experiment +this.$route.query.equipmentID+ '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        //删除项目
        deleteProject_experiment(ID){
            this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteProject_experiment + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        if(this.tableData.length == 1 && this.CurrentChange != 1){
                            this.getProject_experiment(this.CurrentChange - 1);
                        }else{
                            this.getProject_experiment(this.CurrentChange);
                        }
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
        this.getProject_experiment(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getProject_experiment(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.projectManageTest_index{
@import '../../../../style/LabManager/management/index.scss';

    padding-top: .42rem;
        .projectManageTest_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: .4rem;
            span{
                margin-right: .38rem;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .projectManageTest_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        margin-top: .4rem;
        height: calc(100% - 3rem);
        th{
            font-size: .2rem;
            line-height: .48rem;
            padding: 0;
            font-weight: 400;
            .cell{
                line-height: .48rem;
            }
        }
        td{
            border: 0;
            padding: 0;
            font-size: .23rem;
             .cell{
                line-height: .67rem;
                span{
                    line-height: .67rem;
                }
            }
        }
    }
}
</style>
