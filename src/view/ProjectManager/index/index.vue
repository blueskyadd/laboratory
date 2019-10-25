<template>
    <index-home>
        <div class="index_topHeader main_body_html ProjectManagerIndex_index">
            <swiper :options="swiperOption" v-if="swiperOption">
                 <swiper-slide>
                    <div class="show_background divNumber toplist" @click="goProjectStandard()">
                        <div><img src="../../../assets/img/Testengineer/index/yesOrder.png" alt=""><span>试验标准</span></div>
                        <div class="number"><yd-countup :endnum="Project_topNumber_standard" :duration="1" >{{Project_topNumber_standard}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber bottom_text" @click="goProjectAppointment()">
                        <div><img src="../../../assets/img/Testengineer/index/unOrder.png" alt=""><span>预约项目</span></div>
                        <div class="number"><yd-countup :endnum="Project_topNumber_appointment" :duration="1" >{{Project_topNumber_appointment}}</yd-countup><span>个</span></div>
                        <!-- <div><p>进行<i>5</i></p><p>等待<i>5</i></p><p>完成<i>5</i></p></div> -->
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist divNumber" @click="goProjectHistory()">
                        <div><img src="../../../assets/img/project/index/history.png" alt=""><span>历史项目</span></div>
                        <div class="number"><yd-countup :endnum="Project_topNumber_history" :duration="1" >{{Project_topNumber_history}}</yd-countup><span>个</span></div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="show_background toplist img_text" @click="goAddProjectAppoinment()"><img src="../../../assets/img/project/index/newProject.png" alt=""><span>创建项目</span></div>
                </swiper-slide>
            </swiper>
        </div>  
            
    </index-home>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'; 
import indexHome from '../../../components/index'
export default {
    name:'ProjectManagerIndex',
    components:{swiper, swiperSlide, indexHome},
    data() {
      return {
          Project_topNumber_standard:'',
          Project_topNumber_appointment:'',
          Project_topNumber_history:'',
          swiperOption: {
            slidesPerView: 'auto',
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
        this.$emit('headerTitle','实验室信息化管理系统-客户经理');
        this.getProject_topNumber();
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
    },
    computed:{
    },
    methods:{
        /**@name 页面跳转 */
        //物料管理
        goProjectStandard(){
            this.$router.push({name:'projectStandard'})
        },
        //预约项目
        goProjectAppointment(){
            this.$router.push({name:'projectAppointment'})
        },
        //历史项目
        goProjectHistory(){
            this.$router.push({name:'projectHistory'})            
        },
        //创建项目
        goAddProjectAppoinment(){
            this.$router.push({path:'/ProjectManager/addProjectAppoinment?flag=1'})
        },
        getProject_topNumber(){
            this.$http.get(this.$conf.env.getProject_topNumber).then(res =>{
                this.Project_topNumber_standard = res.data.num1;
                this.Project_topNumber_appointment = res.data.num2;
                this.Project_topNumber_history = res.data.num3;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    }
}
</script>
<style lang="scss">
.ProjectManagerIndex_index{
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
        span{
            font-family:Microsoft YaHei;
        }
    }
    .bottom_text{
            justify-content: center;
            p{
                letter-spacing: .05rem;
                font-size:.22rem;color:#333;
                border-right: 1px solid #7e0dde;
                padding:0 .13rem;
                i{
                    color: #2A23B5;
                }
            }
            p:first-child{
                padding: 0;
                padding-right: .13rem;
            }
            p:last-child{
                border: 0;
            }
        }
    .img_text{
        img{
            width: 1.17rem;
            height: 1.03rem!important;
        }
    }
}

</style>
