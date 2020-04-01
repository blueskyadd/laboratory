<template>
    <div class="management_equipmentManagement scrollTable">
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
                    <span class="equipmentName">实验室</span>
                    <el-select v-model="value" placeholder="请选择实验室">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">设备状态</span>
                    <el-select v-model="value" placeholder="请选择设备状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul> -->
            <!-- <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div> -->
            <div class="addequipment">
                <el-button  type="primary" @click="showListTab()">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading" >
            <el-table-column prop="num"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="room"  label="实验室" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="device_keeper"  label="负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="status"  label="设备状态" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备二维码" header-align='center' align='center'>
                <template slot-scope="scope">
                    <img @click="open(scope.row)" class="underline" src="../../../../../assets/img/LabManager/management/equipment/see.png" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="name"  label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement"  @click="allocation(scoped)">查看</span><span class="underline lookmanagement"  @click="editquipment('编辑设备', false,scoped)">编辑</span><span class="underline deletemanagement"  @click="deleteEquipment(scoped.row.id)">删除</span> </template>
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
                <ul v-if="isEquipmentList">
                    <li>
                        <span><i class="importantData">*</i>设备名称：</span>
                        <el-select v-model="equipmentEngineer.name" :disabled='!isUpslot'   placeholder="请选择设备名称">
                            <el-option
                            v-for="item in unEquipmentList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span><i class="importantData">*</i>设备编号：</span>
                        <input  type="text" v-model="equipmentEngineer.num" :disabled='!isUpslot' :style="{'background-color':isUpslot ?'':'#F5F7FA',color:isUpslot?'':'#C0C4CC','border-color':isUpslot?'':'#E4E7ED', }" placeholder="填写设备编号">
                    </li>
                    <li>
                        <span><i class="importantData">*</i>所属实验室：</span>
                        <el-select v-model="equipmentEngineer.room" placeholder="请选择">
                            <el-option
                            v-for="item in laboratoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span><i class="importantData">*</i>设备金额：</span>
                        <input  type="number" v-model="equipmentEngineer.money" placeholder="填写设备金额">
                    </li>
                    <li>
                        <span><i class="importantData">*</i>使用年限：</span>
                        <input  type="number"  v-model="equipmentEngineer.year" placeholder="填写使用年限">
                    </li>
                    <li>
                        <span><i class="importantData">*</i>设备负责人：</span>
                        <el-select v-model="equipmentEngineer.device_keeper" placeholder="请选择设备负责人">
                            <el-option
                            v-for="item in equipmentEngineerList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span><i class="importantData">*</i>计量负责人：</span>
                        <el-select v-model="equipmentEngineer.gauger" placeholder="请选择计量负责人">
                            <el-option
                            v-for="item in measurementEnginerrList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="upload">
                        <span><i class="importantData">*</i>上传图片：</span>
                        <input type="file" ref="fileImg" accept="image/*"  @change='updataFileImg' style="display:none" >
                        <div v-if="!equipmentEngineer.image">
                            <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                        </div>
                        <img v-else @click="updataFileChange" :src="equipmentEngineer.image" class="upload_img" >
                    </li>
                    <li class="upload">
                        <span><i class="importantData">*</i>上传文件：</span>
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div v-if="isUpslotFile">
                            <span @click="updataFileChangeFile"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                        </div>
                        <span v-else class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                        <p>{{instructionsName}}</p>
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false" >取消</el-button><el-button type="primary" @click="isUpslot?createdEquipment():editEquipmentInfo()">完成</el-button></li>
                </ul>
                <el-table v-else :data="unEquipmentList" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                    <el-table-column prop="name"  label="设备名称" header-align='center' align='center'> </el-table-column>
                    <el-table-column prop="balance"  label="数量" header-align='center' align='center'> </el-table-column>
                    <el-table-column prop="user"  label="申请人" header-align='center' align='center'> </el-table-column>
                    <el-table-column prop="contract"  label="合同" header-align='center' align='center'>
                        <template slot-scope="scope">
                            <a class="underline" :href="scope.row.contract" download="合同">查看</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="equipment_debug"  label="调试报告" header-align='center' align='center'>
                        <template  slot-scope="scope">
                            <a class="underline" :href="scope.row.equipment_debug" download="调试报告">查看</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address"  label="操作" header-align='center' align='center'>
                        <template slot-scope="scoped"><span class="underline lookmanagement"  @click="editquipment('新增设备', true,scoped)">分配</span><span class="underline lookmanagement"  @click="SendbackEquipment(scoped.row.id)">退回</span></template>
                    </el-table-column>
                </el-table>
            </template>
        </popUp>
        <Code v-if="flag" :qrCodeImg="qrCodeImg" @change="change"/>
    </div>
