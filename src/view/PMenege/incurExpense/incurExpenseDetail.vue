<template>
    <div class="management_incurExpenseDetail body_main">
        <header class="testMethods_index_header">
            <h3>项目费用</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number" label="产品编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" label="产品名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="expense" label="费用" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" label="明细" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline" @click="goEquipmentDetail(scoped)">详情</span></template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'incurExpenseDetail',
    data() {
      return {
        tableData: [],
        isLoading:true,//加载动画
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
        searchDetail(){

        },
        getIndex(index){
            return (this.pageNumber - 1) * this.perPage + index + 1
        },
        getIndex(index){
            return (this.pageNumber - 1) * this.perPage + index + 1
        },
        goEquipmentDetail(data){
            this.$router.push({path:'/LaboratoryManager/incurTest',query:{"equipmentID": data.row.id}})
        },
        getPm_expendProject_list(){
            this.$http.get(this.$conf.env.getPm_expendProject_list + this.$route.query.equipmentID  +'/').then( res =>{
                this.isLoading = false;
                this.tableData = res.data.experiment_projects;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getPm_expendProject_list(1);
    },
}
</script>
<style lang="scss">
.management_incurExpenseDetail{
@import '../../../style/LabManager/management/index.scss';

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
