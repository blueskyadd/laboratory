<template>
    <div class="applicationInfrastructure body_main" v-loading.fullscreen.lock="isLoading">
        <header class="applicationInfrastructure_index_header">
            <h3>申请报修</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
            <div class="mian_text first_child">
                    <div>
                    <span>设施名称：</span>
                    <p>{{infrastructureSection.name}}</p>
                </div>
                <div>
                    <span>所属实验室：</span>
                    <p>{{infrastructureSection.room}}</p>
                </div>
            </div>
            <div class="mian_text textarea">
                <div>
                    <span>故障描述：</span>
                    <div class="disabled">
                        <textarea name="" disabled v-model="infrastructureSection.info" maxlength="800" placeholder="故障描述原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{infrastructureSection.info.length}}/800</p>
                    </div>
                </div>
            </div>
            <div class="mian_text first_child">
                <div>
                    <span>上传故障照片：</span>
                    <img v-for="(item, index) in infrastructureSection.image_list" :key="index" :src="item" alt="">
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'applicationInfrastructure',
    data(){
        return{
            infrastructureSection:{},
            isLoading: true,
        }
    },
    mounted(){
        this.getinfrastructureDetail()
    },
    methods:{
        getinfrastructureDetail(){
            this.$http.get(this.$conf.env.getinfrastructureDetail + this.$route.query.infrastructureID + '/').then(res =>{
                this.infrastructureSection = res.data
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
.applicationInfrastructure{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationInfrastructure_index_header{
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
                height: .7rem;
                div{
                    display: flex;
                    span{
                        font-size: .24rem;
                        color: #333333;
                    }
                    p{
                        font-size: .24rem;

                    }
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
            .first_child{
                div{
                    
                    p{
                        color:#999999;
                        width: 4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                div:first-child{
                    p{
                        color: #666666;
                    }
                }
                img{
                    width: 1.92rem;
                    border:1px dashed #eee;
                    height: 1.15rem;
                    margin-right: .2rem;
                }
            }
            .two_child{
                div{
                    margin-right: 1.22rem;
                    p{
                        color: #07a695;
                    }
                }
            }
            .textarea{
                margin-top: .45rem;
                height: auto;
                margin-bottom: .23rem;
                div{
                    div{
                        margin-left: .19rem;
                        position: relative;
                        border: 1px solid #cccccc;
                        padding: .16rem .3rem;
                        display: initial;
                    }
                }
                p{
                    color: #08a695;
                    position: absolute;
                    bottom: .1rem;
                    right: .2rem;
                }
            }
        }
    }
}
.applicationInfrastructure::-webkit-scrollbar{
    display: none;
}
</style>