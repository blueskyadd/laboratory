<template>
    <div class="management_labRrport body_main">
        <header class="proposer_index_header">
            <h3>试验标准</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p class="ProjectName">控福控福智能控福智能智能-硬件部</p>
            <span >委托公司部门：</span>
            <p class="companyName">控福控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能智能-硬件部</p>
        </div>
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">标准来源</span>
                    <el-select v-model="value" placeholder="请选择标准来源">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="实验结果" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="负责人" header-align='center' align='center'> </el-table-column>
        </el-table>
        <footer>
                <div><span>东分六期项目：</span>不合格</div>
                <span class="underline">点击查看报告</span>
        </footer>
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'labRrport',
    components:{Search},
    data() {
      return {
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
        }],
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
        popUptitle: '',
        isUpslot: false,
        statusTime: '',
        placeholderTexe: '搜索项目编号、名称',
        CurrentChange:7,
      }
    },
    methods:{
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 3) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        /**@name功能按键 */
        //搜索按钮
        searchPersonnel(){

        },
        searchDetail(){

        },
        
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
@import '../../../style/Testengineer/teskName.scss';
.management_labRrport{
    padding-top: .46rem;
    .goBack{
        margin-right: 10.4rem;
    }
    .editTableButton{border:0}
    .Search{
        ul{
            margin-bottom: 0;
            margin-top: 0;
        }
        li{
            margin-bottom: .33rem;
            .el-input{
                width: 100%!important;  
            }
        }
        li>span{
            width: -webkit-fill-available;
        }
        .editTableButton{
            margin-top: 0rem!important;
        }
    }
    .el-table{
        height: calc(100% - 5rem);
    }
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
        //斑马线
        .warning-row{
            background:#f6f6f6;
        }
        footer{
            margin-right: 1.6rem;
            font-size: .2rem;
            float:right;
            text-align: right;
            div{
                margin-bottom: .21rem;
                color: #f21717;
                span{
                    color: #333;
                }

            }
        }
}
</style>
