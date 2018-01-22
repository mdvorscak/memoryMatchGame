<template>
  <div class="timer">
    <span class="digit">{{minutes | formatTime}}</span>:<span class="digit">{{seconds | formatTime}}</span>
  </div>
</template>

<script>

export default {
  props: {
    running: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    running(newVal) {
      const toggle = newVal ? this.start : this.stop;
      toggle();
    }
  },
  data() {
    return {
      minutes: 0,
      seconds: 0,
      startTime: null,
      intervalHandler: -1
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.startTime = Date.now();

      this.intervalHandler = setInterval(() => {
        const now = Date.now();
        const secondDiff = Math.floor((now - this.startTime) / 1000);
        this.seconds = secondDiff % 60;
        this.minutes = Math.floor(secondDiff / 60) % 60;
      }, 1000);
    },
    stop() {
      clearInterval(this.intervalHandler);
    }
  },
  filters: {
    formatTime(value) {
      let stringValue = value.toString();
      if (stringValue.length <= 1) {
        stringValue = `0${stringValue}`;
      }
      return stringValue;
    }
  }
};
</script>

<style>
.timer {
  margin: 10px;
  padding: 5px;
  background-color: #333;
  display: inline-block;
  color: #00ff00;
  border-radius: 4px;
}
</style>
