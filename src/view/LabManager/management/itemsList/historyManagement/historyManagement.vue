<template>
    <div class="management_historyManagement scrollTableScrollNoTop">
        <!-- <div class="Search">
            <ul>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">项目类型</span>
                    <el-select v-model="value" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">项目结果</span>
                    <el-select v-model="value" placeholder="请选择项目结果">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">项目创建时间</span>
                    <el-select v-model="value" placeholder="请选择项目创建时间">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">项目完成时间</span>
                    <el-select v-model="value" placeholder="请选择项目完成时间">
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
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
        </div> -->
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="project_type"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="项目创建时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="report_time"  label="项目完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="项目结果" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目介绍" header-align='center' align='center'> 
                <template slot-scope="scoped"><span class="underline lookmanagement"  @click="historyEditDeteil(scoped)">详情</span></template>
            </el-table-column>
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
            <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'historyManagement',
    data() {
      return {
        tableData: [],
        options: [],
        value: '',
        isLoading: true,
        totalSum:1,
        CurrentChange:1,
        page_size: 9,
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
            if (data.columnIndex == 0) {
                return "color:#07a695";
            }else if(data.columnIndex == 5){
                if(data.row.status == '关闭'){
                    return "color:#f30000";
                }else{
                    return "color:#444444";
                }
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        historyEditDeteil(data){
            this.$router.push({name: 'historyEditDeteil' })
        },
        allocation(data){
            this.$router.push({name: 'histoyDetail' })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch ?this.getmaintenanceRecordList(pageNumber):this.historySearch(this.searchText,pageNumber);
            
        },
        /**@name搜索 */
        historySearch(data,pageNumber){
            this.isLoading = true;
             this.searchText = data;
             this.isSearch = true;
             this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gethistoryProjectList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.gethistoryProjectList + '?search=' + data + '&p=' +pageNumber +'&page_size=' + +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '500'){
                    this.$message({message: '服务器错误',type: 'error'});
                }
            })
        },
        /**@name数据加载 */
        gethistoryProjectList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gethistoryProjectList + '?page_size=' +this.page_size : this.$conf.env.gethistoryProjectList + '?p=' +pageNumber +'&page_size=' + +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '500'){
                    this.$message({message: '服务器错误',type: 'error'});
                }
            })
        }
    },
    mounted(){
        this.gethistoryProjectList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch ?this.getmaintenanceRecordList(this.CurrentChange):this.historySearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">

.management_historyManagement{
    // position: relative;
    // height: 100%;
@import '../../../../../style/LabManager/management/index.scss';
     margin-top: .53rem;
    .Search ul{
        margin-bottom: 0;
    }
    .editTableButton{
       
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
</style>
