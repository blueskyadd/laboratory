<template>
    <div class="calendar body_main" v-loading.fullscreen.lock="isLoading">
        <div class="calendar_box">
            <header class="taskkAllocation_index_header">
                <h3>项目配置</h3>
                <span class="goBack underline" @click="$router.back(-1)">返回</span>
            </header>
            <div class="element_calendar">
                <header>配置项目</header>
                <full-calendar  
                    :config="config" 
                    v-model="selectDate"
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
                <div>
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{fileItemIndex.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown"   class ='imgInfo_listInfo_element' >
                            <el-dropdown-item v-for="item in fileItem" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <span>设计方法</span>
                </div>
               <span class="addButton" @click="setCalendar"><img src="../../../assets/img/PMenege/index/plus.png" alt=""></span>
            </header>
            <ul class="submit_list">
                <li v-for="(item ,index) in events" :key="index">
                    <h3>
                        <span>阶段{{index+1}}</span>
                        <img src="../../../assets/img/PMenege/index/deleteIcon.png" @click="deletePm_project_setting_flow(item,index)" alt="">
                    </h3>
                    <div><span><i class="importantData">*</i>阶段名称：</span><input v-model="item.title" placeholder="输入阶段名称" type="text"></div>
                    <div>
                        <span><i class="importantData">*</i>阶段{{index+1}}开始时间：</span>
                        <el-date-picker v-model="item.start"
                            type="date"
                            value-format = 'yyyy-MM-dd'
                            placeholder="选择阶段一开始时间">
                        </el-date-picker>
                    </div>
                    <div>
                        <span><i class="importantData">*</i>阶段{{index+1}}结束时间：</span>
                        <el-date-picker v-model="item.end"
                            type="date"
                            value-format = 'yyyy-MM-dd'
                            placeholder="选择阶段一结束时间">
                        </el-date-picker>
                    </div>
                    <div class="color_box">
                        <span><i class="importantData">*</i>使用的底色：</span>
                        <i :style="{'background':color}" @click="setColorBlock(color,index)" v-for="(color, colorIndex) in colorBlock" :key="colorIndex">
                            <img v-if="item.color == color" src="../../../assets/img/PMenege/index/ckeck.png" alt="">
                        </i>
                    </div>
                    <footer>
                        <el-button type="primary" @click="item.id?editPm_project_setting_flow(item):createdPm_project_setting_flow(item)">确定</el-button>
                    </footer> 
                </li>
            </ul>
        </div>
        
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css';
import VerificationData from '../../../components/VerificationData'
export default {
    name:'calendar',
    components : { FullCalendar },
    data(){
        return{
            isLoading: true,
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
                eventClick: this.eventClick, //点击事件
                lunarCalendar: true,
                allDay:true,
                header: {//表头信息
                    left: 'prev, next',
                    center: 'title',
                    right: 'hide, custom',
                },
                
            },
            events: [],
            newItem:{},
            editItem:{},
            statusData:'', 
            endData:'',
            calendarText:'',
            stageList:[],
            colorBlock:[ '#21a7b0','#ae21a3','#e18518','#5621af','#1620ab'],
            setColorIndex: 0,
            Colorblock:'#21a7b0',
            fileItem:[],
            fileItemIndex: {},
            newData: ''
        }
    },
    methods:{
        eventClick(event){ //events的点击事件
            this.editItem = event;
            this.isAdd = true;
        },
        dayClick(date, jsEvent, view){ //日期的点击事件
            this.editItem = {};
            this.isAdd = true;
        },
        changeMonth() {
            if(document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','').length ==2 ||  document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','') == '十' ){
                this.newData = document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[1]+'-'+ document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','').replace('十一','11').replace('十二','12').replace('十','10')
            }else{
                this.newData = document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[1]+'-'+ document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','').replace('一','01').replace('二','02').replace('三','03')
                .replace('四','04').replace('五','05').replace('六','06').replace('七','07').replace('八','08').replace('九','09')
            }
            this.getPm_project_setting_flow(this.fileItemIndex.id);
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
            this.$set(this.events, index, this.events[index]);
            // this.Colorblock = item;
            console.log(item)
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
                // if(item.id){
                //     this.editPm_project_setting_flow(item)
                // }else{
                //     this.createdPm_project_setting_flow(item)
                // }
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
                id : this.editItem.id?this.editItem.id:'',
                title : this.newItem.title,
                start : this.newItem.period[0],
                end : this.newItem.period[1],
                color : this.newItem.color,
            })
            this.$nextTick(() => {
                var container = document.getElementsByClassName('submit_list')[0];
                container.scrollTop = container.scrollHeight;
            })
            
        },
        handleCommand(command) {
            console.log(command)
            this.fileItemIndex = command;
            this.getPm_project_setting_flow(command.id)
        },
        //产品列表
        getPm_projectList(){
            this.$http.get(this.$conf.env.getPm_projectList).then(res =>{
                this.fileItem = res.data;
                if(res.data.length){
                    this.fileItemIndex = res.data[0];
                    this.changeMonth();
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getPm_project_setting_flow(ID){
            this.isLoading = false;
            this.$http.get(this.$conf.env.getPm_project_setting_flow + ID + '&month=' + this.newData ).then(res =>{
                if(res.data.length>0){
                    res.data.forEach(Element =>{
                        Element.title = Element.name;
                        delete Element.name;
                        Element.start = Element.start_time;
                        delete Element.start_time;
                        Element.end = Element.end_time;
                        delete Element.end_time;
                        Element.color = Element.colour;
                        delete Element.colour;
                    })
                }
               this.events = res.data;
               this.$nextTick(() => {
                    var container = document.getElementsByClassName('submit_list')[0];
                    container.scrollTop = container.scrollHeight;
                })
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        //修改产品配置
        editPm_project_setting_flow(item){
            if(!VerificationData.VerificationData(item)) return;
            var params = {
                "name": item.title,
                "colour": item.color,
                "start_time": item.start,
                "end_time": item.end
            }
            this.$http.put(this.$conf.env.editPm_project_setting_flow + item.id +'/', params).then(res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                     this.getPm_project_setting_flow(this.fileItemIndex.id);
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        createdPm_project_setting_flow(item){
            var params = {
                "name": item.title,
                "colour": item.color,
                "start_time": item.start,
                "end_time": item.end,
                "product": this.fileItemIndex.id
            }
            if(!VerificationData.VerificationData(params)) return;
            this.$http.post(this.$conf.env.editPm_project_setting_flow , params).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                     this.getPm_project_setting_flow(this.fileItemIndex.id);
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        deletePm_project_setting_flow(item,index){
            this.$confirm('此操作将删除该设计方法, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(!item.id){
                    this.events.splice(index,1)
                    this.$message({ message: '删除成功', type: 'success'});
                }else{
                    this.$http.delete(this.$conf.env.deletePm_project_setting_flow + item.id +'/').then( res =>{
                        if(res.status == '204'){
                            this.$message({ message: '删除成功', type: 'success'});
                            this.events.splice(index,1)
                        }else{
                            this.$message({ message: '删除失败', type: 'warning'});              
                        }
                    }).catch(err =>{
                        if(err.response.status == '400'){
                            this.$message({ message:err.response.data, type: 'warning'});   
                        }else{
                            this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                        }
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });          
            });
            
        }
    },
    mounted(){
        this.getPm_projectList();
        document.getElementsByClassName('fc-next-button')[0].addEventListener('click',this.changeMonth);
        document.getElementsByClassName('fc-prev-button')[0].addEventListener('click',this.changeMonth);
    },
    watch:{
        newData(newData, oldData){
           
        }
    }
}
</script>
<style lang="scss">
.calendar{
    display: flex;
    padding-top: .42rem;
    .calendar_box{
        width: 46%;
        font-size: .2rem;
        height: 100%;
        // border: 1px solid #ebebeb;
        padding-left: .2rem;
        padding-top: .14rem;
        .taskkAllocation_index_header{
            height: .38rem;
            display: flex;
            margin-left: .19rem;
            align-items: flex-end;
            padding-bottom: .43rem;
            h3{
                font-size: .36rem;
                color: #333333;
                font-weight: 500;
                margin-bottom: .04rem;
                line-height: .36rem;
            }
            //返回按钮
            .goBack{
                margin-left: .28rem;
                font-size: .23rem
            }
        }
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
            .el-dropdown{
                .el-dropdown-link{
                   font-size: .2rem; 
                }
            }
            .addButton{
                width: .26rem;
                height: .26rem;
                // background: #08a695;
                border-radius: 50%;
                display: flex;
                cursor: pointer;
                img{
                    width: 100%;
                }
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
                display: flex;
                align-items: center;
                justify-content: space-between;
                img{
                    width: .35rem;
                }
            }
            div{
                margin-bottom: .08rem;
                display: flex;
                align-items: center;
                span{
                    display: flex;
                    i{
                        margin: 0;
                    }
                }
                .el-date-editor{
                    flex: 1;
                }
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
        .submit_list::-webkit-scrollbar{
            width: .04rem!important;
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