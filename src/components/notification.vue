<template>
    <div class="notification_index">
        <header class="proposer_index_header">
            <h3>消息通知</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main_list">
            <ul>
                <li>
                    <span class="head_portrait"><img src="http://img5.imgtn.bdimg.com/it/u=1200889471,2010793696&fm=26&gp=0.jpg" alt=""></span>
                    <div class="notification_content">
                        <div class="notification_header">
                            <span>系统消息</span><span>2018-08-26 15:12</span>
                        </div>
                        <div class="notification_content_text">
                            <p>您预约的东风柳汽项目振动试您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。您预约的东风柳汽项目振动试验已经完成！测试结果不合格。验已经完成！测试结果不合格。</p>
                            <div><span class="underline">点击查看</span><span  class="underline">删除</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'notification',
    data(){
        return{
        }
    },              
    methods:{
        
    }
}
</script>
<style lang="scss">
.notification_index{
    padding-top: .42rem;
    .proposer_index_header{padding-bottom: 0;}
    .main_list{
        ul{
            li{
                padding: .36rem .58rem .22rem;
                border-bottom: 1px solid rgba(191,191,191,1);
                display: flex;
               .head_portrait{
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                    overflow: hidden;
                    display: block;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                .notification_content{
                    padding: .23rem 0  0 .38rem;    
                    width: calc(100% - 2.29rem);
                    .notification_header{
                        display: flex;
                        span{
                            font-size:.24rem;
                            font-family:Microsoft YaHei;
                            color:rgba(153,153,153,1);
                            display: block;
                        }
                        span:first-child{
                            margin-right: .46rem;
                        }
                    }
                    .notification_content_text{
                        p{
                            font-size:.22rem;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            line-height: .43rem;
                            text-indent: .44rem;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                        }
                        div{
                            float: right;
                            display: flex;
                            span{
                                font-size: .22rem;
                            }
                            span:first-child{
                                margin-right: .45rem;
                            }
                            span:last-child{
                                color: #F20000;
                            }
                        }
                    }
                }
            }
        }
        
    }
   
}
</style>
