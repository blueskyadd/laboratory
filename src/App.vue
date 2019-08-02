<template>
  <div id="app">
     <AppHeader v-if="header_show"/>
    <router-view @headerShow="headerShow" />
  </div>
</template>

<script>
import AppHeader from './components/header'
import { all } from 'q';
export default {
  name: 'App',
  components: { AppHeader},
  data(){
    return{
      header_show:true,
    }
  },
  methods:{
    headerShow(bool) {
      this.header_show = bool;
    },
  }
}
</script>

<style lang="scss" scoped>
header{
        height: .8rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 5px 0px rgba(12,3,6,0.2);
        padding: 0 .56rem 0 .36rem;
        display: flex;
        justify-content: space-between;
        .left_title{
            p{
                font-size:.36rem;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height: .8rem;
            }
        }
        .right_trake{
            display: flex;
            width: 2.91rem;
            justify-content: space-between;
            align-items: center;
            div{
                display: flex;
                img{
                    width: .38rem;
                    height: .38rem;
                    border: 1px solid #eee;
                }
                span{
                    font-size: .24rem;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
        }
    }
</style>
