<template>
    <div class="management_methodsManagement">
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="试验方法编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验方法名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="上传人员" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="上传时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address" fixed='right' label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement deletemanagement"  @click="allocation(scoped)">下载</span><span class="underline deletemanagement"  @click="allocation(scoped)">删除</span> </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'methodsManagement',
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
        }],
        
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

        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'applicationmethodsManagement' })
        }
    }
}
</script>
<style lang="scss">
.management_methodsManagement{
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
