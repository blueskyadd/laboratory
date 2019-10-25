<template>
  <div class="addProjectTest body_main" v-loading.fullscreen.lock="isLoading">
    <header class="addProjectTest_index_header">
      <h3>{{titleProject}}</h3>
      <span class="goBack underline" @click="$router.back(-1)">返回</span>
    </header>
    <div class="main">
      <div class="measure_main">
        <div class="mian_text first_child">
          <span>
            <i class="importantData">*</i>试验编号：
          </span>
          <input type="text" v-model="projectDetail.experiment_num" placeholder="请输入试验编号" />
          <span style="margin-left:.24rem"><i class="importantData">*</i>试验名称：</span>
          <input type="text" v-model="projectDetail.name" placeholder="请输入试验名称" />
        </div>
        <div class="mian_text first_child">
          <span> <i class="importantData">*</i>试验周期：</span>
          <input type="number" v-model="projectDetail.period" placeholder="请输入试验周期" />
          <span style="margin-left:.24rem"><i class="importantData">*</i>试验周期单位：</span>
          <el-select v-model="projectDetail.period_unit" placeholder="试验周期单位">
            <el-option
              v-for="item in projectDetailPeriod_unit"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="mian_text two_child">
          <span> <i class="importantData">*</i>预期开始时间：</span>
          <el-date-picker
            v-model="projectDetail.start_time"
            type="datetime"
            value-format="yyyy-MM-ddTHH:mm:ss"
            placeholder="预期开始时间"
          ></el-date-picker>
          <span style="margin-left:.24rem">
            <i class="importantData">*</i>预期结束时间：
          </span>
          <el-date-picker
            v-model="projectDetail.end_time"
            type="datetime"
            value-format="yyyy-MM-ddTHH:mm:ss"
            placeholder="预期结束时间"
          ></el-date-picker>
        </div>
        <div class="mian_text textarea">
          <span>
            <i class="importantData">*</i>试验简介
          </span>
          <div>
            <textarea
              name
              maxlength="800"
              v-model="projectDetail.intro"
              placeholder="需求设备量大"
              id
              cols="30"
              rows="10"
            ></textarea>
            <p class="number">{{projectDetail.intro.length}}/800</p>
          </div>
        </div>
        <div class="main_list updata">
          <span class="file_title" style="margin-bottom:0.16rem">
            <i class="importantData">*</i>试验方法:
          </span>
          <div class="file_box">
            <input type="file" ref="file" @change="updataFile" style="display:none" />
            <div class="fileBox">
              <div>
                <span @click="updataFileChange">
                  <img src="../../../assets/img/commont/file/addfile.png" alt />
                </span>
              </div>
              <span class="accessory">
                <img src="../../../assets/img/commont/file/accessory.png" alt />
              </span>
              <p>{{fileName}}</p>
            </div>
          </div>
        </div>
        <div class="main_list updata" >
          <span class="file_title">
            <i class="importantData">*</i>实验设备:
          </span>
          <div style="display:flex">
              <div class="file_box eqsearch" style="width: 1.1rem;" v-if="$route.query.flag == 1">
                    <el-popover   placement="top-start" v-model="visible" width="340" height="280" title="选择设备实验" popper-class="popover_unMissionUnaccomplishTest" trigger="click">
                        <Repairs @changeHiden="changeHiden" v-show="isEquipmentList" :ischexkbox="false" :equipmentList="equipmentList" ></Repairs>
                        <div class="fileBox lookmanagement" style="width: 1.1rem;" slot="reference" >
                            <div><span > <img src="../../../assets/img/commont/file/addfile.png" alt /></span></div>
                        </div>
                    </el-popover>
                </div>
                <div class="upload_img">
                    <div v-for="(item, index) in eqsearchData" :key="index" @mouseover="setDelete(true,item,index)" @mouseout="setDelete(true,item,index)">
                        <img :src="item.image" alt />
                        <span v-show="item.flag" @click=" deleteImg(index)">删除</span>
                    </div>
                </div>
            </div>
          </div>
          
      </div>
      <footer>
        <el-button type="primary" @click="$route.query.flag ==1 ? createdProject_experiment() : editProject_experiment()">保存</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
