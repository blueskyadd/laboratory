<template>
    <div class="projectengineer_project">
        <!-- <div class="Search">
            <ul>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">试验类型</span>
                    <el-select v-model="value" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">试验结果</span>
                    <el-select v-model="value" placeholder="请选择项目结果">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">试验开始时间</span>
                    <el-date-picker
                        v-model="statusTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </li>
                <li>
                    <span class="equipmentName">试验完成时间</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
        </div> -->
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="start_time"  label="项目开始时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="report_time"  label="项目完成时间" header-align='center' align='center'> </el-table-column>
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
    name:'project',
    data() {
      return {
        tableData: [],
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

        /**@name 页面跳转 */
        allocation(data){
            this.$router.push({path: '/Testengineer/missionDetail',query:{equipmentID:data.row.id} })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getProject_finishprojectList(pageNumber):this.searchProject_finishprojectList(this.searchText,pageNumber);
        },
        searchProject_finishprojectList(data,pageNumber){
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_finishprojectList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getProject_finishprojectList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getProject_finishprojectList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_finishprojectList + '?page_size=' +this.page_size : this.$conf.env.getProject_finishprojectList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getProject_finishprojectList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getProject_finishprojectList(this.CurrentChange):this.searchProject_finishprojectList(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.projectengineer_project{
    @import '../../../../../style/LabManager/management/index.scss';
    position: relative;
    height: calc(100% - 1.2rem);
    padding-top: .42rem;
    .Search ul{
        margin-bottom: 0;
    }
    .editTableButton{
        margin-top: 0!important;
    }
    .el-input__inner{
        padding:  0 .4rem!important;
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
