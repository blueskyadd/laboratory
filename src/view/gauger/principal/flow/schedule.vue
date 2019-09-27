<template>
    <div class="schedule body_main" v-loading.fullscreen.lock="isLoading">
        <header class="proposer_index_header">
            <h3>计量进度</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>物料名称：</span>
                    <p class="scheduleName">{{meteringDetail.name}}</p>
                    <span>物料编号：</span>
                    <p style="color:#999999">{{meteringDetail.num}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>委托公司：</span>
                    <p class="scheduleName">{{meteringDetail.nominee_company}}</p>
                    <span>委托公司地址：</span>
                    <p style="color:#666666">{{meteringDetail.address}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>委外负责人：</span>
                    <p>{{meteringDetail.leader}}</p>
                </div>
                <div class="mian_text first_child two_child">
                    <span>联系方式：</span>
                    <p>{{meteringDetail.phone}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'schedule',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            options: [],
            isLoading: true,
        }
    },
    methods:{
        getGuager_meteringDetail(){
            this.$http.get(this.$conf.env.getGuager_meteringDetail +this.$route.query.equipmentID +'/' ).then(res =>{
                this.meteringDetail = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response.data?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getGuager_meteringDetail()
    }
}
</script>
<style lang="scss">
.schedule{
     padding-top: .42rem;
     overflow-y: scroll;
    .main{
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        // .el-select{
        //         width: 4rem;
        //         height: .52rem;
        .el-input{
            width: auto !important;
            margin-right: .88rem;
        }
        .inputText{
            border: 1px solid #ccc;
            margin-right: .88rem;
            padding: 0 .15rem;
            width: 3.7rem;
        }
        .el-input__inner, input{
            height: .52rem; 
            width: 4rem;
            font-size: .2rem;
            font-weight: 200;
        }
            // }
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .68rem;
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
                .scheduleName{
                    width: 2.6rem;
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
        }
    }
}
.schedule::-webkit-scrollbar{
    display: none;
}
</style>