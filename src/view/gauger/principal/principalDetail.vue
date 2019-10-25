<template>
    <div class="management_principalDetail body_main">
        <header class="testMethods_index_header">
            <h3>{{$route.query.equipmentName}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 2.5rem)"  style="width: 100%;" v-loading="isLoading"  :row-class-name="tabRowClassName">
            <el-table-column prop="metering_time" min-width="20%"  label="计量时间"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="nominee_company"  min-width="20%" label="委托公司" header-align='center' align='center'> </el-table-column>
            <el-table-column  class-name="rightText"  label="操作" header-align='right' align='right'>
                 <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span></template>
            </el-table-column>
        </el-table>
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
    name:'principalDetail',
    data() {
      return {
        tableData: [],
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
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
        allocation(data){
            this.$router.push({path: '/gaugerIndex/measureFlow' ,query:{equipmentID: data.row.id} });
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getGauger_meteringhistoryList(pageNumber);
        },
       getGauger_meteringhistoryList(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getGauger_meteringhistoryList +  this.$route.query.equipmentID + '&page_size=' +this.page_size : this.$conf.env.getGauger_meteringhistoryList +  this.$route.query.equipmentID + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getGauger_meteringhistoryList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getGauger_meteringhistoryList(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_principalDetail{
    @import '../../../style/LabManager/management/index.scss';
     padding-top: .42rem;
    .testMethods_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .5rem;
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
            margin-right: 10.08rem;
        }
        .testMethods_index_header_link{
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
        .testMethods_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
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
        .rightText{
            padding-right: 2.44rem;
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
        footer {
            font-size: 0.32rem;
            float: right;
            margin-right: 1.66rem;
            button {
            font-size: 0.3rem;
            padding: 0.12rem 0.24rem;
            background: #08a695;
            color: #fff;
            }
        }
}
</style>
