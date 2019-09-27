<template>
    <div  class="body_main malfunction_index">
        <!-- 公共头部 -->
        <header class="malfunction_index_header">
            <h3>故障设备管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchEquipment_maintain' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
                <el-table-column prop="num" label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="room" label="实验室" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="device_keeper" label="报修人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="create_time" label="上传时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="status" label="设备状态"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span  @click="lookDetail(scoped)">{{scoped.row.status}}</span></template>
                </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" :style="{'color':scoped.row.status == '维修中'?'':'#999!important','cursor':scoped.row.status == '维修中'?'':'not-allowed'}" @click="scoped.row.status == '维修中' && gomalfunctionFlow(scoped)">查看</span> </template>
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
import Search from "../../../components/common/search";
export default {
    name:'malfunction',
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索设备编号、名称',
            tableData: [],
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
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 5 ){
                if(data.row.status == '待维修'){
                    return "color:#00d683";
                }else if(data.row.status == '维修中'){
                    return "color:#f10956";
                }
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
        gomalfunctionFlow(data){
            this.$router.push({path:'/Equipmentengineer/malfunctionFlow',query:{"equipmentID": data.row.id}})
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getEquipment_maintain(pageNumber):this.searchEquipment_maintain(this.searchText,pageNumber);
        },
        /**@name搜索 */
        searchEquipment_maintain(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getEquipment_maintain + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getEquipment_maintain + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
               this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name数据请求 */
        getEquipment_maintain(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getEquipment_maintain + '?page_size=' +this.page_size : this.$conf.env.getEquipment_maintain + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getEquipment_maintain(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch?this.getEquipment_maintain(this.CurrentChange):this.searchEquipment_maintain(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.malfunction_index{
     @import '../../../style/LabManager/management/index.scss';
    padding-top: .42rem;
     height: 100%;
    .malfunction_index_header{
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
            margin-right: 9.32rem;
        }
       
        .malfunction_index_header_link{
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
        .malfunction_header_Search{
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
