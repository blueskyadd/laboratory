<template>
    <div class="LaboratoryManagerIndex body_main">
        <div class="LaboratoryManagerIndex_top">
            <div class="show_background userInfo">
                <div class="user_header">
                    <span>
                        <img :src="userInfoDetail.avatar" alt="">
                    </span>
                </div>
                <div class="user_content">
                    <h3>{{userInfoDetail.name}}</h3>
                    <div class="edit_userinfo">
                        <span>个性便签</span>
                        <el-popover
                            placement="top-start"
                            v-model="isUserEdit"
                            width="200"
                            trigger="click"
                            popper-class='PMenegeIndex_upload'
                            >
                            <div class="upload_BOX">
                                <header>编辑信息<span></span></header>
                                <div class="from">
                                    <div class="userImgurl" style="margin-bottom:.26rem;margin-top:.22rem;">
                                        <span class="userTitle"><i class="importantData">*</i>头像</span>
                                        <div>
                                            <input type="file" ref="file" style="display:none" @change="updataFile">
                                            <span class="fileImg"><img :src="editUserInfo.avatar"  alt=""></span>
                                            <span class="addfile"  @click="updataUserImg()"><img src="../../../assets/img/commont/file/addfile.png" alt=""></span>
                                        </div>
                                    </div>
                                    <div style="margin-bottom:.14rem"><span><i class="importantData">*</i>个性签名</span><input v-model="editUserInfo.intro" type="text"></div>
                                    <el-button type="primary" @click="editUser_infoDetail()">确定</el-button>
                                </div>
                            </div>
                            <span slot="reference" style="cursor:pointer;"><img src="../../../assets/img/PMenege/index/editUser.png" alt=""></span>
                        </el-popover>
                    </div>
                    <p style="-webkit-line-clamp:3;min-height: .65rem;">{{userInfoDetail.intro}}</p>
                    <footer @click="goPrincipalProject()">
                        <span>{{userInfoDetail.project}}</span><span>负责项目</span>
                    </footer>
                </div>
            </div>
            <div class="show_background histogram">
                <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
                <span class="Time">{{newYear}}</span>
            </div>
            <div class="show_background data">
                <div class="equipment_data" v-if="isEquipment_data">
                    <equipmentData titleName="设备运行率"  :operatingNum='Laboratory_topNumber.num1' @goDetail="$router.push({name:'operatinRatio'})"/>
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
                    <equipmentData titleName="设备安全率" :operatingNum='Laboratory_topNumber.num4' @goDetail="$router.push({name:'safeStock'})"/>
                </div>
            </div>
        </div>
        <div class="LaboratoryManagerIndex_bottom">
            <div class="my_apply">
                <header class="show_background">我的应用</header>
                <ul class="main_list">
                    <li @click="$router.push({name:'activeNumber'})" class="show_background"><img src="../../../assets/img/LabManager/index/activeNumber.png" alt=""><span>活跃人数</span></li>
                    <li @click="$router.push({name:'projectSum'})" class="show_background"><img src="../../../assets/img/LabManager/index/projectSum.png" alt=""><span>项目总数</span></li>
                    <li @click="$router.push({name: 'equipmentArchives'})" class="show_background"><img src="../../../assets/img/LabManager/index/equipmentArchives.png" alt=""><span>设备档案</span></li>
                    <li @click="$router.push({path:'/LaboratoryManager/AlarmLog?eqeryData=day'})" class="show_background"><img src="../../../assets/img/LabManager/index/AlarmLog.png" alt=""><span>报警日志</span></li>
                    <li @click="$router.push({name: 'LabTestStandard'})" class="show_background"><img src="../../../assets/img/LabManager/index/LabTestStandard.png" alt=""><span>试验标准</span></li>
                </ul>
            </div>
             <div class="tableInfo listInfo ">
                <project-dynamic></project-dynamic>
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
                    <div class="scroll_y" ref="Laboratory_alarm"  @scroll="getLaboratory_alarmMore">
                        <tr v-for="item in Laboratory_alarm" :key="item.id">
                            <td>{{item.room}}</td>
                            <td>{{item.equipment}}</td>
                            <td>{{item.create_time}}</td>
                            <td>{{item.cause}}</td>
                        </tr>
                    </div>
                    
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import equipmentData from '../../../components/common/equipment_data';
import VerificationData from '../../../components/VerificationData';
import projectDynamic from '../../../components/projectDynamic'
export default {
    name:'LaboratoryManagerIndex',
    components:{equipmentData, projectDynamic},
    data(){
        return{
            newYear:'',
            isHiddenBox: false,
            isUserEdit: false,
            editUserInfo:{"avatar":'', "intro":''},//修改个人信息
            userInfoDetail:{},
            isEquipment_data: false,
            Laboratory_drawLine:{"upkeep":[],"maintain":[]},
            Laboratory_topNumber:{},
            Laboratory_alarm:[],//设备异常列表
            isNoticeLaboratory_alarmScroll: true,//设备异常列表上拉加载
            Laboratory_alarm_pagenumber: 1,//设备异常上拉加载页数
        }
    },
    mounted(){
        this.getLaboratory_drawLine();//获取设备维修公时
        this.getUser_infoDetail();//获取个人信息
        this.getLaboratory_topNumber();//获取右侧设备运行率
        this.getLaboratory_alarm();//获取设备异常列表
        this.$emit('headerTitle','实验室信息化管理系统-实验室经理');
        let data =  new Date;
        this.newYear = data.getFullYear();
    },
    destroyed(){
        this.$emit('headerTitle','实验室信息化管理系统')
    },
    computed:{
    },
    methods: {
        goPrincipalProject(){
            this.$router.push({name: 'principalProject'});
        },
        /**@name获取维修工时 */
        getLaboratory_drawLine(){
            this.$http.get(this.$conf.env.getLaboratory_drawLine).then(res =>{
                var arr = [];var arr1 = [];
                this.Laboratory_drawLine = res.data;
                for(var i in res.data.maintain){
                    arr.push(res.data.maintain[i])
                }
                for(var i in res.data.upkeep){
                    arr1.push(res.data.upkeep[i])
                }
                console.log(arr)
                this.Laboratory_drawLine.maintain = arr
                this.Laboratory_drawLine.upkeep = arr1
                console.log(this.Laboratory_drawLine)
                this.drawLine()
            })
        },
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
                barWidth:'15',
                itemStyle: {
                    normal: {
                        color: '#329dff',
                        barBorderRadius: 2,
                    },
                },
                data: this.Laboratory_drawLine.upkeep
            }, {
                name: '保养工时',
                type: 'bar',
                barWidth:'15',
                itemStyle: {
                    normal: {
                        color: '#00f1e8',
                        barBorderRadius: 2
                    },
                },
                data: this.Laboratory_drawLine.maintain
            }]
            });
        },
        /**@name 修改个人信息 */
        //头像上传
        updataUserImg(){
            this.$refs.file.click();
        },
        //头像上传
        updataFile(e){
            this.$updataFile.updataFile(e.target.files[0],res =>{
                this.editUserInfo.avatar = res.data.file;
            },this)
        },
        //修改个人信息
        editUser_infoDetail(){
            if(!VerificationData.VerificationData(this.editUserInfo)) return;
            this.$http.put(this.$conf.env.editUser_infoDetail,this.editUserInfo).then( res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    this.getUser_infoDetail();
                    this.isUserEdit = false;
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name 获取个人信息 */
        getUser_infoDetail(){
            this.$http.get(this.$conf.env.getUser_infoDetail).then(res =>{
                this.userInfoDetail = res.data;
                this.editUserInfo.avatar = res.data.avatar;
                this.editUserInfo.intro = res.data.intro;
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
        /**@name 获取设备异常列表 */
        //加载
        getLaboratory_alarmMore(e){
            if(e.target.scrollTop > e.target.clientHeight - 150 && this.isNoticeLaboratory_alarmScroll){
                console.log('加载')
                this.Laboratory_alarm_pagenumber += 1;
                this.getLaboratory_alarm();
            }
        },
        getLaboratory_alarm(){
            this.$http.get(this.Laboratory_alarm_pagenumber == 1 ? this.$conf.env.getLaboratory_alarm: this.$conf.env.getLaboratory_alarm + '?p=' + this.Laboratory_alarm_pagenumber).then(res =>{
                this.isNoticeLaboratory_alarmScroll = res.data.next? true:false;
                this.Laboratory_alarm = this.Laboratory_alarm_pagenumber == 1 ? res.data.results:this.Laboratory_alarm.concat(res.data.results);
            }).catch(err =>{
                this.isNoticeLaboratory_alarmScroll = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        
  },
}
</script>
<style lang="scss">
.LaboratoryManagerIndex{
@import '../../../style/pm/index.scss';
@import '../../../../static/font/font.css';
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
            .Time{
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
                .text_number{
                    margin-right: .4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span:first-child{
                        font-family:MFShangHei;
                        color: #7901dc;
                        font-size: 1.29rem;
                    }
                    span:last-child{
                        font-size: .4rem;
                        color: #434343;
                        margin-top: .5rem;
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
        .tableInfo{
            .schedule{
                height: 100%;
                width: 100%!important;
                header{
                    height: 12.6%;
                }
            }
        }
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
                width: 100%;
                padding-top: .11rem;
                width: 100%;
                font-size: .14rem;
                color: #08a795;
                background: #fff;
                height: 100%;
                .scroll_y{
                    height: calc(100% - .8rem);
                    overflow-y: scroll;
                }
                tr{
                    display: flex;
                    justify-content: space-around;
                    th{
                        line-height: .34rem;
                        color: #b0b0b0;
                    }
                    td{
                        line-height: .4rem;
                        width:1.85rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>