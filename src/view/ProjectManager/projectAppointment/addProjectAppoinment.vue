<template>
    <div class="addProjectAppoinment body_main" v-loading.fullscreen.lock="isLoading">
        <header class="addProjectAppoinment_index_header">
            <h3>{{titleProject}}</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>公司名称：</span>
                    <p class="guaranteeName">{{labManagrInfo.company}}</p>
                    <span>部门：</span>
                    <p>{{labManagrInfo.department}}</p>
                </div>
                <div class="mian_text first_child">
                    <span><i class="importantData">*</i>项目名称：</span>
                    <input type="text" v-model="projectDetail.name"  placeholder="请输入项目名称">
                    <span style="margin-left:.24rem"><i class="importantData">*</i>项目类型：</span>
                    <el-select v-model="projectDetail.project_type" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in project_type"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <span style="margin-left:.24rem" v-if="$route.query.flag">产品选择：</span>
                    <el-select v-if="$route.query.flag" v-model="projectDetail.product" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in prodectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="mian_text two_child ">
                    <span><i class="importantData">*</i>项目开始时间：</span>
                    <el-date-picker
                        v-model="projectDetail.start_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="项目开始时间">
                    </el-date-picker>
                    <span style="margin-left:.24rem"><i class="importantData">*</i>项目结束时间：</span>
                    <el-date-picker
                        v-model="projectDetail.end_time"
                        type="datetime"
                        value-format="yyyy-MM-ddTHH:mm:ss"
                        placeholder="项目结束时间">
                    </el-date-picker>
                    
                </div>
                <div class="mian_text textarea">
                    <span><i class="importantData">*</i>项目简介</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="projectDetail.intro" placeholder="请输入项目简介" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{projectDetail.intro.length}}/800</p>
                    </div>
                </div>
                <div class="main_list updata" v-if="$route.query.flag">
                    <span class="file_title" style="margin-bottom:0.16rem"><i class="importantData">*</i>试验样件</span>
                    <div class="file_box">
                        <input type="file" ref="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change='updataFile' style="display:none" >
                        <div class="fileBox">
                            <div><span @click="updataFileChange"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <p>{{fileName}}</p>
                        </div>
                    </div>
                    <P class="warnning">提示：创建试验前请将样件送至物料仓库审核，否则不能进行正常预约！</P>
                </div>
            </div>
            <footer v-if="$route.query.flag">
                <el-button type="primary" @click="$route.query.flag == 1?createdProject_prodect():editProject_prodect()">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import Repairs from '../../../components/common/repairs';
