<template>
    <div class="management_exmplarDetail body_main" v-loading.fullscreen.lock="isLoading">
        <header class="testMethods_index_header">
            <h3>样件确认</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>

        </header>
        <el-table :data="tableData" :cell-style="changecolor" height="calc(100%  - .5rem)"  style="width: 100%;height: calc(100% - 3rem);"  :row-class-name="tabRowClassName">
            <el-table-column prop="name" min-width="15%"  label="样件名称"  header-align='center'  align='center'>

            </el-table-column>
            <el-table-column prop="num"  label="样件数量" header-align='left' align='left'> </el-table-column>
        </el-table>
       <footer>
           <el-button type="primary" class="primary_err" @click="editVerifyInfo(0)">缺少样件</el-button>
           <el-button type="primary" @click="editVerifyInfo(2)">确认</el-button>
       </footer>
    </div>
</template>
<script>
export default {
    name:'exmplarDetail',
    inject:['reload'],
    data() {
      return {
        tableData: [],
        placeholderTexe:'上传试验编号、名称',
        isLoading: true
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
            this.$router.push({name: 'frockProcess' })
        },
        /**@name功能按键 */
       
        searchDetail(){

        },
        getVerifyDetail(){
            this.$http.get(this.$conf.env.getVerifyDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.isLoading = false;
                var arr = [];
                for(var i in res.data.sample_json){
                    var obj={
                        'name':i,
                        "num":res.data.sample_json[i]
                    }
                    arr.push(obj)
                }
                this.tableData = arr
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        editVerifyInfo(number){
            this.isLoading = true;
            this.$http.put(this.$conf.env.editVerifyInfo + this.$route.query.equipmentID + '/',{"status": number}).then(res=>{
                this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '确认成功', type: 'success'});
                    setTimeout(()=>{
                        this.$$router.back();
                    },100)
                }else{
                    this.$message({ message: '确认失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        this.getVerifyDetail()
    }
}
</script>
<style lang="scss">

.management_exmplarDetail{
    @import '../../../style/LabManager/management/index.scss';
     padding-top: .42rem;
     height: calc(100% - 3rem);
    .testMethods_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .5rem;
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
            margin-right: 10.08rem;
        }
        .testMethods_index_header_link{
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
        .testMethods_header_Search{
            margin-left: .3rem;
            margin-bottom: -.03rem;
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
        .rightText{
            padding-right: 2.44rem;
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
        footer {
            font-size: 0.32rem;
            float: right;
            margin-right: 1.66rem;
            margin-top: .2rem;
            button:first-child{
                background: #f30000;
            }
            button {
            font-size: 0.3rem;
            padding: 0.12rem 0.24rem;
            background: #08a695;
            color: #fff;
            }
        }
         .popUp{
             .el-dialog{
                 height: 76%!important;
             }
             li{
                 margin-bottom: .49rem!important;
             }
         }
}
</style>
