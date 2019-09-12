import http from '../track/http'
import conf from '../config/index'
export default {
    updataFile(files,success){
        let params = new FormData();
        params.append( "file",files)
        http.post(conf.env.updataFile, params, true).then( res =>{
            success(res)
        }).catch(err =>{
            console.log(err)
            if(err.response.status == '500'){
                this.$message({message: '服务器错误',type: 'error'});
            }
        })
    }
}