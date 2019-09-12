<template>
    <index-home>
        <div class="index_topHeader main_body_html materialIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goMaterialManagement()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>物料管理</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goMeterialAllocation()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>物料分配</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                        <div><p>今日任务<i>5个</i></p></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goReturnMaterial()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>物料归还</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goIncoming()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>物料入库</span></div>
                        <div class="number"><span>09</span><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goExemplar()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>样件确认</span></div>
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
    name:'materialIndex',
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
        this.$emit('headerTitle','实验室信息化管理系统-物料管理员')
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
    },
    computed:{
    },
    methods:{
        /**@name 页面跳转 */
        //物料管理
        goMaterialManagement(){
            this.$router.push({name:'materialManagementTable'})
        },
        //物料分配
        goMeterialAllocation(){
            this.$router.push({name:'meterialAllocation'})
        },
        //物料归还
        goReturnMaterial(){
            this.$router.push({name:'returnMaterial'})            
        },
        //物料入库
        goIncoming(){
            this.$router.push({name:'incoming'})
        },
        //样件确认
        goExemplar(){
            this.$router.push({name:'exemplar'})
        },
    }
}
</script>
<style lang="scss">
.materialIndex_index{
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
