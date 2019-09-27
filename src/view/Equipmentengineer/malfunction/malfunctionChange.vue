<template>
    <div  class="body_main malfunctionChange_index">
        <!-- 公共头部 -->
        <header class="malfunctionChange_index_header">
            <h3>工具物料申请</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <div class="malfunctionChange_index_header_link">
                <span class="underline" @click="addMalfunction(true)">添加物料</span>
            </div>
        </header>
         <div class="taskName">
            <span>委托公司部门：</span>
            <p class="itemName">控福智能-硬件部</p>
            <span>设备编号：</span>
            <p>控福智能-硬件部</p>
        </div>
        <div class="taskAllocation_distributed ">
            <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - .5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading='isLoading'>
                <el-table-column prop="nateriel_num"  label="物料编号" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name"  label="物料名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="num"  label="物料数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="device_type"  label="物料种类" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="name" label="状态"      header-align='center' align='center'>
                    <template slot-scope="scoped"><span  @click="lookDetail(scoped)">{{scoped.row.status}}</span></template>
                </el-table-column>
                <el-table-column prop="address"   label="操作" header-align='center' align='center'>
                    <template slot-scope="scoped"><span class="underline lookmanagement"    @click="addMalfunction(false, scoped)">编辑</span><span class="underline deletemanagement"  @click="deleteEquipment(scoped.row.id)">删除</span> </template>
                </el-table-column>
            </el-table>
        </div>
        <footer>
            <el-button type="primary" @click="uploadEquipment_material()">提交</el-button>
        </footer>
        <popUp ref="popUp" setWidth='45%' :popUptitle='popUptitle' class="popUp">
            <template>
                <ul>
                    <li>
                        <span><i class="importantData">*</i>物料编号：</span>
                        <el-select
                            v-model="material_section.tool"
                            :disabled='isDisabled_select'
                            filterable
                            remote
                            reserve-keyword
                            v-el-select-loadmore="loadMore"
                            placeholder="请输入关键词"
                            :remote-method="search_materialList"
                            @change='change_materialList'
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
                        <p>{{material_section.material_Name}}</p>
                    </li>
                    <li>
                        <span><i class="importantData">*</i>物料数量：</span>
                        <input type="number" v-model="material_section.num" placeholder="填写设备数量">
                    </li>
                    <li><el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button><el-button type="primary" @click="!isDisabled_select?createdEquipment_material():editEquipment_material()">完成</el-button></li>
                </ul>
            </template>
        </popUp>
    </div>
