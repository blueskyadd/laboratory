<template>
    <div  class="body_main testWarning_index">
        <!-- 公共头部 -->
        <header class="testWarning_index_header">
            <h3>报警日志</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="testWarning_index_header_link">
                <router-link class="underline"  to="/Testengineer/addWarning" tag="span">新增</router-link>
            </div>
        </header>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="100%"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column width="100%"  label="序号" type="index"   :index="getIndex"   header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="equipment.num" label="设备编号" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="equipment.name" label="设备名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="equipment.user" label="负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="cause" label="报警原因"  header-align='center' align='center'></el-table-column>
                <el-table-column prop="create_time" label="报警时间" header-align='center'  align='center'> </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <span class="pagesize">共{{Math.ceil(totalSum/page_size)}}页</span>
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="CurrentChange"
            :page-size="page_size"
            layout="prev, pager, next"
            :total="totalSum">
            </el-pagination>
            <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'testWarning',
    data(){
        return{
            placeholderTexe:'搜索报告编号、名称',
            tableData: [],
            isLoading:true,//加载动画
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            CurrentChange:1,
        }
    },
    methods:{
        searchDetail(data){
            console.log(data)
        },
         changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 4){
                return "color:#f30000";
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
        getIndex(index){
            return (this.CurrentChange - 1) * this.page_size + index + 1
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getalarmList(pageNumber);
        },
        getalarmList(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getalarmList + '?page_size=' +this.page_size : this.$conf.env.getalarmList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response.data?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getalarmList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getalarmList(this.CurrentChange);
            }
        },
    }
    
}
</script>
<style lang="scss">
.testWarning_index{
    @import '../../../style/LabManager/management/index.scss';
    padding-top: .42rem;
    
    .testWarning_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        // padding-bottom: .5rem;
    //    border-bottom: 1px solid #cccccc;
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
        }
        .testWarning_index_header_link{
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
        .testWarning_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
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
