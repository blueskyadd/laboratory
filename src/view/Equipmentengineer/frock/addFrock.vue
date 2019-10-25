<template>
    <div class="addFrock">
        <header class="addFrock_header">
            <h3>新增工装数</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" style="margin-left:.3rem;margin-right: 9.88rem;" @click="$router.push({name:'proposeFeock'})">申请工装</span>
            <Search @searchDetail='searchApplyequipment_frockList' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - .5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
                <el-table-column prop="name" min-width="40%"   label="设备名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="status" label="状态"    header-align='right' align='right'>
                    <template slot-scope="scoped"><span @click="lookDetail(scoped)">{{scoped.row.status}}</span></template>
                </el-table-column>
                <el-table-column prop="address" class-name="rightText_report"  label="操作" header-align='right' align='right'>
                    <template slot-scope="scoped"><span class="underline"  @click="frockFlow(scoped)">查看</span> </template>
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
    name: 'addFrock',
    components:{Search},
    data(){
        return{
            tableData: [],
            placeholderTexe:'搜索试验编号、名称',
            isLoading:true,//加载动画
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size :10,//一页数据条数
            CurrentChange:1,
            isSearch: false,//是否为搜索
            searchText:'',//搜索文字
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 1 ){
                if(data.row.status == '调试中'){
                    return "color:#08a695";
                }else if(data.row.status == '申请'){
                    return "color:#00d683";
                }else{
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
        frockFlow(data){
            this.$router.push({path:'/Equipmentengineer/frockFlow', query:{"equipmentID": data.row.id}})
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getApplyequipment_frockList(pageNumber):this.searchApplyequipment_frockList(this.searchText,pageNumber);
        },
        /**@name 搜索 */
        searchApplyequipment_frockList(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getApplyequipment_frockList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getApplyequipment_frockList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
               this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getApplyequipment_frockList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getApplyequipment_frockList + '?page_size=' +this.page_size : this.$conf.env.getApplyequipment_frockList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getApplyequipment_frockList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getApplyequipment_frockList(this.CurrentChange):this.searchApplyequipment_frockList(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.addFrock{
    @import '../../../style/LabManager/management/index.scss';
    height: 100%;
    .addFrock_header{
        padding-top: .42rem;
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
        height: calc(100% - 3rem);
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
    footer{
        font-size: .32rem;
        float: right;
        margin-right: 1.66rem;
    }
    .popUp{
        .el-dialog{
            height: 59.4%;
            overflow: hidden;
        }
        ul{
            overflow-y: scroll;
        }
        ul::-webkit-scrollbar{
            display: none;
        }
        ul>li{
            display: flex;
            p{
                font-size: .2rem;
            }
        }
        li>span{
            font-size: .28rem;
            color: #333333;
        }   
        .taskDetail{
            padding-top: .39rem;
            li{
                // line-height: .9rem;
                height: .6rem;
                padding: .15rem 0;
            }
            
        }
        .taskTest{
            margin-top: .18rem;
            li{
                // height: .6rem;
                line-height: .6rem;
                padding: .05rem 0;
                p{
                   font-size: .28rem; 
                    color: #333333;
                    width: 60%;
                }
            }
            .el-select{
                width: 4rem;
                height: .52rem;
                .el-input__inner{
                    height: .52rem; 
                    font-size: .2rem;
                    font-weight: 200;
                }
            }
            button{
                background: #08a795;
                color: #fff;
                height:.45rem;
                width: 1.81rem;
                font-size: .26rem;
                margin-left: 30%;
                margin-top: .54rem;
                  
            }
        }
    }
}
</style>
