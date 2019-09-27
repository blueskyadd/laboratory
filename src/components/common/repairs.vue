<template>
    <div class="repairs_box" v-loading.fullscreen.lock="isLoading">
        <div class="scrollbox">
            <ul >
                <li v-for="item in equipmentList" :key="item.id">
                    <el-radio v-model="equipmentID" :label="item" @change='changeList(item)'>
                        <img :src="item.image" alt="err" >
                        <span>{{item.name}}</span>
                    </el-radio>
                </li>
            </ul>
        </div>
        
        <el-button type="primary" @click="hiddenBox" >确定</el-button>
    </div>
</template>
<script>
export default {
    props:{
        equipmentList: Array,
        isLoading: Boolean
    },
    data(){
        return{
            equipmentID: {}
        }
    },
    methods:{
        hiddenBox(){
            this.$emit('changeHiden',this.equipmentID)
        },
        changeList(item){
            console.log(item)
            if(this.equipmentList.length){
                this.equipmentList.forEach( Element =>{
                    Element.flag = false;
                })
            }
            item.flag = true;
        }
    },
    mounted(){
        if(this.equipmentList.length){
            this.equipmentList.forEach( Element =>{
                Element.flag = false;
            })
        }
    }
}
</script>
<style lang="scss">
.repairs_box{
        height: 90%;
        .scrollbox{
            height: 86%;
            overflow: hidden;
        }
    ul{
        height: 100%;
        display:flex;
        overflow: scroll;
        flex-wrap: wrap;
        li{
            width: 23%;
            margin-bottom: .2rem;
            height: 39%;
            margin-right: .32rem;
           .el-radio__input.is-checked .el-radio__inner{
                border-color: #08a695;
                background: #08a695;
                border-radius: 50%;
           }
           .el-checkbox__inner:hover{
               border-color: #08a695;
           }
           .el-checkbox__inner{
               border-radius: 50%;
           }
            .el-radio{
                 display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                .el-radio__input{
                    align-self: flex-end;
                }
                .el-radio__label{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        width: 80%;
                        height: 80%;
                        margin-bottom: .04rem;
                    }
                    span{
                        color: #08a695;
                    }
                }
            }
            
        }
        li:nthchild(4n){
            margin-right: 0;
        }
    }
    ul::-webkit-scrollbar{
        width: 0.06rem;
    }
    button{
        font-size: .16rem;
        padding: .08rem .2rem;
        background: #08a695;
        float: right;
    }
}
</style>
