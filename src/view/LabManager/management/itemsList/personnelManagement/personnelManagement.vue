<template>
    <div class="management_personnelManagement">
        <div class="editTableButton">
            <el-button type="primary" @click="addPersonnel">新增</el-button>
            <el-button type="primary">导入</el-button>
        </div>
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="序号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="工号" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="姓名" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="职位" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="address" fixed='right' label="详情" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline lookmanagement"  @click="allocation(scoped)">查看</span><span class="underline lookmanagement"  @click="editPersonnel(scoped)">编辑</span><span class="underline deletemanagement"  @click="allocation(scoped)">删除</span> </template>
            </el-table-column>
        </el-table>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <div v-if="isUpslot == 1">
                    <ul>
                        <li><span>人员姓名：</span><input type="text" placeholder="填写姓名"></li>
                        <li><span>人员工号：</span><input  type="text" placeholder="填写工号"></li>
                        <li><span>部门：</span><input  type="text" placeholder="填写部门"></li>
                        <li>
                            <span>职位：</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li><span>手机号：</span><input  type="text" placeholder="填写手机号"></li>
                        <li class="upload">
                            <span>上传简历：</span>
                            <input type="file" ref="file"  @change='updataFile' style="display:none" >
                            <div>
                                <span @click="updataFileChange"><img src="../../../../../assets/img/commont/file/addfile.png" alt=""></span>
                            </div>
                           
                        </li>
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary">完成</el-button></li>
                    </ul>
                </div>
                <div v-else>
                    <ul>
                        <li>
                            <span>人员名称：</span>
                            <p>是否 微服务</p>
                        </li>
                        <li>
                            <span>人员工号：</span>
                            <p>32423423423</p>
                        </li>
                        <li>
                            <span>公司：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li>
                            <span>职位：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li>
                            <span>手机号：</span>
                            <p>水电费无法热风人</p>
                        </li>
                        <li class="upload">
                            <span>上传简历：</span>
                            <span class="accessory"><img src="../../../../../assets/img/commont/file/accessory.png" alt=""><span class="underline deleteFile" @click="deleteFile()">删除</span></span>
                            <p>{{fileName}}</p>
                             
                        </li>
                        <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary">完成</el-button></li>
                    </ul>
                </div>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../components/common/popUp'
export default {
    name:'personnelManagement',
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
        popUptitle: '',
        isUpslot: 1,
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
        fileName: '简历',
        file:'',
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
            this.$router.push({name: 'applicationpersonnelManagement' })
        },
        addPersonnel(){
            this.setdialogVisible('新增人员',1)
        },
        editPersonnel(data){
             this.setdialogVisible('编辑人员',2)
        },
        setdialogVisible(title, flag){
            this.popUptitle = title;
            this.isUpslot = flag;
            this.$refs.popUp.dialogVisible = true;
        },
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        deleteFile(){
            this.file = {};
            this.fileName = '';
        }
    }
}
</script>
<style lang="scss">
.management_personnelManagement{
    // margin-top: .43rem;
    .editTableButton{
        margin-top: .43rem;
        margin-bottom: .26rem;
        padding-right: 1.8rem;
        height: .48rem;
        display: flex;
        justify-content: flex-end;
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
        button:first-child{
            margin-right: .28rem;
        }
        button:last-child{
            background: #fff;
            color: #08a795;
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
        .principal{
            .cell{
                margin-left: 0.6rem;
            }
        }
        .lookmanagement{
            margin-right: .37rem;
        }
        .deletemanagement{
            color: #f30000;
        }
        

}
</style>
