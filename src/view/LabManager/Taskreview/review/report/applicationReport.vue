<template>
    <div class="applicationReport_detail body_main">
        <header class="applicationReport_index_header">
            <h3>申请报告</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <footer>
                <el-button type="primary" @click="$refs.popUp.dialogVisible = false">不同意</el-button>
                <el-button type="primary" @click="$refs.popUp.dialogVisible = false">审批</el-button>
            </footer>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'applicationReport' 
}
</script>
<style lang="scss" scoped>
.applicationReport_detail{
     padding-top: .42rem;
    .applicationReport_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .92rem;
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
        height: calc(100% - 2.55rem);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding:0  1.9rem .87rem 0;
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
</style>
