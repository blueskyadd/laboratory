<template>
    <div class="updataReWire body_main" v-loading.fullscreen.lock="isLoading">
        <header class="updataReWire_index_header">
            <h3>申请设备</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>选择设备编号：</span>
                    <el-select v-model="equipmentSection.equipment" @change='changeEquipment' :disabled="$route.query.equipmentID" popper-class='principal_element' placeholder="选择设备编号">
                        <el-option
                        v-for="item in equipmentList"
                        :key="item.id"
                        :label="item.num"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <span style="margin-left:.98rem;"><i class="importantData">*</i>设备名称：</span>
                    <p>{{equipmentSection.name}}</p>
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>设备人员安全指导书名称：</span>
                    <input type="text" v-model="equipmentSection.safety" placeholder="填写设备操作指导书名称">
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>设备人员安全指导书编码：</span>
                    <input type="text" v-model="equipmentSection.safety_num"  placeholder="填写设备操作指导书编码">
                </div>
                <div class="main_list updata">
                    <span class="file_title"><i class="importantData">*</i>设备人员安全指导书上传：</span>
                    <div class="file_box">
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <div><span @click="updataFileChange"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <span class="accessory" @click="updataFileChange"><img src="../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{fileName}}</p>
                        </div>
                        <span class="underline deleteFile" @click="deleteFile()">删除</span>
                    </div>
                </div>
                 
            </div>
            <footer>
                <el-button type="primary" @click="$route.query.equipmentID?editEquipment_safetyInfo():createdEquipment_safetyInfo()">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../components/VerificationData'
export default {
    name:'updataReWire',
    inject:['reload'],
    data(){
        return{
            cause: '',//申请原因
            fileName: '点击上传设备人员安全指导书',
            equipmentList: [],
            equipmentSection:{
                "safety":'',
                "equipment":'',
                "safety_file":'',
                "safety_num":''
            },
            isLoading: false,
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click();
        },
        updataFile(e){
            this.$updataFile.updataFile(e.target.files[0], res =>{
                this.equipmentSection.safety_file = res.data.file;
                this.fileName = e.target.files[0].name;
            },this)
        },
        changeEquipment(){
            if(this.equipmentList.length > 0){
                this.equipmentList.forEach( Element =>{
                    if(Element.id == this.equipmentSection.equipment){
                        this.equipmentSection.name = Element.name;
                    }
                })
            }
        },
        deleteFile(){
            this.equipmentSection.safety_file = '';
            this.fileName = '点击上传设备人员安全指导书';
        },
        getEquipment_nosafetyList(){
            this.$http.get(this.$conf.env.getEquipment_nosafetyList).then(res =>{
                this.equipmentList = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        createdEquipment_safetyInfo(){
            if(!VerificationData.VerificationData(this.equipmentSection)) return;
            delete this.equipmentSection.name;
            this.isLoading = true;
            this.$http.post(this.$conf.env.createdEquipment_safetyInfo,this.equipmentSection).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
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
        },
        editEquipment_safetyInfo(){
            if(!VerificationData.VerificationData(this.equipmentSection)) return;
            delete this.equipmentSection.name;
            this.isLoading = true;
            this.$http.put(this.$conf.env.editEquipment_safetyInfo  + this.$route.query.equipmentID + '/',this.equipmentSection).then(res =>{
                this.isLoading = false;
                 if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },200)
                }else{
                    this.$message({ message: '修改成失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '400'){
                    this.$message({ message:err.response.data , type: 'warning'});   
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        },
        getPersonEquipment_safetyDetail(){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getPersonEquipment_safetyDetail + this.$route.query.equipmentID + '/').then(res =>{
                res.data.equipment = res.data.num;
                this.equipmentSection = res.data;
                this.fileName = res.data.safety_file;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '400'){
                    this.$message({ message:err.response.data , type: 'warning'});   
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                }
            })
        }
    },
    mounted(){
        this.getEquipment_nosafetyList();
        if(this.$route.query.equipmentID){
            this.getPersonEquipment_safetyDetail();
        }
    }
}
</script>
<style lang="scss" scoped>
.updataReWire{
     padding-top: .42rem;
     overflow-y: scroll;
    .updataReWire_index_header{
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
                align-items: flex-start;
                height: .9rem;
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
                .updataReWireName{
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
.updataReWire::-webkit-scrollbar{
    display: none;
}
</style>