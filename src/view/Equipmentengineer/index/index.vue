<template>
    <index-home>
        <div class="index_topHeader main_body_html EquipmentengineerIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goMalfunction()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>故障</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goupkeepEqupment()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>保养</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                        <div><p>今日任务<i>5个</i></p></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goResponsible()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>设备负责数</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goFrock()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>工装治具</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goReWire()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>设备操作指导书</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goInfrastructure()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>基础设施管理</span></div>
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
    name:'EquipmentengineerIndex',
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
        this.$emit('headerTitle','实验室信息化管理系统-试验设备工程师')
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
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
        //工装治具
        goFrock(){
            this.$router.push({name:'frock'})
        },
        //设备操作指导书
        goReWire(){
            this.$router.push({name:'ReWire'})
        },
        goInfrastructure(){
            this.$router.push({name:'Infrastructure'})
        }
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
