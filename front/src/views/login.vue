<template>
  
    <div class="box">
        <div class="m_t25">
            <input type="text" class="input1" placeholder="用户名" v-model="username">
        </div>

        <div class="m_t25">
            <input type="password" class="input1" placeholder="密码" v-model="pw1">
        </div>

        <div class="m_t25" >
            
            <!-- a button(disabled)   -->
            <input type="button" class="login_btn" @click="login" value="登录">
        </div>

        <div class="m_t15">

            <div class="tar">
                <a href="sign.html" class="link_btn">注册</a>
            </div>

        </div>
    </div>


    
</template>

<script>



export default {
  name:'login',
  data(){
    return {
      username:'',
      pw1:''
    }
  },
  methods:{
    login(){
      this.$axios.post('/login',{
        username: this.username,
        password: this.pw1
      }).then(res=>{
        // console.log(res)
        localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$weui.toast('登录成功',500)
      })
    }
  }
}
</script>


<style scoped>
   .box{
            box-sizing: border-box;
            padding-left: 10px;
            padding-right: 10px;
        }

        .input1{
            appearance: none;
            -webkit-appearance: none;
            box-sizing: border-box;
            border: 1px solid #de3232;
            border-radius: 5px;
            width: 100%;
            min-width: 1px;
            height: 38px;
            padding-left: 10px;
            outline: none;
            font-size: 18px;      
        }
        .input1::placeholder{
            color: #a5a5a5;
            font-size: 18px;
        }

        .login_btn{
            appearance: none;
            -webkit-appearance: none;
            width: 100%;
            min-width: 1px;
            height: 38px;
            border-radius: 5px;
            background-color: #de3232;
            color: #ffffff;
            font-size: 18px;
            outline: none;
            text-align: center;
        }
        .link_btn{
            color: #4d35a6;
            font-size: 14px;
            text-decoration: underline;
        }

</style>


