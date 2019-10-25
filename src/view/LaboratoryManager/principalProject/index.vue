<template>
    <div class="management_projectAppointment body_main">
        <header class="proposer_index_header">
            <div>
                <h3>负责项目</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='getLaboratory_project' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe' ref="search"/>
        </header>
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">项目状态</span>
                    <el-select v-model="status_type" placeholder="请选择项目状态">
                        <el-option
                        v-for="item in status_typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">项目来源</span>
                    <el-select v-model="source_type" placeholder="请选择项目来源">
                        <el-option
                        v-for="item in source_typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary" @click="result">重置</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 4rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_leader"  label="项目负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="项目状态" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目来源" header-align='center' align='center'> </el-table-column>
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
        searchText:'',//搜索文字
        status_type:'',
        source_type:'',
        status_typeList: [{'value':1,'label':'进行'},{'value': 8,'label':'完成'},{'value': 9,'label':'关闭'}],
        source_typeList: [{'value':1,'label':'内部'},{'value': 2,'label':'承接'}],
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
            this.$router.push({name: 'projectFlow' })
        },
        //搜索按钮
        searchPersonnel(){
            this.getLaboratory_project(this.searchText,this.currentPage, this.status_type,this.source_type);
        },
        //重置
        result(){
            this.searchText = '';
            this.status_type = '';
            this.source_type = '';
            this.$refs.search.result();
            this.getLaboratory_project(this.searchText,this.currentPage, this.status_type,this.source_type);
        },
        getIndex(index){
         return (this.CurrentChange - 1) * this.page_size + index + 1
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getLaboratory_project(this.searchText,pageNumber, this.status_type,this.source_type);
        },
        getLaboratory_project(searchText, pageNumber, status_type, source_type){
            this.searchText = searchText;
             this.CurrentChange = pageNumber ?this.CurrentChange: 1; 
            pageNumber= pageNumber?pageNumber:1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getLaboratory_project + this.status_type + '&source=' + this.source_type + '&search='+searchText + '&page_size=' +this.page_size : this.$conf.env.getLaboratory_project + this.status_type + '&source=' + this.source_type + '&search='+searchText + '&page_size=' +this.page_size+ '&p=' +pageNumber).then(res =>{
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
        this.getLaboratory_project('',1,'','')
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getLaboratory_project(this.searchText,this.currentPage, this.status_type,this.source_type);
            }
        },
    }
}
</script>
<style lang="scss">
.management_projectAppointment{
@import '../../../style/LabManager/management/index.scss';
    padding-top: .46rem;
    .goBack{
        margin-right: 10.4rem;
    }
    .Search{
        ul{
            margin-bottom: 0;
            margin-top: 0;
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
            margin-top: 0!important;
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
