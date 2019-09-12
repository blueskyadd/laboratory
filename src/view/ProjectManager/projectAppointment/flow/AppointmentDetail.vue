<template>
    <div class="AppointmentDetail body_main">
        <header class="proposer_index_header">
            <h3>预约信息</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>物料名称：</span>
                    <p class="AppointmentDetailName">仍旧乳杆菌他</p>
                    <span>物料编号：</span>
                    <p style="color:#999999">仍旧乳杆菌他</p>
                </div>
                <div class="mian_text first_child">
                    <span>试验完成时间：</span>
                    <p class="AppointmentDetailName">仍旧乳杆菌他</p>
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
        <footer>
            <el-button type="primary">确认</el-button>
        </footer>
    </div>
</template>
<script>
export default {
    name:'AppointmentDetail',
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
.AppointmentDetail{
     padding-top: .42rem;
     overflow-y: scroll;
    .main{
        display: flex;
        height: calc(100% - 4.05rem);
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
                .AppointmentDetailName{
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
        footer{
            float: right;
            margin-right: 1.34rem;
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:last-child{
                background: #08a695;
            }
        }
}
.AppointmentDetail::-webkit-scrollbar{
    display: none;
}
</style>