<template>
    <div class="management_testManagement">
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">标准名称</span>
                    <el-select v-model="value" placeholder="请选择标准名称">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">上传单位</span>
                    <el-select v-model="value" placeholder="请选择上传单位">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="editTableButton">
                <el-button type="primary" @click="searchPersonnel">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
            <div class="addequipment">
                <el-button  type="primary" @click="editquipment('新增试验标准', true)">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="标准编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="标准名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="上传单位" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="上传时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address" fixed='right' label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement deletemanagement"  @click="allocation(scoped)">下载</span><span class="underline deletemanagement"  @click="allocation(scoped)">删除</span> </template>
            </el-table-column>
        </el-table>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span>实验标准名称：</span>
                        <input type="text"  placeholder="填写实验标准名称">
                    </li>
                    <li>
                        <span>试验标准编号：</span>
                        <input   type="text" placeholder="填写试验标准编号">
                    </li>
                    <li>
                        <span>上传单位：</span>
                        <input type="text" placeholder="填写上传单位">
                    </li>
                    <li class="upload">
                        <span>上传图片：</span>
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                        </div>
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary">完成</el-button></li>
                </ul>
                
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../components/common/popUp';
export default {
    name:'testManagement',
    components:{popUp},
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: ' 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上7 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海 1516 弄'
        }],
        options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
        value: '',
        popUptitle: '',
        isUpslot: false,
      }
    },
    methods:{
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
         /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ||data.columnIndex == 3) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        lookDetail(data){

        },
        allocation(data){
            this.$router.push({name: 'applicationtestManagement' })
        },
        /**@name功能按键 */
        //弹框
        editquipment(title, flag, data){
            this.popUptitle = title;
            this.isUpslot = flag;
            this.$refs.popUp.dialogVisible = true;
        },
        //上传按钮
        updataFileChange(){
            this.$refs.file.click()
        },
        //搜索按钮
        searchPersonnel(){

        },
        //上传按钮
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        //文件删除
        deleteFile(){
            this.file = {};
            this.fileName = '';
        },
    }
}
</script>
<style lang="scss">
.management_testManagement{
    .Search{
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        ul{
            margin-left: .55rem;
            display: flex;
            margin-top: .26rem;
            margin-bottom: .33rem;
            li{
                margin-right: .94rem;
                display: flex;
                align-items: center;
                .equipmentName{
                    font-size: .24rem;
                    margin-right: .27rem;
                }
                input{
                    width: 3.60rem;
                    font-size: .23rem;
                    font-weight: 200;
                    height: .48rem;
                    border: 1px solid #999999;
                }
                .el-select__caret{
                    font-size: .23rem;
                    color:#999999;
                }
                .el-input__icon{
                    line-height: .46rem;
                    width: .46rem;
                }
            }
        }
         button{
            font-size: .25rem;
            padding: .1rem .32rem;
            background: #08a795;
            color: #fff;
            border: 0;
            span{
                text-decoration: underline;
            }
        }
        .editTableButton{
            margin-top: .43rem;
            padding-bottom: .26rem;
            padding-right: 1.8rem;
            height: .48rem;
            display: flex;
            width: 100%;
            justify-content: flex-end;
            margin-left: .18rem;
            border-bottom: 1px solid #cccccc;
            button:first-child{
                margin-right: .28rem;
            }
            button:last-child{
                background: #fff;
                color: #08a795;
                margin-right: 1.79rem;
            }
        }
        .addequipment{
            margin: .22rem 1.79rem .15rem 0;
            display: flex;
            justify-content: flex-end;
            width: 100%;
            button{
                margin-right: 1.79rem;
            }
        }
        
    }
     th{
            font-size: .2rem;
            line-height: .48rem;
            padding: 0;
            font-weight: 400;
            .cell{
                line-height: .48rem;
            }
        }
        td{
            border: 0;
            padding: 0;
            font-size: .23rem;
             .cell{
                line-height: .67rem;
                span{
                    line-height: .67rem;
                }
            }
        }
        //斑马线
        .warning-row{
            background:#f6f6f6;
        }
        .lookmanagement{
            margin-right: .37rem;
        }
        .deletemanagement{
            color: #f30000;
        }
        .popUp{
             .el-dialog{
                 height: 58%!important;
             }
             li{
                 
                 margin-bottom: .4rem!important;
             }
             li>span{
                width: 1.9rem!important;
            }
        }
}
</style>
