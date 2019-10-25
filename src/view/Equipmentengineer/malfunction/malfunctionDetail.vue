<template>
    <div class="malfunctionDetail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="malfunctionDetail_index_header">
            <h3>报修详情</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>设备名称：</span>
                    <p class="malfunctionDetail_name">{{equipmentDection.name}}</p>
                    <span>设备编号：</span>
                    <p style="color:#08a695;">{{equipmentDection.num}}</p>
                </div>
                <div class="mian_text first_child ">
                    <span>设备所属实验室：</span>
                    <p>{{equipmentDection.room}}</p>
                </div>
                <div class="main_list updata">
                    <span class="file_title">上传图片:</span>
                    <div class="file_box">
                        <div>
                            <img :src="equipmentDection.image" alt="" class="upload_img">
                        </div>
                    </div>
                </div>
                <p class="malfunctionDetail_text">故障现象:{{equipmentDection.cause}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'malfunctionDetail',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            equipmentDection:{},
            isLoading: true,
        }
    },
    mounted(){
        this.getEquipment_maintainDetail()
    },
    methods:{
        getEquipment_maintainDetail(){
            this.$http.get(this.$conf.env.getEquipment_maintainDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.equipmentDection = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.malfunctionDetail{
     padding-top: .42rem;
     overflow-y: scroll;
     height: 100% ;
    .malfunctionDetail_index_header{
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
        // height: 100%;
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
                height: .85rem;
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
                        width: 3rem;
                        height: 1.87rem;
                        img{
                            width: 100%;
                            height: 100%;
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
                .malfunctionDetail_name{
                    width: 1.91rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p{
                    color:#333;
                }
            }
            .malfunctionDetail_text{
                font-family:MicrosoftYaHei;
                padding-top: .66rem;
                font-weight:400;
                color:rgba(51,51,51,1);
                font-size: .24rem;
                padding-bottom: .5rem;
            }
            
        }
    }
}
.malfunctionDetail::-webkit-scrollbar{
    display: none;
}
</style>