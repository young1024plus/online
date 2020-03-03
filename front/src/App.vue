<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'app',
  created(){
    // console.log('aa')
    var u = localStorage.getItem('user');
    if(u){
      var user = JSON.parse(u);
      var token = user.token;

      this.$axios.post('/status',{
        token
      }).then(res=>{
        // console.log(res)
        var that = this;
        if(res.data.status=='fail'){

          this.$weui.toast(res.data.msg,{
            duration:1500,
            callback:function(){
              localStorage.removeItem('user');
              that.$router.replace({name:'login'})
            }
          })


         
        }

      })
      



    }else{
      this.$router.replace({name:'login'})
    }


  }
}
</script>


<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
      min-width: 320px;
      max-width: 640px;
      box-sizing: border-box;
      width: 100%;
  } 
  #app{
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    box-sizing: border-box;
  }

  a{
      text-decoration: none;
  }
  ul li{
      list-style: none;
  }

  .m_t25{
      margin-top: 25px;
  }
  .m_t15{
      margin-top: 15px;
  }
  .tar{
      text-align: right;
  }

  .m_r10{
      margin-right: 10px;
  }
</style>
