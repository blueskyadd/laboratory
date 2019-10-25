<template>
    <div class="updataReport_detail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="updataReport_index_header">
            <h3>上传调试报告</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="updata main_text">
                <span class="projectupdataName">调试报告上传</span>
                <div class="file_box">
                    <input type="file" ref="file"  @change='updataReport' style="display:none" >
                    <div class="uploadFile">
                        <div ><span @click="updataReportChange"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                        <span class="accessory"><img src="../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                        <p>{{fileName}}</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="updataEquipment_applyReport()">提交</el-button>
            </footer>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'updataReport',
    data(){
        return{
            fileName: '点击上传调试报告',
            equipment_debug: '',
            isupload: false,
            isLoading:false
        }
    },
    methods:{
        updataReportChange(){
            this.$refs.file.click();
        },
        deleteFile(){
            this.fileName = '点击上传调试报告';
            this.equipment_debug = '';
        },
        updataReport(e){
            this.$updataFile.updataFile(e.target.files[0], res =>{
                this.equipment_debug = res.data.file;
                this.fileName =  e.target.files[0].name;
            },this)
        },
        updataEquipment_applyReport(){
            if(!this.equipment_debug){
                this.$message({ message: '请先上传文件', type: 'warning'});  
            }else{
                this.isLoading = true;
                this.$http.put(this.$conf.env.updataEquipment_applyReport + this.$route.query.equipmentID + '/' ,{'equipment_debug': this.equipment_debug}).then(res =>{
                   if(res.status == '200'){
                        this.$message({ message: '提交成功', type: 'success'});
                        setTimeout(()=>{
                            this.$router.back();
                        },100)
                    }else{
                        this.$message({ message: '提交失败', type: 'warning'});              
                    } 
                    this.isLoading = false;
                }).catch(err =>{
                    this.isLoading = false;
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                })
            }
        }
    }
}
</script>
<style lang="scss">
.updataReport_detail{
     padding-top: .42rem;
@import '../../../style/Testengineer/teskName.scss';
@import '../../../style/LabManager/updata.scss';
    .updataReport_index_header{
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
                margin-top: .3rem;
            }
            .uploadFile{
                margin-bottom: 4.3rem;
                display: flex;
                align-items: flex-start;
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
