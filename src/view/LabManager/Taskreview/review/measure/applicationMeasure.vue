<template>
    <div class="applicationMeasure body_main">
        <header class="applicationMeasure_index_header">
            <h3>申请计量</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                     <div>
                        <span>设备名称：</span>
                        <p>烟雾试验箱</p>
                    </div>
                    <div>
                        <span>设备编号：</span>
                        <p>NDOF923E2039</p>
                    </div>
                </div>
            <div class="mian_text two_child">
                <div>
                    <span>预约设备时间：</span>
                    <p>2012.02.12</p>
                </div>
                <div>
                    <span>计量开始时间：</span>
                    <p>2012.02.12</p>
                </div>
                <div>
                    <span>计量截止时间：</span>
                    <p>2012.02.12</p>
                </div>
            </div>
            <div class="mian_text textarea">
                <div>
                    <span>计量原因</span>
                    <div>
                        <textarea name="" v-model="cause" maxlength="800" placeholder="回零误差较大!" id="" cols="30" rows="10"></textarea>
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
    name:'applicationMeasure',
    data(){
        return{
            cause: '',
        }
    }
}
</script>
<style lang="scss" >
@import '../../../../../style/LabManager/main.scss';
.applicationMeasure{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationMeasure_index_header{
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
    
}
.applicationMeasure::-webkit-scrollbar{
    display: none;
}
</style>