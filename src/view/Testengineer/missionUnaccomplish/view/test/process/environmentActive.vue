<template>
    <div class="environmentActive_index body_main">
        <header class="environmentActive_index_header">
            <h3>实验环境搭建管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
            <div class="Taskreview_index_header_link">
                <router-link replace  to="/Testengineer/environmentActive/material" tag="span">物料清单</router-link>
                <router-link replace  to="/Testengineer/environmentActive/equipment" tag="span">设备清单</router-link>
                <router-link replace  to="/Testengineer/environmentActive/methods" tag="span">试验方法</router-link>
            </div>
        </header>
        <div class="taskName">
            <span>项目名称：</span>
            <p class="ProjectName" :style="{'width': $route.path == '/Testengineer/environmentActive/equipment' ? 'auto':'3rem'}">控福控福智能控福智能智能-硬件部</p>
            <span  v-if="$route.path != '/Testengineer/environmentActive/equipment'">委托公司部门：</span>
            <p class="companyName"  v-if="$route.path != '/Testengineer/environmentActive/equipment'">控福控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能控福智能智能-硬件部</p>
            <span @click="addmaterial" v-if="$route.path == '/Testengineer/environmentActive/material'" class="underline addmaterial">添加</span>
        </div>
         <router-view ref="methods"></router-view> 
        
    </div>
</template>
<script>
export default {
    name: 'environmentActive',
    data(){
        return{
           
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'index'})
        },
        searchDetail(){

        },
        addmaterial(){
            this.$refs.methods.editquipment('添加物料', true)
        }
    }
}
</script>
<style lang="scss">
.environmentActive_index{
@import '../../../../../../style/Testengineer/teskName.scss';
    padding-top: .42rem;
    .environmentActive_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .43rem;
        .Taskreview_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: 1.78rem;
            font-size: .24rem;
            span{
                margin-right: .38rem;
                color: #999999;
                cursor: pointer;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
            
        }
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
            margin-right: 。32rem;
        }
    }
    
    //斑马线
    .warning-row{
        background:#f6f6f6;
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
