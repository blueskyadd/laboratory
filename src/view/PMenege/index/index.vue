<template>
    <div class="PMenegeIndex body_main" v-loading.fullscreen.lock="isLoading">
        <div class="userInfo listInfo">
            <div class="show_background userInfo">
                <div class="user_header">
                    <span>
                        <img :src="userInfoDetail.avatar" alt="">
                    </span>
                </div>
                <div class="user_content">
                    <h3>{{userInfoDetail.name}}</h3>
                    <div class="edit_userinfo">
                        <span>个性便签</span>
                        <el-popover
                            placement="top-start"
                            v-model="isUserEdit"
                            width="200"
                            trigger="click"
                            popper-class='PMenegeIndex_upload'
                            >
                            <div class="upload_BOX">
                                <header>编辑信息<span></span></header>
                                <div class="from">
                                    <div class="userImgurl" style="margin-bottom:.26rem;margin-top:.22rem;">
                                        <span class="userTitle"><i class="importantData">*</i>头像</span>
                                        <div>
                                            <input type="file" ref="file" style="display:none" @change="updataFile">
                                            <span class="fileImg"><img :src="editUserInfo.avatar"  alt=""></span>
                                            <span class="addfile"  @click="updataUserImg()"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span>
                                        </div>
                                    </div>
                                    <div style="margin-bottom:.14rem"><span><i class="importantData">*</i>个性签名</span><input v-model="editUserInfo.intro" type="text"></div>
                                    <el-button type="primary" @click="editUser_infoDetail()">确定</el-button>
                                </div>
                            </div>
                            <span slot="reference" style="cursor:pointer;"><img src="../../../assets/img/PMenege/index/editUser.png" alt=""></span>
                        </el-popover>
                        
                    </div>
                    <p>{{userInfoDetail.intro}}</p>
                    <footer >
                        <div  @click="$router.push({name:'LaboratoryPrincipalProject'})" class="list_table list_table_first" style="cursor:pointer;">
                            <span>{{userInfoDetail.product}}</span><span>负责产品</span>
                        </div>
                        <div class="list_table">
                        <el-popover
                            placement="top-start"
                            v-model="isAddproject"
                            width="200"
                            trigger="click"
                            popper-class='PMenegeIndex_upload'
                            >
                            <div class="upload_BOX">
                                <header>添加产品<span></span></header>
                                <div class="from">
                                    <div style="margin-bottom:.26rem;margin-top:.22rem;"><span><i class="importantData">*</i>产品编号</span><input v-model="produceInfo.number" type="text"></div>
                                    <div style="margin-bottom:.14rem"><span><i class="importantData">*</i>产品名称</span><input type="text" v-model="produceInfo.name"></div>
                                    <el-button type="primary" @click="created_produce()">确定</el-button>
                                </div>
                            </div>
                            <div slot="reference" style="cursor:pointer;">
                                <span ><img src="../../../assets/img/PMenege/index/plus.png" alt=""></span><span>添加产品</span>
                            </div>
                        </el-popover>
                        </div>
                    </footer>
                </div>
            </div>
            <div class="my_apply">
                <header class="show_background">我的应用</header>
                <ul class="main_list">
                    <li class="show_background" @click="$router.push({name:'calendar'})"><img src="../../../assets/img/PMenege/index/calendar.png" alt=""><span>项目配置</span></li>
                    <li class="show_background" @click="$router.push({name: 'testInfo'})"><img src="../../../assets/img/PMenege/index/testInfo.png" alt=""><span>试验信息</span></li>
                    <li class="show_background" @click="$router.push({name: 'examine'})"><img src="../../../assets/img/PMenege/index/examine.png" alt=""><span>审批</span></li>
                    <li class="show_background" @click="$router.push({name:'incurExpense'})"><img src="../../../assets/img/PMenege/index/incurExpense.png" alt=""><span>支出费用</span></li>
                </ul>
            </div>
            <div class="progress show_background">
                <el-carousel trigger="click" height="100%"  arrow="always" indicator-position='none' :autoplay='true'>
                    <el-carousel-item v-for="item in projectSchedule" :key="item.id">
                        <div class="project">
                            <span class="project_name">{{item.name}}</span>
                            <div class="lengent">
                                <div><span>待完成</span><span></span></div>
                                <div><span>已完成</span><span></span></div>
                                <div><span>状态</span><span>{{item.status}}</span></div>
                            </div>
                            <el-progress type="circle"  stroke-width='18' :percentage="toPoint(item.pct)" :color="colors"></el-progress>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="tableInfo listInfo ">
            <project-dynamic></project-dynamic>
            <div class="footer_table ">
                <div class="bulletin_table show_background list">
                    <header>公告栏</header>
                    <div class="main_list" >
                        <ul ref="bulletin_table_scroll" @scroll="getPm_noticeListLoadmore" >
                            <li v-for="item in noticeList" :key="item.id">
                                <span class="main_list_headerImg"><img src="../../../assets/img/PMenege/index/smallBell.png" alt=""> </span>
                                <div class="list_table">
                                    <span class="title">实验通知</span>
                                    <div><span>{{item.info}}</span><span>{{item.test_end_time}}</span></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="delayed_alarm show_background list">
                    <header>延时报警</header>
                    <div>
                        <table>
                            <tr>
                                <th>项目</th>
                                <th>试验</th>
                                <th>负责人</th>
                            </tr>
                            <tr v-for="item in delayedList" :key="item.id">
                                <td>{{item.experiment_project}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.engineer}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <imgInfo @listInfoDetail="listInfoDetail()"/>
    </div>
