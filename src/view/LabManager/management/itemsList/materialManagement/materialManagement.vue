<template>
    <div class="management_materialManagement">
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="物料编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="物料名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="位置" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="物料种类" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="数量" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="安全库存数" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="采购周期" header-align='center' align='center'> </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'materialManagement',
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
            this.$router.push({name: 'applicationmaterialManagement' })
        }
    }
}
</script>
<style lang="scss">

.management_materialManagement{
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
