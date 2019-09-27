<template>
    <div class="taskkAllocation_index">
        <header class="taskkAllocation_index_header">
            <h3>任务分配</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p>东风柳汽</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="date"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="试验性质" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="预期开始时间" header-align='center' align='center'> </el-table-column>
                <el-table-column prop="date"  label="预期结束时间"  header-align='center' align='center'> </el-table-column>
                <el-table-column prop="date"  label="试验周期"  header-align='center' align='center'> </el-table-column>
                <el-table-column prop="name" label="查看"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">详情</span></template>
                </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline"  @click="allocation(scoped)">分配</span> </template>
                </el-table-column>
            </el-table>
        </div>
        <popUp ref="popUp" setWidth='37.5%' :popUptitle='popUptitle' class="popUp">
            <template>
                <div v-if="isUpslot == 1" class="taskDetail">
                    <ul>
                        <li><span>试验简介：</span><div>魏鹏飞陪我放假人家</div></li>
                        <li><span>试验方法：</span><div></div></li>
                    </ul>
                </div>
                <div v-if="isUpslot == 2" class="taskTest">
                    <ul>
                        <li><span>试验设备：</span><div></div></li>
                        <li><span>试验开始时间：</span><p>魏鹏飞陪我放假人家</p></li>
                        <li><span>实验室：</span><p>魏鹏家魏鹏飞陪我放假人家我放假人家</p></li>
                        <li><span>物料工程师：</span><p>魏鹏飞陪我放假人家</p></li>
                        <li><span>设备工程师：</span><p>魏鹏飞陪我放假人家</p></li>
                        <li><span>试验工程师：</span><p>魏鹏飞陪我放假人家</p></li>
                    </ul>
                </div>
                <div v-if="isUpslot == 3" class="taskTest">
                    <ul>
                        <li><span>试验设备：</span><div></div></li>
                        <li><span>试验开始时间：</span><p>魏鹏飞陪我放假人家</p></li>
                        <li><span>实验室：</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>物料工程师：</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li><span>设备工程师：</span>

                        </li>
                        <li>
                            <span>试验工程师：</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <el-button type="primary" @click="$refs.popUp.dialogVisible = false">确 定</el-button>
                </div>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../components/common/popUp'
export default {
    name: 'teskAllioction',
    components:{popUp},
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isUpslot:1,
            options: [],
            value: ''
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 6 || data.columnIndex == 7 ) {
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
        lookDetail(data){
            this.setdialogVisible('试验详情', 1 )
        },
        allocation(data){
            this.setdialogVisible('分配试验',3)
        },
        setdialogVisible(title, flag){
            this.popUptitle = title;
            this.isUpslot = flag;
            this.$refs.popUp.dialogVisible = true;
        },
        

        
    },
    mounted(){
        
    }
}
</script>
<style lang="scss">
.taskkAllocation_index{
    padding-top: .42rem;
    .taskkAllocation_index_header{
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
            font-size: .23rem
        }
    }
    .taskName{
        margin-left: .19rem;
        margin-bottom: .14rem;
        padding-left: .41rem;
        display: flex;
        font-size: .25rem;
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
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
