<template>
    <div class="unMissionUnaccomplishTestengineer_unMissionUnaccomplishTest">
        <el-table :data="tableData" :cell-style="changecolor"   style="width: 100%" height="calc(100%  - 1rem)" :row-class-name="tabRowClassName" v-loading="isLoading">
            <el-table-column prop="experiment_num"  label="试验编号"  header-align='center'  align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验名称" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="试验类型" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="start_time"  label="试验开始时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="end_time"  label="试验结束时间" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="cycle"  label="周期" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="onduty"  label="值守" min-width="25%" header-align='center' align='center'> </el-table-column>
            <el-table-column prop="name"  label="设备报修"  min-width="50%"    header-align='center' align='center'> 
                <template slot-scope="scoped">
                  <div>
                    <el-popover placement="top-start"  width="340" height='280' title='选择试验设备' popper-class='popover_unMissionUnaccomplishTest' trigger="click">
                        <Repairs v-if="isEquipmentList" @changeHiden='changeHiden' :equipmentList='equipmentList'></Repairs>
                        <span class="underline lookmanagement"  style="color: #f23536"  slot="reference" @click="getrepairs(scoped)">报修</span>
                    </el-popover>
                  </div>
                </template>

            </el-table-column>
            <el-table-column prop="name" min-width="50%" label="试验方法" header-align='center' align='center'> 
                <template slot-scope="scoped"><a class="underline lookmanagement" download="w3logo" :href="scoped.row.method">下载</a></template>
            </el-table-column>
            <el-table-column prop="address" min-width="30%"  label="操作" header-align='center' align='center'>
                 <template slot-scope="scoped"><span class="underline lookmanagement"  @click="goTestProcess(scoped)">开始</span></template>
            </el-table-column>
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
    </div>
</template>
<script>    
import Repairs from '../../../../../components/common/repairs';
export default {
    name:'unMissionUnaccomplishTest',
    components:{Repairs},
    data() {
      return {
        tableData: [],
        gridData: [],
        isLoading:true,//加载动画
        totalSum:0,//数据总数
        currentPage: 1,//当前页
        page_size : 9,//一页数据条数
        CurrentChange:1,
        isSearch: false,//是否为搜索
        searchText:'',//搜索文字
        equipmentList:[],
        isEquipmentList: false,
        isBoxLoading: false,
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
            if (data.columnIndex == 0) {
                return "color:#07a695";
            }else{
                return "color:#444444";
            }
        },

        /**@name 页面跳转 */
        goTestProcess(data){
            this.$router.push({path: '/Testengineer/testProcess', query:{"equipmentID": data.row.id, flag: true}})
        },
        getrepairs(data){
            console.log(data.row.id)
            this.isBoxLoading = true;
            this.getExperimental_exeqList(data.row.id);
        },
        changeHiden(data){
          this.$router.push({path:'/Testengineer/guarantee', query:{equipmentName: data.name,equipmentNum:data.num,equipmentRoom: data.room,equipmentID:data.id}})
        },
        /**@naem报修列表 */
        getExperimental_exeqList(ID){
          this.$http.get(this.$conf.env.getExperimental_exeqList + ID).then( res =>{
              this.equipmentList = res.data;
              this.isEquipmentList = true;
              this.isBoxLoading = fase;
          }).catch(err =>{
            this.isBoxLoading  = fase;
              this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
          })
        },
        /**@name 分页 */
        handleCurrentChange(pageNumber) {
             this.currentPage = pageNumber; 
            this.CurrentChange =  pageNumber;
            this.isLoading = true;
            !this.isSearch?this.getExperimental_myexperimentList(pageNumber):this.searchExperimental_myexperimentList(this.searchText,pageNumber);
        },
        /**@name 搜索 */
        searchExperimental_myexperimentList(data,pageNumber){
            this.isLoading = true;
            this.searchText = data;
            this.isSearch = true;
            this.currentPage = 1;
            this.$http.get(pageNumber == 1 ? this.$conf.env.getExperimental_myexperimentList + '?search=' + data   + '&page_size=' +this.page_size : this.$conf.env.getExperimental_myexperimentList + '?search=' + data + '&p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
                this.isLoading = false;
                this.totalSum = res.data.count;
                this.tableData = res.data.results;
            }).catch(err =>{
                this.isLoading = false;
               this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 列表数据 */
        getExperimental_myexperimentList(pageNumber){
          this.isSearch = false;
          this.$http.get(pageNumber == 1 ? this.$conf.env.getExperimental_myexperimentList + '?page_size=' +this.page_size : this.$conf.env.getExperimental_myexperimentList + '?p=' +pageNumber +'&page_size=' +this.page_size ).then( res =>{
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
      this.getExperimental_myexperimentList(1);
    },
    watch:{
        //根据当前输入页数跳转
        CurrentChange(newData, oldData){
            if(newData){
                this.CurrentChange =newData*1 > Math.ceil( this.totalSum/this.page_size) ? Math.ceil( this.totalSum/this.page_size) :  newData*1 < 0 ? 1 :  newData*1;
                !this.isSearch?this.getExperimental_myexperimentList(this.CurrentChange):this.searchExperimental_myexperimentList(this.searchText,this.CurrentChange);
            }
        },
    },
}
</script>
<style lang="scss">
@import '../../../../../style/LabManager/management/index.scss';
.unMissionUnaccomplishTestengineer_unMissionUnaccomplishTest{
    position: relative;
    height: calc(100% - 1.2rem);
    padding-top: .42rem;
    .Search ul{
        margin-bottom: 0;
    }
    .editTableButton{
        margin-top: 0!important;
    }
    .el-input__inner{
        padding:  0 .4rem!important;
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
}
.popover_unMissionUnaccomplishTest{
    height:2.8rem;
}
</style>
