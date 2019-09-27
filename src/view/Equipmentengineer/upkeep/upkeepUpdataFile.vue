<template>
    <div class="upkeepUpdataFile_detail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="upkeepUpdataFile_index_header">
            <h3>保养报告</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <div class="mian_text  ">
                        <span>设备名称：</span>
                        <p>{{upkeep_name}}</p>
                    </div>
                    <div class="mian_text ">
                        <span>设备编号：</span>
                        <p>{{upkeep_num}}</p>
                    </div>
                </div>
            </div>
            <div class="measure_main">
                <div class="mian_text first_child">
                    <div class="mian_text"  style=" align-items: center;">
                        <span><i class="importantData">*</i>下次保养时间：</span>
                        <el-date-picker
                            v-model="upkeep_section.next_upkeep_time"
                            type="date"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="updata main_text">
                <span class="projectupdataName"><i class="importantData">*</i>维修报告上传</span>
                <div class="file_box">
                    <input type="file" ref="file"  @change='upkeepUpdataFile' style="display:none" >
                    <div class="uploadFile">
                        <div ><span @click="upkeepUpdataFileChange"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                        <span class="accessory"><img src="../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                        <p>{{fileName}}</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="fanhui()">fanhu </el-button>

                <el-button type="primary" @click="updataUpkeep_report()">提交</el-button>
            </footer>
        </div>
        
    </div>
</template>
<script>
import VerificationData from '../../../components/VerificationData';
export default {
    name:'upkeepUpdataFile',
    data(){
        return{
            fileName: '点击上传保养报告',
            file:{},
            isupload: false,
            upkeep_name:'',
            upkeep_num:'',
            upkeep_section:{
                "next_upkeep_time":'',
                "report":'',
            },
            isLoading: true,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            }
        }
    },
    methods:{
        upkeepUpdataFileChange(){
            this.$refs.file.click()
        },
        upkeepUpdataFile(e){
            let _this = this;
             this.$updataFile.updataFile(e.target.files[0], res =>{
                _this.upkeep_section.report = res.data.file
                this.fileName =  e.target.files[0].name;
            },this)
        },
        deleteFile(){
            this.upkeep_section.report = '';
            this.fileName = '点击上传保养报告';
        },
        getEquipment_upkeepDetail(){
            this.$http.get(this.$conf.env.getEquipment_upkeepDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.isLoading = false;
                this.upkeep_name = res.data.name;
                this.upkeep_num = res.data.num;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        updataUpkeep_report(){
            if(!VerificationData.VerificationData(this.upkeep_section)) return;
            this.isLoading = true;
            this.$http.put(this.$conf.env.updataUpkeep_report + this.$route.query.equipmentID + '/', this.upkeep_section).then( res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '提交成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.replace({name:'upkeepEqupment'});
                    },100)
                }else{
                    this.$message({ message: '提交失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        fanhui(){
            this.$router.replace({name:'upkeepEqupment'});
        }
    },
    mounted(){
        this.getEquipment_upkeepDetail()
    }
}
</script>
<style lang="scss">
.upkeepUpdataFile_detail{
     padding-top: .42rem;
@import '../../../style/Testengineer/teskName.scss';
@import '../../../style/LabManager/updata.scss';
    .upkeepUpdataFile_index_header{
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
        .measure_main{
            
            width: 100%;
            display: flex;
            height: auto;
            .mian_text{
                
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .85rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                div:first-child{
                    p{
                        max-width: 7.77rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-right: .2rem;
                        color: #666666;
                    }
                }
                div:last-child{
                    padding: 0;
                    p{color: #07a695}
                }
               
            }
            .el-input__inner, input{
                height: .52rem; 
                width: 4rem;
                font-size: .2rem;
                font-weight: 200;
            }
            
            
        }
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
                align-items: flex-end;
                .accessory{
                    margin-left: .27rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    height: auto;
                    margin-bottom: -.3rem;
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
