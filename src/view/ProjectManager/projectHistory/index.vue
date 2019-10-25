<template>
    <div class="management_projectHistory body_main">
        <header class="proposer_index_header">
            <div>
                <h3>历史项目</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='getProject_history_finishproject' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe' ref="search"/>

        </header>
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">项目类型</span>
                    <el-select v-model="project_type" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in project_typeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">项目结果</span>
                    <el-select v-model="report_result" placeholder="请选择项目结果">
                        <el-option
                        v-for="item in report_resultList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button @click="reset()">重置</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 3.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="项目创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="report_time"  label="项目预计完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="项目结果" header-align='center' align='center'> </el-table-column>
            <el-table-column label="项目介绍" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline"  @click="goprojectDetail(scoped)">详情</span> </template>
            </el-table-column>
            <el-table-column label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline"  @click="goProdectDetail(scoped)">查看</span> </template>
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
    name:'projectHistory',
    components:{Search},
    data() {
      return {
        tableData: [],
        options: [],
        value: '',
        placeholderTexe: '搜索项目编号、名称',
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
        searchText:'',//搜索文字
        project_type:'',
        report_result:'',
        project_typeList:[{'name':'DV试验','id':1},{'name':'PV试验','id':2}],
        report_resultList:[{'name':'不合格','id':1},{'name':'合格','id':2}],
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
            }else if(data.columnIndex === 5){
                if(data.row.status == '关闭'){
                    return "color:#f10000";
                }else{
                    return "color:#28d897";
                }
            }else{
                return "color:#444444";
            }
        },
        reset(){
            this.searchText = '';
            this.project_type = '';
            this.report_result = '';
            this.$refs.search.result();
            this.getProject_history_finishproject(this.searchText,this.currentPage, this.project_type,this.report_result);
        },
        goProdectDetail(data){
            this.$router.push({path: '/ProjectManager/projectHistoryDetail', query:{"equipmentID": data.row.id} })
        },
        goprojectDetail(data){
            this.$router.push({path:'/ProjectManager/addProjectAppoinment',query:{equipmentID:data.row.id,equipmentName:data.row.name}})
        },
        //搜索按钮
        searchPersonnel(){
            this.getProject_history_finishproject(this.searchText,this.currentPage, this.project_type,this.report_result);
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getProject_history_finishproject(this.searchText,pageNumber, this.project_type,this.report_result);
        },
        getProject_history_finishproject(search,pageNumber,project_type,report_result){
            this.searchText = search;
             this.CurrentChange = pageNumber ?this.CurrentChange: 1; 
            pageNumber= pageNumber?pageNumber:1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_history_finishproject + this.project_type  + '&search='+search + '&report_result=' + this.report_result + '&page_size=' +this.page_size : this.$conf.env.getProject_history_finishproject + this.project_type + '&search='+search +  '&report_result=' + this.report_result +'&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            }) 
        }
    },
    mounted(){
        this.getProject_history_finishproject('',1,'','')
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getProject_history_finishproject(this.searchText,this.CurrentChange, this.project_type,this.report_result);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_projectHistory{
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
