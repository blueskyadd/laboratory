<template>
    <div class="informationPublish_equipmentImg scrollTable">
        <div class="Search">
            <div class="addequipment">
                <el-button  type="primary" @click="editquipment('新增设备', true)">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="name" min-width="35%"  label="设备名称"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="text"  label="设备介绍" header-align='left' align='left'> </el-table-column>
            <el-table-column prop="text"  label="设备图片" header-align='center' align='center'>
                <template  slot-scope="scoped">
                    <img class="underline" @click="openImg(scoped.row.image)" src="../../../../assets/img/LabManager/management/equipment/see.png" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped">
                     <span class="underline lookmanagement" @click="editquipment('编辑设备', false,scoped.row)">编辑</span>
                     <span class="underline deletemanagement"  @click="deleteEquipmentImg(scoped.row.id)">删除</span> </template>
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
                        <span><i class="importantData">*</i>设备名称：</span>
                        <input type="text" v-model="equipmentStection.name" maxlength="50"  placeholder="填写实验标准名称">
                    </li>
                    <li class="upload">
                        <span><i class="importantData">*</i>设备图片：</span>
                        <input type="file" ref="file" accept="image/*"  @change='updataFile' style="display:none" >
                        <div v-if="!equipmentStection.image">
                            <span @click="updataFileChange"><img src="../../../../assets/img/commont/file/addfile.png" alt=""></span>
                            
                        </div>
                        <img v-else  @click="updataFileChange" :src="equipmentStection.image" class="upload_img" alt="">
                    </li>
                    <li class="upload">
                        <span><i class="importantData">*</i>设备介绍：</span>
                        <div class="textarea">
                            <textarea v-model="equipmentStection.text" maxlength="100" ></textarea>
                            <span>{{equipmentStection.text.length}}/100</span>
                        </div>
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="isCreated ?createdEquipmentImg():editEquipmentImgInfo()">完成</el-button></li>
                </ul>
            </template>
        </popUp>
        <Code v-if="flag" :qrCodeImg="equipmentImgUrl" @change="change"/>
    </div>
</template>
<script>
import popUp from '../../../../components/common/popUp';
import Code from "../../../../components/common/QR-code";
import viewData from '../../../../components/VerificationData'
import { get } from 'http';
export default {
    name:'equipmentImg',
    components:{popUp,Code},
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
        flag: false,
        equipmentStection:{
            "name":'',//名称
            "text":'',//内容
            "image":'',//图片
        },
        isCreated: true,
        equipmentImgUrl:'',
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
        openImg(Url){
            this.equipmentImgUrl = Url;
            this.flag = true;
        },
        change(data) {
        this.flag = data;
        },
        //弹框
        editquipment(title, flag, data){
            this.popUptitle = title;
            this.isCreated = flag;
            this.DeleteSection()
            flag?'': this.getEquipmentDetail(data);
            this.$refs.popUp.dialogVisible = true;
        },

        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //搜索按钮
        searchPersonnel(){

        },
        //上传按钮
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
            let _this = this;
             this.$updataFile.updataFile(e.target.files[0], res =>{
                _this.equipmentStection.image = res.data.file;
            },this)
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
        //取消数据重置
        DeleteSection(){
            this.equipmentStection={
                "name":'',//名称
                "text":'',//内容
                "image":'',//图片
            };
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getequipmentImgList(pageNumber);
        },
        /**@name获取数据 */
        getequipmentImgList(pageNumber){
            pageNumber = pageNumber ? pageNumber : 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getequipmentImgList + '?page_size=' +this.page_size : this.$conf.env.getequipmentImgList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results
            console.log(res)
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name获取数据详情 */
        getEquipmentDetail(data){
            console.log(data)
            this.equipmentStection = data;
        },
        /**@name删除 */
        deleteEquipmentImg(ID){    
            this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteEquipmentImg + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        if(this.tableData.length == 1 && this.CurrentChange != 1){
                            this.getequipmentImgList(this.CurrentChange - 1)
                        }else{
                            this.getequipmentImgList(this.CurrentChange)
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
        /**@name创建 */
        createdEquipmentImg(){
            if(!viewData.VerificationData(this.equipmentStection)) return;
            this.$http.post(this.$conf.env.createdEquipmentImg, this.equipmentStection).then( res =>{
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
        /**@name修改设备 */
        editEquipmentImgInfo(){
            if(!viewData.VerificationData(this.equipmentStection)) return;
            this.$http.put(this.$conf.env.createdEquipmentImg + this.equipmentStection.id + '/', this.equipmentStection).then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                if(err.response.status == '400'){
                    this.$message({ message:err.response.data , type: 'warning'});   
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        }
    },
     mounted(){
        this.getequipmentImgList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) : newData*1 < 1 ? 1 :  newData*1;
                this.getequipmentImgList(this.CurrentChange)
            }
        },
    }
}
</script>
<style lang="scss">
.informationPublish_equipmentImg{
    @import '../../../../style/LabManager/management/index.scss';
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
        .upload{
            .textarea{
                border:1px solid #ddd!important;
                width: 75%!important;
                height: 1.7rem!important;
                display: flex;
                flex-direction: column;
                align-items: flex-end!important;
                padding: 0 .2rem;
                textarea{
                    width: 100%;
                    padding: .2rem 0;
                    flex: 1;
                }
                span{
                    color: #08a795;
                    height: .44rem!important;
                    width: auto!important;
                }
            }
        }
}
</style>
