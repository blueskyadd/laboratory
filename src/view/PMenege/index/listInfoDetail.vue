<template>
    <div class="listInfoDetail body_main">
        <imgInfo :isElement='true'/>
        <div class="right_table">
            <ul>
                <li>
                    <h3>01项目提前</h3>
                    <div>
                        <span>时间</span>
                        <input type="text">
                    </div>
                    <div>
                        <span>填充内容:</span>
                        <textarea></textarea>
                    </div>
                </li>
                <li>
                    <h3>02方案确认</h3>
                    <div>
                        <span>时间</span>
                        <input type="text">
                    </div>
                    <div>
                        <span>填充内容:</span>
                        <textarea></textarea>
                    </div>
                </li>
                <li>
                    <h3>03造型决定</h3>
                    <div>
                        <span>时间</span>
                        <input type="text">
                    </div>
                    <div>
                        <span>填充内容:</span>
                        <textarea></textarea>
                    </div>
                </li>
                <li>
                    <h3>04生准启动</h3>
                    <div>
                        <span>时间</span>
                        <input type="text">
                    </div>
                    <div>
                        <span>填充内容:</span>
                        <textarea></textarea>
                    </div>
                </li>
                <li>
                    <h3>05生准条件确认</h3>
                    <div>
                        <span>时间</span>
                        <input type="text">
                    </div>
                    <div>
                        <span>填充内容:</span>
                        <textarea></textarea>
                    </div>
                </li>
                <li>
                    <h3>06试生产</h3>
                    <div>
                        <span>时间</span>
                        <input type="text">
                    </div>
                    <div>
                        <span>填充内容:</span>
                        <textarea></textarea>
                    </div>
                </li>
            </ul>
            <footer>
                <el-button type="primary">提交</el-button>
            </footer>
        </div>
    </div>
</template>
<script>
import imgInfo from './timeTable'
export default {
    name:'listInfoDetail',
    components:{imgInfo},
}
</script>
<style lang="scss" >
.listInfoDetail{
    padding: .14rem .34rem .18rem;
    display: flex;
    .imgInfo{
        height: 97%;
        position: relative;
        .el-dropdown{
            position: absolute;
            top: 0;
            right: 0;
            .el-dropdown-link{
                // line-height: .52rem;
                margin-top: .24rem;
                margin-right: .34rem;
                font-size: .2rem;
                display: block;
                color: #08a695; 
            }
        }
    }
    .right_table{
        width: 64%;
        ul{
            padding-top: .5rem;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: .52rem;
            li{
                width: 49.7%;
                display: flex;
                flex-direction: column;
                h3{
                    font-size: .18rem;
                    margin-bottom: .32rem;
                }
                div{
                    display: flex;
                    margin-bottom: .22rem;
                    span{
                        display: block;
                        width: 1.12rem;
                        text-align: right;
                        font-size: .16rem;
                        margin-right: .1rem;
                    }
                    input{
                        height: .36rem;
                        width: 3.5rem;
                        border:1px solid #ccc;
                        font-size: .16rem;
                    }
                    textarea{
                         width: 3.5rem;
                        border:1px solid #ccc;
                        height: 1.3rem;
                        font-size: .16rem;

                    }
                    
                }
            }
             li:first-child{
                span,h3{
                    color: #51c3f0;
                }
            }
            li:nth-child(2){
                span,h3{
                    color: #ef4e89;
                }
            }
            li:nth-child(3){
                span,h3{
                    color: #842e91;
                }
            } 
            li:nth-child(4){
                span,h3{
                    color: #f8a15a;
                }
            }
            li:nth-child(5){
                span,h3{
                    color: #4485ad ;
                }
            }
            li:nth-child(6){
                span,h3{
                    color: #83c77c;
                }
            }
        }
        footer{
            justify-content: flex-end;
            display: flex;
            margin-right: 1.24rem;
            button{
                padding: .1rem .4rem!important;
                background: #08a695; 
                font-size: .2rem;
            }
        }
    }
}
 .imgInfo_listInfo_element{
         margin-left: -.68rem;
        
         li{
              color: #08a695;
            font-size: .16rem;
         }
    }
</style>