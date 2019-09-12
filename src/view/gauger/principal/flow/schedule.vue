<template>
    <div class="schedule body_main">
        <header class="proposer_index_header">
            <h3>计量进度</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>物料名称：</span>
                    <p class="scheduleName">仍旧乳杆菌他</p>
                    <span>物料编号：</span>
                    <p style="color:#999999">仍旧乳杆菌他</p>
                </div>
                <div class="mian_text first_child">
                    <span>委托公司：</span>
                    <p class="scheduleName">仍旧乳杆菌他</p>
                    <span>委托公司地址：</span>
                    <p style="color:#666666">仍旧乳杆菌他</p>
                </div>
                <div class="mian_text first_child">
                    <span>委外负责人：</span>
                    <p>仍旧乳杆菌他</p>
                </div>
                <div class="mian_text first_child two_child">
                    <span>联系方式：</span>
                    <p>仍旧乳杆菌他</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'schedule',
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
.schedule{
     padding-top: .42rem;
     overflow-y: scroll;
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
               
            }
           
            .first_child{
                p{
                    color:#333;
                }
                .scheduleName{
                    width: 2.6rem;
                    color: #666;
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
    }
}
.schedule::-webkit-scrollbar{
    display: none;
}
</style>