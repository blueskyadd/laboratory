<template>
    <div class="upkeepProposer body_main">
        <header class="upkeepProposer_index_header">
            <h3>申请保养</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>设备名称：</span>
                    <p class="upkeepProposer_name">热了就发给配如果</p>
                    <span>设备编号：</span>
                    <p class="upkeepProposer_number">佛违法福建人发</p>
                </div>
                <div class="mian_text first_child">
                    <span>保养开始时间：</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span>保养截止时间：</span>
                    
                </div>
            </div>
            <footer>
                <el-button type="primary">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'upkeepProposer',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
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
        }
    }
}
</script>
<style lang="scss">
.upkeepProposer{
    
     padding-top: .42rem;
     overflow-y: scroll;
    .upkeepProposer_index_header{
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
        .upkeepProposer_name{
            width: 2.51rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .upkeepProposer_number{
            color: #07a695!important;
        }
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

            }
            
            .first_child{
                p{
                    color:#333;
                }
                .upkeepProposerName{
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
           
        }
        
        footer{
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:last-child{
                background: #08a695;
            }
        }
    }
}
.upkeepProposer::-webkit-scrollbar{
    display: none;
}
</style>