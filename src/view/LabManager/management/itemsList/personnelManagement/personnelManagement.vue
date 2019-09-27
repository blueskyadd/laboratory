<template>
    <div class="management_personnelManagement table_box scrollTable">
        <div class="editTableButton">
            <el-button type="primary" @click="addPersonnel">新增</el-button>
            <el-button type="primary" @click="addCompany">公司</el-button>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"   style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
            <el-table-column prop="job_num"  label="工号" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="姓名" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="company"  label="公司" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="department"  label="部门" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="role"  label="职位" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="username"  label="手机号" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="在职情况" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address" label="详情" header-align='center' align='center'>
                <template slot-scope="scoped">
                    <span class="underline lookmanagement"  @click="allocation(scoped)">查看</span>
                    <span class="underline lookmanagement"  @click="editPersonnel(scoped)">编辑</span>
                    <span class="underline deletemanagement"  @click="allocation(scoped)">删除</span>
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
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <div v-if="isUpslot == 1">
                    <ul>
                        <li><span><i class="importantData">*</i>人员姓名：</span><input type="text" maxlength="20" v-model="employeeName" placeholder="填写姓名(最多20个字)" ></li>
                        <li><span><i class="importantData">*</i>人员工号：</span><input  type="text" v-model="employeeJobNum" placeholder="填写工号"></li>
                        <li>
                            <span><i class="importantData">*</i>公司：</span>
                            <el-select v-model="CompanyID" placeholder="请选择">
                                <el-option
                                v-for="item in CompanyList"
                                :key="item.id"
                                :label="item.lab"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span><i class="importantData">*</i>部门：</span>
                            <el-select v-model="DepartmentID" placeholder="请选择">
                                <el-option
                                v-for="item in DepartmentList"
                                :key="item.id"
                                :label="item.department"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        <li>
                            <span><i class="importantData">*</i>职位：</span>
                            <el-select v-model="RoleID" placeholder="请先选择公司">
                                <el-option
                                v-for="item in RoleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li><span><i class="importantData">*</i>手机号：</span><input  type="text" v-model="employeePhone" placeholder="填写手机号"></li>
                        <li><span><i class="importantData">*</i>入职时间：</span>
                            <el-date-picker
                                v-model="employeeEntry_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="入职时间">
                            </el-date-picker>
                        </li>
                        <li><span>离职时间：</span>
                            <el-date-picker
                                v-model="employeeTerm_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="离职时间">
                            </el-date-picker>
                        </li>
                        <li class="upload">
                            <span><i class="importantData">*</i>上传简历：</span>
                            <input type="file" ref="file"  accept='application/pdf' @change='updataFile' style="display:none" >
                            <div v-if="!isEmployeeResume">
                                <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                            </div>
                                <span v-if="isEmployeeResume" class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                                <p  v-if="isEmployeeResume">{{fileName}}</p>
                        </li>
                        <li><el-button type="primary" @click="Cancel">取消</el-button><el-button type="primary" @click.native="submitEmployee()">完成</el-button></li>
                    </ul>
                </div>
                <div v-else>
                    <ul>
                        <li>
                            <span>人员名称：</span>
                            <p>是否 微服务</p>
                        </li>
                        <li>
                            <span>人员工号：</span>
                            <p>32423423423</p>
                        </li>
                        <li>
                            <span>公司：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li>
                            <span>职位：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li>
                            <span>手机号：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li>
                            <span>离职时间：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li class="upload">
                            <span>上传简历：</span>
                            <span class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                            <p>{{fileName}}</p>
                             
                        </li>
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" >完成</el-button></li>
                    </ul>
                </div>
                <div class="mask_layer" v-if="isPopLoading">
                    <img src="../../../../../assets/img/commont/loading.jpg" alt="">
                </div>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../components/common/popUp'
import { setTimeout } from 'timers';

