<template>
    <div class="InfrastructurePropose body_main" v-loading.fullscreen.lock="isLoading">
        <header class="proposeFeock_index_header">
            <h3>申请报修</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>设施名称：</span>
                    <input type="text" placeholder="填写设施名称" v-model="equipmentSection.name">
                    <span style="margin-left:.7rem"><i class="importantData">*</i>所属实验室：</span>
                    <el-select v-model="equipmentSection.room"  popper-class='principal_element' placeholder="选择所属实验室">
                        <el-option
                        v-for="item in laboratoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="mian_text textarea">
                    <span><i class="importantData">*</i>故障描述：</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="equipmentSection.info" placeholder="描述故障描述原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{equipmentSection.info.length}}/800</p>
                    </div>
                </div>
                <div class="main_list updata">
                    <span class="file_title"><i class="importantData">*</i>上传故障照片：</span>
                    <div class="file_box">
                        <input type="file" ref="file" accept="image/*" @change='updataFile' style="display:none" >
                        <div>
                            <div @click="updataFileChange"><span ><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <div class="upload_img">
                                <div v-for="(item, index) in image_list" :key="index" @mouseover="item.flag = true" @mouseout="item.flag = false">
                                    <img  :src="item.url" alt="" >
                                    <span v-show="item.flag" @click="deleteImg(index)">删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 
            </div>
            <footer>
                <el-button type="primary" @click="createdEquipment_servicerecord()">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../components/VerificationData'
export default {
    name:'InfrastructurePropose',
    inject:['reload'],
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            laboratoryList: [],
            equipmentSection: {
                "name":'',
                "room":'',
                "info":'',
                "image_list": [],
            },
            image_list:[{
                'url':'http://pic68.nipic.com/file/20150601/8164280_104301508000_2.jpg',
                flag:true
            }],
            isLoading: false,
        }
    },
    mounted(){
        this.getlaboratoryList()
    },
    methods:{
         updataFileChange(){
            this.$refs.file.click();
        },
        deleteImg(index){
            this.image_list.splice(index, 1)
        },
        updataFile(e){
            if(this.image_list.length == 10){
                 this.$message({ message:'最多上传十张故障照片' , type: 'warning'});
            }else{
                this.$updataFile.updataFile(e.target.files[0], res =>{
                    var obj ={
                        'url':res.data.file,
                        'flag': false,
                    }
                    this.image_list.push(obj);
                    this.fileName = e.target.files[0].name;
                },this)
            }
        },
        /**@name实验室列表 */
        getlaboratoryList(){
            this.$http.get(this.$conf.env.getlaboratoryList).then( res =>{
                this.laboratoryList = res.data
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        createdEquipment_servicerecord(){
            if(this.image_list.length > 0){
                this.image_list.forEach( Element =>{
                   this.equipmentSection.image_list.push(Element.url)
                })
                if(!VerificationData.VerificationData(this.equipmentSection)) return;
                    this.isLoading = true;
                    this.$http.post(this.$conf.env.createdEquipment_servicerecord,this.equipmentSection).then(res =>{
                    this.isLoading = false;
                    if(res.status == '201'){
                        this.$message({ message: '申请成功', type: 'success'});
                        setTimeout(()=>{
                            this.reload();
                        },200)
                    }else{
                        this.$message({ message: '申请失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.isLoading = false;
                    if(err.response.status == '400'){
                        this.$message({ message:err.response.data , type: 'warning'});   
                    }else{
                        this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                    }
                })
            }else{
                this.$message({ message:'*为必填项哦' , type: 'warning'});
            }


        }
    }
}
</script>
<style lang="scss" scoped>
.InfrastructurePropose{
     padding-top: .42rem;
     overflow-y: scroll;
    .proposeFeock_index_header{
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
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .72rem;
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
                }
                .upload_img{
                    border: 0!important;
                    width: 85%!important;
                    height:auto!important;
                    margin-right: 0!important;
                    display: flex;
                    flex-wrap:wrap;
                    justify-content: flex-start!important;
                    div{
                        width: 2rem!important;
                        border: 1px dashed #eee!important;
                        height: 1rem!important;
                        margin-right: .1rem!important;
                        margin-bottom: .1rem!important;
                        overflow: hidden;
                        position: relative;
                        img{
                            width: 100%;
                        }
                        span{
                            position: absolute;
                            width: 100% !important;
                            height: 100%!important;
                            background: rgba(0,0,0,.5);
                            font-size: .22rem;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
                .file_box{
                    flex-direction: column;
                    width: 80%;
                    div{
                        margin-right: 0.27rem;
                        align-items: flex-end;
                        display: flex;
                        align-items: flex-start;
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
                .proposeFeockName{
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
                align-items: flex-start;
                div{
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
.InfrastructurePropose::-webkit-scrollbar{
    display: none;
}
</style>