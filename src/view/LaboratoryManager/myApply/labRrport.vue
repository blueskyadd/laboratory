<template>
    <div class="management_labRrport body_main">
        <header class="proposer_index_header">
            <div>
                <h3>测试报告</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p class="ProjectName">{{tableData.name}}</p>
            <span >公司-部门：</span>
            <p class="companyName">{{labManagrInfo.lab}}-{{labManagrInfo.department}}</p>
        </div>
        <!-- <div class="Search">
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
        </div> -->
        <el-table :data="tableData.experiments" :cell-style="changecolor" height="calc(100%  - 3.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="experiment_num"  label="编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="result"  label="实验结果" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="engineer"  label="负责人" header-align='center' align='center'> </el-table-column>
        </el-table>
        <footer>
                <div><span>{{tableData.name}}项目：</span>{{tableData.report_result}}</div>
                <a :href="tableData.report" download="报告" class="underline">点击查看报告</a>
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
        tableData: [],
        placeholderTexe: '搜索项目编号、名称',
        isLoading:true,//加载动画
        labManagrInfo:{}
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
        getLaboratory_finishproject3Detail(){
            this.$http.get(this.$conf.env.getLaboratory_finishproject3Detail + this.$route.query.equipmentID + '/').then( res =>{
                this.isLoading = false;
                this.tableData = res.data;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            }) 
        },
        getEquipment_userinfoDetail(){
            this.$http.get(this.$conf.env.getEquipment_userinfoDetail).then(res =>{
                this.labManagrInfo = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
    },
    mounted(){
        this.getLaboratory_finishproject3Detail();
        this.getEquipment_userinfoDetail();
    }
}
</script>
<style lang="scss">
.management_labRrport{
    @import '../../../style/LabManager/management/index.scss';
    @import '../../../style/Testengineer/teskName.scss';
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
