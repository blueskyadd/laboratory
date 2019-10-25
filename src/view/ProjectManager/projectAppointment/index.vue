<template>
    <div class="management_projectAppointment body_main">
        <header class="proposer_index_header">
            <div>
                <h3>预约项目</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='searchProject_Project_appointment' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>

        </header>
        <!-- <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">项目类型</span>
                    <el-select v-model="value" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">项目创建时间</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        placeholder="计量截止时间">
                    </el-date-picker>
                </li>
                <li>
                    <span class="equipmentName">项目预计完成时间</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        placeholder="计量截止时间">
                    </el-date-picker>
                </li>
                <li>
                    <span class="equipmentName">项目状态</span>
                    <el-select v-model="value" placeholder="请选择项目状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
        </div> -->
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 2.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="项目创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="end_time"  label="项目预计完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="项目状态" header-align='center' align='center'> </el-table-column>
            <el-table-column label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped">
                    <span class="underline lookmanagement"  @click="allocation(scoped)">预约</span>
                    <span class="underline lookmanagement"  :style="{'color':scoped.row.num > 4 ?'#999!important':'','cursor':scoped.row.num >4  ?'not-allowed':''}"   @click="scoped.row.num <4&&editquipment(scoped)">编辑</span>
                    <span class="underline deletemanagement"  :style="{'color':scoped.row.num <4 ?'':'#999!important','cursor':scoped.row.num <4 ?'':'not-allowed'}"   @click="scoped.row.num <4&&deleteProject_Project_appointment(scoped.row.id)">删除</span> </template>
            </el-table-column>
        </el-table>
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
import Search from "../../../components/common/search";
export default {
    name:'projectAppointment',
    components:{Search},
    data() {
      return {
        tableData: [],
        placeholderTexe: '搜索项目编号、名称',
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
        isSearch: false,//是否为搜索
        searchText:'',//搜索文字
      }
    },
    methods:{
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        allocation(data){
            this.$router.push({path: '/ProjectManager/projectFlow',query:{equipmentID: data.row.id} })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getProject_Project_appointment(pageNumber):this.searchProject_Project_appointment(this.searchText,pageNumber);
        },
        searchProject_Project_appointment(data,pageNumber){
            pageNumber = pageNumber ?pageNumber:1
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_Project_appointment + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getProject_Project_appointment + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getProject_Project_appointment(pageNumber){
            this.isSearch = false;
             pageNumber = pageNumber ?  pageNumber : 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_Project_appointment + '?page_size=' +this.page_size : this.$conf.env.getProject_Project_appointment + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editquipment(data){
            this.$router.push({path:'/ProjectManager/addProjectAppoinment',query:{equipmentID:data.row.id,flag:2}})
        },
        //删除项目
        deleteProject_Project_appointment(ID){
            this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteProject_Project_appointment + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        if(this.tableData.length == 1 && this.CurrentChange != 1){
                            !this.isSearch?this.getProject_Project_appointment(this.currentPage - 1):this.searchProject_Project_appointment(this.searchText,this.currentPage - 1);
                        }else{
                            !this.isSearch?this.getProject_Project_appointment(this.currentPage):this.searchProject_Project_appointment(this.searchText,this.currentPage);
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
        this.getProject_Project_appointment(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getProject_Project_appointment(this.CurrentChange):this.searchProject_Project_appointment(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_projectAppointment{
    padding-top: .46rem;
    .goBack{
        margin-right: 10.4rem;
    }
    .Search{
        ul{
            margin-bottom: 0;
        }
        li{
            margin-bottom: .33rem;
            .el-input{
                width: 100%!important;  
            }
        }
        li>span{
            width: -webkit-fill-available;
        }
        .editTableButton{
            margin-top: -.74rem!important;
        }
    }
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
        //斑马线
        .warning-row{
            background:#f6f6f6;
        }
        .lookmanagement{
            margin-right: .37rem;
        }
        .deletemanagement{
            color: #f30000;
        }
        .popUp{
             .el-dialog{
                 height: 76%!important;
             }
             li{
                 margin-bottom: .32rem!important;
             }
        }
}
</style>
