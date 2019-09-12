<template>
    <div class="management_methodsManagement scrollTableScrollNoTop">
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="num"  label="试验方法编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验方法名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="company"  label="上传人员" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="上传时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"  label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped">
                     <a :href="scoped.row.file" download="w3logo" class="underline lookmanagement deletemanagement">下载</a>
                     <span class="underline deletemanagement"  @click="deletetestMethods(scoped.row.id)">删除</span> </template>
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
    name:'methodsManagement',
    inject:['reload'],
    data() {
      return {
        tableData: [],
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
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.gettestMethodsList(pageNumber):this.testMethodsSearch(this.searchText,pageNumber);
        },
        /**@name搜索 */
        testMethodsSearch(data,pageNumber){
            this.isLoading = true;
             this.searchText = data;
             this.isSearch = true;
             this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gettestMethodsList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.gettestMethodsList + '?search=' + data + '&p=' +pageNumber +'&page_size=' + +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '500'){
                    this.$message({message: '服务器错误',type: 'error'});
                }
            })
        },
        /**@name数据获取 */
        gettestMethodsList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gettestMethodsList + '?page_size=' +this.page_size : this.$conf.env.gettestMethodsList + '?p=' +pageNumber +'&page_size=' + +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            console.log(res)
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '500'){
                    this.$message({message: '服务器错误',type: 'error'});
                }
            })
        },
        /**@name删除数据 */
        deletetestMethods(ID){
            this.$http.delete(this.$conf.env.deletetestMethods + ID + '/').then(res =>{
                if(res.status == '204'){
                    this.$message({ message: '删除成功', type: 'success'});
                     this.reload();
                }else{
                    this.$message({ message: '删除失败', type: 'warning'});              
                }
            }).catch(err =>{
                if(err.response.status == '400'){
                    this.$message({ message:err.response.data, type: 'warning'});   
                }else{
                    this.$message({ message:err.response.data?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        }
    },
    mounted(){
        this.gettestMethodsList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch?this.gettestMethodsList(this.CurrentChange):this.testMethodsSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_methodsManagement{
    
    @import '../../../../../style/LabManager/management/index.scss';
        padding-top: .52rem;
        
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
}
</style>
