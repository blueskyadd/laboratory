<template>
    <div class="management_InternalAppointment body_main">
        <header class="proposer_index_header">
            <div>
                <h3>试验预约</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='searchProject_appointList' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p>{{$route.query.equipmentName}}</p>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 2.8rem)"  style="width: 100%"  :row-class-name="tabRowClassName"  v-loading="isLoading">
            <el-table-column prop="experiment_num" min-width="20%" label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" min-width="20%" label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="type_" min-width="20%" label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status_" min-width="20%" label="预约状态" header-align='center' align='center'> </el-table-column>
            <el-table-column    label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped">
                     <span class="underline"  @click="scoped.row.status  ==0 && setProject_appointDetail(scoped)" style="margin-right:.24rem" :style="{'color':scoped.row.status  ==0 ?'':'#999!important','cursor':scoped.row.status  ==0 ?'':'not-allowed'}">预约</span>
                     <span class="underline"  @click="scoped.row.status  ==2 && appointDetail(scoped)" :style="{'color':scoped.row.status  ==2 ?'':'#999!important','cursor':scoped.row.status  ==2 ?'':'not-allowed'}">查看</span>
                </template>
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
import Search from "../../../../components/common/search";
export default {
    name:'InternalAppointment',
    components:{Search},
    data() {
      return {
        tableData: [],
        placeholderTexe: '搜索项目编号、名称',
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
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 3) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        appointDetail(data){
            this.$router.push({path: '/ProjectManager/AppointmentDetail',query:{equipmentID:data.row.id} })
        },
        setProject_appointDetail(data){
            this.isLoading = true;
            this.$http.put(this.$conf.env.setProject_appointDetail + data.row.id + '/').then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '预约成功', type: 'success'});
                    !this.isSearch?this.getProject_appointList(this.currentPage):this.searchProject_appointList(this.searchText,this.currentPage);
                }else{
                    this.$message({ message: '预约失败', type: 'warning'});              
                }
                this.isLoading = false
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getProject_appointList(pageNumber):this.searchProject_appointList(this.searchText,pageNumber);
        },
        getProject_appointList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_appointList + this.$route.query.equipmentID + '&page_size=' +this.page_size : this.$conf.env.getProject_appointList + this.$route.query.equipmentID + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        searchProject_appointList(data,pageNumber){
            pageNumber = pageNumber ?pageNumber:1
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getProject_appointList +this.$route.query.equipmentID + '&search=' + data + '&page_size=' +this.page_size : this.$conf.env.getProject_appointList + this.$route.query.equipmentID + '&search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        
    },
    mounted(){
        this.getProject_appointList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getProject_appointList(this.CurrentChange):this.searchProject_appointList(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_InternalAppointment{
@import '../../../../style/LabManager/management/index.scss';

    padding-top: .46rem;
    .goBack{
        margin-right: 10.4rem;
    }
    .Search{
        ul{
            margin-bottom: 0;
        }
        li{
            margin-bottom: .33rem;
            .el-input{
                width: 100%!important;  
            }
        }
        li>span{
            width: -webkit-fill-available;
        }
        .editTableButton{
            margin-top: -.74rem!important;
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
            
            padding-right: 2.4rem;
        }
        th:last-child{
            .cell{
                padding-right: .5rem;
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
                 margin-bottom: .32rem!important;
             }
        }
}
</style>
