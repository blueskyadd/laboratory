<template>
    <div class="management_testManagement scrollTable">
        <div class="Search">
            <!-- <ul>
                <li>
                    <span class="equipmentName">标准名称</span>
                    <el-select v-model="value" placeholder="请选择标准名称">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">上传单位</span>
                    <el-select v-model="value" placeholder="请选择上传单位">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </egettestManagementListl-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div> -->
            <div class="addequipment">
                <el-button  type="primary" @click="editquipment('新增试验标准', true)">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%" v-loading='isLoading' :row-class-name="tabRowClassName">
            <el-table-column prop="num"  label="标准编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="标准名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="company"  label="上传单位" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="create_time"  label="上传时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped">
                     <a class="underline lookmanagement deletemanagement" :href="scoped.row.file" download="w3logo">下载</a>
                     <span class="underline deletemanagement"  @click="deletegettestManagement(scoped.row.id)">删除</span> </template>
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
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span><i class="importantData">*</i>实验标准名称：</span>
                        <input type="text" v-model="standard.name" maxlength="50"  placeholder="填写实验标准名称">
                    </li>
                    <li>
                        <span><i class="importantData">*</i>试验标准编号：</span>
                        <input   type="text" v-model="standard.num" placeholder="填写试验标准编号">
                    </li>
                    <li>
                        <span><i class="importantData">*</i>上传单位：</span>
                        <input type="text" maxlength="50" v-model="standard.company" placeholder="填写上传单位">
                    </li>
                    <li class="upload">
                        <span><i class="importantData">*</i>上传图片：</span>
                        <input type="file" accept="image/*" ref="file"  @change='updataFile' style="display:none" >
                        <div v-if="isCreated">
                            <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                        </div>
                        <img v-else  @click="updataFileChange" :src="standard.file" class="upload_img" alt="">
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="createdtestStandard">完成</el-button></li>
                </ul>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../components/common/popUp';
import { get } from 'http';
export default {
    name:'testManagement',
    components:{popUp},
    inject:['reload'],
    data() {
      return {
        tableData: [],
        value: '',
        popUptitle: '',
        isUpslot: false,
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        CurrentChange:1,
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        standard:{
            "name":'',//名称
            "num":'',//编号
            "file":'',//文件url
            "company":'',//上传单位
        },
        isCreated: true,
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

        /**@name功能按键 */
        //弹框
        editquipment(title, flag, data){
            this.popUptitle = title;
            this.isUpslot = flag;
            flag?this.DeleteSection():'';
            this.$refs.popUp.dialogVisible = true;
        },
        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //上传按钮
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
            let _this = this;
             this.$updataFile.updataFile(e.target.files[0], res =>{
                _this.standard.file = res.data.file;
                _this.isCreated = false;
            },this)
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
        //取消数据重置
        DeleteSection(){
            this.standard={
                "name":'',//名称
                "num":'',//编号
                "file":'',//文件url
                "company":'',//上传单位
            };
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch ?  this.gettestManagementList(pageNumber):this.testManageSearch(this.searchText,pageNumber);
        },
        /**@name搜索 */
        testManageSearch(data,pageNumber){
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gettestManagementList + '?search=' + data  + '&page_size=' +this.page_size : this.$conf.env.gettestManagementList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            console.log(res)
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name获取数据 */
        gettestManagementList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.gettestManagementList + '?page_size=' +this.page_size : this.$conf.env.gettestManagementList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            console.log(res)
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name删除 */
        deletegettestManagement(ID){   
            this.$confirm('此操作将删除该标准, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deletegettestManagement + ID + '/').then(res =>{
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
            
        },
        /**@name创建 */
        createdtestStandard(){
            if(!this.VerificationData()) return;
            this.$http.post(this.$conf.env.createdtestStandard, this.standard).then( res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                if(err.response.status == '400'){
                    this.$message({ message:err.response.data , type: 'warning'});   
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        },
        VerificationData(){
            for(var i in this.standard){
                if(!this.standard[i]){
                    this.$message({message: '*为必填项哦',type: 'warning'});
                    return false
                }
            }
            return true;
        }
    },
    mounted(){
        this.gettestManagementList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) : newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch ?  this.gettestManagementList(this.CurrentChange):this.testManageSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.management_testManagement{
    @import '../../../../../style/LabManager/management/index.scss';
    .Search{
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        ul{
            margin-left: .55rem;
            display: flex;
            margin-top: .26rem;
            margin-bottom: .33rem;
            li{
                margin-right: .94rem;
                display: flex;
                align-items: center;
                .equipmentName{
                    font-size: .24rem;
                    margin-right: .27rem;
                }
                input{
                    width: 3.60rem;
                    font-size: .23rem;
                    font-weight: 200;
                    height: .48rem;
                    border: 1px solid #999999;
                }
                .el-select__caret{
                    font-size: .23rem;
                    color:#999999;
                }
                .el-input__icon{
                    line-height: .46rem;
                    width: .46rem;
                }
            }
        }
         button{
            font-size: .25rem;
            padding: .1rem .32rem;
            margin-top: .23rem;
            background: #08a795;
            color: #fff;
            border: 0;
            span{
                text-decoration: underline;
            }
        }
        .editTableButton{
            margin-top: .43rem;
            padding-bottom: .26rem;
            padding-right: 1.8rem;
            height: .48rem;
            display: flex;
            width: 100%;
            justify-content: flex-end;
            margin-left: .18rem;
            border-bottom: 1px solid #cccccc;
            button:first-child{
                margin-right: .28rem;
            }
            button:last-child{
                background: #fff;
                color: #08a795;
                margin-right: 1.79rem;
            }
        }
        .addequipment{
            margin: .22rem 1.79rem .15rem 0;
            display: flex;
            justify-content: flex-end;
            width: 100%;
            button{
                margin-right: 1.79rem;
            }
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
                 height: 58%!important;
             }
             li{
                 
                 margin-bottom: .4rem!important;
             }
             li>span{
                width: 2rem!important;
            }
        }
}
</style>
