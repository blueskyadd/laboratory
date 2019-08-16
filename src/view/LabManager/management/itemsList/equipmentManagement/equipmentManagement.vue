<template>
    <div class="management_equipmentManagement">
        <div class="Search">
            <ul>
                <li>
                    <span class="equipmentName">设备名称</span>
                    <el-select v-model="value" placeholder="请选择设备名称">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">实验室</span>
                    <el-select v-model="value" placeholder="请选择实验室">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="equipmentName">设备状态</span>
                    <el-select v-model="value" placeholder="请选择设备状态">
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
                <el-button  type="primary" @click="editquipment('新增设备', true)">新增</el-button>
            </div>
        </div>
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="设备编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="实验室" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="负责人" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备状态" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备二维码" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address" fixed='right' label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement"  @click="allocation(scoped)">查看</span><span class="underline lookmanagement"  @click="editquipment('编辑设备', false,scoped)">编辑</span><span class="underline deletemanagement"  @click="allocation(scoped)">删除</span> </template>
            </el-table-column>
        </el-table>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span>设备编号：</span>
                        <el-select v-model="value" v-if="isUpslot" placeholder="请选择设备编号">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <input type="text" v-else placeholder="请填写设备编号">
                    </li>
                    <li>
                        <span>设备名称：</span>
                        <p v-if="isUpslot"></p>
                        <input v-else  type="text" placeholder="填写设备名称">
                    </li>
                    <li>
                        <span>所属实验室：</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span>设备负责人：</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="upload">
                        <span>上传图片：</span>
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div>
                            <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                        </div>
                    </li>
                    <li class="upload">
                        <span>上传文件：</span>
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div v-if="isUpslot">
                            <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                        </div>
                        <span v-else class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>

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
    name:'equipmentManagement',
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
            this.$router.push({name: 'lookEquipment' })
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
@import '../../../../../style/LabManager/management/index.scss';
.management_equipmentManagement{

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
                 height: 76%!important;
             }
             li{
                 margin-bottom: .32rem!important;
             }
        }
}
</style>
