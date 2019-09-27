<template>
    <index-home>
        <div class="index_topHeader main_body_html materialIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goMaterialManagement()">
                        <div><img src="../../../assets/img/msterial/index/material_management.png" alt=""><span>物料管理</span></div>
                        <div class="number"><yd-countup :endnum="material_management" :duration="1" >{{material_management}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goMeterialAllocation()">
                        <div><img src="../../../assets/img/msterial/index/stock_distributor.png" alt=""><span>物料分配</span></div>
                        <div class="number"><yd-countup :endnum="stock_distributor" :duration="1" >{{stock_distributor}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goReturnMaterial()">
                        <div><img src="../../../assets/img/Testengineer/index/talentCultivation.png" alt=""><span>物料归还</span></div>
                        <div class="number"><yd-countup :endnum="material_returned" :duration="1" >{{material_returned}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist img_text" @click="goIncoming()"><img src="../../../assets/img/msterial/index/materials_put.png" alt=""><span>物料入库</span></div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goExemplar()">
                        <div><img src="../../../assets/img/Testengineer/index/watchDay.png" alt=""><span>样件确认</span></div>
                        <div class="number"><yd-countup :endnum="samples_confirmed" :duration="1" >{{samples_confirmed}}</yd-countup><span>个</span></div>
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
            slidesPerView: 'auto',
            spaceBetween: 14,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
        material_management: 0,
        stock_distributor: 0,
        material_returned: 0,
        samples_confirmed: 0
      }
    },  
    mounted(){
        this.$emit('headerTitle','实验室信息化管理系统-物料管理员');
        this.statisticsNumber();
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统');
    },
    computed:{
    },
    methods:{
        /**@name 页面跳转 */
        //物料管理
        goMaterialManagement(){
            this.$router.push({name:'materialManagementTable'});
        },
        //物料分配
        goMeterialAllocation(){
            this.$router.push({name:'meterialAllocation'});
        },
        //物料归还
        goReturnMaterial(){
            this.$router.push({name:'returnMaterial'});           
        },
        //物料入库
        goIncoming(){
            this.$router.push({name:'incoming'});
        },
        //样件确认
        goExemplar(){
            this.$router.push({name:'exemplar'});
        },
        statisticsNumber(){
            this.$http.get(this.$conf.env.statisticsNumber).then(res =>{
                this.material_management = res.data.num1;
                this.stock_distributor = res.data.num2;
                this.material_returned = res.data.num3;
                this.samples_confirmed = res.data.num4;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
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
