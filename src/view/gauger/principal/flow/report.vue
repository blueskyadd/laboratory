<template>
    <div class="measureFlowReport body_main">
        <header class="proposer_index_header">
            <h3>计量报告</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>设备名称：</span>
                    <p class="reportName">{{meteringDetail.name}}</p>
                    <span>委托公司：</span>
                    <p>{{meteringDetail.nominee_company}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>下次计量时间：</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        placeholder="下次计量时间">
                    </el-date-picker>
                </div>
                <div class="main_list updata">
                    <span class="file_title">报告上传：</span>
                    <div class="file_box">
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <div><span @click="updataFileChange"><img src="../../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <span class="accessory" @click="updataFileChange"><img src="../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{fileName}}</p>
                        </div>
                        <!-- <span class="underline deleteFile" @click="deleteFile()">删除</span> -->
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="createdGuager_metering()">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../../components/VerificationData';
export default {
    name:'measureFlowReport',
    inject:['reload'],
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            statusTime:'',
            meteringDetail:{
                "report":'',
                "next_upkeep_time":'',
                "name":'',
                "nominee_company":''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            }
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click();
        },
        updataFile(e){
            this.$updataFile.updataFile(e.target.files[0], res =>{
                this.meteringDetail.report = res.data.file;
                this.fileName = e.target.files[0].name;
            },this)
        },
        createdGuager_metering(){
            console.log(this.meteringDetail)
            this.meteringDetail.next_upkeep_time = this.statusTime;
            delete  this.meteringDetail.name;
            delete this.meteringDetail.nominee_company;
            if(!VerificationData.VerificationData(this.meteringDetail)) return;
            this.isLoading = true;
            this.$http.put(this.$conf.env.createdGuager_metering  +this.$route.query.equipmentID +'/', this.meteringDetail).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.$router.back();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'}); 
                    this.reload();             
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                this.reload();
            })
        },
        getGuager_meteringDetail(){
            this.$http.get(this.$conf.env.getGuager_meteringDetail +this.$route.query.equipmentID +'/' ).then(res =>{
                this.meteringDetail.name = res.data.name ;
                this.meteringDetail.nominee_company = res.data.nominee_company;
                this.statusTime = res.data.next_upkeep_time ? res.data.next_upkeep_time:'';
                console.log(this.statusTime)
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getGuager_meteringDetail();
    }
}
</script>
<style lang="scss" scoped>
.measureFlowReport{
     padding-top: .42rem;
     overflow-y: scroll;
    .main{
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .68rem;
                input{
                    width: 3rem;
                    height: .48rem;
                    font-size: .22rem;
                    border:1px solid #cccccc;
                    padding: 0 .15rem;
                    font-weight: 200;
                }
                input::placeholder{
                    color: #989898;
                } 
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }

            }
            .updata{
                display: flex;
                margin-top: .2rem;
                flex-direction: column;
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
                    p{
                        font-size: .22rem;
                        color: #666666;
                        margin-top: .6rem;
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
            .first_child{
                p{
                    color:#333;
                }
                .reportName{
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
            .textarea{
                height: auto;
                div{
                    margin-left: .19rem;
                    position: relative;
                    border: 1px solid #cccccc;
                    padding: .16rem .3rem;
                }
                p{
                    color: #08a695;
                    position: absolute;
                    bottom: .1rem;
                    right: .2rem;
                }
            }
            
        }
        
        footer{
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
.report::-webkit-scrollbar{
    display: none;
}
</style>