export default {
    name:'addProjectAppoinment',
    components:{Repairs},
     inject:['reload'],
    data(){
        return{
            fileName: '点击上传试验样件',
            titleProject:this.$route.query.equipmentName?this.$route.query.equipmentName: this.$route.query.flag == 1 ? '创建项目' : this.$route.query.flag == 2? '编辑项目':'项目详情',
            isLoading: false,
            projectDetail: {
                "name":'',
                "project_type":'',
                "product":'',
                "start_time":'',
                "end_time":'',
                "intro":'',
                "sample":{}
            },
            labManagrInfo:{},
            project_type:[{'name':'DV试验',id:1},{'name':'PV试验',id: 2}],
            prodectList:[]
        }
    },
    methods:{
        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //上传按钮
        updataFile(e){
            this.projectDetail.sample =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
        getProject_projectDetail(){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getProject_projectDetail + this.$route.query.equipmentID + '/').then( res =>{
                res.data.project_type == 'DV试验' ? 1 : 2;
                res.data.start_time =res.data.start_time? res.data.start_time.split(' ')[0]+'T'+res.data.start_time.split(' ')[1]+':00':'';
                res.data.end_time = res.data.end_time?res.data.end_time.split(' ')[0]+'T'+res.data.end_time.split(' ')[1]+':00':'';
                this.projectDetail =res.data;
                this.fileName = res.data.sample;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getTest_projectDetail(){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getTest_projectDetail + this.$route.query.equipmentID + '/').then( res =>{
                res.data.project_type == 'DV试验' ? 1 : 2;
                res.data.start_time =res.data.start_time? res.data.start_time.split(' ')[0]+'T'+res.data.start_time.split(' ')[1]+':00':'';
                res.data.end_time = res.data.end_time?res.data.end_time.split(' ')[0]+'T'+res.data.end_time.split(' ')[1]+':00':'';
                this.projectDetail =res.data;
                this.fileName = res.data.sample;
            
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
        getProject_produceList(){
            this.$http.get(this.$conf.env.getProject_produceList).then(res =>{
                this.prodectList = res.data;
            
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        createdProject_prodect(){
            if(!this.VerificationData()) return;
            this.isLoading = true;
             let params = new FormData();
             params.append('name',this.projectDetail.name);
             params.append('project_type',this.projectDetail.project_type);
             params.append('product',this.projectDetail.product);
             params.append('start_time',this.projectDetail.start_time);
             params.append('end_time',this.projectDetail.end_time);
             params.append('intro',this.projectDetail.intro);
             params.append('sample',this.projectDetail.sample);
            this.$http.post(this.$conf.env.createdProject_prodect, params, true).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        editProject_prodect(){
            // console.log(this.projectDetail.sample.name)
            if(!this.VerificationData()) return;
            this.isLoading = true;
             let params = new FormData();
             params.append('name',this.projectDetail.name);
             params.append('project_type',this.projectDetail.project_type);
             params.append('product',this.projectDetail.product);
             params.append('start_time',this.projectDetail.start_time);
             params.append('end_time',this.projectDetail.end_time);
             params.append('intro',this.projectDetail.intro);
             params.append('sample',this.projectDetail.sample.name?this.projectDetail.sample:'');
            this.$http.put(this.$conf.env.editProject_prodect + this.$route.query.equipmentID + '/', params, true).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        VerificationData(){
            if(!this.projectDetail.name||
                !this.projectDetail.project_type||
                !this.projectDetail.start_time||
                !this.projectDetail.end_time||
                !this.projectDetail.intro||
                !this.projectDetail.sample
            ){
                this.$message({ message:'*为必填项哦' , type: 'warning'}); 
                return false;
            }else{
                if(this.prodectList.length >0 && !this.projectDetail.product){
                    this.$message({ message:'请选择产品哦' , type: 'warning'}); 
                    return false;
                }else{
                    return true;
                }
                
            }
        }
    },
    mounted(){
        this.$route.query.flag == 1 ?  '':this.$route.query.flag == 2 ?this.getProject_projectDetail(): this.getTest_projectDetail();
        this.getProject_users();
        this.getProject_produceList();
    }
}
</script>
<style lang="scss" scoped>
.addProjectAppoinment{
     padding-top: .62rem;
     overflow-y: scroll;
    .addProjectAppoinment_index_header{
        padding-left: .41rem;
        height: .18rem;
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
        height: calc(100% - 2.8rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .el-input{
                width: 4rem;
            }
            .guaranteeName{
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .7rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                textarea{
                    border:0;
                    width: 9.56rem;
                    height: 2.66rem;
                    font-size: .2rem;
                }
                textarea::placeholder{
                    color: #ccc;
                }
                
                textarea::-webkit-scrollbar{
                    width: .1rem;
                    height: .1rem;
                    background-color: #F5F5F5;
                }
                
                /*定义滚动条轨道 内阴影+圆角*/
                textarea::-webkit-scrollbar-track {
                    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #fff;
                }
                
                /*定义滑块 内阴影+圆角*/
                textarea::-webkit-scrollbar-thumb{
                    border-radius: .1rem;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: #ccc;
                }

            }
            input {
                width: 3rem;
                height: 0.48rem;
                font-size: 0.22rem;
                border: 1px solid #cccccc;
                padding: 0 0.15rem;
                font-weight: 200;
            }
            input::placeholder {
                color: #989898;
            }
            .updata{
                display: flex;
                margin-top: .14rem;
                flex-direction: column;
                .warnning{
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(7,166,149,1);
                    font-size: .2rem;
                    padding-top: .42rem;
                }
                .file_title{
                    width: auto!important;
                    margin-bottom: .14rem;
                    font-size: .24rem;
                    color: #333333;
                    margin-right: .26rem;
                }
                .file_box{
                    flex-direction: column;
                    
                    div{
                        margin-right: 0.27rem;
                        align-items: flex-end;
                        display: flex;
                        div{
                        width: .8rem;
                        height: .8rem;
                        border:1px dashed #08a695;
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            width: 50%;
                            height: 50%;
                            cursor: pointer;
                            display: block;
                            display: flex;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        }
                    }
                    .accessory{
                        width: .65rem;
                        height: .6rem;
                        display: flex;
                        margin-right: .12rem;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        font-size: .22rem;
                        color: #666666;
                        margin-top: .6rem;
                    }
                    .deleteFile{
                        color: #f20000;
                        margin-left: 1.06rem;
                        line-height: .23rem;
                        margin-top: .13rem;
                        font-size: .23rem;
                        display: block;
                    }
                    
                }
                
            }
            .first_child{
                p{
                    color:#333;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
            .textarea{
                margin-top: .05rem;
                height: auto;
                align-items: flex-start;
                div{
                    margin-left: .19rem;
                    position: relative;
                    border: 1px solid #cccccc;
                    padding: .16rem .3rem;
                }
                p{
                    color: #08a695;
                    position: absolute;
                    bottom: .1rem;
                    right: .2rem;
                }
            }
            
        }
        
        footer{
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:first-child{
                background: #f10000;
                border: 0;
            }
            button:last-child{
                background: #08a695;
            }
        }
    }
}
.addProjectAppoinment::-webkit-scrollbar{
    display: none;
}
</style>