<template>
    <div class="projectHistoryDetail">
        <header class="projectHistoryDetail">
            <h3>{{tableData.name}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <Search @searchDetail='searchDetail' class="Taskreview_header_Search" :placeholderTexe = 'placeholderTexe'/>
        </header>
        <div class="taskName">
            <span>公司-部门：</span>
            <p>{{labManagrInfo.company}}-{{labManagrInfo.department}}</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData.experiments" :cell-style="changecolor" height="100%"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="experiment_num"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="engineer"  label="负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="result"   label="试验结果" header-align='center' align='center'></el-table-column>
            </el-table>
        </div>
        <footer @click="goUpdataFile">
            <span>{{tableData.name}}：{{tableData.report_result}}</span>
            <a  class="underline" download="项目文件" :href="tableData.report">查看项目文件</a>
        </footer>
    </div>
</template>
<script>
import Search from "../../../components/common/search";
export default {
    name: 'projectHistoryDetail',
    components:{Search},
    data(){
        return{
            tableData: {},
            placeholderTexe:'搜索试验编号、名称',
            isLoading: true,
            labManagrInfo:{},
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if(data.columnIndex === 4){
                if(data.row.result == '不合格'){
                    return "color:#f10000";
                }else{
                    return "color:#28d897";
                }
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
        goUpdataFile(){
            this.$router.push({name: 'updataFile'})
        },
        getProject_history_finishproject_Detail(){
            this.$http.get(this.$conf.env.getProject_history_finishproject_Detail + this.$route.query.equipmentID + '/').then(res =>{
                this.tableData = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getProject_users(){
            this.$http.get(this.$conf.env.getProject_users).then(res =>{
                this.labManagrInfo = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
    },
    mounted(){
        this.getProject_users();
        this.getProject_history_finishproject_Detail();
    }
}
</script>
<style lang="scss">
.projectHistoryDetail{
    height: 100%;
    .projectHistoryDetail{
        padding-left: .41rem;
        padding-top: .42rem;
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
        font-size: .26rem;
        float: right;
        margin-right: 1.66rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        span:first-child{
            margin-bottom: .2rem;
            font-size: .26rem;
            color: #08a795;
            
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
