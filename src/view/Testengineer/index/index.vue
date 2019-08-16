<template>
    <index-home>
        <div class="index_topHeader main_body_html Testengineer_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goMissionUnaccomplish()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>已完成试验任务</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                     </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="gounMissionUnaccomplish()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>未完成试验任务</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                        <div><p>今日任务<i>5个</i></p></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goCultivate()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>已培养人数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="gowatchManage()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>值班天数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goTeststandard()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>实验方法</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goTestStandard()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>实验标准</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goTestWarning()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>报警日志</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>  
            
    </index-home>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import indexHome from '../../../components/index'
export default {
    name:'index',
    components:{swiper, swiperSlide, indexHome},
    data() {
      return {
          swiperOption: {
            slidesPerView: '4',
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
      }
    },  
    mounted() {
    },
    computed:{
    },
    methods:{
        /**@name 页面跳转 */
        //完成
        goMissionUnaccomplish(){
            this.$router.push({name:'missionUnaccomplish'})
        },
        //未完成
        gounMissionUnaccomplish(){
            this.$router.push({name:'unMissionUnaccomplish'})
        },
        //管理事项
        goCultivate(){
            this.$router.push({name:'cultivate'})            
        },
        //信息发布
        gowatchManage(){
            this.$router.push({name:'watchManage'})
        },
        //试验方法
        goTeststandard(){
            this.$router.push({name:'testMethods'})
        },
        //实验标准
        goTestStandard(){
            this.$router.push({name:'testStandard'})
        },
        //报警日志
        goTestWarning(){
            this.$router.push({name:'testWarning'})
        },
    }
}
</script>
<style lang="scss">
.Testengineer_index{
    width: 100%;
    flex-wrap: nowrap;
    .swiper-container{
        width: 100%;
    }
    .divNumber{
        div{justify-content: center;}
        .number{
            height: auto!important;
        }
    }
    .toplist{
        width: 3.35rem!important;
        margin-right: .22rem;
    }
    .bottom_text{
            justify-content: center;
            p{
                letter-spacing: .05rem;
                font-size:.22rem;color:#333;
                i{
                    color: #2A23B5;
                }
            }
        }
}

</style>
