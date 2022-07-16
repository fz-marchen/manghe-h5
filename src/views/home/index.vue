<template>
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

    <van-popup v-model:show="show">内容</van-popup>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  // import { computed } from 'vue';
  // import { useUserStore } from '/@/store/modules/user';
  // import { setLang } from '/@/i18n';

  // const userStore = useUserStore();
  // const getUserInfo = computed(() => {
  //   const { name = '' } = userStore.getUserInfo || {};
  //   return name;
  // });
  // const changeLang = (type) => {
  //   setLang(type);
  // };
  // import { LuckyWheel, LuckyGrid } from 'lucky-canvas';
  const luckyRef = ref();
  const show = ref(false);

  // const prizeImg = {
  //   src: 'https://unpkg.com/buuing@0.0.1/demo/prize.png',
  //   width: '100%',
  //   height: '100%',
  //   // top: '25%',
  // };
  const width = (375 * document.body.clientWidth) / 375;
  const height = (375 * document.body.clientWidth) / 375;
  const blocks = [
    // { padding: '10px', background: 'yellow' },
    // { padding: '10px', background: 'blue' },
    // { padding: '10px', background: 'gray' },
  ];
  const prizes = [
    // { x: 0, y: 0, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 1, y: 0, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 2, y: 0, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 2, y: 1, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 2, y: 2, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 1, y: 2, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 0, y: 2, borderRadius: '0px', imgs: [prizeImg] },
    // { x: 0, y: 1, borderRadius: '0px', imgs: [prizeImg] },
    { x: 0, y: 0, borderRadius: '0px', fonts: [{ text: '1', top: '10%' }] },
    { x: 1, y: 0, borderRadius: '0px', fonts: [{ text: '2', top: '10%' }] },
    { x: 2, y: 0, borderRadius: '0px', fonts: [{ text: '3', top: '10%' }] },
    { x: 2, y: 1, borderRadius: '0px', fonts: [{ text: '4', top: '10%' }] },
    { x: 2, y: 2, borderRadius: '0px', fonts: [{ text: '5', top: '10%' }] },
    { x: 1, y: 2, borderRadius: '0px', fonts: [{ text: '6', top: '10%' }] },
    { x: 0, y: 2, borderRadius: '0px', fonts: [{ text: '7', top: '10%' }] },
    { x: 0, y: 1, borderRadius: '0px', fonts: [{ text: '8', top: '10%' }] },
  ];
  const buttons = [
    {
      x: 1,
      y: 1,
      background: 'rgba(0,0,0,0)',
      imgs: [
        {
          src: 'https://unpkg.com/buuing@0.0.1/demo/grid-btn.png',
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
  function end() {
    show.value = true;
  }
</script>
<style lang="scss">
  .prize {
    width: 750px;
    background-color: red;
    &-top {
      width: 370px;
      height: 10px;
      background-color: yellow;
    }
  }
</style>
