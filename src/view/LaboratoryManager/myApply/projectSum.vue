<template>
    <div class="management_projectSum body_main">
        <header class="proposer_index_header">
            <div>
                <h3>试验项目</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='getLaboratory_finishproject3' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe' ref="search"/>
        </header>
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">项目类型</span>
                    <el-select v-model="project_type" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in project_typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">项目结果</span>
                    <el-select v-model="report_result" placeholder="请选择项目结果">
                        <el-option
                        v-for="item in report_resultList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">报告来源</span>
                    <el-select v-model="source" placeholder="请选择报告来源">
                        <el-option
                        v-for="item in sourceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button  @click="result">重置</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 4rem)"   style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="项目创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="report_time"  label="项目预计完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="项目结果" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="source"  label="报告来源" header-align='center' align='center'> </el-table-column>
            <el-table-column   label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span> </template>
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
    name:'projectSum',
    components:{Search},
    data() {
      return {
        tableData: [],
        statusTime: '',
        placeholderTexe: '搜索项目编号、名称',
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 11,//一页数据条数
        CurrentChange:1,
        searchText:'',//搜索文字
        project_type:'',
        report_result:'',
        source:'',
        project_typeList:[{'value':1,'label':'DV试验'}, {'value':2,'label':'PV试验'}],
        report_resultList: [{'value':1,'label':'不合格'}, {'value':2,'label':'合格'}],
        sourceList:[{'value':1,'label':'内部'}, {'value':2,'label':'承接'}]
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
            }else if(data.columnIndex == 5){
                if(data.row.status == '关闭'){
                    return "color:#f10000";
                }else if(data.row.status == '完成'){
                        return "color:#4adfa5";
                }else{
                    return "color:#08a795";
                }
            }else{
                return "color:#444444";
            }
        },
        allocation(data){
            this.$router.push({path: '/LaboratoryManager/labRrport',query:{equipmentID: data.row.id} })
        },
        //搜索按钮
        searchPersonnel(){
            this.getLaboratory_finishproject3(this.searchText,this.CurrentChange)
        },
        result(){
            this.searchText = '';
            this.project_type = ''; 
            this.report_result =  '';
            this.source = '';
            this.$refs.search.result();
            this.getLaboratory_finishproject3(this.searchText,this.CurrentChange);
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getLaboratory_finishproject3(this.searchText,this.CurrentChange);
        },
        getLaboratory_finishproject3(search,pageNumber){
            this.searchText = search;
            this.CurrentChange = pageNumber ?this.CurrentChange: 1; 
            pageNumber= pageNumber?pageNumber:1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getLaboratory_finishproject3 + '?project_type=' + this.project_type + '&report_result=' + this.report_result + '&source=' + this.source + '&search=' + search:this.$conf.env.getLaboratory_finishproject3 + '?project_type=' + this.project_type + '&report_result=' + this.report_result + '&source=' + this.source + '&search=' + search +'&page_size=' +this.page_size).then( res =>{
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
        this.getLaboratory_finishproject3('',1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getLaboratory_finishproject3(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_projectSum{
@import '../../../style/LabManager/management/index.scss';
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
            margin-top: 0rem!important;
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
