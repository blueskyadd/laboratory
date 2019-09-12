<template>
    <div class="LaboratoryManagerIndex body_main">
        <div class="LaboratoryManagerIndex_top">
            <div class="show_background userInfo">
                <div class="user_header">
                    <span>
                        <img src="http://pic40.nipic.com/20140424/18085978_175633400193_2.jpg" alt="">
                    </span>
                </div>
                <div class="user_content">
                    <h3>康复的·克拉克</h3>
                    <div class="edit_userinfo">
                        <span>个性便签</span>
                        <span></span>
                    </div>
                    <p>修养的话额修养的话额娃儿在寂静中开放娃儿在寂静中开放</p>
                    <footer @click="goPrincipalProject()">
                        <span>23</span><span>负责项目</span>
                    </footer>
                </div>
            </div>
            <div class="show_background histogram">
                <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
                <span>2018</span>
            </div>
            <div class="show_background data">
                <div class="equipment_data">
                    <equipmentData titleName="设备运行率" @goDetail="$router.push({name:'operatinRatio'})"/>
                    <equipmentData titleName="设备保养率"/>
                    <equipmentData titleName="设备维修率"/>
                    <equipmentData titleName="设备安全率" @goDetail="$router.push({name:'safeStock'})"/>
                </div>
            </div>
        </div>
        <div class="LaboratoryManagerIndex_bottom">
            <div class="my_apply">
                <header class="show_background">我的应用</header>
                <ul class="main_list">
                    <li @click="$router.push({name:'activeNumber'})" class="show_background"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>活跃人数</span></li>
                    <li @click="$router.push({name:'projectSum'})" class="show_background"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>项目总数</span></li>
                    <li @click="$router.push({name: 'equipmentArchives'})" class="show_background"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>设备档案</span></li>
                    <li @click="$router.push({path:'/LaboratoryManager/AlarmLog?flag=1'})" class="show_background"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>报警日志</span></li>
                    <li @click="$router.push({name: 'LabTestStandard'})" class="show_background"><img src="../../../assets/img/project/flow/interior.png" alt=""><span>实验标准</span></li>
                </ul>
            </div>
            <div class="my_dynamic show_background">
                <header>
                    <span>项目动态</span>
                    <div style="display:flex;">
                        <span class="name">优先级</span>
                        <el-dropdown trigger="click" @command="handleCommand">
                        
                            <span class="el-dropdown-link">
                                {{fileItemIndex.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in fileItem" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </header>
                <div class="main_box">
                    
                    <div class="header_list">
                        <ul>
                            <li>项目</li>
                            <li>试验</li>
                            <li>负责人</li>
                            <li>进度</li>
                            <li>状态</li>
                        </ul>
                    </div>
                    <div class="main_element">
                        <ul  :class="isHiddenBox?'hiddenHeight hidden_box': 'hidden_box'" :style="{'height': setHeight}">
                            <li>
                                <div class="title">
                                    <span >红旗轿车</span>
                                    <span class="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div class="element_principal">
                                            <i @click="setElementHidden"></i>
                                            <span class="element_principal_border"></span>
                                            <span class="element_principal_name">张张磊磊</span>
                                        </div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                    <li>
                                        <div class="element_test">
                                            <span></span>
                                            <span>这栋实验</span>
                                        </div>
                                       <div class="element_principal"><span>张磊</span></div>
                                       <div class="progress_bar"></div>
                                       <div class="element_status">正常</div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="my_lab show_background">
                <header>实验室异常事件</header>
                <table>
                    <tr>
                        <th>实验室</th>
                        <th>设备名称</th>
                        <th>时间</th>
                        <th>异常原因</th>
                    </tr>
                    <tr>
                        <td>实验三</td>
                        <td>高温试验箱</td>
                        <td>9:45</td>
                        <td>高温预警</td>
                    </tr>
                    <tr>
                        <td>实验三</td>
                        <td>高温试验箱</td>
                        <td>9:45</td>
                        <td>高温预警</td>
                    </tr>
                    <tr>
                        <td>实验三</td>
                        <td>高温试验箱</td>
                        <td>9:45</td>
                        <td>高温预警</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import equipmentData from '../../../components/common/equipment_data'
export default {
    name:'LaboratoryManagerIndex',
    components:{equipmentData},
    data(){
        return{
            fileItem:[{name:'高',id:1},{name:'中',id:2},{name:'低',id:3}],
            fileItemIndex: {name:'高',id:1},
            isHiddenBox: false,
        }
    },
    mounted(){
        this.drawLine();
        this.$emit('headerTitle','实验室信息化管理系统-实验室经理')
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
    },
    computed:{
        setHeight(){
            return 4*0.63 + 'rem'
        }
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
            backgroundColor: '#FFFFFF',
            top:'10%',
            title: {
                text: '实验室设备维修工时',
                top: 19,
                left: 12,
                fontSize: '.2rem',
                fontWidth: '300'
            },
            
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                top:'15%',
                right: '6%',
                icon: "roundRect",
                itemWidth: 20,
                itemHeight: 20,
                itemGap: 25,
                data: [
                    { name:'维修工时',textStyle:{color:'#339eff', fontSize: 16,}},
                    { name:'保养工时',textStyle:{ color:'#02f2e9', fontSize: 16}}
                ]
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '25%',
                containLabel: true
            },
            bar:{
                itemStyle:{
                    barBorderRadius: 22
                }
            },
            xAxis: [{
                show:true,	
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine:{
                    lineStyle:{
                        color:'#999999'
                    }
                },
                axisTick:{show:false}
            }],
            yAxis: [{
                name: '单位(h)',
                type: 'value',
                //name: '投诉举报数',
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine:{
                    show: false
                },
                axisTick:{
                    lineStyle:{color:'#999'}
                }
            }],
            series: [{
                name: '维修工时',
                type: 'bar',
                barWidth:'23',
                itemStyle: {
                    normal: {
                        color: '#329dff',
                        barBorderRadius: 2
                    },
                },
                data: [2031, 1793, 3640, 2593, 4377, 3201, 2275, 3289, 3356, 2859, 4244, 3945]
            }, {
                name: '保养工时',
                type: 'bar',
                barWidth:'25',
                itemStyle: {
                    normal: {
                        color: '#00f1e8',
                        barBorderRadius: 2
                    },
                },
                data: [1043, 1456, 1900, 1200, 2100, 1870, 980, 1569, 1130, 1490, 2300, 2210]
            }]
            });
        },
        handleCommand(command) {
            console.log(command)
            this.fileItemIndex = command;
        },
        setElementHidden(){
            this.isHiddenBox = !this.isHiddenBox
        },
        goPrincipalProject(){
            this.$router.push({name: 'principalProject'});
        }
  }
}
</script>
<style lang="scss">
.LaboratoryManagerIndex{
@import '../../../style/pm/index.scss';
    padding: .2rem .3rem .17rem;
    width: auto;
    background: #e4f4f4;
    .LaboratoryManagerIndex_top{
        height: 44%;
        margin-bottom: .16rem;
        display: flex;
       
        .histogram{
            border-radius: .06rem;
            width: 51%;
            height: 100%;
            margin-right: .16rem;
            overflow: hidden;
            position: relative;
            span{
                position: absolute;
                top: .33rem;
                right: 6%;
                font-size: .18rem;
                color: #666666;
            }
        }
        .data{
            border-radius: .06rem;
            width: 31.7%;
            background: #fff;
            .equipment_data{
                width: auto;
                display: flex;
                flex-wrap: wrap;
                
                .equipment_data_list{
                    width: 49.8%;
                    height: 50%;
                    .circle{
                        width: 1.4rem!important;
                        height: 1.2rem!important;
                    }
                    h3{
                        font-size: 0.2rem;
                        color: #333333;
                        line-height: 0.24rem;
                        padding: .36rem 0 0.1rem .4rem;
                    }
                }
            }
             .equipment_data>div:nth-child(3),.equipment_data>div:nth-child(4){
                h3{
                    padding-top: .1rem;
                }
                border-top: 1px solid #e3f5f5;
            }
            .equipment_data>div:nth-child(3),.equipment_data>div:nth-child(1){
                border-right: 1px solid #e3f5f5;
            }
        }
    }
    .LaboratoryManagerIndex_bottom{
        height: 51.5%;
        display: flex;
        
       
        .my_lab{
            border-radius: .06rem;
            height: 100%;
            width: 40.1%;
            overflow: hidden;
            height: 100%;
             header{
                font-size: .16rem;
                height: .48rem;
                line-height: .48rem;
                padding-left: .2rem;
                background: #fff;
                margin-bottom: 1px;
            }
            table{
                padding-top: .11rem;
                width: 100%;
                font-size: .14rem;
                color: #08a795;
                background: #fff;
                height: 100%;
                tr{
                    display: flex;
                    justify-content: space-around;
                    th{
                        line-height: .34rem;
                        color: #b0b0b0;
                    }
                    td{
                        line-height: .4rem;
                    }
                }
            }
        }
    }
}
</style>