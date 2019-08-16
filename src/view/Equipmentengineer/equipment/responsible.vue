<template>
    <div class="responsible">
        <header class="responsible_header">
            <h3>设备负责数</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" style="margin-left:.3rem;margin-right: 9.88rem;" @click="$router.push({name: 'addEquipment'})">新增设备数</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="设备名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="实验室" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="上次保养时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="预计下次保养时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="计量负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="设备二维码" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="状态"  fixed='right'   header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">正常</span></template>
                </el-table-column>
                <el-table-column prop="address" fixed='right' label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">查看</span> </template>
                </el-table-column>
            </el-table>
        </div>
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
    name: 'responsible',
    components:{Search},
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
                },{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海 1516 弄'
                }
            ],
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
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
        searchDetail(){

        },
        allocation(){
            this.$router.push({name:'equipmentFlow'})
        },
        goUpdataFile(){
            this.$router.push({name: 'updataFile'})
        }
    }
}
</script>
<style lang="scss">
.responsible{
    @import '../../../style/LabManager/management/index.scss';
    height: 100%;
    .responsible_header{
        padding-top: .42rem;
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .43rem;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
            font-size: .23rem;
        }
    }
    .taskName{
        margin-left: .19rem;
        margin-bottom: .14rem;
        padding-left: .41rem;
        display: flex;
        font-size: .25rem;
        color: #666;
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        height: calc(100% - 4.5rem);
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
    footer{
        font-size: .32rem;
        float: right;
        margin-right: 1.66rem;
    }
    .popUp{
        .el-dialog{
            height: 59.4%;
            overflow: hidden;
        }
        ul{
            overflow-y: scroll;
        }
        ul::-webkit-scrollbar{
            display: none;
        }
        ul>li{
            display: flex;
            p{
                font-size: .2rem;
            }
        }
        li>span{
            font-size: .28rem;
            color: #333333;
        }
        .taskDetail{
            padding-top: .39rem;
            li{
                // line-height: .9rem;
                height: .6rem;
                padding: .15rem 0;
            }
            
        }
        .taskTest{
            margin-top: .18rem;
            li{
                // height: .6rem;
                line-height: .6rem;
                padding: .05rem 0;
                p{
                   font-size: .28rem; 
                    color: #333333;
                    width: 60%;
                }
            }
            .el-select{
                width: 4rem;
                height: .52rem;
                .el-input__inner{
                    height: .52rem; 
                    font-size: .2rem;
                    font-weight: 200;
                }
            }
            button{
                background: #08a795;
                color: #fff;
                height:.45rem;
                width: 1.81rem;
                font-size: .26rem;
                margin-left: 30%;
                margin-top: .54rem;
                  
            }
        }
    }
}
</style>
