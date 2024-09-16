// stores/queue.js

import { defineStore } from 'pinia'

export const useQueueStore = defineStore('queue', {
    state: () => ({
        currentNumber: 0,        // 当前的最大排号
        waitingQueue: [],        // 等待中的号码队列
        callingNumber: null,     // 当前正在叫的号码
        passedNumbers: [],       // 过号的号码列表
    }),
    actions: {
        takeNumber() {
            this.currentNumber++
            this.waitingQueue.push(this.currentNumber)
            return this.currentNumber
        },
        callNumber() {
            if (this.callingNumber !== null) {
                // 如果有正在叫的号码，需要先处理过号或完成
                return
            }
            if (this.waitingQueue.length > 0) {
                this.callingNumber = this.waitingQueue.shift()
            } else {
                this.callingNumber = null
            }
        },
        passNumber() {
            if (this.callingNumber !== null) {
                this.passedNumbers.push(this.callingNumber)
                this.callingNumber = null
                this.callNumber()
            }
        },
        clearAll() {
            this.currentNumber = 0
            this.waitingQueue = []
            this.callingNumber = null
            this.passedNumbers = []
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'queue-store',
                storage: process.client ? localStorage : null,
            },
        ],
    },
})
