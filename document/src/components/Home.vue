<template>
  <div class="home">
    <div class="hero">
      <h1>Neon</h1>
      <p class="description">
        上汽保险移动端Vue组件库
      </p>
      <p class="action">
        <router-link to="/quickstart" class="nav-link action-button">查看文档 →</router-link>
      </p>
    </div>

    <div class="content custom">
      <div align="center">
        <p>
          <img src="~@/assets/images/qrcode.png" alt="示例">
        </p>
        <h3>扫码查看示例</h3>
      </div>
    </div>

    <div class="footer">
      MIT Licensed | Copyright © 2018-present INSAIC
    </div>
  </div>
</template>

<style lang="scss">
.home {
  padding: 3.6rem 2rem 0;
  max-width: 960px;
  margin: 0 auto
}

.home .hero {
  text-align: center
}

.home .hero img {
  max-height: 280px;
  display: block;
  margin: 3rem auto 1.5rem
}

.home .hero h1 {
  font-size: 3rem
}

.home .hero .action,.home .hero .description,.home .hero h1 {
  margin: 1.8rem auto
}

.home .hero .description {
  max-width: 35rem;
  font-size: 1.6rem;
  line-height: 1.3;
  color: #6a8bad
}

.home .hero .action-button {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #009ce4;
  padding: .8rem 1.6rem;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #008ccd
}

.home .hero .action-button:hover {
  background-color: #01afff
}

.home .features {
  border-top: 1px solid #eaecef;
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: strech;
  justify-content: space-between
}

.home .feature {
  flex-grow: 1;
  flex-basis: 30%;
  max-width: 30%
}

.home .feature h2 {
  font-size: 1.4rem;
  font-weight: 500;
  border-bottom: none;
  padding-bottom: 0;
  color: #3a5169
}

.home .feature p {
  color: #4e6e8e
}

.home .footer {
  padding: 2.5rem;
  border-top: 1px solid #eaecef;
  text-align: center;
  color: #4e6e8e
}

@media (max-width: 719px) {
  .home .features {
    flex-direction: column
  }

  .home .feature {
    max-width: 100%;
    padding: 0 2.5rem
  }
}

@media (max-width: 419px) {
  .home {
    padding-left:1.5rem;
    padding-right: 1.5rem
  }

  .home .hero img {
    max-height: 210px;
    margin: 2rem auto 1.2rem
  }

  .home .hero h1 {
    font-size: 2rem
  }

  .home .hero .action,.home .hero .description,.home .hero h1 {
    margin: 1.2rem auto
  }

  .home .hero .description {
    font-size: 1.2rem
  }

  .home .hero .action-button {
    font-size: 1rem;
    padding: .6rem 1.2rem
  }

  .home .feature h2 {
    font-size: 1.25rem
  }
}

@media (min-height: 700px) {
  .home .footer {
    position:fixed;
    bottom: 0;
    left: 0;
    right: 0
  }
}
</style>
