<template>
  <div id="app" >
     <!-- <div id="box" :style="{
	            'transformOrigin':'center top',
	            'transform':`scale(${scalseNum},${scalseNum})`,'-webkit-transform':`scale(${scalseNum},${scalseNum})`,'-moz-transform':`scale(${scalseNum},${scalseNum})`,'-o-transform':`scale(${scalseNum},${scalseNum})`,'-ms-transform':`scale(${scalseNum},${scalseNum})`
	        }"> -->
        <WebHeader v-if="header_show" :setHeaderTitle='setHeaderTitle'/>
        <router-view v-if="isRouterAlive" @headerShow="headerShow" @headerTitle='headerTitle'   />
    <!-- </div> -->
     
  </div>
</template>

<script>
import WebHeader from './components/header';
import { all } from 'q';
export default {
  name: 'App',
  components: { WebHeader},
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
      isLoading: true,
      scalseNum: 2, //缩放比例
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
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // //计算缩放比例
    // resize_window() {
    //     let w_height = Number(document.documentElement.clientHeight / 1080);
    //     this.scalseNum = w_height;
    // }
  },
  mounted(){
    // this.resize_window();
    // window.addEventListener('resize', () => {
    //     this.resize_window();
    // });
  }
}
</script>

<style lang="scss" scoped>
#box {
	// width:100%;
	// height:100%;
	// transform-origin:center top 0px;
	// position:relative;
	// left:50%;
	// margin-left:-960px;
}

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
            cursor: pointer;
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
