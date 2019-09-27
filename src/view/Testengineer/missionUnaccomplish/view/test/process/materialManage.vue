<template>
    <div class="taskAllocation_distributed_measure ">
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
            <el-table-column prop="name"  label="物料名称" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="device_type"  label="物料种类" header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="num" label="物料数量"      header-align='center' align='center'></el-table-column>
            <el-table-column prop="status" label="备注"      header-align='center' align='center'></el-table-column>
            <el-table-column prop="id"   label="编辑" header-align='center' align='center'>
                <template slot-scope="scoped"><span class="underline edit"  :style="{'color':scoped.row.status < 3 ?'':'#999!important','cursor':scoped.row.status < 3?'':'not-allowed'}"   @click="scoped.row.status < 3 && deleteEquipment_exbomInfo(scoped.row.id)">删除</span><span class="underline"  @click="editquipment('编辑物料', false,scoped)">编辑</span> </template>            </el-table-column>
        </el-table>
        <div class="pagination">
            <span class="pagesize">共{{Math.ceil(totalSum/page_size)}}页</span>
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="CurrentChange"
            :page-size="page_size"
            layout="prev, pager, next"
            :total="totalSum">
            </el-pagination>
            <div class="changePage"><span>跳转至：</span><input v-model="CurrentChange" type="number"></div>
        </div>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span>物料编号：</span>
                        <el-select
                            v-model="Equipment_exbomInfo.nateriel"
                            :disabled='!isDisabled_select'
                            filterable
                            remote
                            reserve-keyword
                            v-el-select-loadmore="loadMore"
                            placeholder="请输入物料编号"
                            @change='change_materialList'
                            :remote-method="search_materialList"
                            :loading="isListloading">
                            <el-option
                            v-for="item in material_list"
                            :key="item.id"
                            :label="item.nateriel_num"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span><i class="importantData">*</i>物料名称：</span>
                        <p>{{Equipment_exbomInfo.name}}</p>
                    </li>
                    <li >
                        <span>物料数量：</span>
                        <input  type="text" v-model="Equipment_exbomInfo.num" placeholder="填写物料数量">
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="isDisabled_select?createdEquipment_exbomInfo():editEquipment_exbomInfo()">完成</el-button></li>
                </ul>
                
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../../../../components/common/popUp';
import VerificationData from '../../../../../../components/VerificationData';

export default {
    name: 'measure',
    components:{popUp},
    inject:['reload'],
    directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },
    data(){
        return{
            tableData: [],
            options: [],
            value: '',
            popUptitle: '',
            isUpslot:false,
            isLoading:true,//加载动画
            totalSum:0,//数据总数
            CurrentChange:1,
            currentPage: 1,//当前页
            page_size : 9,//一页数据条数
            Equipment_exbomInfo:{
                "experiment": this.$route.query.equipmentID*1,
                "nateriel":'',
                "num": '',
                "name":''
            },
            isDisabled_select: false,
            material_list:[],//物料编号、名称检索列表数据
            isListloading: false,
            materialListPage_Text: '',
            materialListPage_number: 1,
        }
    },
    methods:{
        /**@name 修改表格字体颜色 */
        changecolor(data){
            return "color:#444444";
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
            this.isDisabled_select = flag;
            this.$refs.popUp.dialogVisible = true;
            flag?this.delete_exbomInfo(): this.getEquipment_exbomInfo(data);
        },
        //重置数据
        delete_exbomInfo(){
            this.Equipment_exbomInfo = {
                "experiment": this.$route.query.equipmentID,
                "nateriel":'',
                "num": '',
                "name":''
            }
        },
        /**@name 获取数据详情 */
        getEquipment_exbomInfo(data){
            this.isLoading = true;
            this.$http.get(this.$conf.env.getEquipment_exbomInfo  + data.row.id +'/').then(res =>{
                this.search_materialList('');
                res.data.nateriel = res.data.num;
                this.Equipment_exbomInfo = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name 编号名称匹配 */
        change_materialList(data){
            this.material_list.forEach(Element =>{
                if(Element.id == data){
                    this.Equipment_exbomInfo.name = Element.name;
                    this.Equipment_exbomInfo.num = Element.inventory;
                }
            })
        },
        /**@name 删除 */
        deleteEquipment_exbomInfo(ID){
            this.$confirm('此操作将删除该物料, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteEquipment_exbomInfo + ID + '/').then(res =>{
                    if(res.status == '204'){
                        this.$message({ message: '删除成功', type: 'success'});
                        this.reload();
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
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });          
            });
        },
        /**@name 创建 */
        createdEquipment_exbomInfo(){
             if(!VerificationData.VerificationData(this.Equipment_exbomInfo)) return;
             delete this.Equipment_exbomInfo.name;
             this.isLoading = true;
            this.$http.post(this.$conf.env.createdEquipment_exbomInfo, this.Equipment_exbomInfo).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 修改 */
        editEquipment_exbomInfo(){
             if(!VerificationData.VerificationData(this.Equipment_exbomInfo)) return;
             this.isLoading = true;
            this.$http.put(this.$conf.env.editEquipment_exbomInfo +  this.$route.query.equipmentID + '/',{num: this.Equipment_exbomInfo.num} ).then(res =>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        loadMore(){
            if(!this.materialList_loadmore) return;
            this.materialListPage_number += 1;
            this.search_materialList(this.materialListPage_Text)
        },
        /**@name 物料名称、编号检索 */
        search_materialList(data){
            this.isListloading = true;
            this.materialListPage_Text = data;
            this.$http.get(this.materialListPage_number==1?this.$conf.env.search_materialList + data : this.$conf.env.search_materialList + data + '&p=' + this.materialListPage_number ).then(res =>{
                console.log(res)
                this.material_list = this.materialListPage_number==1 ?  res.data.results : this.material_list.concat(res.data.results);
                this.materialList_loadmore = res.data.next ? true: false;
                this.isListloading = false;
            }).catch(err =>{
                this.isListloading = false;
                this.materialList_loadmore = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber;
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            this.getEquipemnt_experimentList(pageNumber);
        },
        /**@name 数据渲染 */
        getEquipemnt_experimentList(pageNumber){
            this.$http.get(pageNumber == 1 ? this.$conf.env.getEquipemnt_experimentList+ this.$route.query.equipmentID + '&page_size=' +this.page_size : this.$conf.env.getEquipemnt_experimentList + this.$route.query.equipmentID +'&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getEquipemnt_experimentList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                this.getEquipemnt_experimentList(this.CurrentChange);
            }
        },
    }
}
</script>
<style lang="scss">
.taskAllocation_distributed_measure{
    @import '../../../../../../style/LabManager/management/index.scss';
    padding-top: .07rem;
    height: 100%;
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
            height: 72%!important;
        }
    }
</style>
