<template>
    <div class="projectInccur body_main" v-loading.fullscreen.lock="isLoading">
        <header class="projectInccur_index_header">
            <h3>{{projectDetail.name}}</h3>
            <span class="goBack underline"  @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome()">首页</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text two_child">
                    <span>申请人：</span>
                    <p class="projectInccur_name">{{projectDetail.apply}}</p>
                    <!-- <span>审批人：</span>
                    <p>2012.02.12</p> -->
                </div>
                <div class="mian_text textarea">
                    <span>备注</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="projectDetail.intro" placeholder="填写申请原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{projectDetail.intro.length}}/800</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'projectInccur',
    data(){
        return{
            isLoading: false,
            projectDetail: {}
        }
    },
    methods:{
        goHome(){
            this.$router.push({path:'/LaboratoryManager/PMenegeIndex'})
        },
        getPm_project_exexpendDetail(){
            this.$http.get(this.$conf.env.getPm_project_exexpendDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.projectDetail = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getPm_project_exexpendDetail();
    }
}
</script>
<style lang="scss" scoped>
.projectInccur{
     padding-top: .42rem;
     overflow-y: scroll;
    .projectInccur_index_header{
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
            .projectInccur_name{
                width: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .projectInccur_time{
                width: 2.5rem;
            }
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
            .first_child{
                p{
                    color:#333;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
            .textarea{
                margin-top: .05rem;
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
.projectInccur::-webkit-scrollbar{
    display: none;
}
</style>