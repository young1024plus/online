<template>
  <div class="index">
    <div class="head">
      <a class="back_btn" @click="$router.back()">返回</a>
    </div>

    <div class="searchbox">
      <div class="searchbar">
        <input type="text" placeholder="请输入新闻标题关键字" v-model="keyword" @keyup.enter="search" />
        <span></span>
      </div>
    </div>

    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="$router.push({name:'info',params:{id:item._id}})">
          <div class="info">
            <div class="title">{{item.title}}</div>
            <div class="something">
              <span class="m_r10">{{item.media}}-{{item.type}}</span>
              <span>{{item.pubtime}}</span>
            </div>
          </div>
          <div class="img">
            <img v-if="item.picture!==null" v-bind:src="item.picture" />
            <span class="noimg" v-else>
              无图
            </span>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      keyword:'',
      list:[]
    };
  },
  methods: {
    search(){
      this.$axios.post('/search',{
        keyword: this.keyword
      }).then(res=>{
        if(res.data.status == 'success'){
          this.list = res.data.data
        }else{
          this.$weui.toast('查询失败',1500)
        }
      })
    }
  }
};
</script>


<style scoped>
.index {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.head {
  height: 40px;
  width: 100%;
  background-color: #dd3635;
  display: flex;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
}
.content {
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}

.content > ul > li {
  display: flex;
  height: 100px;
  border-bottom: 1px solid #f3f3f3;
  box-sizing: border-box;
  padding-top: 14px;
  padding-bottom: 14px;
}
.content > ul > li:last-child {
  border-bottom: 0;
}

.info {
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
}

.title {
  font-size: 18px;
  color: #222222;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.something {
  color: #a5a5a5;
  font-size: 12px;
}

.img {
  width: 115px;
  height: 72px;
  overflow: hidden;
}

.img > img {
  width: 100%;
}
.img> .noimg{
  display: inline-block;
  width: 113px;
  height: 70px;
  border: 1px solid #a5a5a5;
  text-align: center;
  line-height: 70px;
  color: #a5a5a5;
}

.back_btn {
  color: #ffffff;
  font-size: 16px;
}

.back_btn::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border-left: 3px solid #ffffff;
  border-top: 3px solid #ffffff;
  transform: rotate(-45deg);
}

.searchbox {
  height: 65px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
}

.searchbar {
  border: 1px solid #888888;
  height: 34px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
}
.searchbar > input {
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  height: 32px;
  outline: none;
  text-indent: 10px;
  font-size: 16px;
  color: #333333;
}

.searchbar > input::placeholder {
  color: #c4c4c4;
}

.searchbar > span {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url(../assets/images/search2.png) no-repeat;
  background-size: 70%;
  background-position: center;
  margin-right: 10px;
}
</style>


