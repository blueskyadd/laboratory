<template>
    <div class="laboratory_labmanage_index body_main">
        <section>
           <slot></slot>
            <div class="index_main main_body_html show_background">
                <div class="Ability_introduce">
                    <swiper :options="swiperOption_text" v-if="swiperOption_text">
                        <swiper-slide>
                            <h3>实验室能力介绍</h3>
                            <p>{{Ability_introduce}}</p>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="equipment_data" v-if="isEquipment_data">
                    <equipmentData titleName="设备运行率"  :operatingNum='Laboratory_topNumber.num1' />
                    <div class="equipment_data_list">
                        <h3>设备档案</h3>
                        <div class="efficient_data">
                            <div class="text_number">
                                <yd-countup :endnum="Laboratory_topNumber.num2" :duration="1" >{{Laboratory_topNumber.num2}}</yd-countup>
                                <span>份</span>
                            </div>
                        </div>
                    </div>
                    <equipmentData titleName="设备维修率" :operatingNum='Laboratory_topNumber.num3' />
                    <equipmentData titleName="设备安全率" :operatingNum='Laboratory_topNumber.num4'/>
                </div>
            </div>
            <div class="index_footerBanner main_body_html " ref="swiperOption">
                <swiper :options="swiperOption" v-if="swiperOption" >
                    <swiper-slide v-for="(slide, index) in EquipmentImgList" :key="index">
                        <img :src="slide.image" alt="">
                        <div class="masking">
                            <h3>{{slide.name}}</h3>
                            <swiper :options="swiperOption_text" v-if="swiperOption_text">
                                <swiper-slide >
                                    <ul>
                                        <li><p>{{slide.text}}</p></li>
                                    </ul>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </section>
        <div class="right_main">
            <div class="bulletin_board main_body_html show_background">
                <h3>实验室公告栏</h3>
                 <swiper :options="swiperOption_Bulletin_board" v-if="swiperOption_Bulletin_board" >
                    <swiper-slide v-for="(item, index) in Bulletin_board" :key="index">
                        <img src="../assets/img/LabManager/index/ellipse.png" alt=""><p>{{item.content}}</p>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="calendar_board main_body_html show_background">
                <Calendar :sundayStart='false' ></Calendar>
            </div>
        </div>
    </div>
