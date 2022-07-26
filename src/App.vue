<template>
  <Suspense>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta && route.meta.keepAlive" :key="route.meta.usePathKey ? route.fullPath : undefined" />
        </keep-alive>
        <component :is="Component" v-if="!(route.meta && route.meta.keepAlive)" :key="route.meta.usePathKey ? route.fullPath : undefined" />
      </router-view>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
<script setup>
  // if (!platform) {
  //   commonStore.setPlatform('547_WX_7fbd813ef6762e0e813f39a2c653236d');
  // }

  // const xxx = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect`;
  // const xxx = 'http://192.168.0.103:3000/#/lottery?CODE=1111';

  // window.location.href = xxx;
</script>
