<template>
  <div class="model">
    <input type='text' v-on:click="openNav()">
    <div id="myNav" class="modelbox">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
      <input type='text'>
      <div class="modelbox-content">
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    openNav: function () {
      document.getElementById('myNav').style.width = '100%'
    },
    closeNav: function () {
      document.getElementById('myNav').style.width = '0%'
    }
  }
}
</script>

<style>
.modelbox {
  background-color:#618685;
  background-color: rgba(0,0,0, 0.9);
  height:500px;
  overflow: hidden;
  transition: 0.5s;
  padding-top: 5px;
}

.modelbox-content {
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.modelbox a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #000;
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
  color:#fff;
  padding-top:90px;
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

input, text {
  margin-left:25%;
  font-size: 1em;
  display: block;
  width: 10%;
  padding:1em 1em 1em 0;
  background: none;
  background-image: none;
  border: none;
  border-bottom: 1px solid #d6d6c2;
  color: #fff;
  border-radius: 0;
  -webkit-transition: border-color .25s ease, box-shadow .25s ease;
  -moz-transition: border-color .25s ease, box-shadow .25s ease;
  transition: border-color .25s ease, box-shadow .25s ease;
}

input:hover {
  width:50%;
}
</style>
