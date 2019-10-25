<template>
    <div class="unMissionDetail">
        <header class="unMissionDetail">
            <h3>{{projectName}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="taskName">
            <span>公司-部门：</span>
            <p class="itemName">{{labManagrInfo.lab}}-{{labManagrInfo.department}}</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="100%"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="experiment_num"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="engineer"  label="负责人" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="start_time"  label="试验开始时间" header-align='center'  align='center'> </el-table-column>
                <el-table-column  label="试验数据"  header-align='center' align='center'>
                    <template slot-scope="scoped"><a class="underline" download="试验数据" :href="scoped.row.result">试验数据</a></template>
                </el-table-column>
                <el-table-column prop="result"   label="试验结果" header-align='center' align='center'> </el-table-column>
            </el-table>
        </div>
        <footer class="underline" v-if="!$route.query.flag" @click="goUpdataFile">上传项目文件</footer>
        <footer v-else><a :href="report" class="underline" download="项目文件" >查看项目文件</a></footer>
    </div>
</template>
<script>
export default {
    name: 'unMissionDetail',
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isUpslot:1,
            isLoading:true,//加载动画
            projectName:'',
            report:'',
            labManagrInfo:{}
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else if (data.columnIndex == 5 ) {
                if(data.row.result == '合格'){
                    return "color:#07a695"
                }else{
                    return "color:#f30000"
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
        goUpdataFile(){
            if(this.$route.query.flag){
                this.$router.push({path: '/Testengineer/updataFile',query:{flag:1,equipmentName:this.projectName,equipmentLab:this.labManagrInfo.lab,equipmentDepartment:this.labManagrInfo.department,equipmentID: this.$route.query.equipmentID}})
            }else{
                this.$router.push({path: '/Testengineer/updataFile',query:{flag:2,equipmentName:this.projectName,equipmentLab:this.labManagrInfo.lab,equipmentDepartment:this.labManagrInfo.department,equipmentID: this.$route.query.equipmentID}})
            }
        },
        getEquipment_myTextprojectList(data){
            var url= data ? this.$conf.env.getEquipment_myTextprojectList+ this.$route.query.equipmentID + '/' + '?search=' + data : this.$conf.env.getEquipment_myTextprojectList+ this.$route.query.equipmentID + '/'
            this.$http.get(url).then( res =>{
                this.isLoading = false;
                this.tableData = res.data.experiments;
                this.projectName = res.data.name;
                this.report = res.data.report;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getEquipment_userinfoDetail(){
            this.$http.get(this.$conf.env.getEquipment_userinfoDetail).then(res =>{
                this.labManagrInfo = res.data;
                
            }).catch(err =>{
                console.log(err)
            })
        },
    },
    mounted(){
        this.getEquipment_myTextprojectList();
        this.getEquipment_userinfoDetail();
    }
}
</script>
<style lang="scss">
.unMissionDetail{
    height: 100%;
    padding-top: .42rem;
    .unMissionDetail{
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
