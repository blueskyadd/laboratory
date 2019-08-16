<template>
    <div  class="body_main Taskreview_index">
        <!-- 公共头部 -->
        <header class="Taskreview_index_header">
            <h3>任务审核</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="Taskreview_index_header_link">
                <router-link replace  to="/Taskreview/report" tag="span">报告</router-link>
                <router-link replace  to="/Taskreview/measure" tag="span">计量</router-link>
                <router-link replace  to="/Taskreview/material" tag="span">物料</router-link>
                <router-link replace  to="/Taskreview/equipment" tag="span">设备</router-link>
                <router-link replace  to="/Taskreview/Watch" tag="span">值班</router-link>
                <router-link replace  to="/Taskreview/teskMethod" tag="span">试验方法</router-link>
                <router-link replace  to="/Taskreview/toolingApplication" tag="span">工装申请</router-link>
                <router-link replace  to="/Taskreview/infrastructure" tag="span">基础设施</router-link>
            </div>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
       <router-view></router-view> 
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'Taskreview',
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索报告编号、名称',
        }
    },
    methods:{
        searchDetail(data){
            console.log(data)
        }
    }
}
</script>
<style lang="scss" scoped>
.Taskreview_index{
    padding-top: .42rem;
    
    .Taskreview_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        
    margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .5rem;
       border-bottom: 1px solid #cccccc;
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
        .Taskreview_index_header_link{
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
        .Taskreview_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
}
</style>
