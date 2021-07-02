import { createPage } from '@mpxjs/core'
import animate from '../../../src/main'
createPage({
  data: {
    demo1: {
    }
  },
  onLoad () {
    // onLoad
    const a = animate()
    console.log(a, 'aaaaa')
  },
  methods: {
    translate () {
      this.$nextTick(() => {
        this.demo1 = {
          transform: "translateX(200px)",
          transition: "transform 1s"
        }
      })
    }
  }
})
