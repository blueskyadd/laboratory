<template>
        <header>
            <div class="left_title">
                <p>{{setHeaderTitle}}</p>
            </div>
            <div class="right_trake">
                <div @click="goNotification()">
                    <el-badge :value="systemNumber" :max="99" class="item">
                        <img src="../assets/img/commont/header/inform.png" alt="">
                    </el-badge>
                    <span>通知</span>
                </div>
                <div><img src="../assets/img/commont/header/user.png" alt=""><span>{{userName}}</span></div>
                <div @click="goOutSystem()"><img src="../assets/img/commont/header/userOut.png" alt=""><span>退出</span></div>
            </div>
        </header>
</template>
<script>
export default {
    name:'header',
    props:{
        setHeaderTitle:String
    },
    data(){
        return{
            userName: localStorage.getItem('userName'),
            systemNumber:0
        }
    },
    methods:{
        goOutSystem(){
            this.$router.replace({name:'loging'})
        },
        goNotification(){
            this.$router.push({name:'notification'})
        },
        getSystem_number(){
            this.$http.get(this.$conf.env.getSystem_number).then(res =>{
                console.log(res)
                this.systemNumber = res.data.num;
            }).catch(err =>{
                this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
            })
        }
    },
    mounted(){
        if(this.$route.path != '/'){
           this.getSystem_number(); 
        }
    }
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
        width: 3.95rem;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .is-fixed{
            top: -.05rem;
            right: 0.2rem; 
        }
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
                font-size: .22rem;
                max-width: 1.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
        }
    }
}
</style>
