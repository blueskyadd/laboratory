<template>
    <div class="itemsAllocation_distributed ">
        <el-table :data="tableData" :cell-style="changecolor"  height="calc(100%  - 1.5rem)" style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="project_leader" label-class-name='principal'  label="负责人" header-align='left' align='left'> </el-table-column>
            <el-table-column prop="allocate_time"  label="分配时间"  header-align='center' align='center'> </el-table-column>
            <el-table-column prop="num"  label="未分配试验数"  header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" label="查看"      header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline" @click="goprojectDetail(scoped)">详情</span></template>
            </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline"  @click="goteskAllioction(scoped)">查看</span> </template>
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
    name:'distributed',
    data() {
      return {
        tableData: [],
        isLoading: false,
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
            if (data.columnIndex == 0 ||data.columnIndex == 4 || data.columnIndex == 5 ) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        goprojectDetail(data){
            this.$router.push({path:'/ProjectManager/addProjectAppoinment',query:{equipmentID:data.row.id,equipmentName:data.row.name,flag:3}})
        },
        goteskAllioction(data){
            this.$router.push({path: '/teskAllioction',query:{equipmentID: data.row.id,equipmentName: data.row.name} })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getmeasure_projectallot(pageNumber):this.searchmeasure_projectallot(this.searchText,pageNumber);
        },
        searchmeasure_projectallot(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.CurrentChange = pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getmeasure_projectallot + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getmeasure_projectallot + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getmeasure_projectallot(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getmeasure_projectallot : this.$conf.env.getmeasure_projectallot + '?p=' + pageNumber ).then( res =>{
                this.isLoading = false;
                this.tableData = res.data.results;
                this.totalSum = res.data.count
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getmeasure_projectallot(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                 this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getmeasure_projectallot(this.CurrentChange):this.searchmeasure_projectallot(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.itemsAllocation_distributed{
    @import '../../../../style/LabManager/management/index.scss';
    height: 100%;
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
        td:nth-child(3){
            .cell{
                margin-left: 0.6rem; 
            }
            
        }
        //斑马线
        .warning-row{
            background:#f6f6f6;
        }
        .principal{
            .cell{
                margin-left: 0.6rem;
            }
            
        }
}
</style>
