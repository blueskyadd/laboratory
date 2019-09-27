<template>
    <div class="addWarning body_main" v-loading.fullscreen.lock="isLoading">
        <header class="addWarning_index_header">
            <h3>新增警报</h3>
            <span class="goBack underline" @click="$router.back(-1)">返回</span>
        </header>
        <div class="main">
            <div class="measure_main">
                <div class="mian_text first_child">
                    <span>设备名称：</span>
                    <el-select
                        v-model="upkeep_section.equipment"
                        filterable
                        remote
                        reserve-keyword
                        v-el-select-loadmore="loadMore"
                        placeholder="请输入设备名称"
                        :remote-method="search_materialList"
                        @change='change_materialList'
                        :loading="isListloading">
                            <el-option
                            v-for="item in material_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                    </el-select>
                    <span>设备编号：</span>
                    <p>{{equipmentNum}}</p>
                </div>
                <div class="mian_text first_child">
                    <span>实验室：</span>
                    <p>{{equipmentName}}</p>
                    <span>设备负责人：</span>
                    <p>{{equipmentUser}}</p>
                </div>
                 <div class="mian_text textarea">
                    <span>报警原因</span>
                    <div>
                        <textarea name="" maxlength="800" v-model="upkeep_section.cause" placeholder="编辑报警原因" id="" cols="30" rows="10"></textarea>
                        <p class="number">{{upkeep_section.cause.length}}/800</p>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary" @click="createdequipment_alarm()">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import VerificationData from '../../../components/VerificationData';
export default {
    name:'addWarning',
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
    data(){
        return{
            upkeep_section:{
                "equipment":'',
                "cause":''
            },
            equipmentNum:'',
            equipmentName:'',
            equipmentRoom:'',
            equipmentUser: '',
            material_list:[],
            materialList_loadmore: false,
            materialListPage_number: 1,
            materialListPage_Text: '',
            isListloading: false,
            isLoading: false,
        }
    },
    methods:{
        createdequipment_alarm(){
            if(!VerificationData.VerificationData(this.upkeep_section)) return;
            this.isLoading = true;
            this.$http.post(this.$conf.env.createdequipment_alarm, this.upkeep_section).then(res =>{
                this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back();
                    },100)
                }else{
                  this.isLoading = false;
                  this.$message({ message: '创建失败', type: 'warning'});              
                }
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        },
        /**@name 编号名称匹配 */
        change_materialList(data){
            this.material_list.forEach(Element =>{
                if(Element.id == data){
                    this.equipmentName = Element.name;
                    this.equipmentRoom = Element.room;
                    this.equipmentUser = Element.device_keeper;
                    this.equipmentNum = Element.num;
                }
            })
        },
         /**@name检索列表上拉加载 */
        loadMore(data){
            if(!this.materialList_loadmore) return;
            this.materialListPage_number += 1;
            this.search_materialList(this.materialListPage_Text)
        },
        /**@name 设备名称、编号检索 */
        search_materialList(data){
            this.isListloading = true;
            this.materialListPage_Text = data;
            this.$http.get(this.materialListPage_number==1?this.$conf.env.getsearcheq_seqarch + data : this.$conf.env.getsearcheq_seqarch + data + '&p=' + this.materialListPage_number ).then(res =>{
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
    }
}
</script>
<style lang="scss">
.addWarning{
    
     padding-top: .42rem;
     overflow-y: scroll;
    .addWarning_index_header{
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
        // .el-select{
        //         width: 4rem;
        //         height: .52rem;
        .el-input{
            width: auto !important;
            margin-right: .88rem;
        }
        .inputText{
            border: 1px solid #ccc;
            margin-right: .88rem;
            padding: 0 .15rem;
            width: 3.7rem;
        }
        .el-input__inner, input{
            height: .52rem; 
            width: 4rem;
            font-size: .2rem;
            font-weight: 200;
        }
        .measure_main{
            width: 100%;
            display: flex;
            height: auto;
            flex-direction: column;
            .mian_text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: .68rem;
                span{
                    font-size: .24rem;
                    color: #333333;
                    width: 1.5rem;
                }
                p{
                    font-size: .24rem;
                    color: #444!important;
                    margin-right: 1.4rem;
                    max-width: 5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .number{
                    color: #08a695!important;
                    margin-right: 0;
                }
                textarea{
                    border:0;
                    width: 9.56rem;
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
            .updata{
                display: flex;
                margin-top: .2rem;
                .file_title{
                    width: auto!important;
                    margin-bottom: .4rem;
                    font-size: .24rem;
                    color: #333333;
                    margin-right: .26rem;
                }
                .file_box{
                    flex-direction: column;
                    
                    div{
                        margin-right: 0.27rem;
                        align-items: flex-end;
                        display: flex;
                        div{
                        width: .8rem;
                        height: .8rem;
                        border:1px dashed #08a695;
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            width: 50%;
                            height: 50%;
                            cursor: pointer;
                            display: block;
                            display: flex;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        }
                    }
                    .accessory{
                        width: .65rem;
                        height: .6rem;
                        display: flex;
                        margin-right: .12rem;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        font-size: .22rem;
                        color: #666666;
                        margin-top: .6rem;
                    }
                    .deleteFile{
                        color: #f20000;
                        margin-left: 1.06rem;
                        line-height: .23rem;
                        margin-top: .13rem;
                        font-size: .23rem;
                        display: block;
                    }
                    
                }
                
            }
            .first_child{
                p{
                    color:#333;
                }
                .addWarningName{
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
                align-items: flex-start;
                div{
                    margin-left: .19rem;
                    position: relative;
                    border: 1px solid #cccccc;
                    padding: .16rem .3rem;
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
.addWarning::-webkit-scrollbar{
    display: none;
}
</style>