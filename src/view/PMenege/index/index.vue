<template>
    <div class="PMenegeIndex body_main">
        <div class="userInfo listInfo">
            <div class="show_background userInfo">
                <div class="user_header">
                    <span>
                        <img src="http://pic40.nipic.com/20140424/18085978_175633400193_2.jpg" alt="">
                    </span>
                </div>
                <div class="user_content">
                    <h3>康复的·克拉克</h3>
                    <div class="edit_userinfo">
                        <span>个性便签</span>
                        <span></span>
                    </div>
                    <p>修养的话额修养的话额娃儿在寂静中开放娃儿在寂静中开放</p>
                    <footer >
                        <div  @click="$router.push({name:'LaboratoryPrincipalProject'})" class="list_table list_table_first" style="cursor:pointer;">
                            <span>23</span><span>负责产品</span>
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
                                    <div style="margin-bottom:.26rem;margin-top:.22rem;"><span>产品编号</span><input type="text"></div>
                                    <div style="margin-bottom:.14rem"><span>产品名称</span><input type="text"></div>
                                    <el-button type="primary" @click="setAddproject()">确定</el-button>
                                </div>
                            </div>
                            <div slot="reference" style="cursor:pointer;">
                                <span >23</span><span>添加产品</span>
                            </div>
                        </el-popover>
                        </div>
                    </footer>
                </div>
            </div>
            <div class="my_apply">
                <header class="show_background">我的应用</header>
                <ul class="main_list">
                    <li class="show_background" @click="$router.push({name:'calendar'})"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>项目配置</span></li>
                    <li class="show_background" @click="$router.push({name: 'testInfo'})"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>试验信息</span></li>
                    <li class="show_background" @click="$router.push({name: 'examine'})"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>审批</span></li>
                    <li class="show_background" @click="$router.push({name:'incurExpense'})"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>支出费用</span></li>
                </ul>
            </div>
            <div class="progress show_background">
                <el-carousel trigger="click" height="100%"  arrow="always" indicator-position='none' :autoplay='true'>
                    <el-carousel-item v-for="item in 4" :key="item">
                        <div class="project">
                            <span class="project_name">产品A</span>
                            <div class="lengent">
                                <div><span>待完成</span><span></span></div>
                                <div><span>已完成</span><span></span></div>
                                <div><span>状态</span><span>正常</span></div>
                            </div>
                            <el-progress type="circle"  stroke-width='18' :percentage="percentage" :color="colors"></el-progress>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="tableInfo listInfo ">
            <div class="my_dynamic schedule show_background">
                <header>
                    <span>项目动态</span>
                    <div style="display:flex;">
                        <span class="name">优先级</span>
                        <el-dropdown trigger="click" @command="handleCommand">
                        
                            <span class="el-dropdown-link">
                                {{fileItemIndex.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in fileItem" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </header>
                <div class="main_box">
                    <div class="header_list">
                        <ul>
                            <li>项目</li>
                            <li>试验</li>
                            <li>负责人</li>
                            <li>进度</li>
                            <li>状态</li>
                        </ul>
                    </div>
                    <div class="main_element">
                        <ul  :class="isHiddenBox?'hiddenHeight hidden_box': 'hidden_box'" :style="{'height': setHeight}">
                            <li>
                                <div class="title">
                                    <span >红旗轿车</span>
                                    <span class="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div class="element_principal">
                                            <i @click="setElementHidden"></i>
                                            <span class="element_principal_border"></span>
                                            <span class="element_principal_name">张张磊磊</span>
                                        </div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal lastChild"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal lastChild"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal lastChild"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal lastChild"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer_table ">
                <div class="bulletin_table show_background list">
                    <header>公告栏</header>
                    <div class="main_list">
                        <ul>
                            <li>
                                <span class="main_list_headerImg"><img src="" alt=""> </span>
                                <div class="list_table">
                                    <span>实验通知</span>
                                    <div><span>二夫人二哥二分</span><span>2018-12-04</span></div>
                                </div>
                            </li>
                            <li>
                                <span class="main_list_headerImg"><img src="" alt=""> </span>
                                <div class="list_table">
                                    <span>实验通知</span>
                                    <div><span>二夫人二哥二分</span><span>2018-12-04</span></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="delayed_alarm show_background list">
                    <header>延时报警</header>
                    <table>
                        <tr>
                            <th>项目</th>
                            <th>试验</th>
                            <th>负责人</th>
                        </tr>
                        <tr>
                            <td>实验三</td>
                            <td>高温试验箱</td>
                            <td>9:45</td>
                        </tr>
                        <tr>
                            <td>实验三</td>
                            <td>高温试验箱</td>
                            <td>9:45</td>
                        </tr>
                        <tr>
                            <td>实验三</td>
                            <td>高温试验箱</td>
                            <td>9:45</td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </div>
        <imgInfo @listInfoDetail="listInfoDetail()"/>
    </div>
</template>
<script>
import imgInfo from './timeTable'
export default {
    name:'PMenegeIndex',
    components:{imgInfo},
    data(){
        return{
            fileItem:[{name:'高',id:1},{name:'中',id:2},{name:'低',id:3}],
            fileItemIndex: {name:'高',id:1},
            percentage: 50,
            isHiddenBox: false,
            isAddproject: false,
            colors: [
                {color: '#09a695'},
            ]
        }
    },
    computed:{
        setHeight(){
            return 5*0.63 + 'rem'
        }
    },
    methods:{
        setElementHidden(){
            this.isHiddenBox = !this.isHiddenBox
        },
        setAddproject(){
            this.isAddproject = false
        },
        listInfoDetail(){
            this.$router.push({name:'listInfoDetail'})
        },
        handleCommand(command) {
            console.log(command)
            this.fileItemIndex = command;
        },
        
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
                    li{
                         display: flex;
                         height: .6rem;
                         padding-top: .06rem;
                         padding-left: .16rem;
                        .main_list_headerImg{
                            width: .3rem;
                            height: .3rem;
                            background: #08a695;
                            display: block;
                            margin-right: .08rem;
                        }
                        .list_table{
                            display: flex;
                            flex: 1;
                            flex-direction: column;
                            padding-right: .56rem;
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
.PMenegeIndex_upload{
    padding: 0!important;
    width: 3.26rem!important;
    .upload_BOX{
        header{
        // padding: .12rem .14rem .14rem;
        padding: 0 .14rem;
        height: .4rem;
        border-bottom: 1px solid #08a695;
        color: #333;
        display: flex;
        justify-content: space-between;
        line-height: .4rem;
        font-size: .14rem;
        }
        .from{
            // height: 1.56rem;
            padding: 0 .14rem;
            // display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: .14rem;
            
            input{
                width: 2rem;
                height: .26rem;
                border: 1px solid #08a695;
                margin-left: .08rem;
            }
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
}

</style>