</template>
<script>
import popUp from '../../../../../components/common/popUp';
import Code from "../../../../../components/common/QR-code";
import { get } from 'http';
export default {
    name:'equipmentManagement',
    components:{popUp, Code},
    inject:['reload'],
    data() {
      return {
        tableData: [],
        options: [],
        value: '',
        popUptitle: '',
        isUpslot: false,
        qrCodeImg:'',
        flag:false,
        isEquipmentList: false,//设备列表
        setWidth: '45%',
        isLoading: true,//加载动画
        totalSum:0,//数据总数
        page_size : 9,//一页数据条数
        CurrentChange:1,//输入框绑定数据
        unEquipmentList: [],// 设备申请未录入列表
        laboratoryList:[],//实验室列表
        equipmentEngineerList: [],//设备工程师
        measurementEnginerrList:[],//计量工程师
        equipmentEngineer:{
            "name":'',//设备名称
            "num":'',//设备编号
            "apply_for":'',//设备所属申请 id
            "room":'',//实验室ID
            "device_keeper":'',//设备管理员id
            "gauger":'',//计量员id
            "image":'',//设备图片
            "instructions":'',//使用手册
            "year":'',//使用年限
            "money":'',//金额
        },//设备信息
        equipmentID:'',//设备ID
        instructionsName:'',//使用手册名称
        isSearch: false,//是否为搜索
        searchText:'',//搜索文字,
        isUpslotFile: false
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
            }else if(data.columnIndex == 4){
                if(data.row.status == '维修中'){
                    return "color:#f10000";
                }else{
                    return "color:#07a695"; 
                }
            
            }else{
                return "color:#444444";
            }
        },
        /**@name 页面跳转 */
        allocation(data){
            this.$router.push({path: '/lookEquipment',query:{equipmentID:data.row.id} })
        },
        /**@name功能按键 */
        showListTab(){
            this.getunEquipmentList();//获取数据
            this.isEquipmentList = false;
            this.popUptitle = '分配设备';
            this.setWidth = '70%';
            this.$refs.popUp.dialogVisible = true;
        },
        //弹框
        editquipment(title, flag, data){
            console.log(data.row.id)
            this.getlaboratoryList();//实验室列表
            this.getequipmentEngineerList();//设备工程师
            this.getmeasurementEnginerrList();//计量员
            this.isEquipmentList = true;
            this.setWidth = '45%';
            this.popUptitle = title;
            this.isUpslot = flag;
            this.isUpslotFile = flag;
            this.equipmentID = data.row.id;
            this.equipmentEngineer.apply_for = data.row.id;
            this.$refs.popUp.dialogVisible = true;
            !flag? this.getEquipmentDetail(data.row.id): this.DeleteSection();

        },
        //上传按钮
        updataFileChange(){
            this.$refs.fileImg.click()
        },
        updataFileChangeFile(){
            this.$refs.file.click()
        },
        //取消-数据重置
        DeleteSection(){
            this.equipmentEngineer  = {
                "name":'',//设备名称
                "num":'',//设备编号
                "apply_for": this.equipmentEngineer.apply_for,//设备所属申请 id
                "room":'',//实验室ID
                "device_keeper":'',//设备管理员id
                "gauger":'',//计量员id
                "image":'',//设备图片
                "instructions":'',//使用手册
                "year":'',//使用年限
                "money":'',//金额
            }
             this.instructionsName = '';
        },
        //上传按钮
        updataFileImg(e){
            let _this = this;
             this.$updataFile.updataFile(e.target.files[0], res =>{
                _this.equipmentEngineer.image = res.data.file
                console.log(res)
                // this.fileName =  e.target.files[0].name;
            },this)
        },
        updataFile(e){
            let _this = this;
            this.$updataFile.updataFile(e.target.files[0], res =>{
                _this.equipmentEngineer.instructions = res.data.file
                _this.instructionsName = e.target.files[0].name;
                _this.isUpslotFile = false;
            },this)
        },
        //文件删除
        deleteFile(){
            this.equipmentEngineer.instructions = '';
            this.instructionsName = '';
            this.isUpslotFile = true;
        },
        open(row) {
            this.qrCodeImg = row.qrcode;
            this.flag = true;
        },
        change(data) {
        this.flag = data;
        },
         /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.CurrentChange =  pageNumber;
            this.currentPage = pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getequipmentManagementList(pageNumber):this.equipmentSearch(this.searchText,pageNumber);
        },
        /**@name搜索 */
        equipmentSearch(data,pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.CurrentChange = pageNumber;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getequipmentManagementList + '?search=' + data + '&page_size=' +this.page_size : this.$conf.env.getequipmentManagementList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name获取设备数据 */
        getequipmentManagementList(pageNumber){
            this.isSearch = false;
            pageNumber = pageNumber ? pageNumber : 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getequipmentManagementList + '?page_size=' +this.page_size : this.$conf.env.getequipmentManagementList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name获取设备申请未录入列表 */
        getunEquipmentList(){
            this.$http.get(this.$conf.env.getunEquipmentList).then(res =>{
                this.unEquipmentList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name实验室列表 */
        getlaboratoryList(){
            this.$http.get(this.$conf.env.getlaboratoryList).then( res =>{
                this.laboratoryList = res.data
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
        /**@name计量工程师 */
        getmeasurementEnginerrList(){
            this.$http.get(this.$conf.env.getmeasurementEnginerrList).then( res =>{
                this.measurementEnginerrList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            }) 
        },
        /**@name 设备详情 */
        getEquipmentDetail(ID){
            this.$http.get(this.$conf.env.getEquipmentDetail + ID + '/').then( res =>{
                console.log(res)
                res.data.device_keeper = res.data.device_keeper.id;
                res.data.gauger = res.data.gauger.id;
                res.data.room = res.data.room.id;
                this.equipmentEngineer = res.data;
                this.instructionsName = res.data.instructions;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })  
        },
        /**@name 设备退回 */
        SendbackEquipment(ID){
            this.$http.put(this.$conf.env.SendbackEquipment + ID + '/').then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '退回成功', type: 'success'});
                    this.getunEquipmentList();
                }else{
                    this.$message({ message: '退回失败', type: 'warning'});              
                }
            }).catch(err =>{
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })  
        },
        /**@name删除设备 */
        deleteEquipment(ID){
            this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteEquipment + ID +'/').then( res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                         if(this.tableData.length == 1 && this.CurrentChange != 1){
                             !this.isSearch?this.getequipmentManagementList(this.CurrentChange - 1):this.equipmentSearch(this.searchText,this.CurrentChange - 1);
                         }else{
                             !this.isSearch?this.getequipmentManagementList(this.CurrentChange):this.equipmentSearch(this.searchText,this.CurrentChange);
                         }
                        
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
        /**@name 新增设备 */
        createdEquipment(){
            if(!this.VerificationData()) return;
            if(this.equipmentEngineer.year > 65535){
                 this.$message.error('使用年限不能超过65535年哦'); 
                 return 
            }
            this.$http.post(this.$conf.env.createdEquipment, this.equipmentEngineer).then( res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                if(err.response.status == '400'){
                    if(err.response.data.name){
                        this.$message({ message:err.response.data.name , type: 'warning'});   
                    }else if(err.response.data.num){
                        this.$message({ message:err.response.data.num , type: 'warning'});   
                    }else if(err.response.data.money){
                        this.$message({ message:err.response.data.money , type: 'warning'});   
                    }
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        },
        /**@name 设备信息修改 */
        editEquipmentInfo(){
            if(!this.VerificationData()) return;
            if(this.equipmentEngineer.year > 65535){
                 this.$message.error('使用年限不能超过65535年哦'); 
                 return  false
            }
            this.$http.put(this.$conf.env.editEquipmentInfo + this.equipmentID + '/', this.equipmentEngineer).then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                if(err.response.status == '400'){
                    if(err.response.data.name){
                        this.$message({ message:err.response.data.name , type: 'warning'});   
                    }else if(err.response.data.num){
                        this.$message({ message:err.response.data.num , type: 'warning'});   
                    }else if(err.response.data.money){
                        this.$message({ message:err.response.data.money , type: 'warning'});   
                    }
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        },
        VerificationData(){
            console.log(this.equipmentEngineer)
            for(var i in this.equipmentEngineer){
                if(!this.equipmentEngineer[i]){
                    this.$message({message: '*为必填项哦',type: 'warning'});
                    return false
                }
            }
            return true;
        }
    },
    mounted(){
        this.getequipmentManagementList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                 this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                !this.isSearch?this.getequipmentManagementList(this.CurrentChange):this.equipmentSearch(this.searchText,this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../../../../style/LabManager/management/index.scss';
.management_equipmentManagement{
    .el-dialog__body{
        height: calc(100% - .9rem)!important;
    }
    .addequipment{
        margin-top: 0rem;
    }
     th{
            font-size: .2rem;
            line-height: .48rem;
            padding: 0;
            font-weight: 400;
            .cell{
                line-height: .67rem;
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
             .el-table{
                margin-top: .46rem;
             }
        }
}
</style>
