<template>
    <div  class="body_main missionUnaccomplish_index">
        <!-- 公共头部 -->
        <header class="missionUnaccomplish_index_header">
            <h3>完成任务</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="missionUnaccomplish_index_header_link">
                <router-link replace  to="/Testengineer/missionUnaccomplish/test" tag="span">试验</router-link>
                <router-link replace  to="/Testengineer/missionUnaccomplish/project" tag="span">项目</router-link>
            </div>
            <Search @searchDetail='searchDetail' class="missionUnaccomplish_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
       <router-view ref="childer"></router-view> 
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'missionUnaccomplish', 
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索项目编号、名称',
            routerPath:''
        }
    },
    methods:{
        searchDetail(data){
            switch(this.routerPath){
                case '/Testengineer/missionUnaccomplish/test':
                    this.$refs.childer.searchEquipment_finishexperiment(data,1);//试验
                    break;
                case '/Testengineer/missionUnaccomplish/project':
                    this.$refs.childer.searchProject_finishprojectList(data,1);//项目
                    break;
            }
        }
    },
    mounted(){
        this.routerPath = this.$route.path;
        switch(this.routerPath){
            case '/Testengineer/missionUnaccomplish/test':
                this.placeholderTexe = '搜索试验编号、名称'
                break;
            case '/Testengineer/missionUnaccomplish/project':
                this.placeholderTexe = '搜索项目编号、名称'
                break;
        }
    },
     watch:{
        $route(to, from){
            this.routerPath = to.path;
            switch(to.path){
            case '/Testengineer/missionUnaccomplish/test':
                this.placeholderTexe = '搜索试验编号、名称'
                break;
            case '/Testengineer/missionUnaccomplish/project':
                this.placeholderTexe = '搜索项目编号、名称'
                break;
        }
        }
     }
}
</script>
<style lang="scss" scoped> 
.missionUnaccomplish_index{
    padding-top: .42rem;
    
    .missionUnaccomplish_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        
    margin-left: .19rem;
        align-items: flex-end;
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
        .missionUnaccomplish_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: 4.3rem;
            span:first-child{
                margin-right: 1.01rem;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .missionUnaccomplish_header_Search{
            margin-left: 4.46rem;
            margin-bottom: -.03rem;
        }
    }
}
</style>
