<template>
    <div class="updataMeasure body_main">
        <header class="updataMeasure_index_header">
            <h3>上传计量合同</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="updataMeasure_mian">
                <div class="main_list">
                    <div><span>设备名称：</span><input placeholder="填写设备名称" type="text"></div>
                    <div><span>设备编码：</span><input placeholder="填写设备编码" type="text"></div>
                </div>
                <div class="main_list">
                    <div><span>委托公司：</span><input placeholder="填写委托公司" type="text"></div>
                    <div><span>负责人：</span><input placeholder="填写负责人" type="text"></div>
                </div>
                <div class="main_list">
                    <div><span>联系方式：</span><input placeholder="填写联系方式" type="text"></div>
                </div>
                <div class="main_list updata">
                    <div class="file_box">
                        <span class="file_title">计量合同上传</span>
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <div><span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <span class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{fileName}}</p>
                        </div>
                        <span class="underline deleteFile" @click="deleteFile()">删除</span>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" >提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'updataMeasure' ,
    data(){
        return{
            fileName: '',//文件名称
            file:{},
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        deleteFile(){
            this.file = {};
            this.fileName = '';
        }
    }
}
</script>
<style lang="scss" scoped>
.updataMeasure{
     padding-top: .42rem;
    .updataMeasure_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .92rem;
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
        padding:0  1.9rem .87rem .59rem;
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
         .updataMeasure_mian{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .main_list{
                display: flex;
                margin-bottom: .32rem;
                div{
                    display: flex;
                    margin-right: 1.45rem;
                    span{
                        font-size: .24rem;
                        color: #333;
                        width:1.32rem;
                    }
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
                }
            }
            .updata{
                .file_box{
                    flex-direction: column;
                    .file_title{
                        width: auto!important;
                        margin-bottom: .4rem;
                    }
                    div{
                        margin-right: 0.27rem;
                        align-items: flex-end;
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
                        img{
                            width: 100%;
                        }
                        margin-right: .27rem;
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
                    }
                    
                }
                
            }
         }
         footer{
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
                background: #08a695;
            }
        }
    }
}
</style>