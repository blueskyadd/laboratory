<template>
    <div class="taskAllocation_distributed_methods" v-loading.fullscreen.lock="isLoading">
         <div class="main">
            <div class="measure_main">
                <div class="mian_text updata">
                    <div class="file_box">
                        <span class="file_title">{{isupload?'上传试验操作':'试验操作'}}</span>
                        <!-- <el-select v-if="isupload" v-model="value" placeholder="请选择项目结果">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> -->
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div class="uploadFile">
                            <div ><span @click="updataFileChange"><img src="../../../../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <span  class="accessory"><img src="../../../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{fileName}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="editEquipment_exbomInfoDetail()">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'methods',
    inject:['reload'],
    data(){
        return{
            fileName: '点击上传试验操作',
            file:{},
            isupload: false,
            isLoading: true,
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.$updataFile.updataFile(e.target.files[0], res =>{
                this.report = res.data.file
                this.fileName =  e.target.files[0].name;
            },this)
        },
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
        getEqupment_exeqrequiredDetail(){
            this.$http.get(this.$conf.env.getEqupment_exeqrequiredDetail + this.$route.query.equipmentID + '/').then( res =>{
                this.fileName = res.data.operation;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editEquipment_exbomInfoDetail(){
            if(!this.report){
                this.$message({ message: '请先上传文件', type: 'warning'});     
            }else{
                this.isLoading = true;
                this.$http.put(this.$conf.env.editEquipment_exbomInfoDetail + this.$route.query.equipmentID + '/',{'operation':  this.report}).then( res =>{
                    this.isLoading = false;
                    if(res.status == '200'){
                        this.$message({ message: '提交成功', type: 'success'});
                        setTimeout(()=>{
                            this.$router.back();
                        },100)
                    }else{
                        this.$message({ message: '提交失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.isLoading = false;
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                })
            }
           
        }
    },
    mounted(){
        this.getEqupment_exeqrequiredDetail()
    }
}
</script>
<style lang="scss">

.taskAllocation_distributed_methods{
    @import '../../../../../../style/LabManager/main.scss';
    @import '../../../../../../style/LabManager/updata.scss';
    padding-top: .54rem;
    height: calc(100% - .88rem);
    .mian_text{
        div{
            align-items: flex-start;
        }
        .el-select{
            margin-right: .48rem;
        }
        input{
            width: 3.3rem;
            height: .46rem;
        }
    }
    .file_box{
        flex-direction: initial!important;

        .file_title{
           margin-right: .4rem;
           margin-bottom: 0!important;
        }
    }
}
</style>
