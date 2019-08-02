<template>
    <div class="laboratory_labmanage_index body_main">
        <section>
            <div class="index_topHeader main_body_html">
                <div class="show_background divNumber toplist">
                    <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>任务分配</span></div>
                    <div><span>09</span><span>份</span></div>
                </div>
                <div class="show_background toplist divNumber">
                    <div><img src="../../../assets/img/LabManager/index/audit.png" alt=""><span>任务审核</span></div>
                    <div><span>09</span><span>个</span></div>
                </div>
                <div class="show_background toplist img_text"><img src="../../../assets/img/LabManager/index/manage.png" alt=""><span>管理事项</span></div>
                <div class="show_background toplist img_text"><img src="../../../assets/img/LabManager/index/information.png" alt=""><span>信息发布</span></div>
            </div>
            <div class="index_main main_body_html show_background">
                <div class="Ability_introduce">
                    <swiper :options="swiperOption_text" v-if="swiperOption_text">
                        <swiper-slide>
                            <h3>实验室能力介绍</h3>
                            <p>
                            VUX 并不是一个能解决所有场景的完美解决方案(实际上也没有一个方案能解决所有问题)，也会出现某些bug或者某些特性不支持，所以如果遇到问题麻烦及时不带情绪正确反馈，我们乐于及时解决描述详细方便重现的问题。即使你不直接使用 VUX 组件代码, 你依然可以参考 VUX 代码来实现自己的组件库。如果一定程度上帮助到了你，那么维护这个项目也就有所意义。UX 并不是一个能解决所有场景的完美解决方案(实际上也没有一个方案能解决所有问题)，也会出现某些bug或者某些特性不支持，所以如果遇到问题麻烦及时不带情绪正确反馈，我们乐于及时解决描述详细方便重现的问题。
        即使你不直接使用 VUX 组件代码, 你依然可以参考 VUX 代码来实现自己的组件库。如果一定程度上帮助到了你，那么维护这个项目也就有所意义。VUX 并不是一个能解决所有场景的完美解决方案(实际上也没有一个方案能解决所有问题)，也会出现某些bug或者某些特性不支持，所以如果遇到问题麻烦及时不带情绪正确反馈，我们乐于及时解决描述详细方便重现的问题。即使你不直接使用 VUX 组件代码, 你依然可以参考 VUX 代码来实现自己的组件库。如果一定程度上帮助到了你，那么维护这个项目也就有所意义。
                            </p>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="equipment_data">
                    <div class="equipment_data_list">
                        <h3>设备运行率</h3>
                        <div class="efficient_data">
                            <div class="circle"><div></div></div>
                            <!-- <span>80%</span> -->
                        </div>
                    </div>
                    <div class="equipment_data_list">
                        <h3>设备档案</h3>
                        <div class="efficient_data">
                            <div class="text_number">
                                <span>12</span><span>份</span>
                            </div>
                        </div>
                    </div>
                    <div class="equipment_data_list">
                        <h3>设备维修率</h3>
                        <div class="efficient_data">
                            <div class="circle"><div></div></div>
                        </div>
                    </div>
                    <div class="equipment_data_list">
                        <h3>物料安全率</h3>
                        <div class="efficient_data">
                            <div class="circle"><div></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index_footerBanner main_body_html ">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">{{ slide }}</swiper-slide>
                </swiper>
            </div>
        </section>
        <div class="right_main">
            <div class="bulletin_board main_body_html show_background">
                <h3>实验室公告栏</h3>
                <div>
                    <ul>
                        <li>实验室公告实验室公告栏实验室公告栏栏</li>
                        <li>实验室实验室公告栏公实验室公告栏告栏</li>
                        <li>实验室公告栏实验室公告栏</li>
                    </ul>
                </div>
            </div>
            <div class="calendar_board main_body_html show_background">
                <Calendar :sundayStart='false' ></Calendar>
            </div>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Calendar from "vue-calendar-component";
