<template>
  <div class="error">
    <div class="mars"></div>
    <img src="./images/404.svg" class="logo-404" />
    <img src="./images/meteor.svg" class="meteor" />
    <p class="title">很抱歉</p>
    <p class="subtitle">你输入的地址错误或页面找不到了</p>
    <div align="center">
      <router-link class="btn-back" to="/">返回首页</router-link>
    </div>
    <img src="./images/astronaut.svg" class="astronaut" />
    <img src="./images/spaceship.svg" class="spaceship" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.error {
  background-image: url('./images/star.svg'),
    linear-gradient(to bottom, #05007a, #4d007d);
  height: 100%;
  margin: 0;
  background-attachment: fixed;
  overflow: hidden;

  @keyframes floating {
    from {
      transform: translateY(0px);
    }

    65% {
      transform: translateY(15px);
    }

    to {
      transform: translateY(0px);
    }
  }

  .mars {
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    height: 27vmin;
    background: url('./images/mars.svg') no-repeat bottom center;
    background-size: cover;
  }

  .logo-404 {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 16vmin;
    width: 30vmin;
  }

  @media (max-width: 480px) and (min-width: 320px) {
    .logo-404 {
      top: 45vmin;
    }
  }

  .meteor {
    position: absolute;
    right: 2vmin;
    top: 16vmin;
  }

  .title {
    position: relative;
    z-index: 2;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    text-align: center;
    font-size: 5vmin;
    margin-top: 31vmin;
  }

  @media (max-width: 480px) and (min-width: 320px) {
    .title {
      margin-top: 65vmin;
    }
  }

  .subtitle {
    position: relative;
    z-index: 2;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    text-align: center;
    font-size: 3.5vmin;
    margin-top: 2vmin;
    margin-bottom: 9vmin;
  }

  .btn-back {
    position: relative;
    z-index: 2;
    border: 1px solid white;
    color: white;
    height: 5vmin;
    padding: 12px;
    font-family: 'Nunito', sans-serif;
    text-decoration: none;
    border-radius: 5px;
  }

  .btn-back:hover {
    background: white;
    color: #4d007d;
  }

  @media (max-width: 480px) and (min-width: 320px) {
    .btn-back {
      font-size: 3.5vmin;
    }
  }

  .astronaut {
    position: absolute;
    z-index: 1;
    top: 18vmin;
    left: 10vmin;
    height: 30vmin;
    animation: floating 3s infinite ease-in-out;
  }

  @media (max-width: 480px) and (min-width: 320px) {
    .astronaut {
      top: 2vmin;
    }
  }

  .spaceship {
    position: absolute;
    z-index: 1;
    bottom: 15vmin;
    right: 24vmin;
  }

  @media (max-width: 480px) and (min-width: 320px) {
    .spaceship {
      width: 45vmin;
      bottom: 18vmin;
    }
  }
}
</style>
