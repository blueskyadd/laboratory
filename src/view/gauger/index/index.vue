<template>
    <index-home>
        <div class="index_topHeader main_body_html gaugerIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goOverdue()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>已过计量期设备数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goPrincipal()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>负责计量设备数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                        <div><p>今日任务<i>5个</i></p></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goUnMeasure()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>30天未计量设备数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goScheduleIndex()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>计量中设备进度</span></div>
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
    name:'gaugerIndex',
    components:{swiper, swiperSlide, indexHome},
    data() {
      return {
          swiperOption: {
            slidesPerView: '4',
            // spaceBetween: 22,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
      }
    },  
    mounted(){
        this.$emit('headerTitle','实验室信息化管理系统-试验设备计量员')
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
    },
    computed:{
    },
    methods:{
        /**@name 页面跳转 */
        //已过计量期设备数
        goOverdue(){
            this.$router.push({name:'overdue'})
        },
        //负责计量设备数
        goPrincipal(){
            this.$router.push({name:'principal'})
        },
        //30天未计量设备数
        goUnMeasure(){
            this.$router.push({name:'unMeasure'})            
        },
        //计量中设备进度
        goScheduleIndex(){
            this.$router.push({name:'scheduleIndex'})
        },
    }
}
</script>
<style lang="scss">
.gaugerIndex_index{
    width: 100%;
    flex-wrap: nowrap;
    .swiper-container{
        width: 100%;
    }
    .swiper-slide{
        // display: flex;
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
