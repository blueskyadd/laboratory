<template>
    <div class="taskkAllocation_index body_main">
        <header class="taskkAllocation_index_header">
            <h3>任务分配</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p>{{$route.query.equipmentName}}</p>
        </div>
         <div class="taskAllocation_distributed">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 3.3rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="date"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="试验名称" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="project_type"  label="试验性质" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="start_time"  label="预期开始时间" header-align='center' align='center'> </el-table-column>
                <el-table-column prop="end_time"  label="预期结束时间"  header-align='center' align='center'> </el-table-column>
                <el-table-column prop="cycle"  label="试验周期"  header-align='center' align='center'> </el-table-column>
                <el-table-column prop="name" label="查看" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline" @click="lookDetail(scoped)">详情</span></template>
                </el-table-column>
                <el-table-column  label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped">
                        <span style="cursor: pointer;"  @click="allocation(scoped)" >{{scoped.row.status == 2 ? '已分配':'分配'}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <span class="pagesize">共{{Math.ceil(totalSum/page_size)}}页</span>
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="CurrentChange"
                :page-size="page_size"
                layout="prev, pager, next"
                :total="totalSum">
                </el-pagination>
                <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
            </div>
            <footer>
                <div>
                    <el-button type="primary" @click="closeTest_experiment()">关闭项目</el-button>
                </div>
            </footer>
        </div>
        <popUp ref="popUp" setWidth='37.5%' :popUptitle='popUptitle' class="popUp">
            <template>
                <div v-if="isUpslot == 1" class="taskDetail">
                    <ul>
                        <li><span>试验简介：</span><div><p>{{equipmentDetail.intro}}</p> </div></li>
                        <li class="upload">
                            <span>试验方法：</span>
                            <input type="file" ref="fileImg"   @change='updataFileImg' style="display:none" >
                            <span @click="updataFileChange" class="accessory"><img src="../../../../assets/img/commont/file/accessory.png" alt></span>
                            <p>{{equipmentDetail.method}}</p>
                        </li>
                        <li></li>
                    </ul>
                </div>
                <div v-if="isUpslot == 2" class="taskTest">
                    <ul>
                        <li>
                            <span>试验设备：</span>
                            <div class="equipmentsEq">
                                <span v-for="item in Test_experimentDetail.equipments.eq" :key="item.id">
                                    <img :src="item.image" alt="">
                                    <p>{{item.name}}</p>
                                </span>
                            </div>
                        </li>
                        <li><span>试验开始时间：</span><p>{{Test_experimentDetail.start_time}}</p></li>
                        <li><span>实验室：</span><p>{{Test_experimentDetail.equipments.room}}</p></li>
                        <li><span>物料工程师：</span><p class="equipmentsUser">{{Test_experimentDetail.material_user.name}}</p></li>
                        <li><span>设备工程师：</span><p class="equipmentsUser"><span v-for="item in Test_experimentDetail.equipments.users" :key="item">{{item}}</span></p></li>
                        <li><span>试验工程师：</span><p class="equipmentsUser">{{Test_experimentDetail.engineer.name}}</p></li>
                    </ul>
                </div>
                <div v-if="isUpslot == 3" class="taskTest">
                    <ul>
                        <li>
                            <span>试验设备：</span>
                            <div class="equipmentsEq">
                                <span v-for="item in Test_experimentDetail.equipments.eq" :key="item.id">
                                    <img :src="item.image" alt="">
                                    <p>{{item.name}}</p>
                                </span>
                            </div>
                        </li>
                        <li><span>试验开始时间：</span><p>{{Test_experimentDetail.start_time}}</p></li>
                        <li><span>实验室：</span><p>{{Test_experimentDetail.equipments.room}}</p></li>
                        <li>
                            <span><i class="importantData">*</i>物料工程师：</span>
                            <el-select v-model="Test_User.material_user" placeholder="请选择">
                                <el-option
                                v-for="item in Test_material_userList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>设备工程师：</span>
                            <span v-for="item in Test_experimentDetail.equipments.users" :key="item">{{item}}</span>
                        </li>
                        <li>
                            <span><i class="importantData">*</i>试验工程师：</span>
                            <el-select v-model="Test_User.engineer" placeholder="请选择">
                                <el-option
                                v-for="item in Test_engineerList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="setTest_experiment()">确 定</el-button></li>
                    </ul>
                </div>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../components/common/popUp';
import VerificationData from'../../../../components/VerificationData';
export default {
    name: 'teskAllioction',
    components:{popUp},
    inject:['reload'],
    data(){
        return{
            tableData: [],
            popUptitle:'',
            isUpslot:1,
            isLoading: true,
            totalSum:0,//数据总数
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            CurrentChange:1,
            equipmentDetail:{
                'intro':'',
                'method':'',
            },
            Test_experimentDetail:{},
            Test_material_userList: [],//物料工程师列表
            Test_engineerList:[],//试验工程师列表
            Test_User:{
                 material_user:'',//物料工程师
                 engineer:'',//试验工程师
            },
            projectID: '',
        }
    },
    methods:{
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 6 ) {
                return "color:#07a695";
            }else if( data.columnIndex == 7){
                if(data.row.status == 2){
                    return "color:#f10000"
                }else{
                    return "color:#07a695";
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
        lookDetail(data){
            this.equipmentDetail = {
                'intro': data.row.intro,
                'method':data.row.method
            }
            this.setdialogVisible('试验详情', 1 )
        },
        allocation(data){
            this.projectID = data.row.id;
            this.setdialogVisible('分配试验', data.row.status == 1 ? 3 : 2);
            this.getTest_experimentDetail(data.row.id);
            data.row.status == 1 ? this.getTest_material_userList(data.row.id):'';
            data.row.status == 1? this.getTest_engineerList(data.row.id):'';
        },
        //上传按钮
        updataFileChange(){
            this.$refs.fileImg.click()
        },
        //上传按钮
        updataFileImg(e){
            let _this = this;
             this.$updataFile.updataFile(e.target.files[0], res =>{
                console.log(res)
                this.fileName =  e.target.files[0].name;
            },this)
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getTest_experiment(pageNumber);
        },
        setdialogVisible(title, flag){
            this.popUptitle = title;
            this.isUpslot = flag;
            this.$refs.popUp.dialogVisible = true;
        },
        getTest_experiment(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getTest_experiment+ this.$route.query.equipmentID +'&page_size=' +this.page_size: this.$conf.env.getTest_experiment+ this.$route.query.equipmentID + '&p=' + pageNumber + '&page_size=' +this.page_size ).then( res =>{
                this.tableData = res.data.results;
                this.totalSum = res.data.count;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getTest_experimentDetail(ID){
            this.$http.get(this.$conf.env.getTest_experimentDetail + ID + '/').then( res =>{
                this.Test_experimentDetail = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //物料工程师
        getTest_material_userList(ID){
            this.$http.get(this.$conf.env.getTest_material_userList).then(res =>{
                this.Test_material_userList = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //试验工程师
        getTest_engineerList(ID){
            this.$http.get(this.$conf.env.getTest_engineerList).then(res =>{
                this.Test_engineerList = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //分配
        setTest_experiment(){
            if(!VerificationData.VerificationData(this.Test_User)) return;
            this.$http.put(this.$conf.env.setTest_experiment+this.projectID + '/',this.Test_User).then(res =>{
                if(res.status == '200'){
                    this.$message({ message: '分配成功', type: 'success'});
                    this.reload();
                }else{
                    this.$message({ message: '分配失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //关闭项目
        closeTest_experiment(){
            this.$http.delete(this.$conf.env.setTest_experiment+this.$route.query.equipmentID + '/',this.Test_User).then(res =>{
                if(res.status == '204'){
                    this.$message({ message: '关闭成功', type: 'success'});
                    this.$route.back();
                }else{
                    this.$message({ message: '关闭失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getTest_experiment(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getTest_experiment(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.taskkAllocation_index{
    @import '../../../../style/LabManager/management/index.scss';
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
        height: 100%;
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
            margin-top: 0;
        }
        ul::-webkit-scrollbar{
            display: none;
        }
        ul>li{
            display: flex;
            p{
                font-size: .2rem;
                flex: 1;
            }
        }
        li>span{
            font-size: .28rem;
            color: #333333;
            text-align: left!important;
            width: auto!important;
        }
        .taskDetail{
            padding-top: .39rem;
            li{
                // line-height: .9rem;
                height: .6rem;
                padding: .15rem 0;
                align-items: center;
                p{
                    font-size: .24rem;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                }
                div{
                    flex: 1;
                }
                span{
                    text-align: left;
                    overflow: hidden;
                    
                }
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
                    span{
                        width: auto;
                    }
                }
                .equipmentsEq{
                    display: flex;
                    flex-wrap: wrap;
                    flex: 1;
                    span{
                        display: block;
                        display: flex;
                        align-items: flex-end;
                        width: auto;
                        margin: .1rem .1rem 0 0;
                        img{
                            width: 1rem;
                            height: 1rem;
                        }
                        p{
                            font-size: .22rem;
                            margin-left: .05rem;
                        }
                    }
                }
                .equipmentsUser{
                    display: flex;
                    flex-wrap: wrap;
                    span{
                        width: auto;
                        text-align: left;
                        margin-right: .15rem;
                        
                    }
                }
            }
            .el-select{
                width: 4rem;
                height: .52rem;
                .el-input__inner{
                    height: .52rem; 
                    font-size: .2rem;
                    font-weight: 200;
                    width: 4rem!important;
                }
            }
        }
    }
    footer{
        margin-right: 1.6rem;
        font-size: .2rem;
        float:right;
        text-align: right;
        button{
            padding: .1rem .22rem;
            width: fit-content;
            display: table-cell;
            float: right;
            background: #08a695;
            margin-bottom: .1rem;
        }
    }
}
</style>
