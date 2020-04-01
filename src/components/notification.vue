<template>
    <div class="notification_index" v-loading.fullscreen.lock="isLoading">
        <header class="proposer_index_header">
            <div>
               <h3>消息通知</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span> 
            </div>
        </header>
        <div class="main_list">
            <ul >
                <li v-for="item in System_msg" :key="item.id">
                    <span class="head_portrait"><img src="http://img5.imgtn.bdimg.com/it/u=1200889471,2010793696&fm=26&gp=0.jpg" alt=""></span>
                    <div class="notification_content">
                        <div class="notification_header">
                            <span>{{item.title}}</span><span>{{item.create_time}}</span>
                        </div>
                        <div class="notification_content_text">
                            <p>{{item.content}}</p>
                            <div><span :style="{color:item.is_read == '未读' ?'#f10000':'#999'}">{{item.is_read}}</span><span class="underline" @click="lookDetail(item)">点击查看</span><span  class="underline" @click="deleteSystem_msg(item.id)">删除</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
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
        <popUp ref="popUp" setWidth='37.5%' :popUptitle='msgDetail.popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <p>{{msgDetail.popUpInfo}}</p>
                    </li>
                </ul>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from './common/popUp';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    name: 'notification',
    components:{popUp,swiper, swiperSlide},
    inject:['reload'],
    data(){
        return{
            System_msg:[],
            isLoading: true,
            msgDetail:{
                popUptitle:'',
                popUpInfo:'',
            },
            isgeSytem_msg: true,
            Sytem_msg_number:1,
            totalSum:0,//数据总数
            page_size : 9,//一页数据条数
            CurrentChange:1,//输入框绑定数据
        }
    },              
    methods:{
        getSystem_msg(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getSystem_msg  + '?page_size='+ this.page_size :this.$conf.env.getSystem_msg + '?p=' + pageNumber  + '&page_size='+ this.page_size).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.System_msg = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.isgeSytem_msg = false;
                if(err.status == '404'){
                    this.$message({ message:'已加载全部数据' , type: 'success'});
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                }
                
            })
        },
        lookDetail(data){
            this.setSystem_msg(data)
            this.msgDetail.popUptitle = data.title;
            this.msgDetail.popUpInfo = data.content;
        },
        setSystem_msg(data){
            this.$http.put(this.$conf.env.setSystem_msg + data.id + '/').then( res =>{
                data.is_read = '已读';
                this.$refs.popUp.dialogVisible = true;
                this.getSystem_number();
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        getSystem_number(){
            this.$http.get(this.$conf.env.getSystem_number).then(res =>{
                console.log(res)
                this.systemNumber = res.data.num;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        deleteSystem_msg(ID){
            this.$confirm('此操作将删除该通知, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteSystem_msg + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        this.reload();
                    }else{
                        this.$message({ message: '删除失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    if(err.response.status == '400'){
                        this.$message({ message:err.response.data, type: 'warning'});   
                    }else{
                        this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });          
            });
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getSystem_msg(pageNumber);
        },
    },

    mounted(){
        this.getSystem_msg(1);
    },
     watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 1 ? 1 :  newData*1;
                this.getSystem_msg(this.CurrentChange);
            }
        },
     }
}
</script>
<style lang="scss">
.notification_index{
    @import '../style/LabManager/management/index.scss';
    padding-top: .42rem;
    height: 100%;
    .proposer_index_header{padding-bottom: 0;}
    .main_list{
        overflow: hidden;
        height: calc(100% - 2.6rem);
        ul{

            li{
                padding: .36rem .58rem .22rem;
                border-bottom: 1px solid rgba(191,191,191,1);
                display: flex;
               .head_portrait{
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                    overflow: hidden;
                    display: block;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                .notification_content{
                    padding: .23rem 0  0 .38rem;    
                    width: calc(100% - 2.29rem);
                    .notification_header{
                        display: flex;
                        span{
                            font-size:.24rem;
                            font-family:Microsoft YaHei;
                            color:rgba(153,153,153,1);
                            display: block;
                        }
                        span:first-child{
                            margin-right: .46rem;
                        }
                    }
                    .notification_content_text{
                        p{
                            font-size:.22rem;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            line-height: .43rem;
                            text-indent: .44rem;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                        }
                        div{
                            float: right;
                            display: flex;
                            width: 3rem;
                            justify-content: space-around;
                            span{
                                font-size: .22rem;
                            }
                            span:first-child{
                                // margin-right: .45rem;
                            }
                            span:last-child{
                                color: #F20000;
                            }
                        }
                    }
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
                margin-top: .3rem;
                height: calc(100% - 1rem);
            }
            ul::-webkit-scrollbar{
                display: none;
            }
            li{
                display: flex;
                
                p{
                    font-size: .22rem;
                    flex: 1;
                    color: #333;
                    line-height: .4rem;
                }
            }
         }
}
</style>