</template>
<script>
import equipmentData from '../components/common/equipment_data';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Calendar from "vue-calendar-component";
import { setTimeout } from 'timers';
export default {
    name:'index',
    components: {swiper, swiperSlide, Calendar, equipmentData},
    data() {
      return {
        Ability_introduce:'',//实验室能力介绍
        Bulletin_board: [],//实验室公告栏列表

        swiperOption: {
            slidesPerView: 'auto',
            grabCursor: true,
            freeMode: true,
            mousewheelControl: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on:{
                transitionEnd: () =>{
                    this.getequipmentImgListMove()
                }
            }
        },
        swiperOption_text:{
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            grabCursor: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        },
        swiperOption_Bulletin_board:{
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            grabCursor: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
            on:{
                transitionEnd: () =>{
                    this.getScrollBulletin_board()
                }
            }
        },
        swiperSlides: [1, 2, 3, 4,5,6,7,8,9,10],
        operating: 1 ,
        allocation:12,
        Laboratory_topNumber:{},
        isEquipment_data:false,
        EquipmentImgList:[],
        EquipmentImgList_pagenumber:1,
        isEquipmentImgList: true,
        board_pagenumber: 1,
        isboard_pagenumber: false,
      }
    },  
    mounted() {
        this.$message.closeAll()
        /**@name 接口请求 */
        this.getAbilityintroduce();//获取实验室信息
        this.getBulletinBoard(1);//获取公告栏列表数据
        this.getLaboratory_topNumber();//获取右侧设备运行率
        this.getequipmentImgList(1);//获取底部图片列表
    },
    computed:{
        changeRotate(){
            if(this.operating == 0){
                return 'rotate(-140deg)'
            }else if(this.operating == 1 ){
                return 'rotate(38deg)'
            }else{
                return 'rotate('+ (1-this.operating-0.1 ) * -120 + 'deg)'
            }
        }
    },
    methods:{
        /**@name 页面跳转 */
        //项目分配页
        goTaskAllocation(){
            this.$router.push({name:'unAllocation'})
        },
        //任务审核
        goTaskreview(){
            this.$router.push({name:'Taskreview'})
        },
        //管理事项
        goManagement(){
            this.$router.push({name:'management'})            
        },
        //信息发布
        goinformationPublish(){
            this.$router.push({name:'informationPublish'})
        },
        /**@name 接口数据 */
        //获取实验室信息
        getAbilityintroduce(){
            this.$http.get(this.$conf.env.getAbilityintroduce).then(res =>{
                if(res.data.text){
                    this.Ability_introduce = res.data.text;
                }
            }).catch(err =>{
                console.log(err)
                if(err.response.status == '401'){
                    if(err.response.data.detail == 'Signature has expired.'){
                        this.$message({message: '签名已过期,请重新登录',type: 'error',duration:0});
                    }
                }else{
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                }
            })
        },
        /**@name 获取公告栏列表数据*/
        getScrollBulletin_board(){
             if(!this.isboard_pagenumber) return;
            this.board_pagenumber += 1;
            this.getBulletinBoard(this.board_pagenumber)
        },
        getBulletinBoard(pageNumber){
            this.$http.get(pageNumber == 1? this.$conf.env.getBulletinBoard +'?page_size=' + 16 :  this.$conf.env.getBulletinBoard + '?p=' +pageNumber + '&page_size=16').then( res =>{
                this.isboard_pagenumber = res.data.next? true:false;
                this.Bulletin_board = this.Bulletin_board == 1 ? res.data.results:this.Bulletin_board.concat(res.data.results);
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name获取设备运行率 */
        getLaboratory_topNumber(){
            this.$http.get(this.$conf.env.getLaboratory_topNumber).then( res =>{
                this.Laboratory_topNumber = res.data;
                this.isEquipment_data = true;
            }).catch(err =>{
                this.isEquipment_data = true;
                this.Laboratory_topNumber = {'num1':'0%','num2':'0%','num3':'0%','num4':'0%'};
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name获取图片列表数据 */
        getequipmentImgList(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getequipmentImgList : this.$conf.env.getequipmentImgList + '?p=' +pageNumber ).then( res =>{
                this.isLoading = false;
                this.EquipmentImgList = this.Bulletin_board == 1 ? res.data.results:this.EquipmentImgList.concat(res.data.results);
                this.isEquipmentImgList = res.data.next ? true : false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getequipmentImgListMove(){
            if(!this.isEquipmentImgList) return;
            this.EquipmentImgList_pagenumber += 1;
            this.getequipmentImgList(this.EquipmentImgList_pagenumber)
        }
    }
}
</script>   
<style lang="scss">
@import '../../static/font/font.css';
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
                cursor:pointer;
                width: 23%;
                height: 2.1rem;
                background: #fff;
                border-radius: .06rem;
            }
            .divNumber{
                // display: flex;
                padding-left: .27rem;
               
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
                .number{
                    height: calc(100% - .61rem);
                    justify-content: center;
                    span:first-child{
                        color: #7d09de;
                        margin-right: .28rem;
                        font-family:MFShangHei;
                        font-weight: bold;
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
            .swiper-slide{
                width: auto!important;
            }
            
        }
        .index_main{
            height: 5.26rem;
            background: #fff;
            border-radius: .06rem;
            display: flex;
            .Ability_introduce{
                margin-top: .18rem;
                background: url('../assets/img/LabManager/index/Ability_introduce_bg.png') 0 0 / 100% 100% ;
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
                            color: #646464;
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
                         flex-direction: column;
                        .circle{
                            width: 1.7rem;
                            height: 1.49rem;
                            display: flex;
                            margin-right: .4rem;
                            justify-content: center;
                            align-items: flex-end;
                            background: url('../assets/img/LabManager/index/annulus.png') 0 0 / 100% 100%;
                            img{
                                transform: rotate(-134deg);
                                margin-left: 0.57rem;
                                transform-origin: 0 .47rem;
                                width: .57rem;
                                height: .47rem;
                            }
                            
                        }
                        span{
                            font-size: .27rem;
                            color: #7e0dde;
                            
                             margin-right: .4rem;
                             font-weight: 700;
                        }
                    }
                    .text_number{
                        margin-right: .4rem;
                        span:first-child{
                            font-family:MFShangHei;
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
            overflow: hidden;
            
            .swiper-container{
                height: 1.87rem;
                .swiper-slide{
                    height: 1.87rem;
                    margin-right: .14rem;
                    background: #fff;
                    width: 3.15rem!important;
                    border-radius: .1rem;
                    overflow: hidden;
                    position: relative;
                    img{
                        width: 100%;
                    }
                    .masking{
                        cursor:pointer;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background: rgba(0,0,0,.5);
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: center;
                        .swiper-slide{
                            background: transparent;
                            overflow-y: scroll;
                            height: auto !important;
                        }
                        .swiper-container{
                            width: 100%!important;
                            margin-left: .12rem;
                        }
                        h3{
                            font-size: .31rem;
                            font-weight: 500;
                            color: #fff;
                            margin-bottom: .04rem;
                        }
                        ul{
                            height: 100%;
                            li{
                                display: flex; 
                                line-height: .24rem;
                                span, p {
                                    font-size: .12rem;
                                    color: #fff;
                                }
                                span{
                                    width: 20%;
                                }
                                p{
                                    width: 70%;
                                }
                                
                            }
                        }
                    }
                }
            }
            
            .swiper-container {
                width: 100%;
                height: 100%;
            }
            .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;

                /* Center slide text vertically */
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
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
                font-size: .32rem;
                line-height: .72rem;
                text-align: center;
                color: #333333;
            }
            .swiper-container{
                padding: 0 .18rem;
                height: calc(100% - .72rem);
                // overflow-y: scroll;
                .swiper-slide{
                    font-size: .2rem;
                    line-height: .3rem;
                    color: #555555;
                    margin-bottom: .16rem;
                    padding-left: .21rem;
                    display: flex;
                    height: auto!important;
                    img{
                        width: .22rem;
                        height: .22rem;
                        margin-right: .13rem;
                        margin-top: .05rem;
                    }
                    p{
                        flex: 1;
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
                    justify-content: center;
                    li{
                        color: #3f3f3f;
                        div{
                            border-color: #3f3f3f;
                        }
                    }
                     li:nth-child(2){
                         flex: inherit;
                         margin: 0 .2rem;
                     }
                    li:first-child,li:last-child{
                            width: .3rem;
                            height: .3rem;
                            background: #cccccc;
                            flex: inherit;
                            border-radius: 50%;
                            div{
                                border-color: #fff;
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
                        // width: .58rem;
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
