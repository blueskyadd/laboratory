<template>
    <div  class="body_main AlarmLog_index">
        <!-- 公共头部 -->
        <header class="AlarmLog_index_header">
            <h3>报警日志</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="AlarmLog_index_header_link">
                <router-link class="underline" replace :style="{color: $route.query.flag == 1 ? '#07a695' : '#999'}" to="/LaboratoryManager/AlarmLog?flag=1" tag="span">本日</router-link>
                <router-link class="underline" replace :style="{color: $route.query.flag == 2 ? '#07a695' : '#999'}" to="/LaboratoryManager/AlarmLog?flag=2" tag="span">本周</router-link>
                <router-link class="underline" replace :style="{color: $route.query.flag == 3 ? '#07a695' : '#999'}" to="/LaboratoryManager/AlarmLog?flag=3" tag="span">本月</router-link>
                <router-link class="underline" replace :style="{color: $route.query.flag == 4 ? '#07a695' : '#999'}" to="/LaboratoryManager/AlarmLog?flag=4" tag="span">本季</router-link>
                <router-link class="underline" replace :style="{color: $route.query.flag == 5 ? '#07a695' : '#999'}" to="/LaboratoryManager/AlarmLog?flag=5" tag="span">本年</router-link>
            </div>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>

        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
                <el-table-column prop="date" min-width="30%" label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" min-width="30%" label="设备名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" min-width="30%" label="设备负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" min-width="30%" label="报警原因" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="报警时间" header-align='left'  align='left'> </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'AlarmLog',
    components:{Search},
    data(){
        return{
            placeholderTexe:'搜索报告编号、名称',
             tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: ' 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上7 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海 1516 弄'
                }
            ],
            pageNumber: 1,
            perPage: 10
        }
    },
    methods:{
        searchDetail(data){
            console.log(data)
        },
         changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex == 4){
                return "color:#f34f50";
            }else{
                return "color:#444444";

            }
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        getIndex(index){
            return (this.pageNumber - 1) * this.perPage + index + 1
        },
        searchDetail(){

        },
    }
}
</script>
<style lang="scss">
.AlarmLog_index{
    padding-top: .42rem;
    
    .AlarmLog_index_header{
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
            margin-left: .24rem;

        }
        .AlarmLog_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: 6.56rem;
            span{
                margin-right: .38rem;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .AlarmLog_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        margin-top: .4rem;
        height: calc(100% - 4.5rem);
        th{
            font-size: .2rem;
            line-height: .48rem;
            padding: 0;
            font-weight: 400;
            .cell{
                line-height: .48rem;
            }
        }
        td{
            border: 0;
            padding: 0;
            font-size: .23rem;
             .cell{
                line-height: .67rem;
                span{
                    line-height: .67rem;
                }
            }
        }
    }
}
</style>
