<template>
    <div  class="body_main malfunctionChange_index">
        <!-- 公共头部 -->
        <header class="malfunctionChange_index_header">
            <h3>工具物料申请</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="malfunctionChange_index_header_link">
                <span class="underline" @click="addMalfunction()">添加物料</span>
            </div>
        </header>
         <div class="taskName">
            <span>委托公司部门：</span>
            <p class="itemName">控福智能-硬件部</p>
            <span>设备编号：</span>
            <p>控福智能-硬件部</p>
        </div>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date"  label="物料名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="物料数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="物料种类" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="物料编号" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="状态"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">已申请</span></template>
                </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">编辑</span><span class="underline"  @click="allocation(scoped)">删除</span> </template>
                </el-table-column>
            </el-table>
        </div>
        <footer>
            <el-button type="primary">提交</el-button>
        </footer>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span>物料名称：</span>
                        <el-select v-model="value" v-if="isUpslot" placeholder="请选择设备编号">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <input type="text" v-else placeholder="请填写设备编号">
                    </li>
                    <li>
                        <span>物料数量：</span>
                        <p v-if="isUpslot"></p>
                        <input v-else  type="text" placeholder="填写设备名称">
                    </li>
                    <li>
                        <span>物料种类：</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary">完成</el-button></li>
                </ul>
                
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../components/common/popUp';
export default {
    name:'malfunctionChange',
    components:{popUp},
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
            popUptitle: '新增物料',
            isUpslot: false,
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
        addMalfunction(){
            this.$refs.popUp.dialogVisible = true;
        }
    }
}
</script>
<style lang="scss">
.malfunctionChange_index{
    padding-top: .42rem;
    
    .malfunctionChange_index_header{
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
        .malfunctionChange_index_header_link{
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
        .malfunctionChange_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
     .taskName{
        margin-left: .19rem;
        margin-bottom: .28rem;
        padding-left: .41rem;
        display: flex;
        font-size: .25rem;
        color: #666;
        padding-top: .34rem;
        span{
            color: #333;
        }
        .itemName{
            width: 1.91rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        // margin-top: .4rem;
        height: calc(100% - 3rem);
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
    // .popUp{
        .el-dialog{
            height: 45% !important;
        li:last-child{
            padding-top: .54rem;
        }
    }
  footer{
        font-size: .32rem;
        float: right;
        margin-right: 1.66rem;
        button{
            font-size: .3rem;
            padding: .12rem .24rem;
            background: #08a695;
        }
    }
}
</style>
