<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <p>
        <span>账号：</span>
        <input type="text" v-model="user_name">
      </p>
      <p>
        <span>密码：</span>
        <input type="text" v-model="pass_word">
      </p>
      <p>
        <span>邮箱：</span>
        <input type="text" v-model="user_email">
      </p>
    </div>
    <button type="submit" @click="register">注册</button>
    <button type="submit" @click="login">登录</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import common from '../../server/common'
import utils from '@/utils/index'

export default {
  name: 'Home',
  data(){
    return {
      user_name:'',
      pass_word:'',
      user_email:''
    }
  },
  methods:{
    register(){
      utils.ajax.call(this, '/api/register', {user_name:this.user_name,user_pass:this.pass_word,user_email:this.user_email}, (data, err) => {
        if (!err) {
          console.log(data)
        }
      })
    },
    login(){
      utils.ajax.call(this, '/api/signin', {user_name:this.user_name,user_pass:this.pass_word,user_email:this.user_email}, (data, err) => {
        if (!err) {
          console.log(data)
        }
      })
    }
  },
  components: {

  }
}
</script>
