<template>
  <div class="body_main upkeepChange_index">
    <!-- 公共头部 -->
    <header class="upkeepChange_index_header">
      <h3>工具物料申请</h3>
      <span class="goBack underline" @click="$router.back(-1)">返回</span>
      <div class="upkeepChange_index_header_link">
        <span class="underline" @click="addMalfunction(true)">添加物料</span>
      </div>
    </header>
    <div class="taskName">
      <span>委托公司部门：</span>
      <p class="itemName">{{labManagrInfo.lab}}-{{labManagrInfo.department}}</p>
    </div>
    <div class="taskAllocation_distributed">
      <el-table :data="tableData" :cell-style="changecolor" style="width: 100%" height="calc(100%  - .5rem)" :row-class-name="tabRowClassName" v-loading='isLoading' >
        <el-table-column prop="name" label="物料名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="num" label="物料数量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="device_type" label="物料种类" header-align="center" align="center"></el-table-column>
        <el-table-column prop="id" label="物料种类" header-align="center" align="center">
          <template slot-scope="scoped"><span class="underline lookmanagement"    @click="addMalfunction(false, scoped)">编辑</span><span class="underline deletemanagement"  @click="deleteEquipment(scoped.row.id)">删除</span> </template>
        </el-table-column>
      </el-table>
    </div>
    <footer>
      <el-button type="primary" @click="updataProject_upkeepFile()">提交</el-button>
    </footer>
    <popUp ref="popUp" setWidth="45%" :popUptitle="popUptitle" class="popUp">
      <template>
        <ul>
          <li>
            <span>物料名称：</span>
            <el-select
                v-model="upkeep_section.tool"
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
              <p>{{upkeep_section.material_Name}}</p>
          </li>
          <li>
            <span>物料数量：</span>
            <p v-if="isUpslot"></p>
            <input v-else type="number" v-model="upkeep_section.num"  placeholder="填写设备数量" />
          </li>
          <li>
            <el-button type="primary" @click="$refs.popUp.dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="!isDisabled_select?createdEquipment_upkeep():editEquipment_upkeep()">完成</el-button>
          </li>
        </ul>
      </template>
    </popUp>
  </div>
