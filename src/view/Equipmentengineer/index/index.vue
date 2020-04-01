<template>
    <index-home>
        <div class="index_topHeader main_body_html EquipmentengineerIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goMalfunction()">
                        <div><img src="../../../assets/img/Equipmentengineer/index/malfunction.png" alt=""><span>故障</span></div>
                        <div class="number"><yd-countup :endnum="malfunction" :duration="1" >{{malfunction}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goupkeepEqupment()">
                        <div><img src="../../../assets/img/Equipmentengineer/index/maintain.png" alt=""><span>保养</span></div>
                        <div class="number"><yd-countup :endnum="maintain" :duration="1" >{{maintain}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goResponsible()">
                        <div><img src="../../../assets/img/Equipmentengineer/index/principal.png" alt=""><span>设备负责数</span></div>
                        <div class="number"><yd-countup :endnum="principal" :duration="1" >{{principal}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goFrock()">
                        <div><img src="../../../assets/img/Equipmentengineer/index/frock.png" alt=""><span>工装治具</span></div>
                        <div class="number"><yd-countup :endnum="frock" :duration="1" >{{frock}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="ReWirePerson()">
                        <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>设备人员安全指导书</span></div>
                        <div class="number"><yd-countup :endnum="equipment_operate" :duration="1" >{{equipment_operate}}}</yd-countup><span>册</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goReWire()">
                        <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>设备操作指导书</span></div>
                        <div class="number"><yd-countup :endnum="equipment_operate" :duration="1" >{{equipment_operate}}}</yd-countup><span>册</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goInfrastructure()">
                        <div><img src="../../../assets/img/Equipmentengineer/index/malfunction.png" alt=""><span>基础设施管理</span></div>
                        <div class="number"><yd-countup :endnum="infrastructure_manage" :duration="1" >{{infrastructure_manage}}</yd-countup><span>份</span></div>
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
            slidesPerView: 'auto',
            spaceBetween: 14,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
        malfunction: 0,
        maintain: 0,
        principal: 0,
        frock: 0,
        equipment_person: 0,
        equipment_operate: 0,
        infrastructure_manage: 0,
      }
    },  
    mounted(){
        this.$emit('headerTitle','实验室信息化管理系统-试验设备工程师');
        this.getEquipmentIndexNumber();
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
            this.$router.push({name:'malfunction'});
        },
        //保养
        goupkeepEqupment(){
            this.$router.push({name:'upkeepEqupment'});
        },
        //设备负责数
        goResponsible(){
            this.$router.push({name:'responsible'});            
        },
        //工装治具
        goFrock(){
            this.$router.push({name:'frock'});
        },
        //设备人员安全指导书
        ReWirePerson(){
            this.$router.push({name:'ReWirePerson'});
        },
        //设备操作指导书
        goReWire(){
            this.$router.push({name:'ReWire'});
        },
        //基础设施
        goInfrastructure(){
            this.$router.push({name:'Infrastructure'});
        },
        getEquipmentIndexNumber(){
            this.$http.get(this.$conf.env.getEquipmentIndexNumber).then(res =>{
                this.malfunction = res.data.num1;
                this.maintain = res.data.num2;
                this.principal = res.data.num3;
                this.frock = res.data.num4;
                this.equipment_person = res.data.num5;
                this.equipment_operate = res.data.num6;
                this.infrastructure_manage = res.data.num7;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
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
