<template>
    <div class="repairs_box">
        <ul>
            <li><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg" alt=""><span>黄山的商品单</span></li>
            <li><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg" alt=""><span>黄山的商品单</span></li>
            <li><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg" alt=""><span>黄山的商品单</span></li>
            <li><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=26&gp=0.jpg" alt=""><span>黄山的商品单</span></li>
        </ul>
        <el-button type="primary" @click="hiddenBox" >确定</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        hiddenBox(){
            console.log(this.$parent.showReplairs)
            this.$router.push({name:'guarantee'})
        }
    }
}
</script>
<style lang="scss" scoped>
.repairs_box{
        height: 90%;
    ul{
        height: 90%;
        display:flex;
        flex-wrap: wrap;
        li{
            width: .54rem;
            height: .82rem;
            margin-right: .32rem;
            display: flex;
            flex-direction: column;
            img{
                width: 100%;
                height: .52rem;
            }
        }
        li:nthchild(4n){
            margin-right: 0;
        }
    }
    button{
        font-size: .16rem;
        padding: .08rem .2rem;
        background: #08a695;
        float: right;
    }
}
</style>
