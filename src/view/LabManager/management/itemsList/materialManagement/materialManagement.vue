<template>
    <div class="management_materialManagement scrollTable">
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"   style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="nateriel_num"  label="物料编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="物料名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="location"  label="位置" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="device_type"  label="物料种类" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="inventory"  label="数量" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="safe_inventory"  label="安全库存数" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="unit_price"  label="单价" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="purchase_cycle"  label="采购周期" header-align='center' align='center'> </el-table-column>
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
    name:'materialManagement',
    data() {
      return {
        tableData: [],
        isLoading:true,//加载动画
        totalSum:0,//数据总数
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
                if(data.row.safe_inventory > data.row.inventory){
                    return "color:#f32c2c";
                }
            }
        },

        /**@name 页面跳转 */
        allocation(data){
            this.$router.push({name: 'applicationmaterialManagement' })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch ? this.getpersonnelManagementList(pageNumber):this.materialSearch(this.searchText,pageNumber);
        },
        /**@name搜索 */
        materialSearch(data,pageNumber){
            this.isLoading = true;
             this.searchText = data;
             this.isSearch = true;
             this.CurrentChange = pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getmaterialList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getmaterialList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name数据请求 */
        getmaterialList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getmaterialList + '?page_size=' +this.page_size : this.$conf.env.getmaterialList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getmaterialList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch ? this.getpersonnelManagementList(this.CurrentChange):this.materialSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">

.management_materialManagement{
    @import '../../../../../style/LabManager/management/index.scss';
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
