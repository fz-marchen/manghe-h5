<template
  ><!-- 大转盘抽奖简易demo -->
  <div class="lottery">
    <div class="lottery-jgg">
      <lucky-grid width="200px" height="200px" :blocks="blocks" :prizes="prizes" :buttons="buttons" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { setLang } from '/@/i18n';

  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const { name = '' } = userStore.getUserInfo || {};
    return name;
  });
  const changeLang = (type) => {
    setLang(type);
  };

  const blocks = [
    { padding: '10px', background: '#869cfa' },
    { padding: '10px', background: '#e9e8fe' },
  ];
  const prizes = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 1, y: 2 },
    { x: 0, y: 2 },
    { x: 0, y: 1 },
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

  // function start function () {
  //     // 开始游戏
  //     myLucky.play()
  //     // 使用定时器模拟接口
  //     setTimeout(() => {
  //       // 结束游戏, 并抽第0号奖品
  //       myLucky.stop(0)
  //     }, 3000)
  //   }
</script>
<style lang="scss">
  .lottery {
    padding-top: 702px;
    &-jgg {
      display: flex;
      justify-content: center;
    }
  }
</style>
