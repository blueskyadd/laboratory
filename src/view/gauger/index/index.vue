<template>
    <index-home>
        <div class="index_topHeader main_body_html gaugerIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist redColor" @click="goOverdue()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>已过计量期设备数</span></div>
                        <div class="number"><yd-countup  :endnum="yesOrder" :duration="1" >{{yesOrder}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goPrincipal()">
                        <div><img src="../../../assets/img/gauger/index/contribution.png" alt=""><span>负责计量设备数</span></div>
                        <div class="number"><yd-countup :endnum="unOrder" :duration="1" >{{unOrder}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goUnMeasure()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>30天未计量设备数</span></div>
                        <div class="number"><yd-countup :endnum="talentCultivation" :duration="1" >{{talentCultivation}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist img_text" @click="goScheduleIndex()"><img src="../../../assets/img/gauger/index/measuring.png" alt=""><span>计量中设备进度</span></div>
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
            slidesPerView: 'auto',
            // spaceBetween: 22,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
        yesOrder: 0,
        unOrder: 0,
        talentCultivation: 0,
      }
    },  
    mounted(){
        this.$emit('headerTitle','实验室信息化管理系统-试验设备计量员');
        this.statisGaugerNumber();
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
        statisGaugerNumber(){
            this.$http.get(this.$conf.env.statisGaugerNumber).then(res =>{
                this.yesOrder = res.data.num1;
                this.unOrder = res.data.num2;
                this.talentCultivation = res.data.num3;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
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
    .redColor{
        .number{
            span:first-child{
                color:#e21641!important;
            }
        }
        
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
