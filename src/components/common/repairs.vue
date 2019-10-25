<template>
    <div class="repairs_box" v-loading.fullscreen.lock="isLoading">
        <div class="scrollbox">
            <ul v-if="ischexkbox">
                <li v-for="item in equipmentList" :key="item.id">
                    <el-radio v-model="equipmentID" :label="item" @change='changeList(item)'>
                        <img :src="item.image" alt="err" >
                        <span>{{item.name}}</span>
                    </el-radio>
                </li>
            </ul>
            <ul v-else>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox :label="item" :disabled='item.disabled'  v-for="item in equipmentList" :key="item.id">
                        <img :src="item.image" alt="err" >
                        <span>{{item.name}}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </ul>
        </div>
        
        <el-button type="primary" @click="hiddenBox" >确定</el-button>
    </div>
</template>
<script>
export default {
    props:{
        equipmentList: Array,
        isLoading: Boolean,
        ischexkbox: Boolean,
        eqsearchData:Array
    },
    data(){
        return{
            equipmentID: {},
            checkList: []
        }
    },
    watch:{
        checkList(){
            console.log(this.checkList)
        },
    },
    methods:{
        hiddenBox(){
            this.ischexkbox ? this.$emit('changeHiden',this.equipmentID):this.$emit('changeHiden',this.checkList)
        },
        changeList(item){
            if(this.equipmentList.length){
                this.equipmentList.forEach( Element =>{
                    Element.flag = false;
                })
            }
            item.flag = true;
        },
        seteqsearchData(){
            this.equipmentList.forEach( Element =>{
                this.eqsearchData.forEach(value =>{
                    if(Element.id == value.id ){
                        Element.disabled = true;
                    }
                })
            })
        }
    },
    mounted(){
        if(this.equipmentList.length){
            this.equipmentList.forEach( Element =>{
                Element.flag = false;
            })
        }
        if(this.eqsearchData.length){
            this.seteqsearchData()
        }
        this.$nextTick(res =>{
            console.log(this.eqsearchData,';l;;;;')
        })
        
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
    ul,.el-checkbox-group{
        height: 100%;
        display:flex;
        overflow: scroll;
        flex-wrap: wrap;
        .el-checkbox{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        li,.el-checkbox{
            width: 23%;
            margin-bottom: .2rem;
            height: 39%;
            margin-right: .27rem;
           .el-radio__input.is-checked .el-radio__inner,.el-checkbox__original{
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
            .el-radio,.el-checkbox{
                 display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                .el-radio__input{
                    align-self: flex-end;
                }
            }
            .el-radio__label,.el-checkbox__label{
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
                        max-width: 1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
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
