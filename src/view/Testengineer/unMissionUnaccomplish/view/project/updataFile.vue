<template>
    <div class="updataFile_detail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="updataFile_index_header">
            <h3>上传项目文件</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="taskName">
                <span>项目名称：</span>
                <p class="ProjectName">{{$route.query.projectName}}</p>
                <span >公司-部门：</span>
                <p class="companyName">{{$route.query.equipmentLab}}-{{$route.query.equipmentDepartment}}</p>
            </div>
            <div class="first_child">
                <span><i class="importantData">*</i>项目结果：</span>
                <el-select v-model="fileSection.report_result" popper-class='principal_element' placeholder="选择项目结果">
                    <el-option
                    v-for="item in equipmentList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="updata main_text">
                <span class="projectupdataName"><i class="importantData">*</i>项目文件上传</span>
                <div class="file_box">
                    <input type="file" ref="file"  @change='updataFile' style="display:none" >
                    <div class="uploadFile">
                        <div ><span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                        <span class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                        <p>{{fileName}}</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="updataProject_myTestFile()">提交</el-button>
            </footer>
        </div>
        
    </div>
</template>
<script>
import VerificationData from '../../../../../components/VerificationData'
export default {
    name:'updataFile',
    data(){
        return{
            fileName: '',
            file:{},
            isupload: false,
            isLoading: false,
            fileSection:{
                "report":'',
                "report_result":''
            },
            equipmentList:[
                {
                    'name':'不合格',
                    'id':1
                },
                {
                    'name':'合格',
                    'id': 2
                }
            ]
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.$updataFile.updataFile(e.target.files[0], res =>{
                this.fileSection.report = res.data.file;
                this.fileName = e.target.files[0].name;
            },this)
        },
        deleteFile(){
            this.fileSection.report = '';
            this.fileName = '';
        },
        updataProject_myTestFile(){
            if(!VerificationData.VerificationData(this.fileSection)) return;
            this.isLoading = true;
            this.$http.put(this.$conf.env.updataProject_myTestFile + this.$route.query.equipmentID + '/',this.fileSection).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back();
                    },200)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '400'){
                    this.$message({ message:err.response.data , type: 'warning'});   
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        }
    }
}
</script>
<style lang="scss">
.updataFile_detail{
     padding-top: .42rem;
@import '../../../../../style/Testengineer/teskName.scss';
@import '../../../../../style/LabManager/updata.scss';
    .updataFile_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .4rem;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        // 公共span
        span{
            font-size: .23rem;
            cursor:pointer;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
        }
    }
    .main{
        height: calc(100% - 2.55rem);
        display: flex;
        flex-direction: column;
        padding:0  1.9rem .87rem 0.6rem;
        // justify-content: space-between;
        .taskName{
            margin:0;
            padding:0;
        }
        .main_text{
            display: flex;
            flex-direction: column;
            .projectupdataName{
                display: block;
                font-size: .23rem;
                margin-bottom: .4rem;
                margin-top: .63rem;
            }
            .uploadFile{
                margin-bottom: 3.2rem;
                display: flex;
                align-items:  flex-start;
                .accessory{
                    margin-left: .27rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    height: auto;
                    img{
                        margin-top: .21rem;
                    }
                    span{
                        height: auto;
                        margin-top: .13rem;
                        margin-left: 0;
                    }
                }
            }

        }
        .first_child{
            p{
                color:#333;
            }
            span{
                font-size: .26rem;
            }
        }
        footer{
            display: flex;
            justify-content: flex-end;
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:first-child{
                background: #f10000;
                border: 0;
            }
            button:last-child{
                background: #08a695;
            }
        }
    }
    
}
</style>
