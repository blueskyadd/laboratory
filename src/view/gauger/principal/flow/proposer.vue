<template>
    <div class="proposer body_main"  v-loading.fullscreen.lock="isLoading">
        <header class="proposer_index_header">
            <h3>申请计量</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>物料名称：</span>
                    <p class="proposerName">{{meteringDetail.name}}</p>
                    <span>物料编号：</span>
                    <p>{{meteringDetail.num}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>计量开始时间：</span>
                    <el-date-picker
                        v-model="meteringDetailStart_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="计量开始时间">
                    </el-date-picker>
                    <span>计量截止时间：</span>
                    <el-date-picker
                        v-model="meteringDetailEnd_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="计量截止时间">
                    </el-date-picker>
                </div>
                 <div class="mian_text textarea">
                    <span>计量原因</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="meteringDetail.cause" placeholder="编辑申请原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{meteringDetail.cause.length}}/800</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="createdGuager_metering">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../../components/VerificationData';
export default {
    name:'proposer',
    inject:['reload'],
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            meteringDetail:{},
            isLoading: true,
            meteringDetailStart_time:'',
            meteringDetailEnd_time:'',
        }
    },
    mounted(){
        this.getGuager_meteringDetail()
    },
    methods:{
        createdGuager_metering(){
            this.meteringDetail.end_time = this.meteringDetailEnd_time;
            this.meteringDetail.start_time = this.meteringDetailStart_time;
            if(!VerificationData.VerificationData(this.meteringDetail)) return;
            delete  this.meteringDetail.name;
            delete this.meteringDetail.num;
            this.isLoading = true;
            this.$http.post(this.$conf.env.createdGuager_metering, this.meteringDetail).then(res =>{
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
                this.meteringDetail.id = res.data.id;
                this.meteringDetail.name = res.data.name;
                this.meteringDetail.num = res.data.num;
                this.meteringDetailStart_time =res.data.start_time? res.data.start_time.split(' ')[0]+'T'+res.data.start_time.split(' ')[1]+':00':'';
                this.meteringDetailEnd_time = res.data.end_time?res.data.end_time.split(' ')[0]+'T'+res.data.end_time.split(' ')[1]+':00':'';
                this.meteringDetail.cause = res.data.cause;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                console.log(err)
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss">
.proposer{
     padding-top: .42rem;
     overflow-y: scroll;
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
        .inputText{
            border: 1px solid #ccc;
            margin-right: .88rem;
            padding: 0 .15rem;
            width: 3.7rem;
        }
        .el-input__inner, input{
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
                .proposerName{
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
.proposer::-webkit-scrollbar{
    display: none;
}
</style>