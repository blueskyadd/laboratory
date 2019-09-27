<template>
    <div class="management_frockManagement scrollTable">
        <div class="Search">
            <!-- <ul>
                <li>
                    <span class="equipmentName">设备名称</span>
                    <el-select v-model="value" placeholder="请选择设备名称">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">工装状态</span>
                    <el-select v-model="value" placeholder="请选择工装状态">
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
            </div> -->
            <div class="addequipment">
                <el-button  type="primary" @click="addFocklist">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="nateriel_num"  label="工装编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="工装名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="tool_user"  label="负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="inventory"  label="工装状态" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address" label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped">
                     <span class="underline lookmanagement"  @click="allocation(scoped)">查看</span>
                     <span class="underline lookmanagement"  @click="editquipment('编辑工装', false,scoped)">编辑</span>
                     <span class="underline deletemanagement" :style="{color:scoped.row.inventory == '正常' ? '#a6a6a6' : '#f32c2c'}" @click="deletefrock(scoped)">删除</span> </template>
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
        <popUp ref="popUp" :setWidth='setWidth' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul v-if="isFrockList">
                        <li>
                            <span><i class="importantData">*</i>工装名称：</span>
                            <input v-model="frockSectionInfoName"  type="text" disabled  placeholder="工装名称" class="disabled">
                        </li>
                        <li>
                            <span><i class="importantData">*</i>工装编号：</span>
                            <input   type="text"  v-model="frockSectionInfo.nateriel_num" :disabled='!isUpslot' :class="!isUpslot? 'disabled' : ''" placeholder="填写工装编号">
                        </li>
                        <li>
                            <span><i class="importantData">*</i>工装金额：</span>
                            <input   type="number" v-model="frockSectionInfo.money" placeholder="填写工装金额">
                        </li>
                        <li>
                            <span><i class="importantData">*</i>使用年限：</span>
                            <input   type="number" v-model="frockSectionInfo.year" placeholder="填写使用年限">
                        </li>
                        <li >
                            <span><i class="importantData">*</i>工装负责人：</span>
                            <el-select v-model="frockSectionInfo.tool_user" placeholder="选择工装负责人">
                                <el-option
                                v-for="item in equipmentEngineerList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="upload">
                            <span><i class="importantData">*</i>上传图片：</span>
                            <input type="file" ref="fileImg" accept="image/*" @change='updataImg' style="display:none" >
                            <div v-if="!isUploadImg">
                                <span @click="updataImgChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                            </div>
                            <img :src="frockSectionInfo.image"  @click="updataImgChange" alt="" onerror="/err.gif" v-else class="upload_img">

                        </li>
                        <li class="upload">
                            <span><i class="importantData">*</i>上传文件：</span>
                            <input type="file" ref="file"  @change='updataFile' style="display:none" >
                            <div v-if="!isUploadFile">
                                <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                            </div>
                            <span v-else class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                            <p v-if="isUploadFile">{{fileName}}</p>
                        </li>
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="isUpslot?createdFrock():editFrock()">完成</el-button></li>
                </ul>
                <el-table v-else :data="NoentryFrockList" :cell-style="changecolor" height="calc(100%  - .3rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                    <el-table-column prop="name" min-width="40%" label="设备名称" header-align='center' align='center'> </el-table-column>
                    <el-table-column prop="user" min-width="40%" label="申请人" header-align='center' align='center'> </el-table-column>
                    <el-table-column prop="name" min-width="40%" label="合同" header-align='center' align='center'>
                        <template slot-scope="scoped">
                            <a class="underline" :href="scoped.row.contract" download="w3logo">下载</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="40%" label="调试报告" header-align='center' align='center'>
                        <template slot-scope="scoped">
                            <a :href="scoped.row.report" download="w3logo" class="underline">查看</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                        <template slot-scope="scoped"><span class="underline lookmanagement"  @click="editquipment('新增工装', true,scoped)">新增</span><span class="underline lookmanagement no_margiRright"  @click="editquipment('编辑工装', false,scoped)">退回</span></template>
                    </el-table-column>
                </el-table>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../components/common/popUp';
