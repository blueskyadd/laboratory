<template>
    <div class="management_projectStandard body_main">
        <header class="proposer_index_header">
            <div>
               <h3>试验标准</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span> 
            </div>
            <Search @searchDetail='searchProject_test_standard' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>

        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 2.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName"  v-loading="isLoading">
            <el-table-column prop="num"  label="标准编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="标准名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="company"  label="上传单位" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="上传时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="下载" header-align='center' align='center'>
                 <template slot-scope="scoped"><a class="underline" download="试验标准" :href="scoped.row.file">下载</a></template>
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
import Search from "../../../components/common/search";
export default {
    components:{Search},
    name:'projectStandard',
    data() {
      return {
        tableData: [],
        placeholderTexe:'搜索试验编号、名称',
        isLoading:false,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
        isSearch: false,//是否为搜索
        searchText:'',//搜索文字
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
            if (data.columnIndex == 0 ||data.columnIndex == 5) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({path: '/gaugerIndex/measureFlow' ,query:{equipmentID: data.row.id} });
        },
        
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getProject_test_standard(pageNumber):this.searchProject_test_standard(this.searchText,pageNumber);
        },
        searchProject_test_standard(data,pageNumber){
            pageNumber = pageNumber ?pageNumber:1
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_test_standard + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getProject_test_standard + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getProject_test_standard(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_test_standard + '?page_size=' +this.page_size : this.$conf.env.getProject_test_standard + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getProject_test_standard(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getProject_test_standard(this.CurrentChange):this.searchProject_test_standard(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_projectStandard{
     padding-top: .42rem;
     .proposer_index_header{
         display: flex;
         margin-right: 10%;
         justify-content: space-between;
         div{
             display: flex;
             align-items: flex-end;
         }
     }
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
         .popUp{
             .el-dialog{
                 height: 76%!important;
             }
             li{
                 margin-bottom: .49rem!important;
             }
         }
}
</style>
