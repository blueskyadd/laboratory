<template>
    <div  class="body_main scheduleTest_index">
        <!-- 公共头部 -->
        <header class="proposer_index_header">
            <h3>试验进度</h3>
            <span style="margin-right: 10.46rem" class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date" label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="试验分布" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="试验开始时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="实验结束时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"   label="试验状态" header-align='center' align='center' :filters="[{ text: '王小虎', value: '王小虎' }, { text: '王小虎湖', value: '王小虎湖' }]"
                :filter-method="filterOrder"
                :filter-multiple="false"
                filter-placement="bottom-end">
                    <template slot-scope="scope"><span   @click="allocation(scope)" style="margin-right:.24rem;">{{scope.row.name}}</span></template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Search from "../../../../components/common/search";
export default {
    name: 'scheduleTest',
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索报告编号、名称',
             tableData: [{
                date: '2016-05-02',
                name: '王小虎湖',
                address: ' 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上7 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎湖',
                address: '上1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海 1516 弄'
                }
            ],
            CurrentChange: 3,
        }
    },
    methods:{
        searchDetail(data){
            console.log(data)
        },
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
        allocation(){
            this.$router.push({path:'/ProjectManager/addProjectTest?flag=2'})
        },
        /**@name 分页 */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.CurrentChange =  val;
            console.log(`当前页: ${val}`);
        },
        filterOrder(value, row) {
            return row.name === value;
        },
    }
}
</script>
<style lang="scss">
.scheduleTest_index{
@import '../../../../style/LabManager/management/index.scss';

    padding-top: .42rem;
        .scheduleTest_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: .4rem;
            span{
                margin-right: .38rem;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .scheduleTest_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    .el-table__column-filter-trigger i{
        font-size: .3rem;
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        margin-top: .4rem;
        height: calc(100% - 4.5rem);
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
    }
}
</style>
