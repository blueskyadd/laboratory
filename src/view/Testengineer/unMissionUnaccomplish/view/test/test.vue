<template>
    <div class="unMissionUnaccomplishTestengineer_unMissionUnaccomplishTest">
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%" height="calc(100%  - 1.5rem)" :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验开始时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验结束时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="周期" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="值守" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备报修" header-align='center' align='center'> 
                <template slot-scope="scoped">
                  <div>
                    <el-popover placement="top-start" @hide='hiddenBox'  width="340" height='280' title='选择设备实验' popper-class='popover_unMissionUnaccomplishTest' trigger="click">
                        <Repairs @changeHiden='changeHiden'></Repairs>
                        <span class="underline lookmanagement"  style="color: #f23536"  slot="reference" @click="getrepairs(scoped)">报修</span>
                    </el-popover>
                  </div>
                </template>

            </el-table-column>
            <el-table-column prop="name"  label="试验方法" header-align='center' align='center'> 
                <template slot-scope="scoped"><span class="underline lookmanagement"  @click="historyEditDeteil(scoped)">查看</span></template>
            </el-table-column>
            <el-table-column prop="address"  label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement"  @click="allocation(scoped)">开始</span></template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>    
import Repairs from '../../../../../components/common/repairs';
export default {
    name:'unMissionUnaccomplishTest',
    components:{Repairs},
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
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
        showReplairs: false
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
            this.$router.push({name: 'testProcess'})
        },
        getrepairs(data){
            // this.showReplairs = true;
        },
        changeHiden(){
          this.$router.push({name:'guarantee'})
        }
    }
}
</script>
<style lang="scss">
@import '../../../../../style/LabManager/management/index.scss';
.unMissionUnaccomplishTestengineer_unMissionUnaccomplishTest{
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
.popover_unMissionUnaccomplishTest{
    height:2.8rem;
}
</style>
