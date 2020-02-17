<template>
  <div class="game">
    <div class="container">
      <TopArea
        :initialSetting="gameOver"
        @after-time-is-up="afterTimeIsUp"
        :key="componentKey"
      ></TopArea>

      <Question
        :initial-question="questions"
        :initial-qn="qn"
        :initial-point="point"
        @after-click-button="afterClickButton"
        :key="componentKey + 1"
      ></Question>
    </div>
    <Result
      v-if="isShow"
      :total="point"
      :cc="correctCount"
      :key="componentKey + 2"
      @after-forces-update="afterForcesUpdate"
    ></Result>
  </div>
</template>
<script>
const bgm = new Audio('bgm.ogg')
import Question from '../components/Question'
import TopArea from '../components/TopArea'
import Result from '../components/Result'
import questionApi from '../apis/question'
const answerState = []

export default {
  name: 'game',
  components: { Question, TopArea, Result },
  data() {
    return {
      questions: [],
      point: 0,
      qn: 0,
      gameOver: false,
      isShow: false,
      correctCount: 0,
      componentKey: 0
    }
  },
  created() {
    bgm.pause()
    bgm.currentTime = 0
    setTimeout(this.fetchQuestion, 3000)
    // setTimeout(this.playBgm, 3000)
  },
  methods: {
    async fetchQuestion() {
      if (this.gameOver === false) {
        try {
          const res = await questionApi.get()
          this.questions = res.data[this.qn]
        } catch (err) {
          console.log('error:', err)
        }
      }
    },
    afterClickButton(payload) {
      const { qn, questionId, state } = payload
      answerState.push({ questionId: questionId, state: state })
      this.qn = qn
      this.qn < 5 ? this.fetchQuestion() : this.endGame()
    },
    afterTimeIsUp() {
      this.endGame()
    },
    afterForcesUpdate() {
      this.forceRerender()
    },
    playBgm() {
      bgm.play()
      bgm.loop = true
    },
    endGame() {
      this.isShow = true
      const options = document.querySelectorAll('.option')
      options.forEach(op => {
        op.disabled = true
      })
      const correntQuestion = answerState.filter(q => {
        return q.state === 'correct'
      })
      this.correctCount = correntQuestion.length
      this.point = correntQuestion.length * 200
    },
    clearAllSettings() {
      const options = document.querySelectorAll('.option')
      options.forEach(op => {
        op.disabled = false
      })
    },
    forceRerender() {
      this.isShow = false
      this.qn = 0
      this.point = 0
      answerState.length = 0
      this.componentKey += 1
      bgm.pause()
      bgm.currentTime = 0
      setTimeout(this.fetchQuestion, 3000)
      // setTimeout(this.playBgm, 3000);
    }
  },
  beforeDestroy() {
    this.clearAllSettings()
  }
}
</script>

<style>
.game {
  position: relative;
}
</style>
