<template>
    <div class="body_main taskAllocation_distributed_cultivateDetailList_box">
        <header class="management_index_header">
            <h3>合作项目列表</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
         <div class="taskAllocation_distributed_cultivateDetailList ">
            <el-table :data="tableData" :cell-style="changecolor" height="100%"   style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                 <el-table-column width="100%"  label="序号" type="index"   header-align='center' align='center'> </el-table-column>
                <el-table-column prop="experiment_num" min-width="30%"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="设备名称" header-align='left'  align='left'> </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cultivateDetailList',
    data(){
        return{
            tableData: [],
            isLoading: true,
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
        getcultivateDetailList(){
            this.$http.get(this.$conf.env.getcultivateDetailList + this.$route.query.equipmentID ).then( res =>{
                this.tableData = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getcultivateDetailList()
    }
}
</script>
<style lang="scss">
.taskAllocation_distributed_cultivateDetailList_box{
    padding-top: .6rem;
    height: calc(100% - 2rem);
    .taskAllocation_distributed_cultivateDetailList{
        height: 100%;
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
            .edit{
                margin-right: .68rem;
            }
        }
    }
</style>
