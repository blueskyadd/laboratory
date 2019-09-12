<template>
    <div class="addCompany_index table_box">
        <header class="addCompany_index_header">
            <h3>新增公司</h3>`
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
         <div class="taskAllocation_distributed ">
              <div class="editTableButton">
                <el-button type="primary" @click="addCompany">新增</el-button>
            </div>
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName">
                <el-table-column prop="id"  type="index"   width = '100%' :index="getIndex"  align='center' label="序号"></el-table-column>
                <el-table-column prop="date"  label="公司名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="创建日期" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="date"  label="创建人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="部门"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">管理</span></template>
                </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline lookmanagement"  @click="editCompany(scoped)">编辑</span><span class="underline deletemanagement"  @click="allocation(scoped)">删除</span> </template>
                </el-table-column>
            </el-table>
        </div>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <div>
                    <ul>
                        <li><span>部门名称：</span><input type="text" placeholder="填写姓名"></li>
                        <li><span>创建时间：</span>
                            <el-date-picker
                                v-model="statusTime"
                                type="date"
                                placeholder="离职时间">
                            </el-date-picker>
                        </li>
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary">完成</el-button></li>
                    </ul>
                </div>
            </template>
        </popUp>
        
    </div>
</template>
<script>
import Search from "../../../../../components/common/search";
import popUp from '../../../../../components/common/popUp'
export default {
    name: 'addCompany',
    components:{Search,popUp},
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
                }
            ],
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
            pageNumber: 1,
            perPage: 10
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
        lookDetail(){
            this.$router.push({name:'newDepartment'})
        },
        getIndex(index){
            return (this.pageNumber - 1) * this.perPage + index + 1
        },
        addCompany(){
            this.setdialogVisible('新增公司')
        },
        editCompany(){
            this.setdialogVisible('编辑公司')
        },
        setdialogVisible(title){
            this.popUptitle = title;
            this.$refs.popUp.dialogVisible = true;
        },
    }
}
</script>
<style lang="scss">
.addCompany_index{
    padding-top: .42rem;
    .addCompany_index_header{
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
            margin-right: 9.88rem;
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
    .editTableButton{
        margin-bottom: .26rem;
        padding-right: 1.8rem;
        height: .48rem;
        display: flex;
        justify-content: flex-end;
        button{
            font-size: .25rem;
            padding: .1rem .32rem;
            background: #08a795;
            color: #fff;
            border: 0;
            span{
                text-decoration: underline;
            }
        }
        button:first-child{
            margin-right: .28rem;
        }
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
            height: 35%;
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
