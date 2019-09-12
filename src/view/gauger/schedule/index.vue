<template>
    <div class="management_scheduleIndex body_main">
        <header class="testMethods_index_header">
            <h3>计量中设备进度</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>

        </header>
        <el-table :data="tableData" :cell-style="changecolor"  height="calc(100%  - 1.5rem)" style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="委外负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="委托公司" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="预计完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="联系电话" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"   label="计量状态" header-align='center' align='center'>
                 <template slot-scope="scoped"><span @click="allocation(scoped)">等待</span></template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <span class="pagesize">共10页</span>
            <el-pagination
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page.sync="CurrentChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
            <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
        </div>
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    components:{Search},
    name:'scheduleIndex',
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
        placeholderTexe:'上传试验编号、名称',
        isUpslot:false
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
            if (data.columnIndex == 0 ||data.columnIndex == 5) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'measureFlow' })
        },
        /**@name功能按键 */
        //弹框
        editquipment(title, flag, data){
            this.popUptitle = title;
            this.isUpslot = flag;
            this.$refs.popUp.dialogVisible = true;
        },
        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //搜索按钮
        searchPersonnel(){

        },
        //上传按钮
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
        searchDetail(){

        },
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_scheduleIndex{
     padding-top: .42rem;
    .testMethods_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .5rem;
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
        .rightText{
            padding-right: 2.44rem;
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
