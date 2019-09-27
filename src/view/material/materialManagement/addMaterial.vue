<template>
    <div class="addMaterial body_main" v-loading.fullscreen.lock="isLoading">
        <header class="addMaterial_index_header">
            <h3>{{$route.query.materialID?'编辑物料':'新增物料'}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>物料名称：</span>
                    <input type="text" placeholder="填写物料名称" v-model="materiaSection.name">
                    <span class="margin_right"><i class="importantData">*</i>物料编号：</span>
                    <input type="text" placeholder="填写物料编号" v-model="materiaSection.nateriel_num">
                    <span class="margin_right"><i class="importantData">*</i>物料单价：</span>
                    <input type="number" placeholder="填写物料单价" v-model="materiaSection.unit_price">
                    <span class="right_unite">元</span>
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>物料数量：</span>
                    <input type="number" placeholder="填写物料数量" v-model="materiaSection.inventory">
                    <span class="margin_right"><i class="importantData">*</i>物料种类：</span>
                    <el-select v-model="materiaSection.device_type"  popper-class='principal_element' placeholder="选择物料种类">
                        <el-option
                        v-for="item in device_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>物料安全库存数：</span>
                    <input type="number" placeholder="填写物料安全库存数" v-model="materiaSection.safe_inventory">
                    <span class="margin_right"><i class="importantData">*</i>物料位置：</span>
                    <input type="text" placeholder="填写物料位置" v-model="materiaSection.location">
                    
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>物料单位：</span>
                    <input type="text" placeholder="填写物料单位" v-model="materiaSection.unit">
                    <span class="margin_right"><i class="importantData">*</i>物料周期：</span>
                    <input type="number" placeholder="填写物料周期" v-model="materiaSection.purchase_cycle">
                    <span class="right_unite">天</span>
                </div>
                <div class="main_list updata">
                    <span class="file_title"><i class="importantData">*</i>物料数据手册：</span>
                    <div class="file_box">
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <div><span @click="updataFileChange"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <span class="accessory" @click="updataFileChange"><img src="../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{materiaSection.image}}</p>
                        </div>
                        <span class="underline deleteFile" @click="deleteFile()">删除</span>
                    </div>
                </div>
                 
            </div>
            <footer>
                <el-button type="primary" @click="$route.query.materialID?editMateriaInfo():creactdMaterria()">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../components/VerificationData'
export default {
    name:'addMaterial',
    inject:['reload'],
    data(){
        return{
            fileName: '设备操作指导书',
            device_type: [{
                value: 1,
                label: '易损件'
                }, {
                value: 2,
                label: '原件'
                }],
            materiaSection:{
                "name":'',//名称
                "nateriel_num":'',//编号
                "location":'',//位置
                "device_type":'',//(1, '易损件'), (2, '原件')
                "inventory":'',//库存
                "safe_inventory":'',//安全库存
                "unit_price":'',//元   可以有连个
                "unit":'',//单位
                "purchase_cycle":'',//采购周期(天)
                "image":'',//物料数据手册
            },
            isLoading: false
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()
        },
        updataFile(e){
            this.isLoading = true;
            this.$updataFile.updataFile(e.target.files[0], res =>{
                this.materiaSection.image = res.data.file;
                this.isLoading = false;
                this.fileName =  e.target.files[0].name;
            },this)
            this.isLoading = false;
        },
        deleteFile(){
             this.fileName =  '设备操作指导书';
              this.materiaSection.image = '';
        },
        creactdMaterria(){
            if(!VerificationData.VerificationData(this.materiaSection)) return ;
            this.isLoading = true;
            this.$http.post(this.$conf.env.creactdMaterria,this.materiaSection).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back(-1);
                    },100)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '400'){
                    if(err.response.data.nateriel_num){
                        this.$message({ message: err.response.data.nateriel_num[0] , type: 'warning'});
                    }else if(err.response.data.purchase_cycle){
                         this.$message({ message: '采购周期请输入整数' , type: 'warning'});
                    }else if(err.response.data.inventory){
                         this.$message({ message: '物料数量请输入整数' , type: 'warning'});
                    }else if(err.response.data.safe_inventory){
                         this.$message({ message: '安全库存请输入整数' , type: 'warning'});
                    }else{
                        this.$message({ message: err.response.data, type: 'warning'});
                    }
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                }
            })
        },
        getMateriaDetail(){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getMateriaDetail + this.$route.query.materialID + '/').then(res =>{
                this.materiaSection = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        editMateriaInfo(){
            if(!VerificationData.VerificationData(this.materiaSection)) return ;
            this.isLoading = true;
            this.$http.put(this.$conf.env.editMateriaInfo + this.$route.query.materialID + '/',this.materiaSection).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                     this.reload();
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                if(err.response.status == '400'){
                    if(err.response.data.nateriel_num){
                        this.$message({ message: err.response.data.nateriel_num[0] , type: 'warning'});
                    }else if(err.response.data.purchase_cycle){
                         this.$message({ message: '采购周期请输入整数' , type: 'warning'});
                    }else if(err.response.data.inventory){
                         this.$message({ message: '物料数量请输入整数' , type: 'warning'});
                    }else if(err.response.data.safe_inventory){
                         this.$message({ message: '安全库存请输入整数' , type: 'warning'});
                    }else{
                        this.$message({ message: err.response.data, type: 'warning'});
                    }
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                }
            })
        },
    },
    mounted(){
        this.$route.query.materialID ? this.getMateriaDetail():''
    }
}
</script>
<style lang="scss" scoped>
.addMaterial{
     padding-top: .42rem;
     overflow-y: scroll;
    .addMaterial_index_header{
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
            .margin_right{
                margin-left: .98rem;
            }
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
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
                .addMaterialName{
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
    .right_unite{
        margin-left: .2rem;;
    }
}
.addMaterial::-webkit-scrollbar{
    display: none;
}
</style>