</template>
<script>
import imgInfo from './timeTable';
import VerificationData from '../../../components/VerificationData';
import projectDynamic from '../../../components/projectDynamic'
export default {
    name:'PMenegeIndex',
    components:{imgInfo, projectDynamic},
    data(){
        return{
            percentage: 50,
            isAddproject: false,
            isUserEdit: false,
            colors: [
                {color: '#09a695'},
            ],
            isLoading: true,
            userInfoDetail:{},//个人信息(显示)
            editUserInfo:{"avatar":'', "intro":''},//修改个人信息
            produceInfo:{"name":'', "number":''},//创建产品信息
            noticeList:[],//公告栏列表
            isNoticeListScroll: true,//公告栏上拉加载
            noticeList_pagenumber: 1,
            delayedList:[],//延时报警列表
            projectSchedule:[],//产品进度列表
        }
    },
    methods:{
        toPoint(percent){
   		 	var str=percent.replace("%","");
   		 	return str == 0.0 ? 0 : parseInt(str);
		},
        listInfoDetail(){
            this.$router.push({name:'listInfoDetail'})
        },
        /**@name 获取个人信息 */
        getUser_infoDetail(){
            this.$http.get(this.$conf.env.getUser_infoDetail).then(res =>{
                this.userInfoDetail = res.data;
                this.editUserInfo.avatar = res.data.avatar;
                this.editUserInfo.intro = res.data.intro;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 公告栏 */
        getPm_noticeList(){
            this.$http.get(this.noticeList_pagenumber == 1 ? this.$conf.env.getPm_noticeList: this.$conf.env.getPm_noticeList + '?p=' + this.noticeList_pagenumber).then(res =>{
                this.isNoticeListScroll = res.data.next? true:false;
                this.noticeList = this.noticeList_pagenumber == 1 ? res.data.results:this.noticeList.concat(res.data.results);
            }).catch(err =>{
                this.isNoticeListScroll = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        //公告栏加载
        getPm_noticeListLoadmore(e){
            if(e.target.scrollTop > e.target.clientHeight - 15 && this.isNoticeListScroll){
                this.noticeList_pagenumber += 1;
                this.getPm_noticeList();
            }
        },
        /**@name延时报警 */
        getPm_delayedList(){
            this.$http.get(this.$conf.env.getPm_delayedList).then(res =>{
                this.delayedList = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 修改个人信息 */
        //头像上传
        updataUserImg(){
            this.$refs.file.click();
        },
        updataFile(e){
            this.$updataFile.updataFile(e.target.files[0],res =>{
                this.editUserInfo.avatar = res.data.file;
            },this)
        },
        editUser_infoDetail(){
            if(!VerificationData.VerificationData(this.editUserInfo)) return;
            this.$http.put(this.$conf.env.editUser_infoDetail,this.editUserInfo).then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    this.getUser_infoDetail();
                    this.isUserEdit = false;
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name 创建产品 */
        created_produce(){
            if(!VerificationData.VerificationData(this.produceInfo)) return;
            this.$http.post(this.$conf.env.created_produce,this.produceInfo).then( res =>{
                if(res.status == '201'){
                    this.$message({ message: '添加成功', type: 'success'});
                    this.getUser_infoDetail();
                    this.isAddproject = false;
                    this.produceInfo = {"name":'', "number":''};
                }else{
                    this.$message({ message: '添加失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //产品进度
        getPm_priject_schedule(){
            this.$http.get(this.$conf.env.getPm_priject_schedule).then(res =>{
                console.log(res.data)
                this.projectSchedule = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getUser_infoDetail();//获取个人信息
        this.getPm_noticeList();//公告栏
        this.getPm_delayedList();//延时报警
        this.getPm_priject_schedule();//产品进度
    }
}
</script>
<style lang="scss">
.PMenegeIndex{
    @import '../../../style/pm/index.scss';
    padding: .2rem .3rem .17rem;
    width: auto;
    background: #e4f4f4;
    display: flex;
    .listInfo{
        height: calc(100% - .37rem);
        overflow: hidden;
        border-radius: .06rem;
        background: transparent;
    }
     
        
    .userInfo{
        width: 15%;
        margin-right: .16rem;
        .user_content{
            padding-top: 15.8%;
            height: 56%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .edit_userinfo{
                padding: 11.3% .26rem 3.1% .34rem;
                display: flex;
                justify-content: space-between;
                span:last-child{
                    width: .2rem;
                    height: .2rem;
                    display: flex;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .userInfo{
            height: 45%;
            width: 100%;
            footer{
                display: flex;
                flex-direction: initial!important;
                justify-content: space-around!important;
                .list_table,.el-popover__reference{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 48%;
                    height:100%;
                    
                }
                .list_table_first{
                    border-right: 1px solid #e4f4f4;
                }
                .el-popover__reference{
                    width: 100%;
                }
            }
        }
        .my_apply{
            width: 100%;
            margin-top: .12rem;
            height: 28.2%;
            header{
                height: 17.9%;
                display: flex;
                align-items: center;
            }
            .main_list{
                height: 84%;
                li{
                    height: 45%;
                    img{
                        height: 56%;
                        margin: 7% 0 9%;
                    }
                    span{
                        line-height: .16rem;
                    }
                }
            }
        }
        .progress{
            width: 100%;
            height: 22.1%;
            background: #fff;
            border-radius: .06rem;
            margin-top: .14rem;
            position: relative;
            padding: .16rem 0;
            .el-carousel{
                height: 100%;
            }
            .el-progress__text{
                color: #08a695;
                font-size: .3rem!important;
            }
            .el-progress--circle{
                margin-left: .3rem;
                margin-top: .27rem;
            }
            .project{
                position: relative;
            }
            .el-carousel__arrow{
                width: .2rem!important;
                height: .2rem!important;
            }
            .el-carousel__arrow i{
                color: #08a695;
                font-size: .16rem;
            }
            .el-progress-circle{
                width: 1.56rem!important;
                height: 1.56rem!important;
            }
            span{
                display: block;
                font-size: .16rem;
                color: #969696;
            }
            .project_name{
                padding-left: .18rem;
            }
            .lengent{
                position: absolute;
                right: .07rem;
                div{
                    display: flex;
                    line-height: .26rem;
                    align-items: center;
                    span{
                        font-size: .14rem;
                    }
                    span:first-child{
                        margin-right: .12rem;
                        width: 54%;
                        text-align: right;
                    }
                    span:last-child{
                        width: .4rem;
                        height: .1rem;
                        background: #08a695;
                        border-radius: .06rem;
                    }
                }
                div:first-child{
                    span:last-child{
                        background: #d0d0d0;
                    }
                }
                div:last-child{
                    span:last-child{
                        width: auto;
                        height: auto;
                        background: none;
                        color: #08a695;
                    }
                }
                
            }
           
        }
    }
    .tableInfo{
        width: 48%;
        margin-right: .16rem;
        .schedule{
            height: 73.8%;
            width: 100%;
            background: #e4f4f4;
            border-radius: .06rem;
            header{
                height: 6.9%;
                display: flex;
                align-items: center;
            }
            ul{
                ul{
                    li:first-child{
                        .element_principal{
                            margin-right: 15%!important;
                        }
                    }
                }
            }
            .lastChild{
                width:35% !important;
            }
        }
        .footer_table{
            height: 24.4%;
            margin-top: .16rem;
            display: flex;
            justify-content: space-between;
            .list{
                height: 100%;
                width: 49%;
                background: #fff;
                height: 100%;
                border-radius: .06rem;
            }
            .bulletin_table,.delayed_alarm{
                header{
                    height: 21.7%;
                    display: flex;
                    align-items: center;
                    padding-left: .34rem;
                    font-size: .18rem;
                    color: #333;
                    border-bottom: 1px solid #e4f4f4;
                }
                .main_list{
                    width: 100%;
                    height: calc(100% - .5rem);
                    ul{
                        overflow-y: scroll;
                        height: 100%;;
                         li{
                            display: flex;
                            height: .6rem;
                            padding-top: .06rem;
                            padding-left: .16rem;
                            .main_list_headerImg{
                                width: .3rem;
                                height: .3rem;
                                display: flex; 
                                margin-right: .08rem;
                                img{
                                    width: 90%;
                                }
                            }
                            .list_table{
                                display: flex;
                                flex: 1;
                                flex-direction: column;
                                padding-right: .56rem;
                                .title{
                                    font-size: .16rem;
                                }
                                span{
                                    font-size: .14rem;
                                }
                                div{
                                    display: flex;
                                    justify-content: space-between;
                                    span:last-child{
                                        color: #999;
                                        margin-top: -.16rem;
                                    }
                                }
                            }
                        }
                    }
                   ul::-webkit-scrollbar{
                       width: 0.05rem;
                   }
                    
                }
                table{
                    padding-top: .11rem;
                    width: 100%;
                    font-size: .14rem;
                    color: #08a795;
                    background: #fff;
                    // height: 100%;
                    tr{
                        display: flex;
                        justify-content: space-around;
                        th{
                            line-height: .34rem;
                            color: #b0b0b0;
                        }
                        td{
                            line-height: .4rem;
                        }
                    }
                }
            }

        }
    }
    
}
</style>