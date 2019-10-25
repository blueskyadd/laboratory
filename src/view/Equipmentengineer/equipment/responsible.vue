<template>
    <div class="responsible">
        <header class="responsible_header">
            <h3>设备负责数</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" style="margin-left:.3rem;margin-right: 9.88rem;" @click="$router.push({name: 'addEquipment'})">新增设备数</span>
            <Search @searchDetail='searchPrincipal_EquipmentList' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - .5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
                <el-table-column prop="num"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="设备名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="room"  label="实验室" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="previous_upkeep_time"  label="上次保养时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="next_upkeep_time"  label="预计下次保养时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="gauger"  label="计量负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="设备二维码" header-align='center'  align='center'>
                    <template slot-scope="scope">
                        <img @click="open(scope.row)" class="underline" src="../../../assets/img/LabManager/management/equipment/see.png" alt="">
                    </template>
                </el-table-column>
                <el-table-column  label="状态"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span  @click="lookDetail(scoped)">{{scoped.row.status}}</span></template>
                </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="goEquipment_lookreport(scoped)">查看</span> </template>
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
        <Code v-if="isqrCodeImg" :qrCodeImg="qrCodeImg" @change="change"/>
    </div>
</template>
<script>
import Code from "../../../components/common/QR-code";
import Search from "../../../components/common/search";
export default {
    name: 'responsible',
    components:{Search, Code},
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
            isLoading:true,//加载动画
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            CurrentChange:1,
            isSearch: false,//是否为搜索
            searchText:'',//搜索文字
            isqrCodeImg: false,
            qrCodeImg:'',
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 7 ){
                if(data.row.status == '维修'){
                    return "color:#f10956";
                }else if(data.row.status == '正常'){
                    return "color:#00d683";
                }else{
                    return "color:#f21960";
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
        goEquipment_lookreport(data){
            this.$router.push({path:'/Equipmentengineer/equipmentFlow',query:{equipmentID:data.row.id} })
        },
        open(row) {
            this.qrCodeImg = row.qrcode;
            this.isqrCodeImg = true;
        },
        change(data) {
            this.isqrCodeImg = data;
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getPrincipal_EquipmentList(pageNumber):this.searchPrincipal_EquipmentList(this.searchText,pageNumber);
        },
        searchPrincipal_EquipmentList(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            console.log(pageNumber)
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getPrincipal_EquipmentList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getPrincipal_EquipmentList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
               this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getPrincipal_EquipmentList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getPrincipal_EquipmentList + '?page_size=' +this.page_size : this.$conf.env.getPrincipal_EquipmentList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getPrincipal_EquipmentList(1)
    },
     watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getPrincipal_EquipmentList(this.CurrentChange):this.searchPrincipal_EquipmentList(this.searchText,this.CurrentChange);
            }
        },
    },
}
</script>
<style lang="scss">
.responsible{
    @import '../../../style/LabManager/management/index.scss';
    height: 100%;
    .responsible_header{
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
