<template>
    <div class="itemsAllocation_unallocayion">
        <el-table :data="tableData"  :cell-style="changecolor" height="calc(100%  - 1.5rem)" :row-class-name="tabRowClassName" width="100%" style="width: 100%" v-loading="isLoading">
            <el-table-column prop="number"  label="项目编号"  header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="date" label-class-name='principal'  label="负责人" header-align='left' align='left'>
                <template slot-scope="scoped">
                    <div>
                        <el-select v-model="project_leader" @visible-change='getTest_engineerList(scoped.row.id)'  popper-class='principal_element' placeholder="选择负责人">
                            <el-option
                            v-for="item in Test_engineerList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </template>    
            </el-table-column>
            <el-table-column prop="name" label="查看"  header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline" @click="goprojectDetail(scoped)">详情</span></template>
            </el-table-column>
            <el-table-column prop="address" label="操作"  header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline"  @click="getTest_project1(scoped.row.id)">分配</span> </template>
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
    name:'unAllocation',
    data() {
      return {
        project_leader:'',
        tableData: [],
        isLoading: true,
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
        Test_engineerList:[],//试验工程师列表
      }
    },
    methods:{
        /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 3 || data.columnIndex == 4 ) {
                return "color:#07a695";
            }
            if(data.columnIndex == 1){
                return "color:#444444";
            }
            if(data.columnIndex == 2){
                return "color:#999999";
            }
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        goprojectDetail(data){
            this.$router.push({path:'/ProjectManager/addProjectAppoinment',query:{equipmentID:data.row.id,equipmentName:data.row.name}})
        },
        /**@name 试验工程师列表 */
        getTest_engineerList(ID){
            this.$http.get(this.$conf.env.getTest_engineerList ).then(res =>{
                this.Test_engineerList = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
         /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.CurrentChange =  pageNumber;
            this.currentPage = pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getItemsAllocation(pageNumber):this.searchItemsAllocation(this.searchText,pageNumber);
        },
        searchItemsAllocation(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.CurrentChange = pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getItemsAllocation + '?status=4'+ '&search=' + data + '&page_size=' +this.page_size : this.$conf.env.getItemsAllocation +  '?status=4' + '&search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getItemsAllocation(pageNumber){
            this.isSearch = false;
            pageNumber = pageNumber ? pageNumber : 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getItemsAllocation + '?status=4' : this.$conf.env.getItemsAllocation + '?status=4&p=' + pageNumber ).then( res =>{
                this.isLoading = false;
                this.tableData = res.data.results;
                this.totalSum = res.data.count
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getTest_project1(ID){
            if(!this.project_leader){
                this.$message({ message: '请选择负责人', type: 'error'}); 
                return false;
            }
            this.$http.put(this.$conf.env.getTest_project1 + ID +'/',{"project_leader": this.project_leader}).then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '分配成功', type: 'success'});
                    this.$router.replace({path:'/itemsAllocation/distributed'})
                }else{
                    this.$message({ message: '分配失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({message:err.response.data?err.response.data: '服务器错误',type: 'warning'});
            })
        }
    },
    mounted(){
        this.getItemsAllocation(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                 this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getItemsAllocation(this.CurrentChange):this.getItemsAllocation(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.itemsAllocation_unallocayion{
    @import '../../../../style/LabManager/management/index.scss';
    table{
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
            font-size: .23rem;
            padding: 0;
            border: 0;
            .cell{
                line-height: .67rem;
                span{
                    line-height: .67rem;
                }
            }
            .el-input__inner {
                font-size: .2rem;
                height: .44rem;
                width: 2.74rem!important;
                font-weight: 300;
                line-height: .44rem;
            }
        }
        //斑马线
        .warning-row{
            background:#f6f6f6
        }
    }
    //brder
        table::before{
            display: none;
        }
    .principal{
        .cell{
            margin-left: 0.6rem;
        }
        
    }
    
}
//下拉框
// .principal_element{
//     margin-top: -.1rem;
//     .el-select-dropdown__item{
//         height: .44rem;
//         font-size: .2rem;
//         font-weight: 300;
//         line-height: .44rem;
//     }
// }
</style>
