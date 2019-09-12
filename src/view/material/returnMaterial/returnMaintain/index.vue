<template>
    <div class="management_returnMaintain">
        <div>
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date" min-width="25%" label="试验编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" min-width="25%" label="试验名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" min-width="25%" label="实验室" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" min-width="25%"  label="申请人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" class-name='rightText'  label="操作" header-align='right' align='right'>
                <template slot-scope="scoped"><span class="underline span_upload" @click="allocation(scoped)">归还</span></template>
            </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <span class="pagesize">共10页</span>
            <el-pagination
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page.sync="CurrentChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
            <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'returnMaintain',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: ' 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上7 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海 1516 弄'
        }]
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
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'allocationReturnMaintain' })
        },
        /**@name 分页 */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.CurrentChange =  val;
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style lang="scss">

.management_returnMaintain{
    @import '../../../../style/LabManager/management/index.scss';
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
        .rightText{
            padding-right: 1.9rem;
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