import Repairs from "../../../components/common/repairs";
import VerificationData from "../../../components/VerificationData";
export default {
  name: "addProjectTest",
  components: { Repairs },
  data() {
    return {
      fileName: "指导书",
      visible: false,
      titleProject: this.$route.query.flag == 1 ? "创建试验" : "编辑试验",
      projectDetail: {
        name: "",
        experiment_project: this.$route.query.equipmentID,
        start_time: "",
        end_time: "",
        intro: "",
        method: "",
        experiment_num: "",
        period: "",
        period_unit: "",
        facilities: []
      },
      projectDetailPeriod_unit: [
        { id: "hour", name: "小时" },
        { id: "day", name: "天" }
      ],
      equipmentList: [],
      isEquipmentList: false,
      eqsearchData: [], //实验设备列表
      isLoading:false
    };
  },
  methods: {
    //上传按钮
    updataFileChange() {
      this.$refs.file.click();
    },
    //上传按钮
    updataFile(e) {
      this.$updataFile.updataFile(e.target.files[0], res => {
        this.projectDetail.method = res.data.file;
        this.fileName = e.target.files[0].name;
      },this);
    },
    deleteImg(index){
        this.eqsearchData.splice(index, 1);
    },
    setDelete(flag,item,index){
        if($route.query.flag == 1){
            item.flag = !item.flag;
            this.$set(this.eqsearchData,index,this.eqsearchData[index])
        }
    },
    changeHiden(eqsearchData) {
      if (!this.projectDetail.end_time || !this.projectDetail.start_time) {
        this.$message({ message: "请选择具体预约时间", type: "warning" });
        this.visible = false;
      } else {
        if (eqsearchData.length == 0) {
          this.$message({ message: "请选择试验设备", type: "warning" });
        } else {
          var params = {
            start_time: this.projectDetail.start_time,
            end_time: this.projectDetail.end_time,
            eqs: []
          };
          eqsearchData.forEach(Element => {
            Element.flag = false;
            if(this.eqsearchData.length){
                this.eqsearchData.forEach( item =>{
                    if(Element.id != item.id){
                        params.eqs.push(Element.id);
                    }
                })
            }else{
                 params.eqs.push(Element.id);
            }
          });
          this.searchingProject_eqsearch(params, eqsearchData);
        }
      }
    },
    searchingProject_eqsearch(params, eqsearchData) {
      this.$http
        .post(this.$conf.env.searchingProject_eqsearch, params)
        .then(res => {
          this.eqsearchData = eqsearchData;
          
          this.projectDetail.facilities = params.eqs
          this.visible = false;
        })
        .catch(err => {
            this.$message({
            message: err.response ? err.response.data : "服务器错误",
            type: "warning"
          });
        });
    },
    /**@naem报修列表 */
    getProjeect_eqsearchList() {
      this.$http
        .get(this.$conf.env.getProjeect_eqsearchList)
        .then(res => {
          this.equipmentList = res.data;
         
          this.isEquipmentList = true;
        })
        .catch(err => {
          this.$message({
            message: err.response ? err.response.data : "服务器错误",
            type: "warning"
          });
        });
    },
    //创建试验
    createdProject_experiment() {
        if(!VerificationData.VerificationData(this.projectDetail)) return;
        this.isLoading = true;
        this.$http.post(this.$conf.env.createdProject_experiment, this.projectDetail).then( res =>{
            this.isLoading = false;
                if(res.status == '201'){
                    this.$message({ message: '创建成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back();
                    },100)
                }else{
                    this.$message({ message: '创建失败', type: 'warning'});              
                }
        }).catch(err =>{
            this.isLoading = false;
            this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
        })
    },
    editProject_experiment(){
        console.log(this.projectDetail)
        if(!VerificationData.VerificationData(this.projectDetail)) return;
        delete this.projectDetail.facilities;
        this.isLoading = true;
        this.$http.put(this.$conf.env.editProject_experiment+ this.$route.query.equipmentID + '/', this.projectDetail).then( res =>{
            this.isLoading = false;
                if(res.status == '200'){
                    this.$message({ message: '修改成功', type: 'success'});
                    setTimeout(()=>{
                        this.$router.back();
                    },100)
                }else{
                    this.$message({ message: '修改失败', type: 'warning'});              
                }
        }).catch(err =>{
            this.isLoading = false;
            this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
        })
    },
    //获取实验详情
    getProject_eqsearchDetail(){
        this.isLoading = true;
        this.$http.get(this.$conf.env.getProject_eqsearchDetail + this.$route.query.equipmentID + '/').then(res =>{
            this.projectDetail = res.data;
            this.eqsearchData = res.data.facilities;
            this.fileName = res.data.method
            this.isLoading = false;
        }).catch(err =>{
            this.isLoading = false;
            this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'}); 
        })
    }
  },
  mounted() {
    this.getProjeect_eqsearchList();
    this.$route.query.flag == 2 ? this.getProject_eqsearchDetail() : ''
  }
};
</script>
<style lang="scss" scoped>
.addProjectTest {
  padding-top: 0.42rem;
  overflow-y: scroll;
  .addProjectTest_index_header {
    padding-left: 0.41rem;
    height: 0.38rem;
    display: flex;
    margin-left: 0.19rem;
    align-items: flex-end;
    padding-bottom: 0.38rem;
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
  }
  .main {
    display: flex;
    height: calc(100% + 1.6rem);
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 1.9rem 0.87rem 0.59rem;
    .measure_main {
      width: 100%;
      display: flex;
      height: auto;
      flex-direction: column;
      .el-input {
        width: 4rem;
      }
      .mian_text {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 0.85rem;
        span {
          font-size: 0.24rem;
          color: #333333;
        }
        p {
          font-size: 0.24rem;
        }
        textarea {
          border: 0;
          width: 9.56rem;
          height: 2.66rem;
          font-size: 0.2rem;
        }
        textarea::placeholder {
          color: #ccc;
        }

        textarea::-webkit-scrollbar {
          width: 0.1rem;
          height: 0.1rem;
          background-color: #f5f5f5;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        textarea::-webkit-scrollbar-track {
          // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          border-radius: 10px;
          background-color: #fff;
        }

        /*定义滑块 内阴影+圆角*/
        textarea::-webkit-scrollbar-thumb {
          border-radius: 0.1rem;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #ccc;
        }
      }
      .updata {
        display: flex;
        margin-top: 0.64rem;
        flex-direction: column;
        .file_title {
          width: auto !important;
          margin-bottom: 0.4rem;
          font-size: 0.24rem;
          color: #333333;
          margin-right: 0.26rem;
        }
        .file_box {
          flex-direction: column;

          div {
            margin-right: 0.27rem;
            align-items: flex-end;
            display: flex;
            div {
              width: 0.8rem;
              height: 0.8rem;
              border: 1px dashed #08a695;
              display: flex;
              justify-content: center;
              align-items: center;
              span {
                width: 50%;
                height: 50%;
                cursor: pointer;
                display: block;
                display: flex;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .accessory {
            width: 0.65rem;
            height: 0.6rem;
            display: flex;
            margin-right: 0.12rem;
            img {
              width: 100%;
            }
          }
          p {
            font-size: 0.22rem;
            color: #666666;
            margin-top: 0.6rem;
          }
          .deleteFile {
            color: #f20000;
            margin-left: 1.06rem;
            line-height: 0.23rem;
            margin-top: 0.13rem;
            font-size: 0.23rem;
            display: block;
          }
        }
        .eqsearch {
            display: flex;
            flex-direction: row;
          
        }
        .upload_img {
            border: 0 !important;
            width: 85% !important;
            height: auto !important;
            margin-right: 0 !important;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start !important;
            div {
              width: 2rem !important;
              border: 1px dashed #eee !important;
              height: 1rem !important;
              margin-right: 0.1rem !important;
              margin-bottom: 0.1rem !important;
              overflow: hidden;
              position: relative;
              img {
                width: 100%;
              }
              span {
                position: absolute;
                width: 100% !important;
                top: 0;
                height: 100% !important;
                background: rgba(0, 0, 0, 0.5);
                font-size: 0.22rem;
                color: #08a795;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
      }
      .first_child {
        input {
          width: 3rem;
          height: 0.48rem;
          font-size: 0.22rem;
          border: 1px solid #cccccc;
          padding: 0 0.15rem;
          font-weight: 200;
        }
        input::placeholder {
          color: #989898;
        }
        p {
          color: #333;
        }
      }
      .two_child {
        p {
          color: #07a695;
        }
      }
      .textarea {
        margin-top: 0.05rem;
        height: auto;
        align-items: flex-start;
        div {
          margin-left: 0.19rem;
          position: relative;
          border: 1px solid #cccccc;
          padding: 0.16rem 0.3rem;
        }
        p {
          color: #08a695;
          position: absolute;
          bottom: 0.1rem;
          right: 0.2rem;
        }
      }
    }
    footer {
      button {
        font-size: 0.3rem;
        padding: 0.12rem 0.24rem;
      }
      button:first-child {
        background: #f10000;
        border: 0;
      }
      button:last-child {
        background: #08a695;
      }
    }
  }
}
.addProjectTest::-webkit-scrollbar {
  display: none;
}
</style>