<template
  >
  <div class="main-content">
    <div class="my-progress">
      <div class="my-point">{{ point }}</div>
      <div class="progress">
        <div
          id="my-progress"
          class="progress-bar bg-info"
          role="progressbar"
          style="width: 0%"
          :aria-valuenow="point"
          aria-valuemin="0"
          aria-valuemax="1000"
        ></div>
      </div>
    </div>
    <div class="question">
      <div>《Q {{ qn + 1 }}》</div>
      <div class="description">{{ questions.Content }}</div>
      <div class="answers" @click.stop.prevent="judge">
        <button class="option generalColor" id="1">
          <span>{{ questions.Option1 }}</span>
        </button>
        <button class="option generalColor" id="2">
          <span>{{ questions.Option2 }}</span>
        </button>
        <button class="option generalColor" id="3">
          <span>{{ questions.Option3 }}</span>
        </button>
        <button class="option generalColor" id="4">
          <span>{{ questions.Option4 }}</span>
        </button>
        <button class="option generalColor" id="5">
          <span>{{ questions.Option5 }}</span>
        </button>
      </div>
    </div>
    <div class="the-other-progress">
      <div class="the-other-point"></div>
      <div class="progress">
        <div
          class="progress-bar bg-warning"
          role="progressbar"
          style="width: 0%"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
const correct = new Audio("correct.ogg");
const mistake = new Audio("mistake.ogg");
// import { VueMathjax } from "vue-mathjax";

export default {
  // components: {
  //   "vue-mathjax": VueMathjax
  // },
  props: {
    initialQuestion: {
      type: Object,
      required: true
    },
    initialQn: {
      type: Number,
      required: true
    },
    initialPoint: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      questions: this.initialQuestion,
      qn: this.initialQn,
      point: this.initialPoint,
      state: "wrong",
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"
    };
  },
  watch: {
    initialQuestion(questions) {
      this.questions = {
        ...this.questions,
        ...questions
      };
    }
  },
  methods: {
    judge: function(event) {
      const rightAnswer = document.getElementById(`${this.questions.Solution}`);
      const closestElement = event.target.closest(".option");
      const options = document.querySelectorAll(".option");
      options.forEach(op => {
        op.disabled = true;
      });
      rightAnswer.classList.replace("generalColor", "bingoColor");
      if (closestElement === rightAnswer) {
        correct.play();
        this.point = this.point + 200;
        document.getElementById("my-progress").style.width = `${this.point /
          10}%`;
        this.state = "correct";
      } else {
        mistake.play();
        this.state = "wrong";
      }
      setTimeout(this.twoSecond, 2000);
    },
    twoSecond() {
      const rightAnswer = document.getElementById(`${this.questions.Solution}`);
      const options = document.querySelectorAll(".option");
      options.forEach(op => {
        op.disabled = false;
      });
      rightAnswer.classList.replace("bingoColor", "generalColor");
      this.qn += 1;
      this.handleClick();
    },
    handleClick() {
      this.$emit("after-click-button", {
        questionId: this.questions.ID,
        qn: this.qn,
        state: this.state
      });
    }
  }
};
</script>
<style >
.container {
  margin: 0px !important;
  padding: 0px !important;
}
.my-point,
.the-other-point {
  display: flex;
  align-items: center;
  z-index: 10;
  font-size: 20px;
  font-weight: bold;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: auto;
}

.my-progress,
.the-other-progress {
  display: flex;
  justify-content: center;
}

.progress {
  transform: rotate(-90deg);
  position: absolute;
  height: 2.5rem;
  width: 480px;
  top: 360px;
}
.question {
  font-size: 18px;
  padding: 0px;
}

.description {
  background: lightgray;
  border-radius: 5px;
  padding: 0px 10px;
  text-align: left;
  font-size: 16px;
}

.answers {
  margin-top: 10px;
}

.answers > button {
  display: block;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 100%;
  margin-bottom: 12px;
  padding: 3px 15px;
  font-size: 16px;
  text-align: left;
}

.bingoColor {
  background-color: lightgreen;
}

.generalColor {
  background: aliceblue;
}

.generalColor:hover {
  background: antiquewhite;
}

@media screen and (min-width: 768px) {
  .question {
    padding-top: 20px;
    font-size: 24px;
    padding: 20px 80px;
  }

  .progress {
    height: 4rem;
    width: 480px;
    top: 450px;
  }

  .answers {
    margin-top: 30px;
  }
  .answers > button {
    letter-spacing: 1px;
    margin-bottom: 15px;
    padding: 2px 40px;
    font-size: 20px;
  }
}
</style>
