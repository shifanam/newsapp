<template>
  <div class="searching">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
        <!-- search bar -->
        <div class="searchbar">
          <input type="text"  class="search" placeholder="Search here" v-on:click="openNav()">
        </div>
        <!-- tabs -->
        <div class="tabs">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                  <div class="btn-sm" v-on:click="technews()">technologies</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                  <div class="btn-sm" v-on:click="sportsnews()">sports</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                  <div class="btn-sm" v-on:click="localnews()">local</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- model box -->
        <div class="model">
          <div id="myNav" class="modelbox">
            <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a><br><br>
            <input type='text' class="searchs" v-model="searchs" v-on:keyup="searchnews()">
            <div class="modelbox-content">
              <div v-for="sec in second" :key="sec.id">
                <div class="row">
                  <div class="col-md-6 col-sm-6 col-xs-6 col-lg-6">
                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                        <div class="cards">
                          <img :src="sec.urlToImage">
                        </div>
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 col-lg-8">
                        <div class="cards">
                          <h1>{{ sec.source.id }}</h1>
                          <p>{{ sec.title }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- news -->
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
            <div v-for="joke in fst" :key="joke.id">
              <div class="card">
                <h4>{{ joke.title }}</h4>
                <p>{{ joke.description }}</p>
                <img :src="joke.urlToImage" width="60%" height="17%"><br>
                <a v-bind:href="joke.url">Read more</a><br>
              </div>
            </div>
            <div v-if="n < m" class="btn-sm" v-on:click="list()" >click here..</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      jokes: [],
      fst: [],
      count: 0,
      m: 0,
      n: 0,
      searchs: '',
      tech: 'yes',
      sports: 'no',
      local: 'no',
      second: []

    }
  },
  mounted () {
    this.news()
    this.searchFun()
  },
  methods: {
    news: async function () {
      try {
        await axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apikey=0382ae4db9f24468a45ca3f26c60f567').then(response => {
          this.jokes = response.data.articles
          this.m = this.jokes.length
          this.list()
          console.log(this.jokes.length)
        })
      } catch (err) {
        console.log(err)
      }
    },
    list: function () {
      for (let key = this.count; key < this.jokes.length; key++) {
        this.count = this.count + 1
        if (this.count % 5 === 0) {
          this.fst.push(this.jokes[key])
          this.n = this.fst.length
          console.log(this.fst.length)
          break
        } else {
          console.log(this.count)
          this.fst.push(this.jokes[key])
          this.n = this.fst.length
          console.log(this.fst.length)
        }
      }
    },
    searchnews: async function () {
      // alert('hai')
      try {
        await axios.get('http://newsapi.org/v2/everything?q=' + this.searchs + '&apikey=0382ae4db9f24468a45ca3f26c60f567').then(response => {
          this.second = response.data.articles
          for (let key = 0; key < 5; key++) {
            this.fst.push(this.second[key])
          }
          console.log('Length of fst', this.second[0].title)
        })
      } catch (err) {
        console.log(err)
      }
    },
    openNav: function () {
      document.getElementById('myNav').style.width = '100%'
    },
    closeNav: function () {
      document.getElementById('myNav').style.width = '0%'
    },
    fetchnews: async function () {
      try {
        if (this.tech === 'yes') {
          await axios.get('http://newsapi.org/v2/top-headlines?sources=techcrunch&apikey=0382ae4db9f24468a45ca3f26c60f567').then(response => {
            this.jokes = response.data.articles
            this.m = this.jokes.length
            this.list()
            console.log(this.jokes.length)
          })
        } else if (this.sports === 'yes') {
          await axios.get('https://newsapi.org/v2/top-headlines?sources=espn&apiKey=0382ae4db9f24468a45ca3f26c60f567').then(response => {
            this.jokes = response.data.articles
            this.m = this.jokes.length
            this.list()
            console.log(this.jokes.length)
          })
        } else if (this.local === 'yes') {
          await axios.get('https://newsapi.org/v2/top-headlines?sources=new-scientist&apiKey=0382ae4db9f24468a45ca3f26c60f567').then(response => {
            this.jokes = response.data.articles
            this.m = this.jokes.length
            this.list()
            console.log(this.jokes.length)
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    technews: function () {
      this.tech = 'yes'
      this.sports = 'no'
      this.local = 'no'
      this.fst = []
      this.fetchnews()
    },
    sportsnews: function () {
      this.tech = 'no'
      this.sports = 'yes'
      this.local = 'no'
      this.fst = []
      // alert(this.sports)
      this.fetchnews()
    },
    localnews: function () {
      this.tech = 'no'
      this.sports = 'no'
      this.local = 'yes'
      this.fst = []
      // alert(this.local)
      this.fetchnews()
    }
  }
}
</script>
<style scoped>
.card {
  transition: 0.3s;
  margin-left:25%;
  width:50%;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.2);
  border-left: 8px solid #d6d6c2;
  margin-top: 5%;
}

.cards {
  margin-left:250%;
  width:40%;
  height:30%;
  box-shadow: 0 4px 20px 0 rgba(1,2,0,0.2);
  padding-top:30px;
  color:#000;
}

.cards:hover, .modelbox:focus {
  color: #619476;
}

.searchbar {
  padding-top:10px;
  background-color: #fff;
  margin-top:0%;
  padding:25px;
  /* border-left:solid 1em #000; */
}

.tabs {
  background-color: #fff;
  margin-top: 2%;
  margin-left: 10%;
  padding: 10px;
  padding-left: 25%;
  padding-top: 1px;
  float:center;
}

.btn-sm {
  margin-left:18px;
  background-color:red;
  font-size: 14px;
  font-family: 'Roboto';
  text-align :center;
  color: white;
  width:90px;
  float:left;
  padding:10px;
  cursor: pointer;
  border-radius: 0.3em;
  text-decoration: none;
  box-shadow: 0 4px 4px 0 rgba(0.1,0.1,0.1,0.2);
}

.btn-sm:hover, .btn-sm:focus {
  background: gray;
  letter-spacing: 7px;
  box-shadow: 2px 2px 2px 2px rgba(1,0,0,0.1);
}

.search {
  margin-top:0;
  width:50%;
  height:20px;
  padding: 15px;
  font-size:17px;
  color:#000;
}

input, text {
  margin-left:25%;
  font-size: 1em;
  display: block;
  width: 50%;
  padding:1em 1em 1em 0;
  background: none;
  background-image: none;
  border: none;
  border-bottom: 1px solid #8e8e8e;
  color: #000;
  border-radius: 0;
  -webkit-transition: border-color .25s ease, box-shadow .25s ease;
  -moz-transition: border-color .25s ease, box-shadow .25s ease;
  transition: border-color .25s ease, box-shadow .25s ease;
}

img {
  width:80px;
  height:80px;
}

.modelbox {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  width:0;
  top: 0;
  left: 0;
  background-color: rgba(256,256,256, 256);
  overflow-x: hidden;
  transition: 0.5s;
}

.modelbox-content {
  position: relative;
  color:#000;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.modelbox a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.modelbox a:hover, .modelbox a:focus {
  color: #9fa9a3;
}

.modelbox .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  color:#000;
  padding-top:20px;
  font-size: 50px;
}

@media screen and (max-height: 550px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
  font-size: 40px;
  top: 15px;
  right: 35px;
  }
}
</style>
