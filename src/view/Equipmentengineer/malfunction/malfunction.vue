<template>
    <div  class="body_main malfunction_index">
        <!-- 公共头部 -->
        <header class="malfunction_index_header">
            <h3>故障设备管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date" label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="实验室" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="报修人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date" label="上传时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="设备状态"  fixed='right'   header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">维修中</span></template>
                </el-table-column>
                <el-table-column prop="address" fixed='right' label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span> </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script> 
import Search from "../../../components/common/search";
export default {
    name:'malfunction',
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
            placeholderTexe: '搜索设备编号、名称'
        }
    },
    methods:{
        searchDetail(data){
            console.log(data)
        },
         changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
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
        searchDetail(){

        },
        allocation(){
            this.$router.push({name:'malfunctionFlow'})
        }
    }
}
</script>
<style lang="scss">
.malfunction_index{
    padding-top: .42rem;
    
    .malfunction_index_header{
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
            margin-right: 9.32rem;
        }
       
        .malfunction_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: .4rem;
            span{
                margin-right: .38rem;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .malfunction_header_Search{
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
