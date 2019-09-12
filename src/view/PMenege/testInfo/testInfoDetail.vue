<template>
    <div class="testInfoDetail body_main">
        <header class="testInfoDetail_index_header">
            <h3>试验详情</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text two_child">
                    <span>产品编号：</span>
                    <p class="testInfoDetail_name">烟雾试验箱</p>
                    <span>产品名称：</span>
                    <p>2012.02.12</p>
                </div>
                <div class="mian_text two_child ">
                    <span>项目编号：</span>
                    <p class="testInfoDetail_name">2012.02.12</p>
                    <span>项目名称：</span>
                    <p class="testInfoDetail_name">2012.02.12</p>
                    <span>负责人：</span>
                    <p>张丹</p>
                </div>
                <div class="mian_text two_child ">
                    <span>试验编号：</span>
                    <p class="testInfoDetail_name">2012.02.12</p>
                    <span>试验名称：</span>
                    <p class="testInfoDetail_name">2012.02.12</p>
                    <span>负责人：</span>
                    <p>张丹</p>
                </div>
                <div class="information">
                    <div class="information_list ">
                        <div class="mian_text two_child">
                            <span>名字：</span>
                            <p>信息</p>
                        </div>
                        <div class="mian_text two_child">
                            <span>名字：</span>
                            <p>信息</p>
                        </div>
                    </div>
                   <footer>
                       <span>我：</span>
                       <input type="text">
                       <el-button type="primary">发送</el-button>
                   </footer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'testInfoDetail',
    data(){
        return{
            cause: '',//申请原因
        }
    }
}
</script>
<style lang="scss" scoped>
.testInfoDetail{
     padding-top: .42rem;
     overflow-y: scroll;
    .testInfoDetail_index_header{
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
            .testInfoDetail_name{
                width: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .testInfoDetail_time{
                width: 2.5rem;
            }
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .5rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
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
            .information{
                border: 1px solid #333;
                height: 6.6rem;
                padding: 0.18rem .26rem 0;
                .information_list{
                    height: 85%;
                    .mian_text{
                        list-style: .46rem;
                    }
                }
                footer{
                    height: .84rem ;
                    display: flex;
                    align-items: center;
                    span{
                        font-size: .2rem;
                    }
                    input{
                        height: .3rem;
                        border: 1px solid #999;
                        margin-right: .64rem;
                        width: 13.86rem;
                    }
                    button{
                        font-size: .3rem;
                        padding: .12rem .24rem;
                        background: #08a695;
                    }
                }
            }
            
        }
        
    }
}
.testInfoDetail::-webkit-scrollbar{
    display: none;
}
</style>