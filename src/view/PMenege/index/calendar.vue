<template>
    <div class="calendar body_main">
        <div class="calendar_box">
            <header>
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{fileItemIndex.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown"   class ='imgInfo_listInfo_element' >
                        <el-dropdown-item v-for="item in fileItem" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </header>
            <div class="element_calendar">
                <header>配置项目</header>
                <full-calendar  
                    :config="config" 
                    :events="events"
                    ref="calendar" 
                    @event-selected='eventClick' 
                    @day-click="dayClick">
                </full-calendar>
                
            </div>
            <!-- <p class="warning">提示：延时阶段颜色变为红色</p> -->
        </div>
        <div class="from_submit">
            <header>
                <span>设计方法</span><span @click="setCalendar"></span>
            </header>
            <ul class="submit_list">
                <li v-for="(item ,index) in events" :key="index">
                    <h3>阶段{{index+1}}</h3>
                    <div><span>阶段名称：</span><input v-model="item.title" placeholder="输入阶段名称" type="text"></div>
                    <div>
                        <span>阶段一开始时间：</span>
                        <el-date-picker v-model="item.start"
                            type="date"
                            value-format = 'yyyy-MM-dd'
                            placeholder="选择阶段一开始时间">
                        </el-date-picker>
                    </div>
                    <div>
                        <span>阶段一结束时间：</span>
                        <el-date-picker v-model="item.end"
                            type="date"
                            value-format = 'yyyy-MM-dd'
                            placeholder="选择阶段一结束时间">
                        </el-date-picker>
                    </div>
                    <div class="color_box">
                        <span>使用的底色：</span>
                        <i :style="{'background':color}" @click="setColorBlock(color,index)" v-for="(color, colorIndex) in colorBlock" :key="colorIndex">
                            <img v-if="item.color == color" src="../../../assets/img/PMenege/index/ckeck.png" alt="">
                        </i>
                    </div>
                    <footer>
                        <el-button type="primary" @click="setCalendar(item)">确定</el-button>
                    </footer>
                </li>
            </ul>
        </div>
        
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
export default {
    name:'calendar',
    components : { FullCalendar },
    data(){
        return{
             selectDate:'',//日期选择器选中的月份
             config: {
                firstDay:'0',//以周日为每周的第一天
                weekends: true,//是否在日历中显示周末
                locale: 'zh-cn',//语言
                defaultView: 'month',//默认按月显示
                height: 'auto',//高度
                fixedWeekCount: true,//是否固定显示六周
                // weekMode:"liquid",//周数不定，每周的高度可变，整个日历高度不变
                allDaySlot:true,
                allDay:true,
                header: {//表头信息
                left: 'prev, next',
                center: 'title',
                right: 'hide, custom',
                },
            },
            events: [{
                id:1,
                title:'出差',
                start:'2019-08-27',
                end:'2019-08-29',
                color:'#21a7b0'
            }, {
                id:2,
                title:'春游',
                start:'2019-08-12',
                color:'#5621af'
            },
            {
                id:1,
                title:'出差',
                start:'2019-08-01',
                end:'2019-08-03',
                color:'#21a7b0'
            }],
            newItem:{},
            editItem:{},
            statusData:'',
            endData:'',
            calendarText:'',
            stageList:[],
            colorBlock:[ '#21a7b0','#ae21a3','#e18518','#5621af','#1620ab'],
            setColorIndex: 0,
            Colorblock:'#21a7b0',
            fileItem:[{name:'项目一',id:1},{name:'项目二',id:2},{name:'项目三',id:3}],
            fileItemIndex: {name:'项目一',id:1},
        }
    },
    methods:{
        eventClick(event){ //events的点击事件
            this.editItem = event
            this.isAdd = true
        },
        dayClick(date, jsEvent, view){ //日期的点击事件
            this.editItem = {}
            this.isAdd = true
        },
        addstageList(){
            this.events.push({
                id : '',
                title : '',
                start : '',
                end : '',
                color : '',
            })
        },
        //选择颜色
        setColorBlock(item, index){
            this.events[index].color = item;
            // this.Colorblock = item;
        },
        //添加
        setCalendar(item){
            if(!item.id){
                var obj={
                    "title":item.title,
                    "period":[item.start,this.end],
                    "color": item.color
                }
                this.addItem(JSON.stringify(obj))
            }else{

            }
            
        },
        addItem(detail){
            
            this.newItem = JSON.parse(detail)
            if(this.editItem.id){//如果是编辑，就删掉该条
                this.events.forEach( (el,ind)=>{
                if(el.id == this.editItem.id){
                    this.events.splice(ind,1)
                }
                })
            }
            this.events.push({
                id : this.editItem.id?this.editItem.id:this.setUuid(),
                title : this.newItem.title,
                start : this.newItem.period[0],
                end : this.newItem.period[1],
                color : this.newItem.color,
            })
            
        },
        setUuid(){
            var s = [];
            var hexDigits = "0123456789abcdef";
            for(var i = 0; i < 36; i++){ s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
            s[14] = "4";  
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
            s[8] = s[13] = s[18] = s[23];
            var uuid = s.join("");
            return uuid;
        },
        handleCommand(command) {
            console.log(command)
            this.fileItemIndex = command;
        },
    }
}
</script>
<style lang="scss">
.calendar{
    display: flex;
    .calendar_box{
        width: 46%;
        font-size: .2rem;
        height: 100%;
        // border: 1px solid #ebebeb;
        padding-left: .34rem;
        padding-top: .14rem;
        header{
            height: .8rem;
            .el-dropdown{
                font-size: .16rem!important;
                color: #08a695!important;
            }
            
        }
        .warning{
            font-size: .16rem;
            color: #ff0000;
            float: right;
            line-height: .66rem;
        }
        .element_calendar{
            border: 2px solid #ebebeb;
            header{
                font-size: .2rem;
                line-height: .44rem;
                border-bottom: 1px solid #f9fcfd;
                height: .44rem;
                padding-left: .3rem;
                color: #767676;
            }
            .fc-center{
                line-height: .52rem;
                position: absolute;
            }
            //表头
            .fc-toolbar{
                margin-bottom: 0;
                display: flex;
                justify-content: center;
                color: #767676;
            }
            //周天日历
            .fc-head{
                background: #ddd;
                color:#fff;
                height: .46rem;
                .fc-day-header{
                    span{
                        line-height: .46rem;
                    }
                }
            }
            //表格字体居中
            .fc-day-number{
               display: block;
                width: 100%;
                text-align: center;
            }
            //切换按钮
            .fc-state-default{
                background: none;
                border: 0;
                box-shadow:none;
                margin-right: .7rem;
                margin-left: .7rem;
            }
        }
        
    }
    .from_submit{
        font-size: .16rem;
        padding-left: 1.14rem;
        padding-top: .8rem;
        width: 6.76rem;
        header{
            margin-bottom: .3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .2rem;
            color: #727272;
            span:last-child{
                width: .26rem;
                height: .26rem;
                background: #08a695;
                border-radius: 50%;
                display: block;
            }
        }
        .submit_list {
            height: 85%;
            overflow-y: scroll;
            li {
            padding: .12rem .12rem .24rem;
            color: #727272;
            border: 2px solid #f5f5f5;
            margin-bottom: .28rem;
            h3{
                margin-bottom: .36rem;
            }
            div{
                margin-bottom: .08rem;
                input{
                    height: .32rem!important;
                    width: 3.9rem!important;
                    border: 1px solid #e5e5e5;
                    font-size: .16rem!important;
                    padding: 0 .13rem;
                }
                input::placeholder{
                    color: #999;
                }
                i{
                    width: .32rem;
                    height: .32rem;
                    border-radius: .06rem;
                    margin-right: .18rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        display: block;
                        width: 50%;
                        height: 50%;
                    }
                }
            }
            .color_box{
                display: flex;
                span{
                    margin-right: .32rem;
                }
            }
        }
        footer{
            justify-content: flex-end;
            display: flex;
            margin-right: 1.24rem;
            margin-top: .24rem;
            button{
                padding: .1rem .4rem!important;
                background: #08a695; 
                font-size: .2rem;
            }
        }
        h3{
            line-height: .22rem;
           
        }
    }
    }
}
.imgInfo_listInfo_element{
    li{color: #08a695;}
}
</style>