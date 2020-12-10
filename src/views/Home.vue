<template>
  <div class="home">
    <textarea v-model="content" name="" id="" cols="30" rows="10"></textarea>
    <button @click="onsubmit">发表</button>
    <div v-for="(item,index) in list" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import utils from '@/utils/index'

export default {
  name: 'Home',
  data(){
    return{
      content:'',
      list:[]
    }
  },
  components: {

  },
  methods:{
    onsubmit(){
      utils.ajax.call(this, '/api/postContent', {content:this.content}, (data, err) => {
        if (!err) {
          console.log(data)
        }
      })
    }
  },
  mounted(){
    utils.ajax.call(this, '/api/getPosts',{},(data, err) => {
      if (!err) {
        this.list = data
        console.log(this.list)
      }
    })
  }
}
</script>
