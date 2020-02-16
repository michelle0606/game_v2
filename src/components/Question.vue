<template
  ><div class="main-content">
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
      <div class="description">
        {{ questions.Content }}
      </div>
      <div class="answers" v-on:click="judge">
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
const correct = new Audio('correct.ogg')
const mistake = new Audio('mistake.ogg')
export default {
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
      state: 'wrong'
    }
  },
  watch: {
    initialQuestion(questions) {
      this.questions = {
        ...this.questions,
        ...questions
      }
    }
  },
  methods: {
    judge: function(event) {
      const rightAnswer = document.getElementById(`${this.questions.Solution}`)
      const closestElement = event.target.closest('.option')
      const options = document.querySelectorAll('.option')
      options.forEach(op => {
        op.disabled = true
      })
      rightAnswer.classList.replace('generalColor', 'bingoColor')
      if (closestElement === rightAnswer) {
        correct.play()
        this.point = this.point + 200
        document.getElementById('my-progress').style.width = `${this.point /
          10}%`
        this.state = 'correct'
      } else {
        mistake.play()
        this.state = 'wrong'
      }
      setTimeout(this.twoSecond, 2000)
    },
    twoSecond() {
      const rightAnswer = document.getElementById(`${this.questions.Solution}`)
      const options = document.querySelectorAll('.option')
      options.forEach(op => {
        op.disabled = false
      })
      rightAnswer.classList.replace('bingoColor', 'generalColor')
      this.qn += 1
      this.handleClick()
    },
    handleClick() {
      this.$emit('after-click-button', {
        questionId: this.questions.ID,
        qn: this.qn,
        state: this.state
      })
    }
  }
}
</script>
<style>
.description {
  height: 110px;
  background: lightgray;
  border-radius: 5px;
  padding: 0px 10px;
  text-align: left;
}

.answers {
  margin-top: 30px;
}

.answers > button {
  display: block;
  margin-bottom: 15px;
  padding: 2px 40px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 100%;
  font-size: 20px;
  letter-spacing: 1px;
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
</style>
