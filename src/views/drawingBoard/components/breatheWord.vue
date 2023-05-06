<template>
  <div class="breatheWord">
    <div class="boujee-text">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.breatheWord {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: hsl(0 0% 20%);
}
.boujee-text {
  --bg-size: 400%;
  --color-one: hsl(15 90% 55%);
  --color-two: hsl(40 95% 55%);
  font-size: clamp(3rem, 20vmin, 8rem);
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
  ) 0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: move-bg 8s infinite linear;
}

@media (prefers-reduced-motion: no-preference) {
  .boujee-text {
    animation: move-bg 8s linear infinite;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
</style>
