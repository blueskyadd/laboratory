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
        <div class="Search">
            <ul>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">试验类型</span>
                    <el-select v-model="value" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li style="margin-bottom:.24rem">
                    <span class="equipmentName">试验开始时间</span>
                    <el-date-picker
                        v-model="statusTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
        </div>
       <router-view></router-view> 
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'unMissionUnaccomplish', 
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索项目编号、名称',
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
        value: '',
        statusTime:'',
        CurrentChange: 0,
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
