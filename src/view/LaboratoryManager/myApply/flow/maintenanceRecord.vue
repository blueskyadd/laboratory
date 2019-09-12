<template>
    <div class="LaboratoryMaintenanceRecord body_main">
        <header class="LaboratoryMaintenanceRecord_index_header">
            <h3>维修记录</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <div class="mian_text  ">
                        <span>设备名称：</span>
                        <p>烟雾试验箱</p>
                    </div>
                    <div class="mian_text ">
                        <span>设备编号：</span>
                        <p>2012.02.12</p>
                    </div>
                </div>
            </div>
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date"  label="维修时间"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="维修完成时间" header-align='center' align='center'> </el-table-column>
                <el-table-column prop="name"  label="负责人" header-align='center' align='center'> </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span></template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'LaboratoryMaintenanceRecord',
    data(){
        return{
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
            if (data.columnIndex == 0 ||data.columnIndex == 1) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'LaboratoryMaintenanceProcess' })
        },
    }
}
</script>
<style lang="scss">
.LaboratoryMaintenanceRecord{
     padding-top: .42rem;
     overflow-y: scroll;
    .LaboratoryMaintenanceRecord_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .38rem;
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
    }
    .main{
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        .measure_main{
            
            width: 100%;
            display: flex;
            height: auto;
            .mian_text{
                
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .85rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                div:first-child{
                    padding-left: .59rem;
                    p{
                        width: 1.77rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #666666;
                    }
                }
                div:last-child{
                    padding: 0;
                    p{color: #07a695}
                }
               
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
    }
}
.LaboratoryMaintenanceRecord::-webkit-scrollbar{
    display: none;
}
</style>