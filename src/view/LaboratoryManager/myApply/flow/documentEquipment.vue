<template>
    <div class="LaboratoryDocumentEquipment body_main" v-loading.fullscreen.lock="isLoading">
        <header class="LaboratoryDocumentEquipment_index_header">
            <h3>设备文档</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                     <div>
                        <span>设备名称：</span>
                        <p>{{equipmentDetail.name}}</p>
                    </div>
                    <div>
                        <span>设备编号：</span>
                        <p>{{equipmentDetail.num}}</p>
                    </div>
                </div>
            <div class="mian_text two_child">
                <div>
                    <span>设备操作指导书</span>
                    <a download="设备操作指导书" :href="equipmentDetail.operation_file" class="underline">查看</a>
                </div>
            </div>
             <div class="mian_text two_child">
                <div>
                    <span>设备人员安全指导书</span>
                    <a download="设备人员安全指导书" :href="equipmentDetail.safety_file" class="underline">查看</a>
                </div>
            </div>   
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'LaboratoryDocumentEquipment',
    data(){
        return{
            isLoading: true,
            equipmentDetail:{}
        }
    },
    mounted(){
        this.getEquipmentfilelist()
    },
    methods:{
        getEquipmentfilelist(){
            this.$http.get(this.$conf.env.getEquipmentfilelist + this.$route.query.equipmentID + '/').then(res =>{
                this.equipmentDetail = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.LaboratoryDocumentEquipment{
     padding-top: .42rem;
     overflow-y: scroll;
    .LaboratoryDocumentEquipment_index_header{
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
                height: .7rem;
                div{
                    display: flex;
                    span{
                        font-size: .24rem;
                        color: #333333;
                    }
                    a{
                        color: #07a695;
                        font-size: .24rem;
                    }
                    p{
                        font-size: .24rem;
                    }
                }
                
               
            }
            .first_child{
                div{
                    margin-right: .56rem;
                    p{
                        color:#666666;
                    }
                }
                div:last-child{
                    p{
                        color: #07a695;
                    }
                }
            }
            .two_child{
                div{
                    margin-right: 1.22rem;
                    span{
                        width: 2.27rem;
                        margin-right: .5rem;
                    }
                    span:last-child{
                        color: #07a695;
                        width: auto;
                        margin: 0;
                    }
                }
            }
        }
    }
}
.LaboratoryDocumentEquipment::-webkit-scrollbar{
    display: none;
}
</style>