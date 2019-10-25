<template>
    <div  class="body_main scheduleTest_index">
        <!-- 公共头部 -->
        <header class="proposer_index_header">
            <div>
                <h3>试验进度</h3>
                <span style="margin-right: 10.46rem" class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='searchProject_experiment_project' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p>{{$route.query.equipmentName}}</p>
        </div>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="100%"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="experiment_num" label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="start_time" label="试验开始时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="end_time" label="实验结束时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="engineer" label="负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column   label="试验状态" header-align='center' align='center' :filters="[{ text: '等待中', value: '等待中' }, { text: '进行中', value: '进行中' },{ text: '完成', value: '完成' }]"
                    :filter-method="filterOrder"
                    :filter-multiple="false"
                    filter-placement="bottom-end">
                    <template slot-scope="scope"><span   @click="allocation(scope)" style="margin-right:.24rem;" :style="{color:scope.row.status == '等待中'?'#f10000':scope.row.status == '完成'?'#08c695':'#444'  }">{{scope.row.status}}</span></template>
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
            tableData: [],
            isLoading: false
        }
    },
    methods:{
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
        filterOrder(value, row) {
            return row.status === value;
        },
        getProject_experiment_project(){
            this.$http.get(this.$conf.env.getProject_experiment_project + this.$route.query.equipmentID ).then(res =>{
                this.tableData = res.data;
                this.isloading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        searchProject_experiment_project(data){
            this.$http.get(this.$conf.env.getProject_experiment_project + this.$route.query.equipmentID + '&search=' + data).then(res =>{
                this.tableData = res.data;
                this.isloading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getProject_experiment_project();
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
        height: calc(100% - 2.2rem);
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
