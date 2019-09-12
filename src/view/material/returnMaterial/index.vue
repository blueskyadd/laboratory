<template>
    <div  class="body_main returnMaterial_index">
        <!-- 公共头部 -->
        <header class="returnMaterial_index_header">
            <h3>物料归还</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="returnMaterial_index_header_link">
                <router-link replace  to="/materialIndex/returnMaterial/returnTest" tag="span">试验物料</router-link>
                <router-link replace style="margin-right:5.2rem;" to="/materialIndex/returnMaterial/returnMaintain" tag="span">维修物料</router-link>
            </div>
            <Search @searchDetail='searchDetail' class="returnMaterial_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
       <router-view></router-view> 
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'returnMaterial',
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
.returnMaterial_index{
    padding-top: .42rem;
    
    .returnMaterial_index_header{
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
        .returnMaterial_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: 3.2rem;
            span{
                margin-right: .38rem;
                color: #999999;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .returnMaterial_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
}
</style>
