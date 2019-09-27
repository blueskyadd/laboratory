<template>
    <div class="record_index">
        <header class="record_index_header">
            <h3>{{this.$route.query.equipmentName}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - .5rem)"  style="width: 100%"  :row-class-name="tabRowClassName"  v-loading='isLoading'>
                <el-table-column prop="report_time" min-width="20%" label="保养时间"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="address" class-name="rightText_report"  label="操作" header-align='right' align='right'>
                    <template slot-scope="scoped"><span class="underline"  @click="goUpkeep(scoped)">查看</span> </template>
                </el-table-column>
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
    name: 'record',
    data(){
        return{
            tableData: [],
            isLoading:true,//加载动画
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            CurrentChange:1,
        }
    },              
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            return "color:#444444";
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        goUpkeep(data){
            this.$router.push({path:'/Equipmentengineer/upkeepFlow',query:{"equipmentID": data.row.id}})
        },
        getEquipment_upkeeprecord(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getEquipment_upkeeprecord + this.$route.query.equipmentID + '&page_size=' +this.page_size : this.$conf.env.getEquipment_upkeeprecord + this.$route.query.equipmentID + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getEquipment_upkeeprecord(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                this.getEquipment_upkeeprecord(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.record_index{
    @import '../../../style/LabManager/management/index.scss';
    padding-top: .42rem;
    height: calc(100% - 2.5rem);
    .record_index_header{
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
    .taskAllocation_distributed {
        margin-top: .4rem;
        height: calc(100% - 1rem);
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
