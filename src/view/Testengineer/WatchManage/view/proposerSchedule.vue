<template>
    <div class="management_proposerSchedule body_main">
        <header class="management_index_header">
            <h3>培养人员管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <el-table :data="tableData"  style="width: 100%" height="calc(100%  - 1.5rem)" :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="值班开始时间"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="值班结束时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="值班地点" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="申请状态" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement deletemanagement"  @click="allocation(scoped)">未批准</span></template>
            </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span></template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'proposerSchedule',
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
        placeholderTexe:'搜索人员编号、姓名'
      }
    },
    methods:{
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'proposerWatch' })
        },
        searchDetail(){

        }
    }
}
</script>
<style lang="scss">
.management_proposerSchedule{
        padding-top: .6rem;
        .management_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-bottom: .66rem;
        margin-left: .19rem;
        align-items: flex-end;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        // 公共span
        span{
            font-size: .23rem;
            cursor:pointer;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
            margin-right: 9.32rem;
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
        .deletemanagement{
            color: #f30000;
        }
}
</style>
