<template>
  <div class="main">
    <div class="dropdown">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
          <div v-on:click="myFunction()" id="mybtn" class="dropbtn">search</div>
            <div id="myDropdown" class="dropdown-content">
              <input type="text" placeholder="Search.." id="myInput" v-model="search" v-on:keyup="filterFunction()">
                <div v-for="joke in jokes" :key="joke.id">
                  <div class="cards">
                  <h1>{{ joke.source.id }}</h1>
                  <p>{{ joke.title }}</p>
                  <img :src="joke.urlToImage">
                  <a v-bind:href="joke.url">click here..</a>
                  <p>{{ joke.description }}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pp">
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
          <div v-for="joke in jokes" :key="joke.id">
            <div class="card">
              <h1>{{ joke.source.id }}</h1>
              <p>{{ joke.title }}</p>
              <img :src="joke.urlToImage">
              <a v-bind:href="joke.url">click here..</a>
            </div>
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
      search: ''
    }
  },
  methods: {
    myFunction: function () {
      document.getElementById('myDropdown').classList.toggle('show')
    },
    filterFunction: function () {
      var input, filter, a, i
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      var div = document.getElementById('myDropdown')
      a = div.getElementsByTagName('a')
      for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = ''
        } else {
          a[i].style.display = 'none'
        }
      }
    }
  },
  mounted () {
    axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apikey=b790ae775a9d427c823e459337e97de4').then(response => {
      this.jokes = response.data.articles
    })
  }
}
</script>

<style>
input, text {
  width: 130px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url('../assets/lense.jpeg');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}

input, text:focus {
  width: 80%;
}

input, text: img {
  width:10px;
  height:10px;
}

.card {
  margin-left:25%;
  width:50%;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.2);
}

.cards {
  margin-left:10%;
  width:80%;
  height:30%;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.2);
}

img {
  width:10px;
  height:10px;
}
.dropbtn {
  background-color: gray;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius:0.3em;

  backgroung-image:url('../assets/lense.jpeg')
}

.dropbtn:hover, .dropbtn:focus {
  background-color: red;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 430px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd}

.show {display:block;}
</style>
