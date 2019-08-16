<template>
    <div class="upTestdata_detail body_main">
        <header class="upTestdata_index_header">
            <h3>上传项目文件</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="taskName">
                <span>项目名称：</span>
                <p class="ProjectName">控福控福智能控福智能智能-硬件部</p>
                <span >委托公司部门：</span>
                <p class="companyName">控福控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能智能-硬件部</p>
            </div>
            <div class="updata main_text">
                <span class="projectupdataName">项目文件上传</span>
                <div class="file_box">
                    <input type="file" ref="file"  @change='updataFile' style="display:none" >
                    <div class="uploadFile">
                        <div ><span @click="updataFileChange"><img src="../../../../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                        <span class="accessory"><img src="../../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                        
                        <p>{{fileName}}</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="$refs.popUp.dialogVisible = false">提交</el-button>
            </footer>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'upTestdata',
    data(){
        return{
            fileName: '',
            file:{},
            isupload: false,
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        deleteFile(){
            this.file = {};
            this.fileName = '';
        }
    }
}
</script>
<style lang="scss">
.upTestdata_detail{
@import '../../../../../../style/Testengineer/teskName.scss';
@import '../../../../../../style/LabManager/updata.scss';
     padding-top: .42rem;
    .upTestdata_index_header{
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
                margin-bottom: 4.3rem;
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
