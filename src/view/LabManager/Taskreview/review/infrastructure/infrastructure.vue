<template>
    <div class="Taskreview_infrastructure scrollTable">
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 2.3rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
            <el-table-column prop="name"  label="设施名称"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="room"  label="实验室" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="保修时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="详情" header-align='center' align='center'>
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
export default {
    name:'infrastructure',
    data() {
      return {
        tableData: [],
        isSearch: false,//是否为搜索
        searchText:'',//搜索文字
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        CurrentChange:1,
        page_size : 9,//一页数据条数
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
            if (data.columnIndex == 0 ||data.columnIndex == 3) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        allocation(data){
            this.$router.push({path: '/applicationInfrastructure',query:{'infrastructureID': data.row.id} })
        },
         /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch ?  this.getinfrastructureList(pageNumber):this.infrastructureSearch(this.searchText,pageNumber);
        },
        infrastructureSearch(data,pageNumber){
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.CurrentChange =  pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getinfrastructureList + '?search=' + data  + '&page_size=' +this.page_size : this.$conf.env.getinfrastructureList + '?search=' + data  + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getinfrastructureList(pageNumber){
            this.isSearch = false;
             this.$http.get(pageNumber == 1 ? this.$conf.env.getinfrastructureList + '?page_size=' +this.page_size : this.$conf.env.getinfrastructureList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getinfrastructureList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                 this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch ?  this.infrastructureSearch(this.CurrentChange):this.infrastructureSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.Taskreview_infrastructure{
    @import '../../../../../style/LabManager/management/index.scss';
    height:100%;
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
        .principal{
            .cell{
                margin-left: 0.6rem;
            }
            
        }
}
</style>
