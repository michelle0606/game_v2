<template>
  <div class="avatar-and-time">
    <div class="right">
      <img src="orange.png" alt />

      <div class="my-name">Walle</div>
    </div>
    <div class="middle">
      <div class="time">
        <div class="number">{{ timer }}</div>
      </div>
    </div>
    <div class="left">
      <img src="apple.png" alt />

      <div class="the-other-name">電腦</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initialSetting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      timer: "",
      value: 53,
      isShow: false,
      gameOver: this.initialSetting
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.timer = this.value;
      if (this.value > 50) {
        this.timer = 50;
      }
      if (this.value > 0) {
        this.value--;
      } else {
        this.handleTimeIsUp();
      }
    },
    handleTimeIsUp() {
      this.$emit("after-time-is-up");
    }
  },
  mounted() {
    this.timer = setInterval(this.get, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
.container {
  margin: 0px !important;
  padding: 0px !important;
}
.avatar-and-time {
  display: flex;
  justify-content: space-between;
}

.right,
.left {
  position: relative;
}

.right > img,
.left > img {
  width: 100px;
}

.middle {
  margin: auto;
}

.number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  height: inherit;
}

.time {
  border: 3px solid;
  color: cadetblue;
  border-radius: 50%;
  width: 70px;
  height: 70px;
}

.my-name,
.the-other-name {
  font-size: 24px;
  margin-top: 4px;
}

.feedback {
  position: absolute;
  left: 0px;
  top: -40px;
}

.bingo {
  color: green;
}

.wrong {
  color: red;
}

@media screen and (min-width: 768px) {
  .right > img,
  .left > img {
    width: 150px;
  }
  .time {
    width: 100px;
    height: 100px;
  }

  .number {
    font-size: 40px;
  }

  .my-name,
  .the-other-name {
    font-size: 30px;
    margin-top: 10px;
  }

  .feedback {
    font-size: 200px;
  }
}
</style>
