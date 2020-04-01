<template>
     <div class="imgInfo listInfo show_background">
            <ul  @click="listInfo()">
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_one_header.png" alt=""></span>
                        <span>06试生产</span>
                    </div>
                    <div class="boxImg_bg"><p>{{projectFlow.info6}}</p></div>
                    <span>{{projectFlow.start6}}-{{projectFlow.end6}}</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_two_header.png" alt=""></span>
                        <span>05生准条件确认</span>
                    </div>
                    <div class="boxImg_bg"><p>{{projectFlow.info5}}</p></div>
                    <span>{{projectFlow.start5}}-{{projectFlow.end5}}</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_there_header.png" alt=""></span>
                        <span>04生准启动</span>
                    </div>
                    <div class="boxImg_bg"><p>{{projectFlow.info4}}</p></div>
                    <span>{{projectFlow.start4}}-{{projectFlow.end4}}</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_fore_header.png" alt=""></span>
                        <span>03造型决定</span>
                    </div>
                    <div class="boxImg_bg"><p>{{projectFlow.info3}}</p></div>
                    <span>{{projectFlow.start3}}-{{projectFlow.end3}}</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_five_header.png" alt=""></span>
                        <span>01项目前提</span>
                    </div>
                    <div class="boxImg_bg"><p>{{projectFlow.info1}}</p></div>
                    <span>{{projectFlow.start1}}-{{projectFlow.end1}}</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_six_header.png" alt=""></span>
                        <span>02方案确认</span>
                    </div>
                    <div class="boxImg_bg"><p>{{projectFlow.info2}}</p></div>
                    <span>{{projectFlow.start2}}-{{projectFlow.end2}}</span>
                </li>
            </ul>
            <el-dropdown trigger="click" @command="handleCommand" >
                <span class="el-dropdown-link">
                    {{fileItemIndex.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown"   class ='imgInfo_listInfo_element' >
                    <el-dropdown-item v-for="item in fileItem" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

</template>
<script>
export default {
    data(){
        return{
            fileItem:[],
            fileItemIndex: {},
            projectFlow:{}
        }
    },
    methods:{
        listInfo(){
            this.$emit('listInfoDetail')
        },
        handleCommand(command) {
            this.fileItemIndex = command;
            this.$parent.fileItemIndex = command;
            this.getPm_project_productFlow(command.id);
        },
         //产品列表
        getPm_projectList(){
            this.$http.get(this.$conf.env.getPm_projectList).then(res =>{
                this.fileItem = res.data;
                if(res.data.length){
                    this.fileItemIndex = res.data[0];
                    this.$parent.fileItemIndex = res.data[0];
                    this.getPm_project_productFlow(res.data[0].id);
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getPm_project_productFlow(ID){
           this.$http.get(this.$conf.env.getPm_project_productFlow + ID ).then(res =>{
                this.projectFlow = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            }) 
        }
    },
    mounted(){
        this.getPm_projectList();//产品列表
    }
}
</script>
<style lang="scss" scoped>
.imgInfo{
        width: 35%;
        background: #fff url('../../../assets/img/PMenege/index/PMenegeIndex_bg.png') no-repeat 0 0 / 101% 101%!important;
        border-radius: .06rem;
        // height: 97%;
        position: relative;
        .el-dropdown{
            position: absolute;
            top: 0;
            right: 0;
            .el-dropdown-link{
                // line-height: .52rem;
                margin-top: .24rem;
                margin-right: .34rem;
                font-size: .2rem;
                display: block;
                color: #08a695; 
                cursor: pointer;
            }
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            padding-left: .24rem;
            height: 100%;
            padding-top: .16rem;
            overflow: hidden;
            li{
                height: 2rem;
                width: 2rem;
                font-size: .14rem;
                line-height: .34rem;
                text-align: center;
                .boxImg_bg{
                    height: .94rem;
                    width: 100%;
                    // padding: 0 .2rem;
                    p{
                        padding: 0.05rem .3rem;
                        line-height: .23rem;
                        height: 100%;
                        overflow: scroll;
                        color: #fff;
                        font-size: .12rem;
                    }
                    p::-webkit-scrollbar{
                        display: none;
                    }
                }
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .header_img{
                        width: .5rem;
                        height: .5rem;
                        border-radius: 50%;
                        overflow: hidden;
                        display: block;
                        img{
                            width: 100%;
                            display: block;
                        }
                    }
                    span{
                        font-size: .18rem;
                        line-height: .32rem;
                    }
                }
            }
            li:first-child{
                .boxImg_bg{
                    background: url('../../../assets/img/PMenege/index/PMenegeIndex_one.png') 0 0 / 100% 100%;
                }
                span{
                    color: #51c3f0;
                }
            }
            li:nth-child(2n+1){
                margin-right: 30%;
                
            }
            li:nth-child(2){
                margin-top: .78rem;
                .boxImg_bg{
                        background: url('../../../assets/img/PMenege/index/PMenegeIndex_two.png') 0 0 / 100% 100%;
                }
                span{
                    color: #ef4e89;
                }
            }
            li:nth-child(3){
                margin-top: -.78rem;
                .boxImg_bg{
                    background: url('../../../assets/img/PMenege/index/PMenegeIndex_there.png') 0 0 / 100% 100%;
                }
                span{
                    color: #842e91;
                }
            } 
            li:nth-child(4){
                margin-top: .4rem;
                .boxImg_bg{
                    background: url('../../../assets/img/PMenege/index/PMenegeIndex_fore.png') 0 0 / 100% 100%;
                }
                span{
                    color: #f8a15a;
                }
            }
            li:nth-child(5){
                margin-top: .9rem;
                margin-left: -.24rem;
                margin-right: 30%;
                .boxImg_bg{
                    background: url('../../../assets/img/PMenege/index/PMenegeIndex_five.png') 0 0 / 100% 100%;
                }
                span{
                    color: #4485ad ;
                }
            }
            li:nth-child(6){
                margin-left: .58rem;
                .boxImg_bg{
                    background: url('../../../assets/img/PMenege/index/PMenegeIndex_six.png') 0 0 / 100% 100%;
                }
                span{
                    color: #83c77c;
                }
            }
        }
    }
   
</style>