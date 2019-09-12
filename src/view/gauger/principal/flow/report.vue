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
                    <p class="reportName">填写设备名称</p>
                    <span>委托公司：</span>
                    <p>填写设备名称</p>
                </div>
                <div class="mian_text first_child">
                    <span>下次计量时间：</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
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
                <el-button type="primary">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'measureFlowReport',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            statusTime:''
        }
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