<template>
    <div class="projectengineer_project">
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
                    <span class="equipmentName">试验结果</span>
                    <el-select v-model="value" placeholder="请选择项目结果">
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
                <li>
                    <span class="equipmentName">试验完成时间</span>
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
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="项目编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目开始时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目完成时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验结果" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address"  label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement"  @click="allocation(scoped)">查看</span></template>
            </el-table-column>
        </el-table>
        
    </div>
</template>
<script>
export default {
    name:'project',
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
        },{
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
        statusTime:'',
        CurrentChange: 0,
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
        historyEditDeteil(data){
            this.$router.push({name: 'historyEditDeteil' })
        },
        allocation(data){
            this.$router.push({name: 'missionDetail' })
        },

        /**@name 分页 */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.CurrentChange =  val;
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style lang="scss">
@import '../../../../../style/LabManager/management/index.scss';
.projectengineer_project{
    position: relative;
    height: 100%;
    
    .Search ul{
        margin-bottom: 0;
    }
    .editTableButton{
        margin-top: 0!important;
    }
    .el-input__inner{
        padding:  0 .4rem!important;
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
}
</style>
