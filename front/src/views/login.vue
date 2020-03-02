<template>
  <div class="box">
    <div class="m_t25">
      <input type="text" class="input1" placeholder="用户名" v-model="username" />
    </div>

    <div class="m_t25">
      <input type="password" class="input1" placeholder="密码" v-model="pw1" />
    </div>

    <div class="m_t25">
      <input type="password" class="input1" placeholder="重复密码" v-model="pw2" />
    </div>

    <div class="m_t25">
      <div class="itemname">头像</div>

      <div>
        <a class="avater_btn">
          <input type="file" accept="image/*" ref="avatar" @change="up($event)" />
          <img src="" ref="ava">
        </a>

        
     
      </div>
    </div>

    <div class="m_t25"> 
      <input type="button" class="login_btn" value="注册" @click="sign" />
    </div>

    <div class="m_t15">
      <div class="tar">
        <a href="login.html" class="link_btn">登录</a>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';


export default {
  name:'sign',
  data(){
    return {
      username:'',
      pw1:'',
      pw2:''
    }
  },
  methods:{
    up(e){
      // console.log(e)
      var render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      var that = this;
      render.onload = function(){
        console.log(render.result)

        // console.log(this)
        that.$refs.ava.src = render.result
      }

    },
    sign(){
      if(!this.username){
        this.$weui.alert('用户名不能为空')
      }else if(this.pw1 != this.pw2){
        this.$weui.alert('两次密码不一样')
      }else if(!this.$refs.avatar.value){
        this.$weui.alert('请选择头像')
      }else{
        //如何获取到头像
        //this.$refs.avatar.value  //获取到路径
        //  this.$refs.avatar.files
        //console.log(this.$refs.avatar.files[0])
        var d = new FormData();
        d.append('username',this.username);
        d.append('password',this.pw1);
        d.append('avatar',this.$refs.avatar.files[0])

        axios.post('http://www.young1024.com:82/sign',d,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res=>{
          // console.log(res)
          
          this.$weui.toast('注册成功',1500)

        }).catch(err=>{
          // console.log(err)
          this.$weui.toast('注册失败',1500)
        })
        
      }
    }
  }
}
</script>


<style scoped>
  .box {
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
  }

  .input1 {
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
  .input1::placeholder {
    color: #a5a5a5;
    font-size: 18px;
  }

  .login_btn {
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
  .link_btn {
    color: #4d35a6;
    font-size: 14px;
    text-decoration: underline;
  }

  .avater_btn {
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 1px solid #888888;
    border-radius: 4px;
    position: relative;
  }

   .avater_btn input[type='file']{
      display: inline-block;
      width: 42px;
      height: 42px;
      opacity: 0;
   }

  .avater_btn::before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 2px;
    background-color: #888888;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -15px;
  }

  .avater_btn::after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 30px;
    background-color: #888888;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 50%;
    margin-left: -1px;
  }

  .itemname {
    color: #a5a5a5;
    font-size: 18px;
    line-height: 22px;
  }
</style>


