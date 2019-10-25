<template>
    <div class="newDepartment_index table_box">
        <header class="newDepartment_index_header">
            <h3>部门列表</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <!-- <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/> -->
        </header>
         <div class="taskAllocation_distributed ">
              <div class="editTableButton">
                <el-button type="primary" @click="addDepartment">新增</el-button>
            </div>
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.3rem)"  style="width: 100%"  :row-class-name="tabRowClassName"  v-loading="isLoading">
                <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
                <el-table-column prop="lab"  label="公司名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="部门名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="create_time"  label="创建日期" header-align='center'  align='center'> </el-table-column>
                <el-table-column  label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline lookmanagement"  @click="editDepartment(scoped)">编辑</span><span class="underline deletemanagement"  @click="deletedDpartment(scoped.row.id)">删除</span> </template>
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
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <div>
                    <ul>
                        <li><span>部门名称：</span><input type="text" v-model="departmentName" placeholder="填写部门名称"></li>
                        <!-- <li><span>创建时间：</span>
                            <el-date-picker
                                v-model="statusTime"
                                type="date"
                                placeholder="创建时间">
                            </el-date-picker>
                        </li> -->
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="!companyID?createdDepartment():editDepartmentInfo()">完成</el-button></li>
                    </ul>
                </div>
            </template>
        </popUp>
    </div>
</template>
<script>
import Search from "../../../../../components/common/search";
import popUp from '../../../../../components/common/popUp'
export default {
    name: 'newDepartment',
    components:{Search,popUp},
    inject:['reload'],
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isLoading: true,
            totalSum:0,//数据总数
            page_size : 9,//一页数据条数
            CurrentChange:1,//输入框绑定数据
            departmentID: '',
            departmentName: '',
            companyID: ''
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
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
        getIndex(index){
            return (this.CurrentChange - 1) * this.page_size + index + 1
        },
        addDepartment(){
            this.setdialogVisible('新增部门')
        },
        editDepartment(data){
            this.setdialogVisible('编辑部门',data);
        },
        setdialogVisible(title,data){
            this.popUptitle = title;
            if(data){
                this.departmentName = data.row.name;
                this.companyID = data.row.lab_id;
                this.departmentID = data.row.id;
            }
            this.$refs.popUp.dialogVisible = true;
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getcompany_labList(this.searchText,  this.CurrentChange);
        },
        department_info(pageNumber){
            pageNumber = pageNumber ?  pageNumber : 1;
            this.CurrentChange = pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.department_info + '?lab='+this.$route.query.companyID + '&page_size='+ this.page_size : this.$conf.env.department_info +  '?lab=' + '?lab='+this.$route.query.companyID+'&p=' +pageNumber + '&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        createdDepartment(){
            if(!this.departmentName){
                this.$message({ message: '请填写部门名称', type: 'warning'});
                return false;
            };
            this.$http.post(this.$conf.env.department_info,{"name": this.departmentName,"lab": this.$route.query.companyID}).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editDepartmentInfo(){
            if(!this.departmentName){
                this.$message({ message: '请填写部门名称', type: 'warning'});
                return false;
            };
             this.$http.put(this.$conf.env.department_info + this.departmentID + '/',{"name": this.departmentName }).then(res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    this.$refs.popUp.dialogVisible = false;
                    if(this.tableData.length == 1 && this.CurrentChange != 1){
                        this.department_info(this.CurrentChange - 1);
                    }else{
                        this.department_info(this.CurrentChange);
                    }
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        //删除
        deletedDpartment(ID){
            this.$confirm('此操作将删除该部门, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.department_info + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        if(this.tableData.length == 1 && this.CurrentChange != 1){
                            this.department_info(this.CurrentChange - 1);
                        }else{
                            this.department_info(this.CurrentChange);
                        }
                    }else{
                        this.$message({ message: '删除失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    },
    mounted(){
        this.department_info(1)
    },
     watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.department_info(this.CurrentChange);
            }
        },
     }
}
</script>
<style lang="scss">
.newDepartment_index{
     @import '../../../../../style/LabManager/management/index.scss';
    padding-top: .42rem;
    .newDepartment_index_header{
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
    .editTableButton{
        margin-bottom: .26rem;
        padding-right: 1.8rem;
        height: .48rem;
        display: flex;
        justify-content: flex-end;
        button{
            font-size: .25rem;
            padding: .1rem .32rem;
            background: #08a795;
            color: #fff;
            border: 0;
            span{
                text-decoration: underline;
            }
        }
        button:first-child{
            margin-right: .28rem;
        }
    }
    .taskAllocation_distributed{
        height: 100%;
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
    .popUp{
        .el-dialog{
            height: 25%;
            overflow: hidden;
        }
        ul{
            overflow-y: scroll;
            height: auto;
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
