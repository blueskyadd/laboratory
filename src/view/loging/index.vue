<template>
    <div class="loging_index">
        <div class="mian_Box">
            <div class="loging_bg">
                <div class="login_index_link">
                    <header>实验室信息化管理系统</header>
                    <div class="whilder_box">
                        <div class="username">
                            <span><img src="../../assets/img/commont/loging/username.png" alt=""> </span>
                            <input placeholder="用户名" v-model="userName" type="text">
                        </div>
                        <div class="password">
                            <span><img src="../../assets/img/commont/loging/password.png" alt=""> </span>
                            <input v-model="passWord" type="password">
                        </div>
                        <div class="loging" @click="logingSystem()">登录</div>
                        <p>忘记密码请联系管理员</p>
                    </div>
                </div>
            </div>
            <footer>控福(上海)智能科技有限公司 2017-2018</footer>
        </div>
    </div>
</template>
<script>
export default {
    name:'loging',
    data(){
        return{
            userName: '',
            passWord: ''
        }
    },
    methods:{
        logingSystem(){
            console.log('username')
            switch(this.userName){
                case '1':
                this.$router.push({name:'LabManagerIndex'});//管理员
                break;
                case '2':
                this.$router.push({name: 'TestengineerIndex'});//试验工程师
                break;
                case '3':
                this.$router.push({name: 'EquipmentengineerIndex'});//试验设备工程师
                break;
            }
        }
    },
    mounted(){
        this.$emit('headerShow',false)
    },
    destroyed(){
        this.$emit('headerShow',true)

    }
}
</script>
<style lang="scss" scoped>
.loging_index{
    width: 100%;
    height: 100%;
    padding:  1.19rem 0 0;
    .mian_Box{
        width: 100%;
        height: calc(100% - 1.19rem);
        .loging_bg{
            width: 100%;
            height: calc(100% - 1.19rem);
            background: url('../../assets/img/commont/loging/loging.png')   0 0 / 100% 100%;  
            .login_index_link{
                width: 7.17rem;
                float: right;
                margin-right: 1.86rem;
                height: 100%;
                header{
                    text-align: center;
                    font-size: .48rem;
                    color:rgba(255,255,255,1);
                    font-family:MicrosoftYaHei;
                    padding-top: 1.79rem;
                    padding-bottom: .38rem;
                }
                .whilder_box{
                    width: 100%;
                    height: 3.99rem;
                    background:rgba(255,255,255,0.4);
                    border:2px solid rgba(255,255,255,1);
                    border-radius: .2rem;
                    overflow: hidden;
                    div{
                        width: 5.27rem;
                        margin: 0 auto;
                    }
                    .username, .password{
                        border-bottom: 2px solid #fff;
                        height: .61rem;
                        display: flex;
                        align-items: center;
                        span{
                            width: .45rem;
                            height: .46rem;
                            display: block;
                            margin-right: .4rem;
                        }
                        input{
                            height: .46rem;
                            width: calc(100% - 1rem);
                            font-size: .2rem;
                        }
                    }
                    .username{margin-bottom: .52rem;margin-top: .61rem;img{width: .44rem;height: .46rem;display: block;}}
                    .password{margin-bottom: .31rem;img{height: .45rem;width: .37rem;display: block;margin-left: .07rem;}}
                    .loging{
                        cursor: pointer;
                        height: .66rem;
                        line-height: .66rem;
                        text-align: center;
                        border-radius: .1rem;
                        background:rgba(7,166,149,1);
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        font-size: .32rem;
                        margin-bottom: .28rem;
                    }
                    p{
                        font-size:.18rem;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(4,106,95,1);
                        float: right;
                        padding-right: .28rem;
                    }
                }
            } 
        }
        footer{
            font-size: .18rem;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            padding-top: .66rem;
            text-align: center;
            width: 100%;
        }
    }
}
</style>