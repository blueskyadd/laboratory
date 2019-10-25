<template>
    <div  class="body_main management_index">
        <!-- 公共头部 -->
        <header class="management_index_header">
            <h3>管理事项</h3>
            <span class="goBack underline"  @click="$router.back(-1)">返回</span>
            <div class="management_index_header_link">
                <router-link replace  to="/management/personnelManagement" tag="span">人员管理</router-link>
                <router-link replace  to="/management/equipmentManagement" tag="span">设备管理</router-link>
                <router-link replace  to="/management/materialManagement" tag="span">物料管理</router-link>
                <router-link replace  to="/management/testManagement" tag="span">试验标准</router-link>
                <router-link replace  to="/management/methodsManagement" tag="span">试验方法</router-link>
                <router-link replace  to="/management/historyManagement" tag="span">历史项目</router-link>
                <router-link replace  to="/management/frockManagement" tag="span">工装管理</router-link>
            </div>
            
            <Search class="management_header_Search"  ref="search"  @searchDetail='searchDetail' :placeholderTexe = 'placeholderTexe'/>
        </header>
       <router-view ref='childer' @searchresolt = 'searchresolt'></router-view> 
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'management',
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索报告编号、名称',
            routerPath:''
        }
    },
    methods:{
        searchDetail(data){
            switch(this.routerPath){
                case '/management/personnelManagement':
                    this.$refs.childer.personnelSearch(data,1);//物料管理
                    break;
                case '/management/equipmentManagement':
                    this.$refs.childer.equipmentSearch(data,1);//物料管理
                    break;
                case '/management/materialManagement':
                    this.$refs.childer.materialSearch(data,1);//物料管理
                    break; 
                case '/management/testManagement':
                    this.$refs.childer.testManageSearch(data,1);//试验标准
                    break;
                case '/management/methodsManagement':
                    this.$refs.childer.testMethodsSearch(data,1);//试验方法
                    break;
                case '/management/historyManagement':
                    this.$refs.childer.historySearch(data,1);//历史
                    break;
                case '/management/frockManagement':
                    this.$refs.childer.frockSearch(data,1);//工装
                    break;
                
            }
        },
        searchresolt(){
            this.$refs.search.result();
        }
    },
    mounted(){
        this.routerPath = this.$route.path;
        switch(this.$route.path){
            case '/management/personnelManagement':
                this.placeholderTexe = '搜索工号、姓名'
                break;
            case '/management/equipmentManagement':
                this.placeholderTexe = '搜索设备编号、名称'
                break;
            case '/management/materialManagement':
                this.placeholderTexe = '搜索物料编号、名称'
                break;
            case '/management/testManagement':
                this.placeholderTexe = '搜索标准名称、编号'
                break;
            case '/management/methodsManagement':
                this.placeholderTexe = '搜索试验方法名称、编号'
                break;
            case '/management/historyManagement':
                this.placeholderTexe = '搜索项目编号、名称'
                break;
            case '/management/frockManagement':
                this.placeholderTexe = '搜索工装编号、名称'
                break;
            }
    },
    watch:{
        $route(to, from){
            this.routerPath = to.path;
            switch(to.path){
                case '/management/personnelManagement':
                    this.placeholderTexe = '搜索工号、姓名'
                    break;
                case '/management/equipmentManagement':
                    this.placeholderTexe = '搜索设备编号、名称'
                    break;
                case '/management/materialManagement':
                    this.placeholderTexe = '搜索物料名称、编号'
                    break;
                case '/management/testManagement':
                    this.placeholderTexe = '搜索标准名称、编号'
                    break;
                case '/management/methodsManagement':
                    this.placeholderTexe = '搜索试验方法名称、编号'
                    break;
                case '/management/historyManagement':
                    this.placeholderTexe = '搜索项目编号、名称'
                    break;
                case '/management/frockManagement':
                    this.placeholderTexe = '搜索工装编号、名称'
                    break;
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.management_index{
    padding-top: .42rem;
    
    .management_index_header{
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
        .management_index_header_link{
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
