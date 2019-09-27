import http from '../track/http'
import conf from '../config/index'
export default {
    updataFile(files,success,_this){
        let params = new FormData();
        params.append( "file",files)
        http.post(conf.env.updataFile, params, true).then( res =>{
            if(res.status == '201'){
                success(res)
            }else{
                _this.$message({ message:'上传失败' , type: 'warning'});
            }
            
        }).catch(err =>{
            _this.$message({ message:err.response?err.response.data:'服务器错误' , type: 'warning'});
        })
    }
}