<template>
     <div class="imgInfo listInfo show_background" @click="listInfo()">
            <ul>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_one_header.png" alt=""></span>
                        <span>06试生产</span>
                    </div>
                    <div class="boxImg_bg"></div>
                    <span>2018/05-2108/12</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_two_header.png" alt=""></span>
                        <span>05生准条件确认</span>
                    </div>
                    <div class="boxImg_bg"></div>
                    <span>2018/05-2108/12</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_there_header.png" alt=""></span>
                        <span>04生准启动</span>
                    </div>
                    <div class="boxImg_bg"></div>
                    <span>2018/05-2108/12</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_fore_header.png" alt=""></span>
                        <span>03造型决定</span>
                    </div>
                    <div class="boxImg_bg"></div>
                    <span>2018/05-2108/12</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_five_header.png" alt=""></span>
                        <span>01项目提前</span>
                    </div>
                    <div class="boxImg_bg"></div>
                    <span>2018/05-2108/12</span>
                </li>
                <li>
                    <div>
                        <span class="header_img"><img src="../../../assets/img/PMenege/index/PMenegeIndex_six_header.png" alt=""></span>
                        <span>02方案确认</span>
                    </div>
                    <div class="boxImg_bg"></div>
                    <span>2018/05-2108/12</span>
                </li>
            </ul>
            <el-dropdown trigger="click" @command="handleCommand" v-if="isElement" >
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
    props:{
        isElement:String
    },
    data(){
        return{
            fileItem:[{name:'高',id:1},{name:'中',id:2},{name:'低',id:3}],
            fileItemIndex: {name:'高',id:1},
            isElement:false
        }
    },
    methods:{
        listInfo(){
            this.$emit('listInfoDetail')
        },
        handleCommand(command) {
            console.log(command)
            this.fileItemIndex = command;
        },
    }
}
</script>
<style lang="scss" scoped>
.imgInfo{
        width: 35%;
        background: #fff url('../../../assets/img/PMenege/index/PMenegeIndex_bg.png') no-repeat 0 0 / 101% 101%!important;
        border-radius: .06rem;
        
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
                margin-right: 1.46rem;
                
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
                margin-right: 1.7rem;
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