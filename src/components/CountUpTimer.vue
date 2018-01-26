<template>
  <div class="timer">
    <span class="mins">{{minutes | formatTime}}</span>:<span class="secs">{{seconds | formatTime}}</span>
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
      this.toggle(newVal);
    }
  },
  mounted() {
    /** begin timing immediately if running was true when mounted */
    this.toggle(this.running);
  },
  data() {
    return {
      minutes: 0,
      seconds: 0,
      startTime: null,
      intervalHandler: -1
    };
  },
  methods: {
    /** @description Toggles the timer on or off
     *  @param on {boolean} - True to start timer, false to stop timer
     */
    toggle(on) {
      /* eslint-disable no-unused-expressions */
      on ? this.start() : this.stop();
      /* eslint-enable no-unused-expressions */
    },
    /** @description Starts the timer */
    start() {
      this.startTime = Date.now();

      this.intervalHandler = setInterval(() => {
        const now = Date.now();

        const secondDiff = Math.floor((now - this.startTime) / 1000);
        this.seconds = secondDiff % 60;
        this.minutes = Math.floor(secondDiff / 60) % 60;
      }, 1000);
    },
    /** @description Stops the timer */
    stop() {
      clearInterval(this.intervalHandler);
    }
  },
  filters: {
    /** @description A number formatting filter to display numbers padded with 0s
     *  @param value {number} - number of seconds/minutes/hours to format
     *  @returns {String} -  the formatted time
     *  @example {{ 5 | formatTime }} // renders '05'
     */
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

<style lang="stylus">
@import '../common/theme'
@import '../common/app'

.timer 
  margin 0 app-space
  padding app-space
  background-color theme-black
  display inline-block
  color #00ff00
  border-radius app-border-radius
</style>
