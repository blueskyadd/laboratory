<template>
  <el-dialog  class="dialog"  :title="popUptitle" :visible.sync="dialogVisible" :width="setWidth" :before-close="handleClose">
    <slot></slot>
</el-dialog>
</template>

<script>
  export default {
    props:{
        setWidth:String,
        popUptitle:String
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
  };
</script>
<style lang="scss" >
.dialog{
    .el-dialog__header{
        display: flex;
        padding: .29rem .38rem 0;
        .el-dialog__title{
            font-size: .32rem;
            color: #333333;
            line-height: .32rem;
        }
        .el-dialog__headerbtn{
            top: .29rem;
            right: .38rem
        }
        .el-dialog__close{
          color: #333;
          font-size: .23rem;
        }
    }
    .el-dialog__body{
        padding: 0 .58rem .3rem;
        overflow: hidden;
        height: 100%;
    }
    .el-dialog__body>div{
      height: calc(100% - .61rem);
      overflow-y: scroll;
    }
    .el-dialog__body>div::-webkit-scrollbar{
      display: none;
    }
}

</style>
