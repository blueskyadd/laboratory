<template>
    <div class="management_LaboratoryPrincipalProject body_main" >
        <header class="testMethods_index_header">
            <h3>负责项目</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
            <el-table-column prop="date" label="产品编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" label="产品名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" label="项目负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" label="产品状态" header-align='center' align='center'
                :filters="[{ text: '王小虎', value: '王小虎' }, { text: '王小虎湖', value: '王小虎湖' }]"
                :filter-method="filterOrder"
                :filter-multiple="false"
                filter-placement="bottom-end">
                <template><span class="underline" @click="goEquipmentDetail()">进行</span></template>
            </el-table-column>
            <el-table-column prop="name" label="项目来源" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name" label="操作" header-align='center' align='center'>
                <template><span class="underline lookmanagement" @click="goEquipmentDetail()">完成</span><span class="underline deletemanagement" @click="goEquipmentDetail()">删除</span></template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    components:{Search},
    name:'LaboratoryPrincipalProject',
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
          name: '王小虎湖',
          address: '上1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎湖',
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
        placeholderTexe:'上传试验编号、名称',
        isUpslot:false,
        pageNumber: 1,
        perPage: 10
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
        searchDetail(){

        },
        getIndex(index){
            return (this.pageNumber - 1) * this.perPage + index + 1
        },
        goEquipmentDetail(){
             alert('a')
           this.$router.push({name:'projectInccur'})
        },
        filterOrder(value, row) {
            return row.name === value;
        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_LaboratoryPrincipalProject{
     padding-top: .42rem;
    .testMethods_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .46rem;
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
            margin-right: 10.08rem;
        }
        .testMethods_index_header_link{
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
        .testMethods_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
    .el-table__column-filter-trigger i{
        font-size: .2rem;
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
        .lookmanagement{
            margin-right: .37rem;
        }
        .deletemanagement{
            color: #f30000;
        }
         .popUp{
             .el-dialog{
                 height: 76%!important;
             }
             li{
                 margin-bottom: .49rem!important;
             }
         }
}
</style>
