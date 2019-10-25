<template>
    <div class="applicationReport_detail body_main">
        <header class="applicationReport_index_header">
            <h3>申请报告</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
             <div class="measure_main">
                <div class="main_list updata">
                    <span class="file_title">工装文件:</span>
                    <div class="file_box">
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <span class="accessory" @click="updataFileChange"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <a class="underline" :href="fileUrl" download="工装文件">下载</a>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="editReportInfo(2)" class="primary_err">不同意</el-button>
                <el-button type="primary" @click="editReportInfo(3)">审批</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'applicationReport',
    data(){
        return{
            fileUrl:'',
        }
    },
    methods:{
        getReoprtDetail(){
            this.$http.get(this.$conf.env.getReoprtDetail+this.$route.query.reportID + '/').then(res =>{
                console.log(res)
                this.fileUrl = res.data.report
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name项目报告审核 */
        editReportInfo(num){
        this.$http.put(this.$conf.env.editReportInfo+this.$route.query.reportID + '/',{'result':num }).then(res =>{
            if(res.status == '200'){
                this.$message({ message: '审核成功', type: 'success'});
                    var _this = this;
                    setTimeout(()=>{
                        _this.$router.back();
                    },1000)
            }else{
                this.$message({ message: '审核失败', type: 'warning'});              
            }
        }).catch(err =>{
            this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
        })
            
        },
        updataFileChange(){

        },
        updataFile(){

        }
    },
    mounted(){
        this.getReoprtDetail()
    }
}
</script>
<style lang="scss" scoped>
.applicationReport_detail{
     padding-top: .42rem;
    .applicationReport_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .32rem;
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
        height: calc(100% - 1.55rem);
        display: flex;
        padding:0  1.9rem .87rem .55rem;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        footer{
            align-self: flex-end;
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
    .updata{
                display: flex;
                margin-top: .64rem;
                .file_title{
                    width: auto!important;
                    margin-bottom: .4rem;
                    font-size: .24rem;
                    color: #333333;
                    margin-right: .26rem;
                }
                .file_box{
                    flex-direction: column;
                    
                    div{
                        margin-right: 0.27rem;
                        align-items: flex-end;
                        display: flex;
                        div{
                        width: .8rem;
                        height: .8rem;
                        border:1px dashed #08a695;
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            width: 50%;
                            height: 50%;
                            cursor: pointer;
                            display: block;
                            display: flex;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        }
                    }
                    .accessory{
                        width: .65rem;
                        height: .6rem;
                        display: flex;
                        margin-right: .12rem;
                        img{
                            width: 100%;
                        }
                    }
                    a{
                        margin-top: .6rem;
                        font-size: .24rem;
                    }
                    .deleteFile{
                        color: #f20000;
                        margin-left: 1.06rem;
                        line-height: .23rem;
                        margin-top: .13rem;
                        font-size: .23rem;
                        display: block;
                    }
                    
                }
                
            }
}
</style>
