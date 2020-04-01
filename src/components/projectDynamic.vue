<template>
    <div class="my_dynamic schedule show_background">
      <header>
        <span>项目动态</span>
        <div style="display:flex;">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{fileItemIndex.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-if="fileItem.length">
              <el-dropdown-item
                v-for="item in fileItem"
                :key="item.id"
                :command="item"
              >{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <div class="main_box">
        <div class="header_list">
          <ul>
            <li>项目</li>
            <li>试验</li>
            <li>负责人</li>
            <li>进度</li>
            <li>状态</li>
          </ul>
        </div>
        <div class="main_element">
          <ul class="main_element_ul">
            <li
              v-for="(item, index) in projectpctFlow"
              :key="item.id"
              :class="item.isHiddenBox?'hiddenHeight hidden_box': 'hidden_box'"
              :style="{'height':setHeight(item)}"
            >
              <div class="title">
                <span>{{item.name}}</span>
                <span class="border"></span>
              </div>
              <ul>
                <li>
                  <div class="element_principal">
                    <i @click="setElementHidden(index)">
                      <img
                        src="../assets/img/PMenege/index/subtract.png"
                        alt
                        v-show="!item.isHiddenBox"
                      />
                      <img src="../assets/img/PMenege/index/plus.png" alt v-show="item.isHiddenBox"/>
                    </i>
                    <span class="element_principal_border"></span>
                    <span class="element_principal_name">{{item.project_leader}}</span>
                  </div>
                  <div class="progress_bar">
                    <span
                      :style="{'width':item.pct,'background':toPoint(item.pct)<50?'linear-gradient(to bottom, #f74674 0%, #fb114e 50%, #620a30 100%)':''}"
                    ></span>
                    <i>{{item.pct}}</i>
                  </div>
                  <div class="element_status">{{item.status}}</div>
                </li>
                <li v-for="project in item.experiment_project" :key="project.id">
                  <div class="element_test">
                    <span></span>
                    <span>{{project.name}}</span>
                  </div>
                  <div class="element_principal lastChild">
                    <span>{{project.engineer}}</span>
                  </div>
                  <div class="progress_bar">
                    <span
                      :style="{'width':project.pct,'background':toPoint(project.pct)<50?'linear-gradient(to bottom, #f74674 0%, #fb114e 50%, #620a30 100%)':''}"
                    ></span>
                    <i>{{project.pct}}</i>
                  </div>
                  <div class="element_status">{{project.status}}</div>
                </li>
              </ul>
            </li>
            <li class="noDatalist" v-show="projectpctFlow.length == 0">暂无数据</li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "PMenegeIndex",
  components: {},
  data() {
    return {
      fileItem: [],
      fileItemIndex: {},
      projectpctFlow: [], //项目进度列表
    };
  },
  methods: {
    setHeight(item) {
      if (item.experiment_project) {
        return item.experiment_project.length > 0
          ? item.experiment_project.length == 1
            ? "1.2rem"
            : item.experiment_project.length * 0.88 + "rem"
          : ".5rem";
      } else {
        return ".5rem";
      }
    },
    toPoint(percent) {
      var str = percent.replace("%", "");
      return str == 0.0 ? 0 : str;
    },
    setElementHidden(index) {
      this.projectpctFlow[index].isHiddenBox = !this.projectpctFlow[index]
        .isHiddenBox;
      this.$set(this.projectpctFlow, index, this.projectpctFlow[index]);
    },
    handleCommand(command) {
      this.fileItemIndex = command;
      this.getPm_projectpctFlow(command.id);
    },
    //产品列表
    getPm_priject_schedule() {
      this.$http
        .get(this.$conf.env.getPm_priject_schedule)
        .then(res => {
          this.fileItem = res.data;
          if (res.data.length) {
            this.fileItemIndex = res.data[0];
            this.getPm_projectpctFlow(res.data[0].id);
          }
        })
        .catch(err => {
          this.$message({
            message: err.response ? err.response.data : "服务器错误",
            type: "warning"
          });
        });
    },
    //产品项目进度
    getPm_projectpctFlow(ID) {
      this.$http
        .get(this.$conf.env.getPm_projectpctFlow + ID)
        .then(res => {
          if (res.data.length > 0) {
            res.data.forEach((Element, index) => {
              Element.isHiddenBox = true;
              this.setHeight(index);
              this.$http.get(this.$conf.env.getPm_experiment_project + Element.id).then(item => {
                  Element.experiment_project = item.data ? item.data : [];
                }) .catch(err => {
                  Element.experiment_project = [];
                  this.$message({ message: err.response ? err.response.data : "服务器错误", type: "warning"});
                });
            });
          } else {
          }
          this.projectpctFlow = res.data;
        })
        .catch(err => {
          this.$message({
            message: err.response ? err.response.data : "服务器错误",
            type: "warning"
          });
        });
    },
  },
  mounted() {
    this.getPm_priject_schedule(); //产品列表
  }
};
</script>
<style lang="scss">
    .tableInfo{
        width: 48%;
        margin-right: .16rem;
        .schedule{
            height: 73.8%;
            width: 100%;
            background: #e4f4f4;
            border-radius: .06rem;
            header{
                height: 6.9%;
                display: flex;
                align-items: center;
            }
            ul{
                ul{
                    li:first-child{
                        .element_principal{
                            margin-right: 15%!important;
                        }
                    }
                }
            }
            .lastChild{
                width:35% !important;
            }
        }
        .footer_table{
            height: 24.4%;
            margin-top: .16rem;
            display: flex;
            justify-content: space-between;
            .list{
                height: 100%;
                width: 49%;
                background: #fff;
                height: 100%;
                border-radius: .06rem;
            }
            .bulletin_table,.delayed_alarm{
                header{
                    height: 21.7%;
                    display: flex;
                    align-items: center;
                    padding-left: .34rem;
                    font-size: .18rem;
                    color: #333;
                    border-bottom: 1px solid #e4f4f4;
                }
                .main_list{
                    width: 100%;
                    height: calc(100% - .5rem);
                    ul{
                        overflow-y: scroll;
                        height: 100%;;
                         li{
                            display: flex;
                            height: .6rem;
                            padding-top: .06rem;
                            padding-left: .16rem;
                            .main_list_headerImg{
                                width: .3rem;
                                height: .3rem;
                                display: flex; 
                                margin-right: .08rem;
                                img{
                                    width: 90%;
                                }
                            }
                            .list_table{
                                display: flex;
                                flex: 1;
                                flex-direction: column;
                                padding-right: .56rem;
                                .title{
                                    font-size: .16rem;
                                }
                                span{
                                    font-size: .14rem;
                                }
                                div{
                                    display: flex;
                                    justify-content: space-between;
                                    span:last-child{
                                        color: #999;
                                        margin-top: -.16rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>