</template>
<script>
import popUp from "../../../components/common/popUp";
import VerificationData from '../../../components/VerificationData';
export default {
  name: "upkeepChange",
  components: { popUp },
  inject:['reload'],
  directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },
  data() {
    return {
      placeholderTexe: "搜索报告编号、名称",
      tableData: [],
      options: [],
      value: "",
      popUptitle: "新增物料",
      isUpslot: false,
      isLoading:true,//加载动画
      totalSum:0,//数据总数
      currentPage: 1,//当前页
      page_size : 9,//一页数据条数
      CurrentChange:1,
      isSearch: false,//是否为搜索
      searchText:'',//搜索文字
      isListloading: false,//检索列表加载样式
      isDisabled_select: true,
      upkeep_section:{
        tool: '',//物料编号
        service: this.$route.query.equipmentID,
        material_Name: '',//物料名称
        num: '',//物料数量
      },
      material_list:[],
      materialListPage_number: 1,
      materialListPage_Text: '',
      materialList_loadmore: false,
      labManagrInfo:{}
    };
  },
  methods: {
    searchDetail(data) {
      console.log(data);
    },
    changecolor(data) {
      if (data.columnIndex == 0) {
        return "color:#07a695";
      } else {
        return "color:#444444";
      }
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 2;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },
    addMalfunction(flag,data) {
      this.$refs.popUp.dialogVisible = true;
      this.isDisabled_select = !flag;
      this.popUptitle = flag ? '新增物料' : '修改物料';
       flag ?  this.deleteSection(): this.getEquipment_upkeepDetailInfo(data);
    },
    deleteSection(){
      this.upkeep_section = {
        tool: '',//物料编号
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
                this.upkeep_section.material_Name = Element.name;
                this.upkeep_section.num = Element.inventory;
            }
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
    getEquipment_upkeepserviceList(){
      this.$http.get(this.$conf.env.getEquipment_upkeepserviceList+ this.$route.query.equipmentID).then( res =>{
          this.isLoading = false;
          this.tableData = res.data;
      }).catch(err =>{
          this.isLoading = false;
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
            this.$http.delete(this.$conf.env.deleteEquipmentUpkeep + ID + '/').then(res =>{
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
        /**@name 维修物料详情 */
        getEquipment_upkeepDetailInfo(data){
            this.$http.get(this.$conf.env.getEquipment_upkeepDetailInfo  + data.row.id +'/').then(res =>{
                this.search_materialList('')
                res.data.tool =  res.data.id;
                delete res.data.id;
                res.data.material_Name = res.data.name;
                delete res.data.name;
                res.data.service = this.$route.query.equipmentID;
                delete res.data.status;
                this.upkeep_section = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        /**@name 新增物料 */
        createdEquipment_upkeep(){
            if(!VerificationData.VerificationData(this.upkeep_section)) return;
            this.isLoading = true;
            this.$http.post(this.$conf.env.createdEquipment_upkeep, this.upkeep_section).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.reload();
                    },100)
                }else{
                  this.isLoading = false;
                  this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 编辑物料 */
        editEquipment_upkeep(){
            if(!VerificationData.VerificationData(this.upkeep_section)) return;
            this.$http.put(this.$conf.env.editEquipment_upkeep + this.upkeep_section.tool + '/',{num: this.upkeep_section.num} ).then(res =>{
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
        /**@name 提交 */
        updataProject_upkeepFile(){
          if(this.tableData.length > 0){
                this.isLoading = true;
                let params = {
                    service: this.$route.query.equipmentID*1
                };
                this.$http.post(this.$conf.env.updataProject_upkeepFile, params).then( res =>{
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
        },
        getEquipment_userinfoDetail(){
            this.$http.get(this.$conf.env.getEquipment_userinfoDetail).then(res =>{
                this.labManagrInfo = res.data;
                
            }).catch(err =>{
                console.log(err)
            })
        },
  },
  mounted(){
    this.getEquipment_upkeepserviceList();
    this.getEquipment_userinfoDetail();
  }
};
</script>
<style lang="scss">
.upkeepChange_index {
  padding-top: 0.42rem;

  .upkeepChange_index_header {
    padding-left: 0.41rem;
    height: 0.38rem;
    display: flex;
    margin-left: 0.19rem;
    align-items: flex-end;
    // padding-bottom: .5rem;
    //    border-bottom: 1px solid #cccccc;
    h3 {
      font-size: 0.36rem;
      color: #333333;
      font-weight: 500;
      margin-bottom: 0.04rem;
      line-height: 0.36rem;
    }
    // 公共span
    span {
      font-size: 0.23rem;
      cursor: pointer;
    }
    //返回按钮
    .goBack {
      margin-left: 0.28rem;
    }
    .upkeepChange_index_header_link {
      height: 100%;
      display: flex;
      align-items: flex-end;
      margin-left: 0.4rem;
      span {
        margin-right: 0.38rem;
      }
      .router-link-exact-active {
        color: #07a695;
        text-decoration: underline;
      }
    }
    .upkeepChange_header_Search {
      margin-left: 0.3rem;
      margin-bottom: -0.03rem;
    }
  }
  
  .taskName {
    margin-left: 0.19rem;
    margin-bottom: 0.28rem;
    padding-left: 0.41rem;
    display: flex;
    font-size: 0.25rem;
    color: #666;
    padding-top: 0.34rem;
    span {
      color: #333;
    }
    .itemName {
      width: 1.91rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  //斑马线
  .warning-row {
    background: #f6f6f6;
  }
  .taskAllocation_distributed {
    // margin-top: .4rem;
    height: calc(100% - 3rem);
    th {
      font-size: 0.2rem;
      line-height: 0.48rem;
      padding: 0;
      font-weight: 400;
      .cell {
        line-height: 0.48rem;
      }
    }
    td {
      border: 0;
      padding: 0;
      font-size: 0.23rem;
      .cell {
        line-height: 0.67rem;
        span {
          line-height: 0.67rem;
        }
      }
    }
  }
  // .popUp{
  .el-dialog {
    height: 45% !important;
    li:last-child {
      padding-top: 0.54rem;
    }
  }
  footer {
    font-size: 0.32rem;
    float: right;
    margin-right: 1.66rem;
    button {
      font-size: 0.3rem;
      padding: 0.12rem 0.24rem;
      background: #08a695;
    }
  }
}
</style>
