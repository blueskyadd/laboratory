<template>
    <index-home>
        <div class="index_topHeader main_body_html">
            <div class="show_background divNumber toplist" @click="goTaskAllocation()">
                <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>任务分配</span></div>
                <div class="number"><yd-countup :endnum="allocation" :duration="1" >{{allocation}}</yd-countup><span>份</span></div>
            </div>
            <div class="show_background toplist divNumber" @click="goTaskreview()">
                <div><img src="../../../assets/img/LabManager/index/audit.png" alt=""><span>任务审核</span></div>
                <div class="number"><yd-countup :endnum="audit" :duration="1" >{{allocation}}</yd-countup><span>个</span></div>
            </div>
            <div class="show_background toplist img_text" @click="goManagement()"><img src="../../../assets/img/LabManager/index/manage.png" alt=""><span>管理事项</span></div>
            <div class="show_background toplist img_text" @click="goinformationPublish()"><img src="../../../assets/img/LabManager/index/information.png" alt=""><span>信息发布</span></div>
        </div>
    </index-home>
</template>
<script>

import indexHome from '../../../components/index'
export default {
    name:'index',
    components:{indexHome},
    data() {
      return {
          allocation: 0,
          audit: 0
      }
    },
    mounted(){
        this.$emit('headerTitle','实验室信息化管理系统-实验室管理员');
        this.getTaskNumber()
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
    },
    methods:{
        /**@name 页面跳转 */
        //项目分配页
        goTaskAllocation(){
            this.$router.push({name:'unAllocation'}) 
        },
        //任务审核
        goTaskreview(){
            this.$router.push({name:'Taskreview'})
        },
        //管理事项
        goManagement(){
            this.$router.push({name:'management'})            
        },
        //信息发布
        goinformationPublish(){
            this.$router.push({name:'informationPublish'})
        },
        getTaskNumber(){
            this.$http.get(this.$conf.env.getTaskNumber).then(res =>{
                this.audit = res.data.audit;
                this.allocation = res.data.allocation;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss">


</style>
