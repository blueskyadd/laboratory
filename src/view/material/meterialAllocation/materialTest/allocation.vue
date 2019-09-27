<template>
    <div class="allocationTest_index">
        <header class="allocationTest_index_header">
            <h3>分配试验物料</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="taskName">
            <span>试验名称：</span>
            <p>{{equipmentName}}</p>
            <span>试验编号：</span>
            <p>{{equipmentNum}}</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData"  :cell-style="changecolor" height="calc(100%  - .5rem)"   style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="name"  min-width="30%" label="物料名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="num"  min-width="30%" label="物料数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="device_type"  min-width="30%" label="物料种类" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="id" label="是否需要归还" header-align='left' align='left'>
                    <template slot-scope="scoped"><span class="underline" style="margin:0 .24rem" @click="setMaintainallot(scoped,true)" :style="{color:scoped.row.is_return?'':'#999'}">是</span><span @click="setMaintainallot(scoped,false)" class="underline" style="margin:0 .24rem"  :style="{color:!scoped.row.is_return?'#f10000':'#999'}">否</span></template>
                </el-table-column>
            </el-table>
        </div>
        <footer><el-button type="primary"  @click="setTestMaterial()">完成</el-button></footer>
    </div>
</template>
<script>
export default {
    name: 'allocationTest',
    inject:['reload'],
    data(){
        return{
            tableData: [],
            placeholderTexe:'搜索试验编号、名称',
            isLoading:true,
            equipmentName:'',
            equipmentNum:'',
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
        getTestMaterialList(){
            this.$http.get(this.$conf.env.getTestMaterialList + this.$route.query.equipmentID + '/').then(res =>{
                if(res.data.boms&&res.data.boms.length){
                    res.data.boms.forEach(element =>{
                        element.is_return = false;
                    })
                }
                this.tableData = res.data.boms;
                this.equipmentName = res.data.name;
                this.equipmentNum = res.data.experiment_num;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        setMaintainallot(data,flag){
            data.row.is_return = flag;
        },
        setTestMaterial(){
            let params = {"experiment_boms":[]}
            if(this.tableData.length >0){
                this.tableData.forEach(item =>{
                    var Obj={
                        "id": item.id,
                        "is_return": item.is_return,
                    }
                    params.experiment_boms.push(Obj)
                })
                this.isLoading = true;
                this.$http.put(this.$conf.env.setTestMaterial + this.$route.query.equipmentID + '/',params).then(res =>{
                    this.isLoading = false;
                    if(res.status == '200'){
                        this.$message({ message: '分配成功', type: 'success'});
                        this.reload();
                    }else{
                        this.$message({ message: '分配失败', type: 'warning'});              
                    }
                }).catch(err =>{
                    this.isLoading = false;
                    this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
                })
            }else{
                this.$message({ message: '暂时没有待分配的物料', type: 'warning'});
            }
            
            
        }
    },
    mounted(){
        this.getTestMaterialList()
    }
}
</script>
<style lang="scss">
@import '../../../../style/Testengineer/teskName.scss';
.allocationTest_index{
    padding-top: .42rem;
    height: 100%;
    .allocationTest_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .43rem;
        h3{
            font-size: .36rem;
            color: #333333;
            font-weight: 500;
            margin-bottom: .04rem;
            line-height: .36rem;
        }
        //返回按钮
        .goBack{
            margin-left: .28rem;
            font-size: .23rem;
            margin-right: 9.88rem;
        }
    }
    .taskName{
        margin-left: .19rem;
        margin-bottom: .14rem;
        padding-left: .41rem;
        display: flex;
        font-size: .25rem;
        color: #666;
    }
    //斑马线
    .warning-row{
        background:#f6f6f6;
    }
    .taskAllocation_distributed{
        height: calc(100% - 4rem);
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
