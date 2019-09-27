<template>
    <div  class="body_main unMissionUnaccomplish_index">
        <!-- 公共头部 -->
        <header class="unMissionUnaccomplish_index_header">
            <h3>未完成任务</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="unMissionUnaccomplish_index_header_link">
                <router-link replace  to="/Testengineer/unMissionUnaccomplish/unMissionUnaccomplishTest" tag="span">试验</router-link>
                <router-link replace  to="/Testengineer/unMissionUnaccomplish/unMissionUnaccomplishProject" tag="span">项目</router-link>
            </div>
            <Search @searchDetail='searchDetail' class="unMissionUnaccomplish_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="Search" v-show="$route.path == '/Testengineer/unMissionUnaccomplish/unMissionUnaccomplishProject'">
            <ul>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">试验类型</span>
                    <el-select v-model="project_type" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in project_typeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchList">搜索</el-button>
                <el-button  @click="project_type = ''">重置</el-button>
            </div>
        </div>
       <router-view  ref='childer'></router-view> 
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'unMissionUnaccomplish', 
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索试验编号、名称',
            project_typeList:[
                {
                    name: 'DV试验',
                    id: 1
                },
                {
                    name: 'PV试验',
                    id: 2
                },
            ],
            project_type:''
        }
    },
    methods:{
        searchDetail(data){
            switch(this.$route.path){
            case '/Testengineer/unMissionUnaccomplish/unMissionUnaccomplishTest':
                this.$refs.childer.searchExperimental_myexperimentList(data,1)
                break;
            case '/Testengineer/unMissionUnaccomplish/unMissionUnaccomplishProject':
                this.$refs.childer.searchEquipment_myprojectList(data,1)
                break;
            }
        },
        searchList(){
            this.$refs.childer.searchTypeEquipment_myprojectList(this.project_type,1)
        }
    },
}
</script>
<style lang="scss" scoped> 
.unMissionUnaccomplish_index{
    padding-top: .42rem;
    .Search ul{
        margin-bottom: 0;
    }
    .editTableButton{
        margin-top: 0!important;
        border-bottom:0!important;
    }
    .unMissionUnaccomplish_index_header{
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
        .unMissionUnaccomplish_index_header_link{
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
        .unMissionUnaccomplish_header_Search{
            margin-left: 4.46rem;
            margin-bottom: -.03rem;
        }
    }
}
</style>
