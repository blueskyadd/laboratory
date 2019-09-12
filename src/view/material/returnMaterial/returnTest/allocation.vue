<template>
    <div class="allocationReturnTest_index">
        <header class="allocationReturnTest_index_header">
            <h3>归还试验物料</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="taskName">
            <span>试验名称：</span>
            <p>控福智能-硬件部</p>
            <span>试验编号：</span>
            <p>控福智能-硬件部</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData"  :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date"  min-width="30%" label="物料名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  min-width="30%" label="物料数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  min-width="30%" label="物料种类" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  min-width="30%" label="物料数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="address" class-name="rightText" label="是否需要归还" header-align='right' align='right'>
                    <template slot-scope="scoped"><span class="underline" style="margin:0 .48rem"  @click="allocation(scoped)">是</span></template>
                </el-table-column>
            </el-table>
        </div>
        <footer><el-button type="primary">确定</el-button></footer>
    </div>
</template>
<script>
export default {
    name: 'allocationReturnTest',
    data(){
        return{
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
                }
            ],
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        searchDetail(){

        }
    }
}
</script>
<style lang="scss">
.allocationReturnTest_index{
    padding-top: .42rem;
    height: 100%;
    .allocationReturnTest_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .43rem;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
            font-size: .23rem;
            margin-right: 9.88rem;
        }
    }
    .taskName{
        margin-left: .19rem;
        margin-bottom: .14rem;
        padding-left: .41rem;
        display: flex;
        font-size: .25rem;
        color: #666;
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        height: calc(100% - 4rem);
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
            padding-right: 3.12rem;

        }
    }
   footer {
    font-size: 0.32rem;
    float: right;
    margin-right: 1.66rem;
    button {
      font-size: 0.3rem;
      padding: 0.12rem 0.24rem;
      background: #08a695;
    }
  }
}
</style>
