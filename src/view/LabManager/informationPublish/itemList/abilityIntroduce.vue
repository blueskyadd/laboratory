<template>
  <div class="informationPublish_abilityIntroduce">
      <div class="box">
          <div class="textarea" >
            <textarea placeholder="输入实验室能力介绍" v-model="abilityIntroduceText"></textarea>
            <span>{{abilityIntroduceText.length}}/8000</span>
        </div>
        <el-button type="primary" @click="createdAbilityintroduce()">发布</el-button>
      </div>
      
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name:'abilityIntroduce',
    inject:['reload'],
    data(){
        return{
            abilityIntroduceText:''
        }
    },
    methods:{
        createdAbilityintroduce(){
            this.$http.post(this.$conf.env.createdAbilityintroduce,{"text":this.abilityIntroduceText}).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '发布成功,快去首页查看吧', type: 'success'});
                    let _this = this;
                    setTimeout(()=>{
                        _this.reload();
                    },1000)
                }else{
                    this.$message({ message: '发布失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getAbilityintroduce(){
            this.$http.get(this.$conf.env.getAbilityintroduce).then(res =>{
                this.abilityIntroduceText = res.data.text
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        }
    },
    mounted(){
        this.getAbilityintroduce()
    },
    
}
</script>
<style lang="scss">
.informationPublish_abilityIntroduce{
    height: calc(100% - 1rem);
    justify-content: space-between;
    .box{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 85%;
        .textarea{
            border: 1px solid #ddd;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding:.15rem .3rem;
            margin-left: .55rem;
            margin-top: .5rem;
            height: calc(100% - 4rem);
            textarea{
                width: 100%;
                flex: 1;
                font-size: .24rem;
            }
            span{
                font-size: .24rem;
                color: #14a596;
            }
        }
        button{
            align-self:flex-end;
            margin-top: .3rem;
             background: #08a795!important;
            font-size: .25rem!important;
            padding: .1rem .32rem!important;
            color: #fff!important;
            border: 0!important;
        }
    }
    
}
</style>