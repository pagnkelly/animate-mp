# Hello VuePress
```js
item.contentStyle = `animation-name: fadeIn, fadeOut;
      animation-duration: 133ms, 133ms;
      animation-timing-function: linear, linear;
      animation-delay: ${lastEndTime}s, ${lastEndTime + item.time}s;
      animation-fill-mode: forwards, forwards;`
item.textStyle = `animation-name: textmove, colorchange;
    animation-duration: 133ms, 100ms;
    animation-timing-function: linear, linear;
    animation-delay: ${item.textDelay}ms, ${lastEndTime}s;
    animation-fill-mode: forwards, forwards;`
item.textDefaultStyle = `animation-name: fadeOut;
          animation-duration: 100ms;
          animation-timing-function: linear;
          animation-delay: ${lastEndTime}s;
          animation-fill-mode: forwards;`
item.waitingStyle = `animation-name: fadeOut;
      animation-duration: 133ms;
      animation-timing-function: linear;
      animation-delay: ${lastEndTime}s;
      animation-fill-mode: forwards;`
item.loadingStyle = `animation-name: iconloading2, fadeIn, fadeOut;
      animation-duration: 1.03s, 133ms, 133ms;
      animation-timing-function: steps(1), linear, linear;
      animation-delay: 0s, ${lastEndTime}s, ${item.textDelay}s;
      animation-iteration-count: infinite, 1, 1;
      animation-fill-mode: none, forwards, forwards;`
item.compleateStyle = `animation-name: iconcompleate2, fadeIn;
        animation-duration: 0.53s, 133ms;
        animation-timing-function: steps(1), linear;
        animation-delay: ${item.textDelay + 133}ms, ${item.textDelay + 133}ms;
        animation-fill-mode: forwards, forwards;`
```

1. 简单动画

const lastEndTime = 2
const time = 3
const animate = createAnimation()
const style = animate
  .fadeIn({
    duration: '133ms',
    delay: lastEndTime + 's',
    fillMode: 'forwards'
  })
  .fadeOut({
    duration: '133ms',
    delay: lastEndTime + time 's',
    fillMode: 'forwards'
  }).export()

2. 动画帧动画

const style = animate.customAnimation({
  name: 'iconcompleate2',
  timingFunction: 'steps(1)',
  duration: '0.53s'
}).export()

3. 混合帧动画和简单动画

const style = animate.customAnimation({
  name: 'iconcompleate2',
  timingFunction: 'steps(1)',
  duration: '0.53s'
})

const style2 = animate
  .fadeIn({
    duration: '133ms',
    delay: lastEndTime + 's',
    fillMode: 'forwards'
  })

style.pipe(style2).export()

const style3 = animate
  .fadeIn({
    duration: '133ms',
    delay: lastEndTime + 's',
    fillMode: 'forwards'
  }).customAnimation({
    name: 'iconcompleate2',
    timingFunction: 'steps(1)',
    duration: '0.53s'
  })