export default {
    name:'index',
    components: {swiper, swiperSlide, Calendar},
    data() {
      return {
        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination'
            }
        },
        swiperOption_text:{
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,

        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
}
</script>
<style lang="scss">
$setColor:#7f0dde;
.laboratory_labmanage_index{
     background: #e4f4f4;
     display: flex;
     justify-content: space-between;
     .main_body_html{
        margin-top: .18rem;
    }
    section{
        width: 76%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 .36rem;
         overflow: hidden;
        
        .index_topHeader{
            display: flex;
            justify-content: space-between;
            .toplist{
                width: 3.4rem;
                height: 2.1rem;
                background: #fff;
                border-radius: .06rem;
            }
            .divNumber{
                // display: flex;
                padding-left: .27rem;
                width: 23.8%;
                div{
                    width: 100%;
                    display: flex;
                    align-items: center;
                }
                div:first-child{
                    height: .61rem;
                    justify-content: flex-start;
                    img{
                        width: .32rem;
                        height: .32rem;
                        margin-right: .16rem;
                    }
                    span{
                        font-size: .3rem;
                        color: #333;
                    }
                }
                div:last-child{
                    height: calc(100% - .61rem);
                    justify-content: center;
                    span:first-child{
                        color: #7d09de;
                        margin-right: .28rem;
                    }
                    span:last-child{
                        color: #434343;
                        font-size: .38rem;
                    }
                }
                
            }
            .img_text{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                img{
                    height: 1.2rem;
                    margin: .1rem 0 .15rem;

                }
                span{
                    font-size: .3rem;
                    color: $setColor;
                    font-weight: 500;
                }
            }
            
        }
        .index_main{
            height: 5.26rem;
            background: #fff;
            border-radius: .06rem;
            display: flex;
            .Ability_introduce{
                background: url('../../../assets/img/LabManager/index/Ability_introduce_bg.png') 0 0 / 100% 100% ;
                width: 42%;
                padding: .38rem .62rem .24rem .5rem;
                height: 4.14rem;
                overflow: hidden;
               .swiper-container{
                   height: 100%;
                   .swiper-wrapper{
                       height: auto!important;
                       h3{
                            font-size: .31rem;
                            color: #111111;
                            text-align: center;
                            margin-bottom: .14rem;
                        }
                        p{
                            font-size: .21rem;
                            line-height: .3rem;
                            color: #888888;
                        }
                   }
                    
               }
               .swiper-wrapper{
                       height: auto!important;
               }
               .scroll::-webkit-scrollbar{
                    display: none;
                }
            }
            .equipment_data{
                width: 45%;
                display: flex;
                flex-wrap: wrap;
                padding-left: .36rem;
                .equipment_data_list{
                    width: 50%;
                    height: 50%;
                    background: #fff;
                    padding-top: .01rem;
                    h3{
                        font-size: .24rem;
                        color: #333333;
                        line-height: .54rem;
                    }
                    .efficient_data{
                        height: calc(100% - .55rem);
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                         
                        .circle{
                            width: 1.7rem;
                            height: 1.7rem;
                            // border-radius: 50%;
                            display: flex;
                            margin-right: .4rem;
                            justify-content: center;
                            align-items: center;
                            background: url('../../../assets/img/LabManager/index/annulus.png') 0 0 / 100% 100%;
                            div{
                                width: 1.25rem;
                                height: 1.25rem;
                                background: #fff;
                                border-radius: 50%;
                            }
                        }
                    }
                    .text_number{
                        margin-right: .4rem;
                        span:first-child{
                            color: #7901dc;
                            font-size: 1.29rem;
                        }
                        span:last-child{
                            font-size: .4rem;
                            color: #434343;
                        }
                    }
                }
            }
            
        }
        .index_footerBanner{
            width: 100%;
            .swiper-container{
                height: 1.87rem;
                .swiper-slide{
                    height: 1.87rem;
                    margin-right: .14rem;
                    background: #fff;
                    width: 3.15rem!important;
                    border-radius: .1rem;
                }
            }
            .scroll{
                display: flex;
                flex-wrap: wrap;
                width: 20rem;
                height: 100%;
                div{
                    height: 1.87rem;
                    margin-right: .14rem;
                    background: #fff;
                    width: 3.15rem;
                    border-radius: .1rem;
                    overflow: hidden;
                }
            }
            
        }
    }
    .right_main{
        width: 4.14rem;
        padding-right: .26rem;
        .bulletin_board{
            height: 5.57rem;
            background: #fff;
            border-radius: .06rem;
            h3{
                font-size: .37rem;
                line-height: .72rem;
                text-align: center;
                color: #4a4a4a;
            }
            div{
                ul{
                    padding: 0 .18rem;
                    li{
                        font-size: .2rem;
                        line-height: .3rem;
                        color: #838383;
                        margin-bottom: .16rem;
                        list-style: circle;
                        padding-left: .36rem;
                    }
                }
            }
        }
        .calendar_board{
            height: 3.82rem;
            border-radius: .06rem;
            background: #fff;
            overflow: hidden;
            section{
                width: 100%;
                padding: 0;
                height: 100%;
                margin: 0;
                max-width: inherit;
                .wh_top_changge{
                    height: .71rem;
                    align-items: center;
                    border-bottom: 1px solid #f4f4f4;
                    li{
                        color: #3f3f3f;
                        div{
                            border-color: #3f3f3f;
                        }
                    }
                }
                .wh_content_all{
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    div:nth-child(2){
                        .wh_content_item{ 
                            color: #32d5c7;
                        }
                    }
                    .wh_content_li{
                        color: #333;
                        
                    }
                    .wh_content_item{   
                        
                        color: #9e9e9e;
                        font-size: .16rem;
                        height: .5rem;
                        width: .58rem;
                        font-weight: 500;
                        .wh_chose_day,.wh_item_date[data-v-2ebcbc83]:hover{
                            color: #32d5c7;
                            background: #fff;
                        }
                        .wh_isToday{
                            color: #fff;
                            background: #32d5c7;
                        }
                    }
                }
            }
        }
    }
}
</style>
