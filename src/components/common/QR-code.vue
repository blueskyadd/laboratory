<template>
    <div class="bigbox" @click="close">
        <div class="box"></div>
        <div class="model">
            <img :src="qrCodeImg" alt="" srcset="">
        </div>

    </div>
</template>
<script>
export default {
    name: 'bianji',
    props:{
        qrCodeImg:{
            type: String,
            required: true
        }
    },
    data(){
      return{
      }
    },

    methods: {
      close(){
          this.$emit("change",false)
      },
    }
}
</script>
<style lang="scss" >
    .bigbox{
        position: fixed;
        width: 200%;
        top: .78rem;
        height: 100%;
        left: -10rem;
        z-index: 4;
        .box{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.4);
        }
        .model{
            width: 3.5rem;
            height: 3.5rem;
            border-radius: .05rem;
            position: fixed;
            left: 0; right: 0; top: 0; bottom: 0;
            background: #fff;
            margin: auto;
            img{
                width: 3.5rem;
                height: 3.5rem;
                display: block;
            }
        }
        
        
    }
    
</style>
