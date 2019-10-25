<template>
    <div class="management_materialMaintain">
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
        <el-table-column prop="num" min-width="25%" label="设备编号"  header-align='center'  align='center'> </el-table-column>
        <el-table-column prop="name" min-width="25%" label="设备名称" header-align='center' align='center'> </el-table-column>
        <el-table-column prop="room" min-width="25%" label="实验室" header-align='center' align='center'> </el-table-column>
        <el-table-column prop="applicant" min-width="25%"  label="负责人" header-align='center' align='center'> </el-table-column>
        <el-table-column prop="id"  label="操作" header-align='center' align='center'>
            <template slot-scope="scoped"><span class="underline span_upload"  @click="goAllocation(scoped)">分配</span></template>
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
    name:'materialMaintain',
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
            }else if(data.columnIndex == 5){
                return "color:#f32c2c";
            }
        },

        /**@name 页面跳转 */
        goAllocation(data){
            this.$router.push({path: '/materialIndex/meterialAllocation/materialTest/allocationMaintain',query:{equipmentID:data.row.id}})
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange = pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getmaterialMaintainList(pageNumber):this.materialMaintainSearch(this.searchText,pageNumber);
        },
        materialMaintainSearch(data,pageNumber){
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getmaterialMaintainList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getmaterialMaintainList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getmaterialMaintainList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getmaterialMaintainList + '?page_size=' +this.page_size : this.$conf.env.getmaterialMaintainList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getmaterialMaintainList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getmaterialMaintainList(this.CurrentChange):this.materialMaintainSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">

.management_materialMaintain{
    @import '../../../../style/LabManager/management/index.scss';
    height: calc(100% - 1rem);
    padding-top: .52rem;
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
}
</style>
