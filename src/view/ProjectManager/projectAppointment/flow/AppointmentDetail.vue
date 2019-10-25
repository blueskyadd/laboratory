<template>
    <div class="AppointmentDetail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="proposer_index_header">
            <div>
                <h3>预约信息</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </div>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>项目名称：</span>
                    <p class="AppointmentDetailName">{{equipmentDetail.project}}</p>
                    <span>试验名称：</span>
                    <p style="color:#999999">{{equipmentDetail.name}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>试验完成时间：</span>
                    <p class="AppointmentDetailName">{{equipmentDetail.end_time}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>委外负责人：</span>
                    <p>{{equipmentDetail.engineer.name}}</p>
                </div>
                <div class="mian_text first_child two_child">
                    <span>联系方式：</span>
                    <p>{{equipmentDetail.engineer.phone}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AppointmentDetail',
    data(){
        return{
            cause: '',//申请原因
            fileName: '指导书',
            options: [],
            isLoading: true,
            equipmentDetail:{}
        }
    },
    mounted(){
        this.getProject_appointDetail()
    },
    methods:{
        getProject_appointDetail(){
            this.$http.get(this.$conf.env.getProject_appointDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.isLoading = false;
                this.equipmentDetail = res.data;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss">
.AppointmentDetail{
     padding-top: .42rem;
     overflow-y: scroll;
    .main{
        display: flex;
        height: calc(100% - 4.05rem);
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
                .AppointmentDetailName{
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
.AppointmentDetail::-webkit-scrollbar{
    display: none;
}
</style>