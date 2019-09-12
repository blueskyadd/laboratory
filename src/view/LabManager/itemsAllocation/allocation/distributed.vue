<template>
    <div class="itemsAllocation_distributed ">
        <el-table :data="tableData" :cell-style="changecolor"  height="calc(100%  - 1.5rem)" style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name "  label="项目名称" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" label-class-name='principal'  label="负责人" header-align='left' align='left'> </el-table-column>
            <el-table-column prop="date"  label="分配时间"  header-align='center' align='center'> </el-table-column>
            <el-table-column prop="date"  label="未分配试验数"  header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" label="查看"      header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">详情</span></template>
            </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span> </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <span class="pagesize">共10页</span>
            <el-pagination
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page.sync="CurrentChange"
            :page-size="2"
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
        totalSum:0,
        currentPage: 1,
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
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'teskAllioction' })
        },
        /**@name 分页 */
        handleSizeChange(val) {
            
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getItemsAllocation(pageNumber);
            console.log(`当前页: ${pageNumber}`);
        },
        getItemsAllocation(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getItemsAllocation : this.$conf.env.getItemsAllocation + '?p=' + pageNumber ).then( res =>{
                
                res.data={
                        "count": 4,
                        "next": null,
                        "previous": null,
                        "results": [
                            {
                                "id": 4,
                                "number": "8276364313",
                                "name": "项目4.0",
                                "status": 4
                            },
                            {
                                "id": 3,
                                "number": "8528662864",
                                "name": "项目03",
                                "status": 4
                            },
                        ]
                    }
                this.isLoading = false;
                this.tableData = res.data.results;
                this.totalSum = res.data.count
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '500'){
                    this.$message({message: '服务器错误',type: 'error'});
                }
            })
        }
    },
    mounted(){
        this.getItemsAllocation(1);
    }
}
</script>
<style lang="scss">
.itemsAllocation_distributed{
    @import '../../../../style/LabManager/management/index.scss';
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
