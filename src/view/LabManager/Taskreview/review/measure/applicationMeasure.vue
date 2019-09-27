<template>
    <div class="applicationMeasure body_main" v-loading.fullscreen.lock="isLoading">
        <header class="applicationMeasure_index_header">
            <h3>申请计量</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                     <div>
                        <span>设备名称：</span>
                        <p>{{applicationMeasureSection.name}}</p>
                    </div>
                    <div>
                        <span>设备编号：</span>
                        <p>{{applicationMeasureSection.num}}</p>
                    </div>
                </div>
            <div class="mian_text two_child">
                <div>
                    <span>计量开始时间：</span>
                    <p>{{applicationMeasureSection.start_time}}</p>
                </div>
                <div>
                    <span>计量截止时间：</span>
                    <p>{{applicationMeasureSection.end_time}}</p>
                </div>
            </div>
            <div class="mian_text textarea">
                <div>
                    <span>计量原因</span>
                    <div :class="applicationMeasureSection.status == 1? '':'disabled'">
                        <textarea :disabled='applicationMeasureSection.status != 1'  v-model="applicationMeasureSection.cause" maxlength="800" placeholder="回零误差较大!" ></textarea>
                        <p class="number">{{applicationMeasureSection.cause.length}}/800</p>
                    </div>
                </div>
            </div>
                
            </div>
            <footer>
                <el-button type="primary" @click="editMeasure(false)" class="primary_err">不同意</el-button>
                <el-button type="primary" @click="editMeasure(true)">审批</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    name:'applicationMeasure',
    inject:['reload'],
    data(){
        return{
            isLoading: true,
            applicationMeasureSection:{
                "name":'',
                "num":'',
                "start_time":'',
                "end_time":'',
                "cause":'',
                "status":''
            }
        }
    },
    methods:{
        appltMeasure(){
            this.$http.get(this.$conf.env.appltMeasure + this.$route.query.measureID).then(res =>{
                console.log(res)
                this.applicationMeasureSection = res.data
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                 this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editMeasure(flag){
            if(this.applicationMeasureSection.status == 1){
                this.$http.post(this.$conf.env.editMeasure,{status:flag,id:this.$route.query.measureID}).then(res =>{
                    console.log(res)
                    if(res.status == '201'){
                        this.$message({ message: '审核成功', type: 'success'});
                        var _this = this;
                        setTimeout(()=>{
                            _this.reload();
                        },1000)
                    }else{
                        this.$message({ message: '审核失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.isLoading = false;
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                })
            }else{
                this.$message({ message: '该设备已经审核过,无需再次审核', type: 'warning'}); 
            }
            
        }
    },
    mounted(){
        this.appltMeasure()
    }
}
</script>
<style lang="scss" >
@import '../../../../../style/LabManager/main.scss';
.applicationMeasure{
     padding-top: .42rem;
     overflow-y: scroll;
    .applicationMeasure_index_header{
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
    
}
.applicationMeasure::-webkit-scrollbar{
    display: none;
}
</style>