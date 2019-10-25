<template>
    <div class="materialManagementTable">
        <header class="materialManagementTable_header">
            <h3>物料管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" style="margin-left:.3rem;margin-right: 9.34rem;" @click="$router.push({name:'addMaterial'})">新增</span>
            <Search @searchDetail='searchMateria' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
                <el-table-column prop="nateriel_num"  label="物料编号" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="物料名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="inventory"  label="数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="unit"  label="单位" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="unit_price"  label="单价" header-align='center'  align='center'></el-table-column>
                <el-table-column prop="device_type"  label="物料种类" header-align='center'  align='center'>
                    <template slot-scope="scoped">
                        <span>{{scoped.row.device_type  == 1 ? '易损件' : '原件'}}</span>
                    </template>    
                </el-table-column>
                <el-table-column prop="safe_inventory"  label="安全库存数" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="purchase_cycle"  label="采购周期" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="location"  label="位置" header-al ign='center'  align='center'> </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline span_upload"  @click="goMateriaDetail(scoped)">申请</span><span class="underline span_upload"  @click="goUpdataFile(scoped)">编辑</span></template>
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
    name: 'materialManagementTable',
    components:{Search},
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索物料编号、名称',
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
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 2 ){
                if(data.row.inventory < data.row.safe_inventory){
                    return "color:#f10000"
                }else{
                    return "color:#444444";
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
        
        goMateriaDetail(data){
            this.$router.push({path:'/materialIndex/ediitMaterial',query:{materialID: data.row.id,flag:true}})
        },
        goUpdataFile(data){
           this.$router.push({path: '/materialIndex/addMaterial',query:{materialID: data.row.id}})
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getMateriaManaeList(pageNumber):this.searchMateria(this.searchText,pageNumber);
        },
        /**@name搜索 */
        searchMateria(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            console.log(pageNumber)
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getMateriaManaeList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getMateriaManaeList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
               this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 数据请求 */
        getMateriaManaeList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getMateriaManaeList + '?page_size=' +this.page_size : this.$conf.env.getMateriaManaeList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getMateriaManaeList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getMateriaManaeList(this.CurrentChange):this.searchMateria(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.materialManagementTable{
    @import '../../../style/LabManager/management/index.scss';
    height: 100%;
    .materialManagementTable_header{
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
        .span_upload{
            margin-right: .26rem;
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
