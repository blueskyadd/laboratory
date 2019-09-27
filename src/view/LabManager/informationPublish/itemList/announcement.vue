<template>
    <div class="informationPublish_announcement scrollTable">
        <div class="Search">
            <div>
                <input type="text" v-model="announcementContent" maxlength="80" placeholder="输入发布信息">
                <span>{{announcementContent.length}}/80</span>
            </div>
            <el-button type="primary" @click="createdAnnouncement()">发布</el-button>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"   style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="create_time" min-width="20%"  label="发布时间"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="content"  label="公告内容" header-align='left' align='left'> </el-table-column>
            <el-table-column prop="location" min-width="10%"  label="操作" header-align='center' align='center'>
                <template slot-scope="scoped">
                    <span class="underline deletemanagement" @click="deleteAnnouncement(scoped.row.id)">删除</span>
                </template>
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
    name:'announcement',
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
        announcementContent:'',//内容
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
        /**@name 页面跳转 */
        allocation(data){
            this.$router.push({name: 'applicationannouncement' })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getannouncementList(pageNumber);
        },
        /**@name数据请求 */
        getannouncementList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getannouncementList + '?page_size=' +this.page_size : this.$conf.env.getannouncementList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({message:err.response.data?err.response.data: '服务器错误',type: 'error'});
            })
        },
        /**@name发布 */
        createdAnnouncement(){
            if(!this.announcementContent){
                this.$message({ message: '写点内容再发布吧', type: 'warning'});  
            }else{
                this.$http.post(this.$conf.env.createdAnnouncement,{"content":this.announcementContent}).then(res=>{
                    if(res.status == '201'){
                    this.$message({ message: '发布成功', type: 'success'});
                        this.reload();
                    }else{
                        this.$message({ message: '发布失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.$message({message:err.response.data?err.response.data: '服务器错误',type: 'error'});
                })
            }

        },
        /**@name删除 */
        deleteAnnouncement(ID){
            this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteAnnouncement + ID + '/').then(res =>{
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
                        this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        }
    },
    mounted(){
        this.getannouncementList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                this.getannouncementList(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">

.informationPublish_announcement{
    @import '../../../../style/LabManager/management/index.scss';
    .el-table_1_column_3{
        padding-right: .6rem!important;
    }
    //发布样式
    .Search{
        display: flex;
        flex-direction: inherit;
        padding: 0 .55rem;
        justify-content: space-between;
        align-items: center;
        height: 1.3rem;
        div{
            height: .6rem;
            background:rgba(236,236,236,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            margin-right: .44rem;
            border-radius: .05rem;
            input{
                height: 100%;
                flex: 1;
                padding: 0 .2rem;
                font-size: .24rem;
            }
            span{
                font-size: .22rem;
                margin-right: .2rem;
            }
        }
        button{
            padding: .2rem .42rem;
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
</style>
