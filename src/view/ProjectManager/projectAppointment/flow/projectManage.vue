<template>
    <div  class="body_main projectManageTest_index">
        <!-- 公共头部 -->
        <header class="proposer_index_header">
            <h3>任务审核</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="projectManageTest_index_header_link">
                <router-link class="underline"  to="/ProjectManager/addProjectTest?flag=1" tag="span">创建试验</router-link>
            </div>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p>东风柳汽</p>
        </div>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date" label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="实验类型" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="试验周期" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)" style="margin-right:.24rem;">编辑</span><span class="underline"  @click="allocation(scoped)">删除</span> </template>
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
    name: 'projectManageTest',
    data(){
        return{
            placeholderTexe:'搜索报告编号、名称',
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
        }
    }
}
</script>
<style lang="scss">
.projectManageTest_index{
@import '../../../../style/LabManager/management/index.scss';

    padding-top: .42rem;
        .projectManageTest_index_header_link{
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
        .projectManageTest_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
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
