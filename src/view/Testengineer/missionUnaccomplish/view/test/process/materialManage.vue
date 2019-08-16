<template>
    <div class="taskAllocation_distributed_measure ">
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%"  :row-class-name="tabRowClassName">
            <el-table-column prop="date"  label="物料编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="date"  label="物料名称" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="date"  label="物料种类" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name" label="物料数量"  fixed='right'   header-align='center' align='center'></el-table-column>
            <el-table-column prop="name" label="备注"  fixed='right'   header-align='center' align='center'></el-table-column>
            <el-table-column prop="address" fixed='right' label="编辑" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline edit"  @click="allocation(scoped)">删除</span><span class="underline"  @click="editquipment('编辑物料', false,scoped)">编辑</span> </template>
            </el-table-column>
        </el-table>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span>物料名称：</span>
                        <input type="text"  placeholder="填写物料名称">
                    </li>
                    <li>
                        <span>物料种类：</span>
                        <input   type="text" placeholder="填写物料种类">
                    </li>
                    <li >
                        <span>物料数量：</span>
                        <input  type="text" placeholder="填写物料数量">
                    </li>
                    <li>
                        <span>物料备注：</span>
                        <textarea placeholder="填写物料备注" maxlength="50"></textarea>
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary">完成</el-button></li>
                </ul>
                
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../../components/common/popUp';
export default {
    name: 'measure',
    components:{popUp},
    data(){
        return{
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
            }
        ],
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
        isUpslot:false
        }
    },
    methods:{
        /**@name 修改表格字体颜色 */
        changecolor(data){
            if (data.columnIndex == 0 ) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
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
.taskAllocation_distributed_measure{
    padding-top: .07rem;
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
            .edit{
                margin-right: .68rem;
            }
        }
        .popUp{
            textarea{
                height: 1.04rem;
                padding: 0 .15rem;
                width: 4.12rem;
                border: 0;
                border: 1px solid #cccccc;
                font-size: .23rem;
                font-weight: 200;
                margin-bottom: .5rem;
            }
            textarea::placeholder{
                color: #989898;
            }
        }
    }
</style>
