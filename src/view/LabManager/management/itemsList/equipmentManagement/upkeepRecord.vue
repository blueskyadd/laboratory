<template>
    <div class="upkeepRecord body_main ">
        <header class="upkeepRecord_index_header">
            <h3>保养记录</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main scrollTable">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <div class="mian_text  ">
                        <span>设备名称：</span>
                        <p>{{$route.query.equipmentName}}</p>
                    </div>
                    <div class="mian_text ">
                        <span>设备编号：</span>
                        <p>{{$route.query.equipmentNum}}</p>
                    </div>
                </div>
            </div>
            <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%" height="calc(100%  - 1.5rem)" :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="start_time"  label="保养时间"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="report_time"  label="保养完成时间" header-align='center' align='center'> </el-table-column>
                <el-table-column prop="applicant"  label="负责人" header-align='center' align='center'> </el-table-column>
                <el-table-column prop="address"  label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline lookmanagement" style="margin-right:0!important"  @click="allocation(scoped)">查看</span></template>
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
                <div class="changePage"><span>跳转至：</span><input :max="Math.ceil(totalSum/page_size)" v-model="CurrentChange" type="number"></div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'upkeepRecord',
    data(){
        return{
            tableData: [],
             isLoading: true,
            totalSum:1,
            CurrentChange:1,
            page_size: 9,
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
            if (data.columnIndex == 0 ||data.columnIndex == 1) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({path: '/upkeepProcess',query:{maintenanceProcessID:data.row.id} })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getupkeepRecordList(pageNumber);
        },
        getupkeepRecordList(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getupkeepRecordList + this.$route.query.EquipmentpurchaseID + '&page_size=' +this.page_size : this.$conf.env.getupkeepRecordList +this.$route.query.EquipmentpurchaseID + '&p=' +pageNumber +'&page_size=' + +this.page_size ).then( res =>{
                res.data = {
                    "count": 1,
                    "next": null,
                    "previous": null,
                    "results": [
                        {
                            "id": 25,
                            "start_time": "2019-08-22",
                            "report_time": "2019-08-28",
                            "applicant": "试验工程师6"
                        }
                    ]
                }
               this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response.data?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getupkeepRecordList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                this.getmaintenanceRecordList(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.upkeepRecord{
    @import '../../../../../style/LabManager/management/index.scss';
     padding-top: .42rem;
     overflow-y: scroll;
    .upkeepRecord_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .38rem;
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
        }
    }
    .main{
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .85rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                div:first-child{
                    padding-left: .59rem;
                    p{
                        width: 1.77rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #666666;
                    }
                }
                div:last-child{
                    padding: 0;
                    p{color: #07a695}
                }
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
    }
}
.upkeepRecord::-webkit-scrollbar{
    display: none;
}
</style>