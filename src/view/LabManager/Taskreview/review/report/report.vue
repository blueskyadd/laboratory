<template>
    <div class="Taskreview_report ">
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="报告编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="date"  label="项目报告名称" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span> </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'report',
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
            this.$router.push({name: 'applicationReport' })
        }
    }
}
</script>
<style lang="scss">
.Taskreview_report{
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
