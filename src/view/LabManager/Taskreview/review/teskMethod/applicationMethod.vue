<template>
    <div class="applicationMethod body_main" v-loading.fullscreen.lock="isLoading">
        <header class="applicationMethod_index_header">
            <h3>申请试验方法</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>试验方法名称：</span>
                    <p>{{testMethodsSection.name}}</p>
                </div>
                <div class="mian_text two_child ">
                    <span>申请时间：</span>
                    <p>{{testMethodsSection.create_time}}</p>
                </div>
                <div class="mian_text two_child">
                    <span>试验方法：</span>
                     <p class="underline">
                        <a :href="testMethodsSection.file" download="试验方法">点击查看</a></p>
                </div>
            </div>
            <footer>
                <el-button type="primary" class="primary_err"  @click="editUnTestMethodsDetail(3)"> 不同意</el-button>
                <el-button type="primary" @click="editUnTestMethodsDetail(2)">审批</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'applicationMethod',
    data(){
        return{
            testMethodsSection:{
                "name": '',
                "num": '',
                "file": '',
                "create_time":''
            },
            isLoading: true,
        }
    },
    mounted(){
        this.getUnTestMethodsDetail()
    },
    methods:{
        getUnTestMethodsDetail(){
            this.$http.get(this.$conf.env.getUnTestMethodsDetail + this.$route.query.testMethodsID + '/').then(res =>{
                this.testMethodsSection = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editUnTestMethodsDetail(number){
            this.isLoading = true;
            this.$http.put(this.$conf.env.editUnTestMethodsDetail + this.$route.query.testMethodsID + '/',{"status":number}).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '审批成功', type: 'success'});
                    var _this = this;
                        setTimeout(()=>{
                            _this.$router.back();
                        },1000)
                }else{
                    this.$message({ message: '审批失败', type: 'warning'});              
                }

            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.applicationMethod{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationMethod_index_header{
        padding-left: .41rem;
        height: .38rem;
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
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .85rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }

            }
            .first_child{
                p{
                    color:#333;
                }
            }
            .two_child{
                p,a{
                    color: #07a695;
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
.applicationMethod::-webkit-scrollbar{
    display: none;
}
</style>