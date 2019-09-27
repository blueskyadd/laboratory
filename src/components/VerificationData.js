import { Message } from 'element-ui';
export default{
    VerificationData(data){
        for(var i in data){
            if(typeof data[i] != 'boolean' && !data[i] ){
                Message({message: '*为必填项哦',type: 'warning'});
                return false
            }
        }
        return true;
    }  
}