<template>
    <div class="ediitMaterial body_main" v-loading.fullscreen.lock="isLoading">
        <header class="ediitMaterial_index_header">
            <h3>申请物料</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>物料编号：</span>
                    <input class="inputText disabled" disabled  v-model="MateriaDetail.nateriel_num" type="text" placeholder="填写物料编号">
                </div>
                <div class="mian_text first_child">
                    <span>物料名称：</span>
                    <p>{{MateriaDetail.name}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>物料数量：</span>
                    <input class="inputText" type="number" placeholder="填写物料数量" v-model="materialInventory">
                    <span>单位：</span>
                    <input class="inputText disabled" disabled  type="text" v-model="MateriaDetail.unit" placeholder="填写单位">
                </div>
                 <div class="mian_text textarea">
                    <span>申请原因</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="materialCause" placeholder="编辑申请原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{materialCause.length}}/800</p>
                    </div>
                </div>
            </div>
            <footer v-if="this.$route.query.flag">
                <el-button type="primary" @click="createdApplyMateria()">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'ediitMaterial',
    inject:['reload'],
    data(){
        return{
            fileName: '指导书',
            options: [],
            materialCause:'',
            materialInventory:'',
            MateriaDetail:{},
            isLoading: true,
        }
    },
    mounted(){
        this.$route.query.flag?this.getApplyMateriaDetail():this.getEquipmentMateriaDetail()
    },
    methods:{
        getApplyMateriaDetail(){
            this.$http.get(this.$conf.env.getApplyMateriaDetail + this.$route.query.materialID + '/').then(res =>{
                this.MateriaDetail = res.data;
                
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getEquipmentMateriaDetail(){
            this.$http.get(this.$conf.env.getEquipmentMateriaDetail + this.$route.query.materialID + '/').then(res =>{
                this.MateriaDetail = res.data;
                this.materialInventory = res.data.num;
                this.materialCause = res.data.num;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        createdApplyMateria(){
            let params ={
                "warehouse": this.$route.query.materialID,
                "num": this.materialInventory,
                "cause": this.materialCause
            }
            this.isLoading = true;
            this.$http.post(this.$conf.env.createdApplyMateria, params).then( res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '申请成功', type: 'success'});
                     this.reload();
                }else{
                    this.$message({ message: '申请失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    }
}
</script>
<style lang="scss">
.ediitMaterial{
    
     padding-top: .42rem;
     overflow-y: scroll;
    .ediitMaterial_index_header{
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
                .ediitMaterialName{
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
.ediitMaterial::-webkit-scrollbar{
    display: none;
}
</style>