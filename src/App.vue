<template>
  <div id="app" >
     <AppHeader v-if="header_show" :setHeaderTitle='setHeaderTitle'/>
    <router-view v-if="isRouterAlive" @headerShow="headerShow" @headerTitle='headerTitle'   />
  </div>
</template>

<script>
import AppHeader from './components/header';
import { all } from 'q';
export default {
  name: 'App',
  components: { AppHeader},
  provide () {
    return {
      reload: this.reload,
    }
  },
  data(){
    return{
      header_show:true,
      setHeaderTitle:'实验室信息化管理系统',
      isRouterAlive: true,
      isLoading: true
    }
  },
  methods:{
    headerShow(bool) {
      this.header_show = bool;
    },
    headerTitle(title){
      this.setHeaderTitle = title
    },
    reload() {
      console.log('触发')
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
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
