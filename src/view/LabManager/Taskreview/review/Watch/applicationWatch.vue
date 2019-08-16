<template>
    <div class="applicationWatch body_main">
        <header class="applicationWatch_index_header">
            <h3>申请值班</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                     <div>
                        <span>员工名称：</span>
                        <p>烟雾试验箱</p>
                    </div>
                    <div>
                        <span>员工工号：</span>
                        <p>NDOF923E2039</p>
                    </div>
                </div>
            <div class="mian_text two_child">
                <div>
                    <span>值班开始时间：</span>
                    <p>2012.02.12</p>
                </div>
                <div>
                    <span>值班结束时间：</span>
                    <p>2012.02.12</p>
                </div>
                <div>
                    <span>值班地点：</span>
                    <p>2012.02.12</p>
                </div>
            </div>
            <div class="mian_text two_child">
                <div>
                    <span>值班地点：</span>
                    <p>2012.02.12</p>
                </div>
            </div>
            <div class="mian_text textarea">
                <div>
                    <span>申请原因</span>
                    <div>
                        <textarea name="" v-model="cause" maxlength="800" placeholder="今天任务有加多" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{cause.length}}/800</p>
                    </div>
                </div>
            </div>
                
            </div>
            <footer>
                <el-button type="primary">不同意</el-button>
                <el-button type="primary">审批</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'applicationWatch',
    data(){
        return{
            cause: '',
        }
    }
}
</script>
<style lang="scss" scoped>
.applicationWatch{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationWatch_index_header{
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
                    margin-right: .56rem;
                    p{
                        color:#999999;
                        width: 1.8rem;
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
.applicationWatch::-webkit-scrollbar{
    display: none;
}
</style>