</template>
<script>
import popUp from '../../../components/common/popUp';
import VerificationData from '../../../components/VerificationData';
export default {
    name:'malfunctionChange',
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
            placeholderTexe:'搜索报告编号、名称',
            tableData: [],
            popUptitle: '新增物料',
            isUpslot: false,
            isLoading:true,//加载动画
            material_section:{
                tool: '',//物料编号
                service: this.$route.query.equipmentID,
                material_Name: '',//物料名称
                num: '',//物料数量
            },
            material_list:[],//物料编号、名称检索列表数据
            isListloading: false,//检索列表加载样式
            materialListPage_number: 1,
            materialListPage_Text: '',
            materialList_loadmore: false,
            isDisabled_select: true,
        }
    },
    methods:{
        
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
        addMalfunction(flag,data){
            this.$refs.popUp.dialogVisible = true;
            this.isDisabled_select = !flag;
            this.popUptitle = flag ? '新增物料' : '修改物料';
            flag ?  this.deleteSection(): this.getEquipment_materialDetail(data);
        },
        deleteSection(){
            this.material_section = {
                tool: '',//物料id
                service: this.$route.query.equipmentID,
                material_Name: '',//物料名称
                num: '',//物料数量
            }
        },
        /**@name检索列表上拉加载 */
        loadMore(data){
            if(!this.materialList_loadmore) return;
            this.materialListPage_number += 1;
            this.search_materialList(this.materialListPage_Text)
        },
        /**@name 编号名称匹配 */
        change_materialList(data){
            this.material_list.forEach(Element =>{
                if(Element.id == data){
                    this.material_section.material_Name = Element.name;
                    this.material_section.num = Element.inventory;
                }
            })
        },
        /**@name 新增物料 */
        createdEquipment_material(){
            if(!VerificationData.VerificationData(this.material_section)) return;
            this.$http.post(this.$conf.env.createdEquipment_material, this.material_section).then(res =>{
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 编辑物料 */
        editEquipment_material(){
            console.log(this.material_section)
            if(!VerificationData.VerificationData(this.material_section)) return;
            this.$http.put(this.$conf.env.editEquipment_material + this.material_section.tool + '/',{num: this.material_section.num} ).then(res =>{
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
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
        /**@name 维修物料详情 */
        getEquipment_materialDetail(data){
            this.$http.get(this.$conf.env.getEquipment_materialDetail  + data.row.id +'/').then(res =>{
                this.search_materialList('')
                res.data.tool =  res.data.id;
                delete res.data.id;
                res.data.material_Name = res.data.name;
                delete res.data.name;
                res.data.service = this.$route.query.equipmentID;
                delete res.data.status;
                this.material_section = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name删除数据 */
        deleteEquipment(ID){
            this.$confirm('此操作将删除该物料, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$conf.env.deleteEquipment_Service + ID + '/').then(res =>{
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
        getEquipment_Service(){
            this.$http.get(this.$conf.env.getEquipment_Service +this.$route.query.equipmentID).then( res =>{
                this.isLoading = false;
                this.tableData = res.data;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 提交 */
        uploadEquipment_material(){
            if(this.tableData.length > 0){
                this.isLoading = true;
                let params = {
                    service: this.$route.query.equipmentID*1
                };
                this.$http.post(this.$conf.env.uploadEquipment_material, params).then( res =>{
                    this.isLoading = false;
                    if(res.status == '201'){
                        this.$message({ message: '提交成功', type: 'success'});
                        setTimeout(()=>{
                            this.reload();
                        },100)
                    }else{
                        this.$message({ message: '提交失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.isLoading = false;
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
                })
            }else{
                this.$message({ message:'暂时没有可提交的数据，快去添加吧' , type: 'warning'}); 
            }
            
        }
    },
    mounted(){
        this.getEquipment_Service()
    }
}
</script>
<style lang="scss">
.malfunctionChange_index{
    @import '../../../style/LabManager/management/index.scss';
    padding-top: .42rem;
    height: calc(100% - .4rem);
    .malfunctionChange_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        // padding-bottom: .5rem;
    //    border-bottom: 1px solid #cccccc;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        // 公共span 
        span{
            font-size: .23rem;
            cursor:pointer;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
        }
        .malfunctionChange_index_header_link{
            height: 100%;
            display: flex;
            align-items: flex-end;
            margin-left: .4rem;
            span{
                margin-right: .38rem;
            }
            .router-link-exact-active{
                color: #07a695;
                text-decoration: underline;
            }
        }
        .malfunctionChange_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
        }
    }
     .taskName{
        margin-left: .19rem;
        margin-bottom: .28rem;
        padding-left: .41rem;
        display: flex;
        font-size: .25rem;
        color: #666;
        padding-top: .34rem;
        span{
            color: #333;
        }
        .itemName{
            width: 1.91rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        // margin-top: .4rem;
        height: calc(100% - 3rem);
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
    }
    // .popUp{
        .el-dialog{
            height: 45% !important;
        li:last-child{
            padding-top: .24rem;
        }
    }
  footer{
        font-size: .32rem;
        float: right;
        margin-right: 1.66rem;
        button{
            font-size: .3rem;
            padding: .12rem .24rem;
            background: #08a695;
        }
    }
    .el-dialog__body{
        height: calc(100% - .79rem)!important;
    }
}
</style>
