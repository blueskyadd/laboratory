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
                            <input placeholder="密码" v-model="passWord" type="password">
                        </div>
                        <div class="loging" @click="logingSystem()">登录</div>
                        <p>忘记密码请联系管理员</p>
                    </div>
                </div>
            </div>
            <footer>
               <p>控福(上海)智能科技有限公司 2017-2018</p>
               <p><img src="../../assets/icp.png" alt=""><a @click="openIcp" >沪ICP备18031142号-13</a></p>
            </footer>
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
            if(!this.VerificationData()) return;
            let params ={
                "username": this.userName,//手机号
                "password": this.passWord,//密码
            }
            this.$http.post(this.$conf.env.uesrRegister,params).then(res =>{
                    console.log(res)
                if(res.status == '201'){
                    sessionStorage.setItem('jp_token',res.data.token);//存入token值
                    localStorage.setItem('userName',res.data.name);//存放用户名
                    switch(res.data.role){
                        case 1:
                        this.$router.replace({name:'LabManagerIndex'});//管理员
                        break;
                        case 2:
                        this.$router.replace({name: 'PMenegeIndex'});//产品经理
                        break;
                        case 3:
                        this.$router.replace({name:'LaboratoryManagerIndex'});//实验室经理
                        break;
                        case 4:
                        this.$router.replace({name:'ProjectManagerIndex'});//项目经理
                        break;
                        case 5:
                        this.$router.replace({name: 'TestengineerIndex'});//试验工程师
                        break;
                        case 6:
                        this.$router.replace({name: 'gaugerIndex'});//实验设备计量员工
                        break;
                        case 7:
                        this.$router.replace({name: 'EquipmentengineerIndex'});//试验设备工程师
                        break;
                        case 8:
                        this.$router.replace({name: 'materialIndex'});//物料管理员
                        break;
                    }
                }
            }).catch(err =>{
                if(err.response.status == '401'){
                    this.$message({message: err.response.data,type: 'error'});
                }else if(err.response.state == '500'){
                    this.$message({message: '服务器错误',type: 'error'});
                }else{
                    this.$message({message: '登陆失败，请稍候',type: 'error'});
                }
            })
        },
        VerificationData(){
            if(!this.userName && this.passWord){
                this.$message({message: '请输入您的用户名',type: 'warning'});
                return false;
            }else if(this.userName && !this.passWord){
                this.$message({message: '请输入您的密码',type: 'warning'});
                return false;
            }else if(!this.userName && !this.passWord){
                this.$message({message: '请输入您的用户名和密码',type: 'warning'});
            }else{
                return true;
            }
        },
        openIcp(){
            window.open('http://www.beian.miit.gov.cn/')
        }
    },
    mounted(){
        this.$message.closeAll()
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
            padding-top: .4rem;
            text-align: center;
            width: 100%;
            p,a{
                font-size: .16rem;
                font-family:MicrosoftYaHei;
                line-height: .3rem;
                font-weight:400;
                color:rgba(153,153,153,1);
            }
        }
    }
}
</style>