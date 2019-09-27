<template>
    <div  class="body_main informationPublish_index">
        <!-- 公共头部 -->
        <header class="informationPublish_index_header">
            <h3>信息发布</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="informationPublish_index_header_link">
                <router-link replace  to="/informationPublish/announcement" tag="span">实验室公告</router-link>
                <router-link replace  to="/informationPublish/abilityIntroduce" tag="span">实验室能力介绍</router-link>
                <router-link replace  to="/informationPublish/equipmentImg" tag="span">实验室设备图片</router-link>
            </div>
        </header>
       <router-view ref='childer' ></router-view> 
    </div>
</template>
<script>
export default {
    name:'informationPublish',
    data(){
        return{
            routerPath:''
        }
    },
    methods:{
       
    },
    mounted(){
        
    },
    
}
</script>
<style lang="scss" scoped>
.informationPublish_index{
    padding-top: .42rem;
    
    .informationPublish_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        // padding-bottom: .5rem;
    //    border-bottom: 1px solid #cccccc;
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
        .informationPublish_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: 1.6rem;
            span{
                margin-right: .38rem;
                color: #999999;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .management_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
}
</style>
