<template>
  <div class='logo'>
    <div class=card>
      <img src='../assets/news.jpeg' width=150px height=150px>
      <div class="myProgress">
        <div id="progress" :style="{width: progressWidth + '%'}"></div>
      </div>
      <div class="row">
        <div class="col-xs-4 col-sm-4 col-lg-4 col-md-4">
          <center>
            <div v-if="progressWidth >= 100" class="btn-sm" v-on:click="load()">Start</div>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'load',
  data () {
    return {
      progressWidth: 0, // initial width = 0
      duration: 5 * 1000, // concert duration, ms
      start: (new Date()).valueOf()
    }
  },
  computed: {
    end: function () { // when event finishes
      return this.start + this.duration
    }
  },
  methods: {
    startEvent: function (start, end) {
      const int = setInterval(() => { // calculate width periodically
        const now = (new Date()).valueOf()
        if (now >= end) { // if finished
          this.progressWidth = 100
          clearInterval(int)
        }
        this.progressWidth = ((now - start) / (end - start)) * 100
      }, 10)
    },
    load: function () {
      this.$router.push({path: '/search'})
    }
  },
  mounted () {
    this.startEvent(this.start, this.end) // start event
    return this.progressWidth
  }
}
</script>
<style>
.myProgress {
  margin-left:35%;
  margin-top:5%;
  width: 30%;
  background-color: #ddd;
  border: solid #fff;
  border-radius: 0.5em;
}

#progress {
  border-radius: 0.5em;
  width: 1%;
  height: 3px;
  background: repeating-linear-gradient(150deg,red,white 7%,gray 10%);
  background-color: #e60000;
}

.btn-sm {
  margin-top:18px;
  background-color:red;
  font-size: 14px;
  font-family: 'Roboto';
  text-align :center;
  color: white;
  width:90px;
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

</style>