export default {
    name:'personnelManagement',
    components:{popUp},
    inject:['reload'],
    data() {
      return {
        tableData: [],//数据列表
        popUptitle: '',//弹框标题
        isUpslot: 1,//创建编辑？1创建 2编辑
        fileName: '简历',//文件名称
        employeeResume:'',//简历文件
        employeeResumeImgurl:'',
        isEmployeeResume: false,//文件是否上传成功
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,//输入框绑定数据
        employeeName:'',//员工姓名
        employeeJobNum:'',//员工工号
        CompanyList:[],//公司列表
        CompanyID:'',//当前选择公司ID
        DepartmentList:[],//部门列表
        DepartmentID:'',//当前部门ID
        RoleList: [{
                value: 1,
                label: '实验室管理员'
                }, {
                value: 2,
                label: '产品经理'
                }, {
                value: 3,
                label: '实验室经理'
                }, {
                value: 4,
                label: '项目经理'
                }, {
                value: 5,
                label: '试验工程师'
                },{
                value: 6,
                label: '试验设备计量员'
                },{
                value: 7,
                label: '试验设备工程师'
                },{
                value: 8,
                label: '物料管理员'
                },
                ],//职位列表
        RoleID: '',//当前职位ID
        employeePhone:'',//员工手机号
        employeeEntry_date:'',//员工入职时间
        employeeTerm_date:'',//员工离职时间
        isPopLoading: false,//弹框加载样式
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
        
        /**@name 页面跳转 */
        allocation(data){
            this.$router.push({name: 'applicationpersonnelManagement' })
        },
        addPersonnel(){
            this.DeleteSection();
            this.setdialogVisible('新增人员',1);
        },
        editPersonnel(data){
             this.setdialogVisible('编辑人员',2)
        },
        addCompany(){
            this.$router.push({name:'addCompany'});
        },
        setdialogVisible(title, flag){
            this.popUptitle = title;
            this.isUpslot = flag;
            this.$refs.popUp.dialogVisible = true;
        },
        //序号
        getIndex(index){
            return (this.currentPage - 1) * this.page_size + index + 1
        },
        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //取消按钮
        Cancel(){
            this.$refs.popUp.dialogVisible = false;
        },
        //文件上传
        updataFile(e){
            var _this = this;
            _this.employeeResume =  e.target.files[0];
            _this.isPopLoading = true;
            _this.$updataFile.updataFile(_this.employeeResume, res =>{
                _this.employeeResumeImgurl = res.data.file
                _this.isEmployeeResume = true;
                _this.isPopLoading = false;
                _this.fileName =  e.target.files[0].name;
            },this)
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
            this.isUpslot == 1 ? this.isEmployeeResume  = false:'';
        },
        DeleteSection(){
            this.employeeJobNum = '';//工号
            this.employeeName = '';//姓名
            this.employeePhone = '';//手机号
            this.DepartmentID = '';//职位id
            this.RoleID = '';//角色(1, "实验室管理员"),(2, "产品")， (3, "实验室经理"), (4, "项目经理"),(5, "试验工程师"), (6, "试验设备计量员"), (7, "试验设备工程师"), (8, "物料管理员")
            this.employeeEntry_date = '';//入职日期
            this.employeeTerm_date = '';//离职日期
            this.employeeResumeImgurl = '';//简历
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            console.log(this.isSearch)
            !this.isSearch ? this.getpersonnelManagementList(pageNumber):this.personnelSearch(this.searchText,pageNumber);
        },
        /**@name 创建员工 */
        submitEmployee(){
            if(!this.VerificationData())return;
            this.$http.post(this.$conf.env.createdCompant,
            {
                "job_num": this.employeeJobNum,//工号
                "name": this.employeeName,//姓名
                "username": this.employeePhone,//手机号
                "department": this.DepartmentID,//职位id
                "role": this.RoleID,//角色(1, "实验室管理员"),(2, "产品")， (3, "实验室经理"), (4, "项目经理"),(5, "试验工程师"), (6, "试验设备计量员"), (7, "试验设备工程师"), (8, "物料管理员")
                "entry_date": this.employeeEntry_date,//入职日期
                "term_date": this.employeeTerm_date,//离职日期
                "resume": this.employeeResumeImgurl,//简历
            }).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                if(err.response.status == '400'){
                    if(err.response.data.job_num){
                        this.$message({ message:err.response.data.job_num , type: 'warning'});   
                    }else if(err.response.data.name){
                        this.$message({ message:err.response.data.name , type: 'warning'});   
                    }else if(err.response.data.username){
                        this.$message({ message:err.response.data.username , type: 'warning'});   
                    }
                }else{
                    this.$message({ message:'服务器错误' , type: 'warning'}); 
                }
                console.log(err)
            })
        },  
        //数据校验
        VerificationData(){
            var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
            if(!this.employeeName || !this.employeeJobNum || !this.CompanyID || !this.DepartmentID || !this.RoleID || !this.employeePhone || !this.employeeEntry_date ){
                this.$message({message: '*为必填项哦',type: 'warning'});
                return false
            }else if(!myreg.test(this.employeePhone.replace(/(^\s*)|(\s*$)/g, ""))){
                 this.$message({message: '请填写正确的手机号',type: 'warning'});
                return false
            }else{
                return true;
            }
        },
        /**@name搜索 */
        personnelSearch(data,pageNumber){
            this.isLoading = true;
            console.log('搜索')
            this.searchText = data;
            this.isSearch = true;
            this.CurrentChange = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getpersonnelManagementList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getpersonnelManagementList + '?search=' + data + '&p=' +pageNumber +'&page_size='  +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            console.log(res)
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name数据请求 */
        getpersonnelManagementList(pageNumber){
            this.isSearch = false;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getpersonnelManagementList + '?page_size=' + this.page_size : this.$conf.env.getpersonnelManagementList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //公司列表
        getCompanyList(){
            this.$http.get(this.$conf.env.getCompanyList).then( res =>{
                this.CompanyList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //职位列表
        getDepartmentList(labID){
            this.$http.get(this.$conf.env.getDepartmentList + labID).then( res =>{
                this.DepartmentList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
    },
    mounted(){
        this.getpersonnelManagementList(1);
        this.getCompanyList();
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch ? this.getpersonnelManagementList(this.CurrentChange):this.personnelSearch(this.searchText,this.CurrentChange);
            }
        },
        //根据公司的查询当前公司职位列表
        CompanyID(newData,oldData){
            this.RoleID = '';
            this.getDepartmentList(newData)
        },
        isSearch(newData,oldData){
            console.log(newData)
        }
    }
}
</script>
<style lang="scss">
.management_personnelManagement{
    
    @import '../../../../../style/LabManager/management/index.scss';
    // margin-top: .43rem;
    .editTableButton{
        margin-top: .43rem;
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
        .principal{
            .cell{
                margin-left: 0.6rem;
            }
        }
        .lookmanagement{
            margin-right: .37rem;
        }
        .deletemanagement{
            color: #f30000;
        }
        .mask_layer{
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            background: rgba(255,255,255,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                // width: 2rem;
                height: 2rem;
            }
        }

}
</style>
