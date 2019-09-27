<template>
    <div class="proposerWatch body_main" v-loading.fullscreen.lock="isLoading">
        <header class="proposerWatch_index_header">
            <h3>申请值班</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>申请值班开始时间：</span>
                    <el-date-picker
                        v-model="laboratorySection.start_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span><i class="importantData">*</i>值班结束时间：</span>
                    <el-date-picker
                        v-model="laboratorySection.end_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="mian_text first_child ">
                    <span><i class="importantData">*</i>值班地点：</span>
                    <el-select v-model="laboratorySection.location" placeholder="请选择值班地点">
                        <el-option
                        v-for="item in laboratoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                 <div class="mian_text textarea">
                    <span><i class="importantData">*</i>申请原因</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="laboratorySection.cause" placeholder="编辑申请原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{laboratorySection.cause.length}}/800</p>
                    </div>
                </div>
            </div>
            <footer v-if="!this.$route.query.equipmentID">
                <el-button type="primary" @click="createdApplywatch_onduty()">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../../components/VerificationData'
export default {
    name:'proposerWatch',
    inject:['reload'],
    data(){
        return{
            fileName: '指导书',
            laboratoryList: [],
            laboratorySection:{
                "location":'',
                "cause":'',
                "end_time":'',
                "start_time":''
            },
            isLoading: false
        }
    },
    methods:{
        /**@name实验室列表 */
        getlaboratoryList(){
            this.$http.get(this.$conf.env.getlaboratoryList).then( res =>{
                this.laboratoryList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 值班申请创建*/
        createdApplywatch_onduty(){
            if(!VerificationData.VerificationData(this.laboratorySection)) return;
            this.isLoading = true;
            this.$http.post(this.$conf.env.createdApplywatch_onduty, this.laboratorySection).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getApplywatch_ondutyDetail(){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getApplywatch_ondutyDetail + this.$route.query.equipmentID + '/').then( res =>{
                this.isLoading = false;
                res.data.start_time = res.data.start_time.split(' ')[0]+'T'+res.data.start_time.split(' ')[1]
                res.data.end_time = res.data.end_time.split(' ')[0]+'T'+res.data.end_time.split(' ')[1]
                this.laboratorySection = res.data;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response.data?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getlaboratoryList();
        if(this.$route.query.equipmentID){
            this.getApplywatch_ondutyDetail()
        }
    }
}
</script>
<style lang="scss">
.proposerWatch{
    
     padding-top: .42rem;
     overflow-y: scroll;
    .proposerWatch_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .38rem;
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
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        // .el-select{
        //         width: 4rem;
        //         height: .52rem;
        .el-input{
            width: auto !important;
            margin-right: .88rem;
        }
        .el-input__inner{
            height: .52rem; 
            width: 4rem;
            font-size: .2rem;
            font-weight: 200;
        }
            // }
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .68rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                textarea{
                    border:0;
                    width: 9.56rem;
                    height: 2.66rem;
                    font-size: .2rem;
                }
                textarea::placeholder{
                    color: #ccc;
                }
                
                textarea::-webkit-scrollbar{
                    width: .1rem;
                    height: .1rem;
                    background-color: #F5F5F5;
                }
                
                /*定义滚动条轨道 内阴影+圆角*/
                textarea::-webkit-scrollbar-track {
                    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #fff;
                }
                
                /*定义滑块 内阴影+圆角*/
                textarea::-webkit-scrollbar-thumb{
                    border-radius: .1rem;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: #ccc;
                }

            }
            .updata{
                display: flex;
                margin-top: .2rem;
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
                .proposerWatchName{
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
                margin-top: .46rem;
                height: auto;
                align-items: flex-start;
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
.proposerWatch::-webkit-scrollbar{
    display: none;
}
</style>