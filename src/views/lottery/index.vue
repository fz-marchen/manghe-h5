<template>
  <div
    class="lottery"
    :style="{
      'background-image': `url(${bgImg})`,
    }"
  >
    <div class="lottery-jgg">
      <!-- 大转盘抽奖简易demo -->
      <div class="prize">
        <!-- <div id="my-lucky" class="prize-top"> </div> -->
        <lucky-grid
          ref="luckyRef"
          @start="start"
          @end="end"
          :width="width"
          :height="height"
          :defaultStyle="defaultStyle"
          :defaultConfig="defaultConfig"
          :blocks="blocks"
          :prizes="prizes"
          :buttons="buttons"
        />
      </div>
    </div>

    <div @click="onLookGoods">查看</div>

    <div class="lottery-rule"> 规则 </div>
    <van-popup v-model:show="showGoods" class="goods-popup">
      <div class="goods-popup-container">
        <div class="goods-popup-header"> <img class="goods-popup__close" :src="closeImg" alt="" srcset="" /> </div>
        <div class="goods-popup-body"> body</div>
        <div class="goods-popup-footer">footer </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs } from 'vue';
  import { mhImg } from '/@/common/utils/oss';

  const sacle = document.body.clientWidth / 375;
  const stage = reactive({
    width: 309 * sacle,
    height: 309 * sacle,
    ...mhImg({
      bgImg: 'h5/lottery/bg.png',
      closeImg: 'miniprogram/common/close.png',
    }),
    showGoods: false,
  });
  const imgs: any = mhImg({
    licjBtnImg: 'h5/lottery/licj-btn.png',
  });
  const { width, height, bgImg, showGoods, closeImg } = toRefs(stage);

  const luckyRef = ref();

  const prizeImg = {
    src: 'https://unpkg.com/buuing@0.0.1/demo/prize.png',
    width: '100%',
    height: '100%',
    // top: '25%',
  };

  const blocks = [
    // { padding: '5px', background: 'yellow' },
    // { padding: '10px', background: 'blue' },
    // { padding: '10px', background: 'gray' },
  ];
  const prizes = [
    { x: 0, y: 0, borderRadius: '0px', imgs: [prizeImg] },
    { x: 1, y: 0, borderRadius: '0px', imgs: [prizeImg] },
    { x: 2, y: 0, borderRadius: '0px', imgs: [prizeImg] },
    { x: 2, y: 1, borderRadius: '0px', imgs: [prizeImg] },
    { x: 2, y: 2, borderRadius: '0px', imgs: [prizeImg] },
    { x: 1, y: 2, borderRadius: '0px', imgs: [prizeImg] },
    { x: 0, y: 2, borderRadius: '0px', imgs: [prizeImg] },
    { x: 0, y: 1, borderRadius: '0px', imgs: [prizeImg] },
    //   { x: 0, y: 0, borderRadius: '0px', fonts: [{ text: '1', top: '10%' }] },
    //   { x: 1, y: 0, borderRadius: '0px', fonts: [{ text: '2', top: '10%' }] },
    //   { x: 2, y: 0, borderRadius: '0px', fonts: [{ text: '3', top: '10%' }] },
    //   { x: 2, y: 1, borderRadius: '0px', fonts: [{ text: '4', top: '10%' }] },
    //   { x: 2, y: 2, borderRadius: '0px', fonts: [{ text: '5', top: '10%' }] },
    //   { x: 1, y: 2, borderRadius: '0px', fonts: [{ text: '6', top: '10%' }] },
    //   { x: 0, y: 2, borderRadius: '0px', fonts: [{ text: '7', top: '10%' }] },
    //   { x: 0, y: 1, borderRadius: '0px', fonts: [{ text: '8', top: '10%' }] },
  ];
  const buttons = [
    {
      x: 1,
      y: 1,
      background: 'rgba(0,0,0,0)',
      imgs: [
        {
          src: imgs.licjBtnImg,
          width: '100%',
          height: '100%',
        },
      ],
    },
  ];
  const defaultStyle = {
    // background: 'red',
  };
  const defaultConfig = {
    gutter: 5,
    speed: 20,
    accelerationTime: 1500,
    decelerationTime: 1500,
  };

  function start() {
    console.log('start');
    console.log('luckyRef', { ...luckyRef.value });

    luckyRef.value.play();
    // // 使用定时器模拟接口
    setTimeout(() => {
      // 结束游戏, 并抽第0号奖品
      luckyRef.value.stop(4);
    }, 1000);
  }
  function end() {}

  function onLookGoods() {
    showGoods.value = true;
  }
</script>

<style lang="scss">
  .lottery {
    position: relative;
    width: 750px;
    height: 1612px;
    padding-top: 702px;
    background-repeat: no-repeat;
    background-size: 750px 1612px;

    &-rule {
      position: absolute;
      top: 294px;
      right: 0;
      width: 98px;
      height: 54px;
      background: #251c1a;
      border-radius: 200px 0px 0px 200px;
      opacity: 0.71;
      font-size: 24px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 54px;
    }
    &-jgg {
      display: flex;
      justify-content: center;
    }
  }

  .goods {
    &-popup {
      background: transparent;
      &-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &-header {
        display: flex;
        justify-content: flex-end;
        width: 750px;
        margin-bottom: 70px;
        padding-right: 44px;
      }
      &__close {
        width: 58px;
        height: 58px;
      }
      &-body {
        width: 600px;
        height: 996px;
        background: #ffffff;
        border-radius: 16px;
      }
    }
  }
</style>
