<template>
    <div class="updataReWire body_main">
        <header class="updataReWire_index_header">
            <h3>申请设备</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>选择设备编号：</span>
                    <el-select v-model="principal"  popper-class='principal_element' placeholder="选择负责人">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="margin-left:.98rem;">选择设备编号：</span>
                    <p>为覅ii 而无法看</p>
                </div>
                <div class="mian_text first_child">
                    <span>设备操作指导书名称：</span>
                    <input type="text" placeholder="填写设备操作指导书名称">
                </div>
                <div class="mian_text first_child">
                    <span>设备操作指导书编码：</span>
                    <input type="text" placeholder="填写设备操作指导书编码">
                </div>
                <div class="main_list updata">
                    <span class="file_title">采购技术指导书：</span>
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
                <el-button type="primary">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'updataReWire',
    data(){
        return{
            cause: '',//申请原因
            fileName: '设备操作指导书',
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
            value: ''
        }
    },
    methods:{
        updataFileChange(){

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