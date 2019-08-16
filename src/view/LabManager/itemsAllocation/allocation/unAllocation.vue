<template>
    <div class="itemsAllocation_unallocayion">
        <el-table :data="tableData"  :cell-style="changecolor" :row-class-name="tabRowClassName" width="100%" style="width: 100%">
            <el-table-column prop="date"  label="项目编号"  header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="项目名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="date" label-class-name='principal'  label="负责人" header-align='left' align='left'>
                <template slot-scope="scoped">
                    <div>
                        <el-select v-model="principal"  popper-class='principal_element' placeholder="选择负责人">
                            <el-option
                            v-for="item in scoped.row.options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </template>    
            </el-table-column>
            <el-table-column prop="name" label="查看"  header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">详情</span></template>
            </el-table-column>
            <el-table-column prop="address" label="操作"  header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">分配</span> </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'unAllocation',
    data() {
      return {
        principal:'',
        tableData: [{
            date: 'MC44F9DE03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            options:[
                {
                    name:'张三',
                    id:'1'
                },
                {
                    name:'张三',
                    id:'2'
                }
            ]
            }, {
            date: 'MC44FJDE03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            options:[
                {
                    name:'张三',
                    id:'1'
                },
                {
                    name:'张三',
                    id:'2'
                }
            ]
            }, {
            date: 'MC44F9DE03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            options:[
                {
                    name:'张三',
                    id:'1'
                },
                {
                    name:'张三',
                    id:'2'
                }
            ]
            }, {
            date: 'MC44F9DE03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            options:[
                {
                    name:'张三',
                    id:'1'
                },
                {
                    name:'张三',
                    id:'2'
                }
            ]
            }]
      }
    },
    methods:{
        /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 3 || data.columnIndex == 4 ) {
                return "color:#07a695";
            }
            if(data.columnIndex == 1){
                return "color:#444444";
            }
            if(data.columnIndex == 2){
                return "color:#999999";
            }
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },

        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){

        }
    }
}
</script>
<style lang="scss">
.itemsAllocation_unallocayion{
    table{
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
            font-size: .23rem;
            padding: 0;
            border: 0;
            .cell{
                line-height: .67rem;
                span{
                    line-height: .67rem;
                }
            }
            .el-input__inner {
                font-size: .2rem;
                height: .44rem;
                width: 2.74rem;
                font-weight: 300;
                line-height: .44rem;
            }
        }
        //斑马线
        .warning-row{
            background:#f6f6f6
        }
    }
    //brder
        table::before{
            display: none;
        }
    .principal{
        .cell{
            margin-left: 0.6rem;
        }
        
    }
    
}
//下拉框
.principal_element{
    width: 9.28rem;
    margin-top: -.1rem;
    .el-select-dropdown__item{
        height: .44rem;
        font-size: .2rem;
        font-weight: 300;
        line-height: .44rem;
    }
}
</style>
