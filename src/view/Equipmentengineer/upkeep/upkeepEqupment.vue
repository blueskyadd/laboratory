<template>
    <div class="upkeepEqupment">
        <header class="upkeepEqupment_header">
            <h3>设备保养数</h3>
            <span class="goBack underline" @click="$router.back()">返回</span>
            <Search @searchDetail='searchEquipment_upkeepList' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
                <el-table-column prop="num"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="设备名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="room"  label="实验室" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="start_time"  label="保养创建时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="end_time"  label="预计完成时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column  label="状态"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span >{{scoped.row.status}}</span></template>
                </el-table-column>
                <el-table-column  label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="goUpkeep(scoped)">查看</span> </template>
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
    name: 'upkeepEqupment',
    components:{Search},
    data(){
        return{
            tableData: [],
            placeholderTexe:'搜索试验编号、名称',
            isLoading:true,//加载动画
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            CurrentChange:1,
            isSearch: false,//是否为搜索
            searchText:'',//搜索文字
            gobackChange: -1,
        }
    },
    created() {
        window.addEventListener('popstate', this.goBack(), false);
    },
    destroyed() {
        window.removeEventListener('popstate', this.goBack(), false);
    },
    methods:{
        goBack(data){
            // alert('asd')
            console.log(data)
            // this.$router.go(this.gobackChange)
        },
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 5 ){
                if(data.row.status == '未申请'){
                    return "color:#f10956";
                }else if(data.row.status == '已申请'){
                    return "color:#00d683";
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
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getEquipment_maintain(pageNumber):this.searchEquipment_maintain(this.searchText,pageNumber);
        },
        goUpkeep(data){
            this.$router.push({path:'/Equipmentengineer/upkeepFlow',query:{"equipmentID": data.row.id}})
        },
        /**@name 搜索*/
        searchEquipment_upkeepList(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getEquipment_upkeepList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getEquipment_upkeepList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
               this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getEquipment_upkeepList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getEquipment_upkeepList + '?page_size=' +this.page_size : this.$conf.env.getEquipment_upkeepList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getEquipment_upkeepList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getEquipment_upkeepList(this.CurrentChange):this.searchEquipment_upkeepList(this.searchText,this.CurrentChange);
            }
        },
    },
    beforeRouteEnter (to, from, next) {
        console.log(from) 
        next(vm =>{
            if(from.name == 'upkeepUpdataFile'){
                vm.gobackChange = -3;
            } else{
                vm.gobackChange = -1;
            }
        })
    }
}
</script>
<style lang="scss">
.upkeepEqupment{
    @import '../../../style/LabManager/management/index.scss';
    height: 100%;
    .upkeepEqupment_header{
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
