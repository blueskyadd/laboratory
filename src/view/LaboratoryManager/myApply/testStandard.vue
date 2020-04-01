<!--
 * @Author: your name
 * @Date: 2019-08-21 11:56:49
 * @LastEditTime: 2019-10-31 09:15:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \laboratory\src\view\LaboratoryManager\myApply\testStandard.vue
 -->
<template>
    <div class="management_LabTestStandard body_main">
        <header class="proposer_index_header">
            <div>
                <h3>试验标准</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
            <Search @searchDetail='getLaboratory_standard' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <!-- <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">标准来源</span>
                    <el-select v-model="value" placeholder="请选择标准来源">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
        </div> -->
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 2.3rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="num"  label="标准编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="标准名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="company"  label="上传单位" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="上传时间" header-align='center' align='center'> </el-table-column>
            <el-table-column  label="操作" header-align='center' align='center'>
                <template slot-scope="scoped"><a class="underline" download="w3logo" :href="scoped.row.file">下载</a> </template>
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
import Search from "../../../components/common/search";
export default {
    name:'LabTestStandard',
    components:{Search},
    data() {
      return {
        tableData: [],
        placeholderTexe: '搜索项目编号、名称',
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 11,//一页数据条数
        CurrentChange:1,
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
            if (data.columnIndex == 0) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        allocation(data){
            this.$router.push({name: 'LabTestStandardDetail' })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getLaboratory_standard(this.searchText,this.CurrentChange);
        },
        goEquipmentDetail(data){
            this.$router.push({path:'/LaboratoryManager/equipmentDetail', query:{equipmentID: data.row.id}})
        },
        getLaboratory_standard(search, pageNumber){
            this.searchText = search;
            this.CurrentChange = pageNumber ?this.CurrentChange: 1; 
            pageNumber= pageNumber?pageNumber:1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getLaboratory_standard + '?page_size=' +this.page_size + '&search='+search : this.$conf.env.getLaboratory_standard + '?search='+search  +'&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
        this.getLaboratory_standard('',1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getLaboratory_standard(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_LabTestStandard{
    padding-top: .46rem;
    .goBack{
        margin-right: 10.4rem;
    }
    .Search{
        ul{
            margin-bottom: 0;
            margin-top: 0;
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
            margin-top: 0rem!important;
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
                 margin-bottom: .32rem!important;
             }
        }
}
</style>
