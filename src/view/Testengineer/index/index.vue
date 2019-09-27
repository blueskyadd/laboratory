<template>
    <index-home>
        <div class="index_topHeader main_body_html Testengineer_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goMissionUnaccomplish()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>已完成试验任务</span></div>
                        <div class="number"><yd-countup :endnum="equipment_yesOrder" :duration="1" >{{equipment_yesOrder}}}</yd-countup><span>个</span></div>
                    </div>
                     </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="gounMissionUnaccomplish()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>未完成试验任务</span></div>
                        <div class="number"><yd-countup :endnum="equipment_unOrder" :duration="1" >{{equipment_unOrder}}}</yd-countup><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goCultivate()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>已培养人数</span></div>
                        <div class="number"><yd-countup :endnum="equipment_talentCultivation" :duration="1" >{{equipment_talentCultivation}}}</yd-countup><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="gowatchManage()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>值班天数</span></div>
                        <div class="number"><yd-countup :endnum="equipment_watchDay" :duration="1" >{{equipment_watchDay}}}</yd-countup><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goTeststandard()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>实验方法</span></div>
                        <div class="number"><yd-countup :endnum="equipment_operate" :duration="1" >{{equipment_methods}}}</yd-countup><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goTestStandard()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>实验标准</span></div>
                        <div class="number"><yd-countup :endnum="equipment_operate" :duration="1" >{{equipment_operate}}}</yd-countup><span>个</span></div>
                    </div>
                    </swiper-slide>
                    <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goTestWarning()">
                        <div><img src="../../../assets/img/Equipmentengineer/index/malfunction.png" alt=""><span>报警日志</span></div>
                        <div class="number"><yd-countup :endnum="equipment_operate" :duration="1" >{{equipment_malfunction}}}</yd-countup><span>个</span></div>
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
            slidesPerView: 'auto',
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
        equipment_yesOrder: 0,
        equipment_unOrder: 0,
        equipment_talentCultivation: 0,
        equipment_watchDay: 0,
        equipment_methods: 0,
        equipment_operate: 0,
        equipment_malfunction: 0,

      }
    },  
    mounted(){
        this.$emit('headerTitle','实验室信息化管理系统-试验工程师');
        this.statisticsTestengineerNumber()
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
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
        statisticsTestengineerNumber(){
            this.$http.get(this.$conf.env.statisticsTestengineerNumber).then(res =>{
                this.equipment_yesOrder = res.data.num1;
                this.equipment_unOrder = res.data.num2;
                this.equipment_talentCultivation = res.data.num3;
                this.equipment_watchDay = res.data.num4;
                this.equipment_methods = res.data.num5;
                this.equipment_operate = res.data.num6;
                this.equipment_malfunction = res.data.num7;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
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
