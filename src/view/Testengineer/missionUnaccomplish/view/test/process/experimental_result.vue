<template>
    <div class="experimental_result body_main" v-loading.fullscreen.lock="isLoading">
        <header class="experimental_result_index_header">
            <h3>试验结果分析</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
            <span class="goBack underline" @click="goHome">首页</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>项目名称：</span>
                    <p class="experimental_resultName">{{resultSection.project_name}}</p>
                    <span>公司-部门：</span>
                    <p>{{labManagrInfo.lab}}-{{labManagrInfo.department}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>试验名称：</span>
                    <p class="experimental_resultName">{{resultSection.name}}</p>
                    <span>试验编号：</span>
                    <p>{{resultSection.experiment_num}}</p>
                </div>
                <div class="mian_text first_child ">
                    <span><i class="importantData">*</i>试验结果：</span>
                    <el-select v-model="exresult.result" placeholder="请选择试验结果">
                        <el-option
                        v-for="item in resultList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                 <div class="mian_text textarea">
                    <span><i class="importantData">*</i>试验结论：</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="exresult.result_note" placeholder="编辑试验结论" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{exresult.result_note.length}}/800</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="createdExperimental_result()">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../../../../components/VerificationData';
export default {
    name:'experimental_result',
    inject:['reload'],
    data(){
        return{
            fileName: '指导书',
            resultList: [{
                value: 1,
                label: '不合格'
                }, {
                value: 2,
                label: '合格'
                }],
            isLoading: true,
            resultSection:{},
            labManagrInfo:{},
            exresult:{
                 "result":'',
                 "result_note":''
            },
        }
    },
    methods:{
        goHome(){
            this.$router.push({name:'TestengineerIndex'})
        },
        getExperimental_result(){
            this.$http.get(this.$conf.env.getExperimental_result + this.$route.query.equipmentID + '/').then( res =>{
                console.log(res)
                this.resultSection = res.data;
                this.isLoading = false;
            }).catch(err =>{
                this.isLoading = false;
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        getEquipment_userinfoDetail(){
            this.$http.get(this.$conf.env.getEquipment_userinfoDetail).then(res =>{
                this.labManagrInfo = res.data;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
            })
        },
        createdExperimental_result(){
            if(!VerificationData.VerificationData(this.exresult)) return;
            this.isLoading = true;
                this.$http.put(this.$conf.env.createdExperimental_result + this.$route.query.equipmentID + '/', this.exresult).then( res =>{
                    this.isLoading = false;
                    if(res.status == '200'){
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
        }
    },
    mounted(){
        this.getExperimental_result();
        this.getEquipment_userinfoDetail();
    }
}
</script>
<style lang="scss" scoped>
.experimental_result{
     padding-top: .42rem;
     overflow-y: scroll;
    .experimental_result_index_header{
        padding-left: .41rem;
        height: .38rem;
        display: flex;
        margin-left: .19rem;
        align-items: flex-end;
        padding-bottom: .38rem;
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
    }
    .main{
        display: flex;
        height: calc(100% - 2.05rem);
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        padding:0  1.9rem .87rem .59rem;
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                height: .68rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                }
                p{
                    font-size: .24rem;
                }
                textarea{
                    border:0;
                    width: 100%;
                    height: 2.66rem;
                    font-size: .2rem;
                }
                textarea::placeholder{
                    color: #ccc;
                }
                
                textarea::-webkit-scrollbar{
                    width: .1rem;
                    height: .1rem;
                    background-color: #F5F5F5;
                }
                
                /*定义滚动条轨道 内阴影+圆角*/
                textarea::-webkit-scrollbar-track {
                    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #fff;
                }
                
                /*定义滑块 内阴影+圆角*/
                textarea::-webkit-scrollbar-thumb{
                    border-radius: .1rem;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: #ccc;
                }

            }
            .first_child{
                p{
                    color:#333;
                }
                .experimental_resultName{
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .two_child{
                p{
                    color: #07a695;
                }
            }
            .textarea{
                margin-top: .46rem;
                height: auto;
                div{
                    position: relative;
                    border: 1px solid #cccccc;
                    padding: .16rem .3rem;
                     flex: 1;
                }
                p{
                    color: #08a695;
                    position: absolute;
                    bottom: .1rem;
                    right: .2rem;
                }
            }
            
        }
        
        footer{
            button{
                font-size: .3rem;
                padding: .12rem .24rem;
            }
            button:first-child{
                background: #f10000;
                border: 0;
            }
            button:last-child{
                background: #08a695;
            }
        }
    }
}
.experimental_result::-webkit-scrollbar{
    display: none;
}
</style>