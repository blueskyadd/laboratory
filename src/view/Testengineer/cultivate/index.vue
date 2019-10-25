<template>
    <div class="management_cultivate body_main">
        <header class="management_index_header">
            <h3>培养人员管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="management_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="100%"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column width="100%"  label="序号" type="index"   header-align='center' :index="getIndex"   align='center'> </el-table-column>
            <el-table-column prop="job_num"  label="工号" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="姓名" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="合作项目" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement " style="margin-right:0!important"  @click="goDetail(scoped)">详情</span></template>
            </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><a class="underline lookmanagement " style="margin-right:0!important" download="index" :href="scoped.row.resume">查看</a></template>
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
    name:'cultivate',
    components:{Search},
    data() {
      return {
        tableData: [],
        placeholderTexe:'搜索人员编号、姓名',
        isLoading:true,//加载动画
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
        getIndex(index){
            return (this.CurrentChange - 1) * this.page_size + index + 1
        },
        goDetail(data){
            this.$router.push({path: '/Testengineer/cultivateDetailList', query:{"equipmentID": data.row.id}})
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
        allocation(data){
            this.$router.push({name: 'applicationcultivate' })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getCultivateList(pageNumber):this.searchCultivateList(this.searchText,pageNumber);
        },
        searchCultivateList(data,pageNumber){
            pageNumber = pageNumber ? pageNumber: 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getCultivateList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getCultivateList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getCultivateList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getCultivateList + '?page_size=' +this.page_size : this.$conf.env.getCultivateList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getCultivateList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getCultivateList(this.CurrentChange):this.searchCultivateList(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_cultivate{
@import '../../../style/LabManager/management/index.scss';
    padding-top: .6rem;
    height: calc(100% - 2.4rem);
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
        .lookmanagement{
            margin-right: .37rem;
        }
        .deletemanagement{
            color: #f30000;
        }
}
</style>
