<template>
    <div class="missionDetail_index">
        <header class="missionDetail_index_header">
            <h3>{{projectName}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskName">
            <span>委托公司部门：</span>
            <p>控福智能-硬件部</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor"  height="calc(100%  - .2rem)" style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="experiment_num"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="engineer"  label="负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="result"   label="试验结果" header-align='center' align='center'></el-table-column>
            </el-table>
        </div>
        <footer>
             <span>{{projectName}}项目：<i :style="{color: report_result == '不合格'? '#f10956':''}">{{report_result}}</i></span>
            <a class="underline" download="w3logo" :href="projecrReport">查看项目文件</a>
        </footer>
    </div>
</template>
<script>
import Search from "../../../../../components/common/search";
export default {
    name: 'missionDetail',
    components:{Search},
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
            projectName: '',
            projecrReport: '',
            isLoading: true,
            report_result:''
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
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
        searchProject_finishprojectDetailList(data){
            this.isLoading = true;
            this.currentPage = 1;
            this.$http.get(this.$conf.env.getProject_finishprojectDetailList + '?search=' + data + '&page_size=' +this.page_size).then( res =>{
                this.tableData = res.data.experiments;
                this.projectName = res.data.name;
                this.projecrReport = res.data.report;
                this.report_result = res.data.report_result;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getProject_finishprojectDetailList(){
            this.$http.get(this.$conf.env.getProject_finishprojectDetailList + this.$route.query.equipmentID + '/').then(res =>{
                this.tableData = res.data.experiments;
                this.projectName = res.data.name;
                this.projecrReport = res.data.report;
                this.report_result = res.data.report_result;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getProject_finishprojectDetailList()
    }
}
</script>
<style lang="scss">
.missionDetail_index{
    height: 100%;
    padding-top: .42rem;
    .missionDetail_index_header{
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
    .taskAllocation_distributed{
        height: calc(100% - 4.2rem);
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
    footer {
        float: right;
        color: rgb(7, 166, 149);
        margin-right: 1.66rem;
       display: flex;
       flex-direction: column;
       font-size: .26rem;
       span{
           margin-bottom: .2rem;
       }
    }
}
</style>
