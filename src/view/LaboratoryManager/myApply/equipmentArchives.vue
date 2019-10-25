<template>
    <div class="management_equipmentArchives body_main">
        <header class="testMethods_index_header">
            <h3>设备档案</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='getLaboratory_eq' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="num" label="设备编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" label="设备名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="room" label="所属实验室" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="device_keeper" label="负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status" label="设备状态" header-align='center' align='center'> </el-table-column>
            <el-table-column label="操作" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline" @click="goEquipmentDetail(scoped)">查看</span></template>
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
    name:'equipmentArchives',
    data() {
      return {
        tableData: [],
        placeholderTexe:'上传试验编号、名称',
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 11,//一页数据条数
        CurrentChange:1,
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
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 4){
                if(data.row.status == '维修中'){
                    return "color:#f10000";
                }else if(data.row.status == '保养中'){
                        return "color:#4adfa5";
                }else{
                    return "color:#08a795";
                }
            }else{
                return "color:#444444";
            }
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getLaboratory_eq(this.searchText,this.CurrentChange);
        },
        goEquipmentDetail(data){
            this.$router.push({path:'/LaboratoryManager/equipmentDetail', query:{equipmentID: data.row.id}})
        },
        getLaboratory_eq(search, pageNumber){
            this.searchText = search;
            this.CurrentChange = pageNumber ?this.CurrentChange: 1; 
            pageNumber= pageNumber?pageNumber:1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getLaboratory_eq + '?page_size=' +this.page_size + '&search='+search : this.$conf.env.getLaboratory_eq + '?search='+search  +'&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getLaboratory_eq('',1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getLaboratory_eq(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_equipmentArchives{
     padding-top: .42rem;
    .testMethods_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .46rem;
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
