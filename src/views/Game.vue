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
const answerState = []
const dummyData = [
  {
    ID: '17',
    Chapter: '2',
    Section: '1',
    Level: '1',
    Number: '1',
    Content:
      'Find the slope m of the line tangent to the graph of the function$$f(x)=5-6 x$$   at the point(-1 , 11)',
    Option1: '1. m=-6',
    Option2: '2. m=-5',
    Option3: '3. m=5',
    Option4: '4. m=6',
    Option5: '5. m=-11',
    Solution: '1',
    Time: '2020-02-14 01:28:56.000000',
    Note: ''
  },
  {
    ID: '18',
    Chapter: '2',
    Section: '1',
    Level: '1',
    Number: '2',
    Content:
      'Find the slope m of the line tangent to the graph of the function $$g(x)=8-x^{2}$$ at the point(5,-17).',
    Option1: '1. m=5',
    Option2: '2. m=8',
    Option3: '3. m=-10',
    Option4: '4. m=-17',
    Option5: '5. m=-16',
    Solution: '3',
    Time: '2020-02-14 01:30:10.000000',
    Note: ''
  },
  {
    ID: '19',
    Chapter: '2',
    Section: '1',
    Level: '1',
    Number: '3',
    Content:
      ' Find the derivative of the function $$g(x)=-1$$ by the limit process.',
    Option1: '1. $$g^{prime}(x)=1$$',
    Option2: '2. $$g^{prime}(x)=x$$',
    Option3: '3. $$g^{prime}(x)=- x$$',
    Option4: '4. $$g^{prime}(x)=0$$',
    Option5: '5. $$g^{prime}(x)=-1$$',
    Solution: '4',
    Time: '2020-02-14 01:31:18.000000',
    Note: ''
  },
  {
    ID: '20',
    Chapter: '2',
    Section: '1',
    Level: '1',
    Number: '4',
    Content:
      'Find the derivative of the function $$h(s)=5+frac{1}{8} s$$ by the limit process.',
    Option1:
      '1. Find the derivative of the function $$h(s)=5+frac{1}{8} s$$ by the limit process.',
    Option2: '2. $$h^{prime}(s)=5 s+frac{7}{8} s^{2}$$',
    Option3: '3. $$h^{prime}(s)=frac{7}{8}$$',
    Option4: '4. $$h^{prime}(s)=frac{7}{8}$$',
    Option5: '5. $$h^{prime}(s)=5 s+frac{7}{8}$$',
    Solution: '3',
    Time: '2020-02-14 01:32:28.000000',
    Note: ''
  },
  {
    ID: '21',
    Chapter: '2',
    Section: '1',
    Level: '1',
    Number: '5',
    Content:
      'Find the derivative of the following function $$f(x)=-2 x^{2}+8 x-10$$ using the limiting process',
    Option1: '1. $$f^{prime}(x)=-4 x+8$$',
    Option2: '2. $$f^{prime}(x)=-2 x+8$$',
    Option3: '3. $$f^{prime}(x)=-4 x+8 x-10$$',
    Option4: '4. $$f^{prime}(x)=-2 x-8$$',
    Option5: '5. $$f^{prime}(x)=-4 x-8$$',
    Solution: '1',
    Time: '2020-02-14 01:33:53.000000',
    Note: ''
  }
]
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
    setTimeout(this.playBgm, 3000)
  },
  methods: {
    fetchQuestion() {
      if (this.gameOver === false) {
        this.questions = dummyData[this.qn]
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
      setTimeout(this.playBgm, 3000)
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
  height: 4rem;
  width: 480px;
  position: absolute;
  top: 450px;
}

.question {
  padding-top: 20px;
  font-size: 24px;
  padding: 20px 80px;
}
</style>
