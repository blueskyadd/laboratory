<template>
    <div class="management_projectAppointment body_main">
        <header class="proposer_index_header">
            <h3>试验项目</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>

        </header>
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">项目状态</span>
                    <el-select v-model="value" placeholder="请选择项目状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">项目来源</span>
                    <el-select v-model="value" placeholder="请选择项目来源">
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
            <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
            <el-table-column prop="date"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目状态" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目来源" header-align='center' align='center'> </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name:'projectAppointment',
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
            if (data.columnIndex == 0) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'projectFlow' })
        },

        /**@name功能按键 */
        //弹框
        editquipment(title, flag, data){
            this.$router.push({path:'/ProjectManager/addProjectAppoinment?flag=2'})
        },
        deleteItem(){

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
        getIndex(index){
         return (this.pageNumber - 1) * this.perPage + index + 1
         }
        
    }
}
</script>
<style lang="scss">
@import '../../../style/LabManager/management/index.scss';
.management_projectAppointment{
    padding-top: .46rem;
    .goBack{
        margin-right: 10.4rem;
    }
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
            margin-top: .17rem!important;
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
                 margin-bottom: .32rem!important;
             }
        }
}
</style>
