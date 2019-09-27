<template>
    <div class="environmentActive_index body_main">
        <header class="environmentActive_index_header">
            <h3>实验环境搭建管理</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
            <div class="Taskreview_index_header_link">
                <span :class="this.$route.path == '/Testengineer/environmentActive/material'?'router-link-active':'' "  @click="goMaterial()">物料清单</span>
                <span :class="this.$route.path == '/Testengineer/environmentActive/equipment'?'router-link-active':'' " @click="goEquipment()">设备清单</span>
                <span :class="this.$route.path == '/Testengineer/environmentActive/methods'?'router-link-active':'' "  @click="goMethods()">试验操作</span>
            </div>
        </header>
        <div class="taskName" >
            <span>项目名称：</span>
            <p class="ProjectName" :style="{'width': $route.path == '/Testengineer/environmentActive/equipment' ? 'auto':'3rem'}">{{$route.query.equipmentName}}</p>
            <span  v-if="$route.path != '/Testengineer/environmentActive/equipment'">公司-部门：</span>
            <p class="companyName"  v-if="$route.path != '/Testengineer/environmentActive/equipment'">{{labManagrInfo.lab}}-{{labManagrInfo.department}}</p>
            <span @click="addmaterial" v-if="$route.path == '/Testengineer/environmentActive/material'" class="underline addmaterial">添加</span>
        </div>
         <router-view ref="methods"></router-view> 
    </div>
</template>
<script>
import { nextTick } from 'q'
export default {
    name: 'environmentActive',
    data(){
        return{
            popUptitle:'',
            isUpslot:1,
            placeholderTexe:'搜索试验编号、名称',
            labManagrInfo:{},
           
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'TestengineerIndex'})
        },
        searchDetail(){
            
        },
        addmaterial(){
            this.$refs.methods.editquipment('添加物料', true)
        },
        goMaterial(){
            this.$router.replace({path: '/Testengineer/environmentActive/material',query:{equipmentID: this.$route.query.equipmentID,equipmentName: this.$route.query.equipmentName}})
        },
        goEquipment(){
            this.$router.replace({path: '/Testengineer/environmentActive/equipment',query:{equipmentID: this.$route.query.equipmentID,equipmentName: this.$route.query.equipmentName}})
        },
        goMethods(){
            this.$router.replace({path: '/Testengineer/environmentActive/methods',query:{equipmentID: this.$route.query.equipmentID,equipmentName: this.$route.query.equipmentName}})
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
        this.getEquipment_userinfoDetail();
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
            .router-link-exact-active,.router-link-active{
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
            margin-right: .32rem;
        }
    }
     .taskName{
        display: block;
        overflow: hidden;
        span{
            float: left;
        }
        p{
            float: left;
        }
        .addmaterial{
            float: right;
            margin-right: 1.55rem;
        }
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
}
</style>
