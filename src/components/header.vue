<template>
        <header>
            <div class="left_title">
                <p>实验室信息化管理系统</p>
            </div>
            <div class="right_trake">
                <div><img src="../assets/img/commont/header/inform.png" alt=""><span>通知</span></div>
                <div><img src="../assets/img/commont/header/user.png" alt=""><span>张三</span></div>
                <div><img src="../assets/img/commont/header/userOut.png" alt=""><span>退出</span></div>
            </div>
        </header>
</template>
<script>
export default {
    name:'header'
}
</script>
<style lang="scss" scoped>
header{
    position: relative;
    height: .8rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 5px 0px rgba(12,3,6,0.2);
    padding: 0 .56rem 0 .36rem;
    display: flex;
    justify-content: space-between;
    .left_title{
        p{
            font-size:.35rem;
            font-weight:400;
            color:#333333;
            line-height: .8rem;
        }
    }
    .right_trake{
        display: flex;
        width: 3.71rem;
        justify-content: space-between;
        align-items: center;
        div{
            display: flex;
            align-items: center;
            img{
                height: .38rem;
                margin-right: .15rem;
            }
            span{
                font-size: .22rem;
                font-weight:400;
                color:#333333;
            }
        }
    }
}
</style>