import VerificationData from '../../../../../components/VerificationData'
export default {
    name:'frockManagement',
    components:{popUp},
    inject:['reload'],
    data() {
      return {
        tableData: [],
        options: [],
        value: '',
        popUptitle: '',
        isUpslot:false,
        isFrockList: false,
        setWidth: '45%',
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
        NoentryFrockList: [],//未录入列表数据
        frockSectionInfo:{
            "nateriel_num":'',//编号
            "apply_for":'',//申请id
            "tool_user":'',//负责人id 
            "image":'',//图片url
            "service_manual":'',//文件url
            "year":'',//使用年限
            "money":'',//金额
        },
        isEditFrock: false,//判断是否为编辑状态
        equipmentEngineerList: [],//设备工程师
        frockSectionInfoName:'',//工装名称
        isUploadImg: false,//图片是否上传成功
        fileName: '使用手册',//上传文件名称
        isUploadFile: false,//文件是否上传成功
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
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 3){
                if(data.row.inventory == '报废'){
                    return "color:#f32c2c";
                }else{
                    return "color:#1cd88d";
                }
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        allocation(data){
            this.$router.push({path: '/frockProcess' ,query:{'frockID': data.row.id} })
        },
        /**@name功能按键 */
        addFocklist(){
            this.isFrockList = false;
            this.popUptitle = '新增工装';
            this.setWidth = '70%';
            this.$refs.popUp.dialogVisible = true;
            this.getNoentryFrockList();//获取数据
        },
        //弹框
        editquipment(title, flag, data){
            this.isFrockList = true;
            this.setWidth = '45%';
            this.popUptitle = title;
            this.isUpslot = flag;
            this.getequipmentEngineerList();
            !flag?this.getFrockDetailInfo(data.row.id): this.DeleteSection();
            this.frockSectionInfoName = data.row.name;
            this.frockSectionInfo.apply_for = data.row.id;
            this.$refs.popUp.dialogVisible = true;
        },
        //上传图片按钮
        updataImgChange(){
            this.$refs.fileImg.click()
        },
        //上传文件按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        
        //上传按钮
        updataImg(e){
             this.$updataFile.updataFile(e.target.files[0], res =>{
                this.frockSectionInfo.image = res.data.file;
                this.isUploadImg = true;
            },this)
        },
        //上传文件按钮
        updataFile(e){
             this.$updataFile.updataFile(e.target.files[0], res =>{
                this.isUploadFile = true;
                this.frockSectionInfo.service_manual = res.data.file;
                this.fileName =  e.target.files[0].name;
            },this)
        },
        //文件删除
        deleteFile(){
            this.frockSectionInfo.service_manual = '';
            this.fileName = '';
            this.isUploadFile = false;
        },
        //取消数据重置
        DeleteSection(){
            this.frockSectionInfo = {
                "nateriel_num":'',//编号
                "apply_for":'',//申请id
                "tool_user":'',//负责人id 
                "image":'',//图片url
                "service_manual":'',//文件url
                "year":'',//使用年限
                "money":'',//金额
            }
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch ? this.getpersonnelManagementList(pageNumber):this.frockSearch(this.searchText,pageNumber);
        },
        /**@name 搜索 */
        frockSearch(data,pageNumber){
             this.isLoading = true;
             this.searchText = data;
             this.isSearch = true;
             this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getfrockManageList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getfrockManageList + '?search=' + data +  + '&p=' +pageNumber +'&page_size='  +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            }) 
        },
        /**@name获取数据 */
        getfrockManageList(pageNumber){
          this.isSearch = false;
          this.$http.get(pageNumber == 1 ? this.$conf.env.getfrockManageList + '?page_size=' +this.page_size : this.$conf.env.getfrockManageList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});

            })  
        },
        /**@name工装未录入列表数据 */
        getNoentryFrockList(){
            this.$http.get(this.$conf.env.getNoentryFrockList).then(res =>{
                this.NoentryFrockList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 设备工程师 */
        getequipmentEngineerList(){
           this.$http.get(this.$conf.env.getequipmentEngineerList).then( res =>{
                this.equipmentEngineerList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            }) 
        },
        /**@name获取工装详情 */
        getFrockDetailInfo(ID){
             this.$http.get(this.$conf.env.getFrockDetailInfo + ID + '/').then( res =>{
                res.data.tool_user = res.data.tool_user.id;
                this.frockSectionInfo = res.data;
                this.frockID = res.data.id;
                this.isUploadImg = res.data.image ? true : false;
                this.isUploadFile = res.data.service_manual ? true : false;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })  
        },
        /**@name 创建工装 */
        createdFrock(){
            if(!VerificationData.VerificationData(this.frockSectionInfo)) return 
            this.$http.post(this.$conf.env.createdFrock,this.frockSectionInfo).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name编辑工装 */
        editFrock(){
            if(!VerificationData.VerificationData(this.frockSectionInfo)) return 
            this.$http.put(this.$conf.env.editFrock + this.frockID + '/', this.frockSectionInfo).then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getfrockManageList(1)
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch ? this.getpersonnelManagementList(this.CurrentChange):this.frockSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../../../style/LabManager/management/index.scss';
.management_frockManagement{
    padding-top: .248rem;
    .Search .editTableButton{
        padding-top: .68rem!important;
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
                 margin-bottom: .49rem!important;
             }
             .el-dialog__body{
                 height: calc(100% - .9rem);
             }
             .el-table{
                 margin-top: .46rem;
             }
         }
}
</style>
