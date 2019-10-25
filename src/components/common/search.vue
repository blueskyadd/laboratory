<template>
    <div class="header_search">
        <input type="text" v-model="search_value" @keyup.enter="searchDetail" :placeholder="placeholderTexe">
        <span @click="searchDetail">
            <img src="../../assets/img/commont/search/search.png" alt="">
        </span>
    </div>
</template>
<script>
export default {
    name: 'search',
    props:{
        placeholderTexe:String,//搜索框提示文字
        searchText:String
    },
    data(){
        return{
            search_value: '',
        }
    },
    methods:{
        searchDetail(){
            this.$emit('searchDetail', this.search_value)
        },
        result(){
            this.search_value = ''
        }
    },
    watch:{
        $route(to,from){
            this.search_value = ''
        },
        
    },
}
</script>

<style lang="scss" scoped>
.header_search{
    height: .6rem;
    width: auto;
    display: flex;
    border-radius: .03rem;
    overflow: hidden;
    input{
        width: 3.22rem;
        height: .51rem;
        border: 2px solid #cccccc;
        border-right: 0;
        padding: 0.05rem .24rem 0;
        font-size: .23rem;
        border-radius: 0;
    }
    input::-webkit-input-placeholder{
        color: #cccccc;
        font-size: .23rem;
    }
    span{
        cursor:pointer;
        width: .86rem;
        height: .595rem;
        background: #07a695;
        font-size: .23rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: .33rem;
            width: .33rem;
        }
    }
    
}
</style>
