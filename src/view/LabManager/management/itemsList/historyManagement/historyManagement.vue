<template>
    <div class="management_historyManagement scrollTableScrollNoTop">
        <div class="Search">
            <ul>
                <li style="margin-bottom:.24rem">
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
                <li style="margin-bottom:.24rem">
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
                <el-button  @click="result()">重置</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="项目创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="report_time"  label="项目完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="项目结果" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目介绍" header-align='center' align='center'> 
                <template slot-scope="scoped"><span class="underline lookmanagement"  @click="historyEditDeteil(scoped)">详情</span></template>
            </el-table-column>
            <el-table-column prop="address"  label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement" style="margin-right:0!important"  @click="allocation(scoped)">查看</span></template>
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
export default {
    name:'historyManagement',
    data() {
      return {
        tableData: [],
        isLoading: true,
        totalSum:1,
        CurrentChange:1,
        page_size: 9,
        isSearch: false,//是否为搜索
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
            }else if(data.columnIndex == 5){
                if(data.row.status == '关闭'){
                    return "color:#f30000";
                }else{
                    return "color:#444444";
                }
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        historyEditDeteil(data){
            this.$router.push({path: '/historyEditDeteil',query:{equipmentID: data.row.id} })
        },
        allocation(data){
            this.$router.push({path: '/Testengineer/unMissionDetail',query:{equipmentID: data.row.id,flag:1 }})
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch ?this.getmaintenanceRecordList(pageNumber):this.historySearch(this.searchText,pageNumber);    
        },
        /**@name 搜索按钮 */
        searchPersonnel(){
             this.getProject_history_finishproject(this.searchText,this.currentPage);
        },
        /**@name 重置 */
        result(){
            this.searchText = '';
            this.project_type = '';
            this.report_result = '';
            this.$emit('searchresolt')
             this.getProject_history_finishproject(this.searchText,this.currentPage);
        },
        /**@name搜索 */
        historySearch(data,pageNumber){
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gethistoryProjectList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.gethistoryProjectList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name数据加载 */
        gethistoryProjectList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gethistoryProjectList + '?page_size=' +this.page_size : this.$conf.env.gethistoryProjectList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getProject_history_finishproject(search,pageNumber){
            this.searchText = search;
             this.CurrentChange = pageNumber ?this.CurrentChange: 1; 
            pageNumber= pageNumber?pageNumber:1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gethistoryProjectList + '?project_type=' + this.project_type  + '&search='+search + '&report_result=' + this.report_result + '&page_size=' +this.page_size : this.$conf.env.gethistoryProjectList + '?project_type='+ this.project_type + '&search='+search +  '&report_result=' + this.report_result +'&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.gethistoryProjectList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch ?this.getmaintenanceRecordList(this.CurrentChange):this.historySearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_historyManagement{
    // position: relative;
    // height: 100%;
@import '../../../../../style/LabManager/management/index.scss';
    //  margin-top: .53rem;
    .Search ul{
        margin-bottom: 0;
    }
    .editTableButton{
       margin-top: 0!important;
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
}
</style>
