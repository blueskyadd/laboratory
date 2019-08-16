<template>
    <div class="taskAllocation_distributed_methods">
         <div class="main">
            <div class="measure_main">
                <div class="mian_text updata">
                    <div class="file_box">
                        <span class="file_title">{{isupload?'上传试验操作':'试验操作'}}</span>
                        <!-- <el-select v-if="isupload" v-model="value" placeholder="请选择项目结果">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> -->
                        <input type="file" ref="file"  @change='updataFile' style="display:none" >
                        <div class="uploadFile">
                            <div v-if="isupload"><span @click="updataFileChange"><img src="../../../../../../assets/img/commont/file/addfile.png" alt=""></span></div>
                            <span v-else class="accessory"><img src="../../../../../../assets/img/commont/file/accessory.png" alt=""></span>
                            <p>{{fileName}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary">保存</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'methods',
    data(){
        return{
            fileName: '',
            file:{},
            isupload: false,
        }
    },
    methods:{
        updataFileChange(){
            this.$refs.file.click()

        },
        updataFile(e){
            this.file =  e.target.files[0];
            this.fileName =  e.target.files[0].name;
        },
        deleteFile(){
            this.file = {};
            this.fileName = '';
        }
    }
}
</script>
<style lang="scss">

.taskAllocation_distributed_methods{
    @import '../../../../../../style/LabManager/main.scss';
    @import '../../../../../../style/LabManager/updata.scss';
    padding-top: .54rem;
    height: calc(100% - .88rem);
    .mian_text{
        div{
            align-items: center;
        }
        .el-select{
            margin-right: .48rem;
        }
        input{
            width: 3.3rem;
            height: .46rem;
        }
    }
    .file_box{
        flex-direction: initial!important;

        .file_title{
           margin-right: .4rem;
           margin-bottom: 0!important;
        }
    }
}
</style>
