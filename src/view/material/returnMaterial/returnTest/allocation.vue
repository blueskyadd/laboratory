<template>
    <div class="allocationReturnTest_index">
        <header class="allocationReturnTest_index_header">
            <h3>归还试验物料</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="taskName">
            <span>试验名称：</span>
            <p>{{equipmentName}}</p>
            <span>试验编号：</span>
            <p>{{equipmentNum}}</p>
        </div>
         <div class="taskAllocation_distributed ">
            <el-table :data="tableData"  :cell-style="changecolor" height="calc(100%  - 1.5rem)"  style="width: 100%"  :row-class-name="tabRowClassName" v-loading="isLoading">
                <el-table-column prop="name"  min-width="30%" label="物料名称"  header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="device_type"  min-width="30%" label="物料种类" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="num"  min-width="30%" label="物料数量" header-align='center'  align='center'> </el-table-column>
                <el-table-column prop="num"  min-width="30%" label="归还数量" header-align='center'  align='center'>
                    <template slot-scope="scoped">
                        <input type="number" v-model="scoped.row.record_num" :disabled='!scoped.row.is_return' :class="{'disabled':!scoped.row.is_return}">
                    </template>
                </el-table-column>
                <el-table-column prop="id" class-name="rightText" label="是否已归还" header-align='right' align='right'>
                    <template slot-scope="scoped"><span class="underline" style="margin:0 .48rem"  @click="setMaintainallot(scoped)" :style="{color:scoped.row.is_return?'':'#999'}">是</span></template>
                </el-table-column>
            </el-table>
        </div>
        <footer><el-button type="primary" @click="setreturbTestMaterial()">确定</el-button></footer>
    </div>
</template>
<script>
export default {
    name: 'allocationReturnTest',
    inject:['reload'],
    data(){
        return{
            tableData: [],
            placeholderTexe:'搜索试验编号、名称',
            equipmentName:'',
            equipmentNum:'',
            isLoading:true,
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
        setMaintainallot(data){
            data.row.is_return = !data.row.is_return;
            data.row.record_num = data.row.is_return ? 0: data.row.record_num
        },
        tabRowClassName({row,rowIndex}){
            let index = rowIndex + 2;
            if(index %2 == 0){
                return 'warning-row'
            }
        },
        getreturnTestMaterialList(){
            this.$http.get(this.$conf.env.getreturnTestMaterialList + this.$route.query.equipmentID + '/').then(res =>{
                if(res.data.boms&&res.data.boms.length){
                    res.data.boms.forEach(element =>{
                        element.is_return = false;
                        element.record_num = 0;
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
        setreturbTestMaterial(){
            let params = {"experiment_boms":[]}
            this.tableData.forEach(item =>{
                    var Obj={
                        "id": item.id,
                        "record_num": item.record_num*1,
                    }
                    if(item.is_return){
                        params.experiment_boms.push(Obj)
                    }
                })
                this.isLoading = true;
                this.$http.put(this.$conf.env.setreturbTestMaterial + this.$route.query.equipmentID + '/',params).then(res =>{
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
        }
    },
    mounted(){
        this.getreturnTestMaterialList()
    }
}
</script>
<style lang="scss">
.allocationReturnTest_index{
    @import '../../../../style/Testengineer/teskName.scss';
    padding-top: .42rem;
    height: 100%;
    .allocationReturnTest_index_header{
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
            input{
                width: 1rem;
                height: .5rem;
                background: #fff;
                color: #444;
                padding: 0 .1rem;
                text-align: center;
                border: 1px solid #eee;
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
