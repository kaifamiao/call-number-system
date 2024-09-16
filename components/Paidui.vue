<template>
  <div>
    <h1>排队叫号系统</h1>
    <div class="buttons">
      <button @click="takeNumber">取号</button>
      <button @click="callNumber">叫号</button>
      <button @click="passNumber">过号</button>
      <button @click="clearAll">清空</button>
    </div>
    <!-- 显示区域 -->
    <div class="display-area">
      <div class="display-section">
        <h2>正在叫号</h2>
        <p v-if="callingNumber">{{ callingNumber }}</p>
        <p v-else>无</p>
      </div>
      <div class="display-section">
        <h2>等待叫号</h2>
        <ul>
          <li v-for="number in waitingQueue" :key="number">{{ number }}</li>
        </ul>
      </div>
      <div class="display-section">
        <h2>过号</h2>
        <ul>
          <li v-for="number in passedNumbers" :key="number">{{ number }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useQueueStore} from '~/stores/queue'

const queueStore = useQueueStore()

const takeNumber = () => {
  const number = queueStore.takeNumber()
  alert(`您已取号，您的号码是：${number}`)
}

const callNumber = () => {
  if (queueStore.callingNumber !== null) {
    alert('请先处理当前正在叫的号码')
  } else {
    queueStore.callNumber()
    if (queueStore.callingNumber !== null) {
      alert(`请 ${queueStore.callingNumber} 号到服务台`)
    } else {
      alert('没有等待的号码')
    }
  }
}

const passNumber = () => {
  if (queueStore.callingNumber !== null) {
    queueStore.passNumber()
    if (queueStore.callingNumber !== null) {
      alert(`请 ${queueStore.callingNumber} 号到服务台`)
    } else {
      alert('没有等待的号码')
    }
  } else {
    alert('当前没有正在叫的号码')
  }
}

const clearAll = () => {
  if (confirm('确认清空所有数据？')) {
    queueStore.clearAll()
  }
}

const callingNumber = computed(() => queueStore.callingNumber)
const waitingQueue = computed(() => queueStore.waitingQueue)
const passedNumbers = computed(() => queueStore.passedNumbers)
</script>

<style scoped>
.buttons {
  margin-bottom: 20px;
}

.buttons button {
  margin-right: 10px;
  padding: 10px 20px;
}

.display-area {
  display: flex;
  justify-content: space-around;
}

.display-section {
  width: 30%;
}

.display-section h2 {
  text-align: center;
}

.display-section p {
  text-align: center;
  font-size: 24px;
  color: #409eff;
}

.display-section ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

.display-section ul li {
  margin-bottom: 5px;
}
</style>
