<template>
    <index-home>
        <div class="index_topHeader main_body_html EquipmentengineerIndex_index">
            <!-- <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide> -->
                    <div class="show_background divNumber toplist" @click="goMalfunction()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>故障</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    <div class="show_background toplist divNumber bottom_text" @click="goupkeepEqupment()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>保养</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                        <div><p>今日任务<i>5个</i></p></div>
                    </div>
                    <div class="show_background toplist divNumber" @click="goResponsible()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>设备负责数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    <div class="show_background toplist divNumber" @click="gowatchManage()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>工装治具</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    <!-- <div class="show_background toplist divNumber" @click="goTeststandard()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>实验方法</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    <div class="show_background toplist divNumber" @click="goTestStandard()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>实验标准</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                    <div class="show_background toplist divNumber" @click="goTestWarning()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>报警日志</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div> -->
                <!-- </swiper-slide>
            </swiper> -->
        </div>  
            
    </index-home>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import indexHome from '../../../components/index'
export default {
    name:'EquipmentengineerIndex',
    components:{swiper, swiperSlide, indexHome},
    data() {
      return {
          swiperOption: {
            slidesPerView: 'auto',
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
        //故障
        goMalfunction(){
            this.$router.push({name:'malfunction'})
        },
        //保养
        goupkeepEqupment(){
            this.$router.push({name:'upkeepEqupment'})
        },
        //设备负责数
        goResponsible(){
            this.$router.push({name:'responsible'})            
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
.EquipmentengineerIndex_index{
    width: 100%;
    flex-wrap: nowrap;
    .swiper-container{
        width: 100%;
    }
    .swiper-slide{
        display: flex;
    }
    .divNumber{
        div{justify-content: center;}
        .number{
            height: auto!important;
        }
    }
    .toplist{
        width: 21.5%!important;
    }
    .bottom_text{
            justify-content: center;
            padding-right: .27rem;
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
