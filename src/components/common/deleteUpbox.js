import Vue from 'vue'

import { message , confirm} from 'element-ui';
Vue.prototype.$message = message
Vue.prototype.$confirm = confirm

export default {
    
  
    open() {
        alert('sd')
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          $message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
}