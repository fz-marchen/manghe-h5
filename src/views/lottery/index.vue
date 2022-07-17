<template>
  <div
    class="lottery"
    :style="{
      'background-image': `url(${bgImg})`,
    }"
  >
    <img class="lottery-title" :src="titleImg" />
    <div
      class="lottery-jgg"
      :style="{
        'background-image': `url(${licjBgImg})`,
      }"
    >
      <!-- 大转盘抽奖简易demo -->
      <div class="lottery-jgg-body">
        <!-- <div id="my-lucky" class="prize-top"> </div> -->
        <!-- <div>{{ deatil.winTitle }}</div> -->
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
      <div class="lottery-jgg-footer">
        <img @click="launchGoodsListPopup" class="lottery-jgg__look" :src="licjLookImg" alt="" srcset="" />
      </div>
    </div>

    <div class="lottery-rule"> 规则 </div>
    <van-popup v-model:show="showGoodsList" class="goods-list-popup">
      <div class="goods-list-popup-container">
        <div class="goods-list-popup-header">
          <img class="goods-list-popup__close" @click="closeGoodsListPopup" :src="closeImg" alt="" srcset="" />
        </div>
        <div class="goods-list-popup-body">
          <div class="goods-list-popup__title">全部商品</div>
          <div class="goods-list-popup-list">
            <div class="goods-list-popup-item" v-for="item of goodsList" :key="item.productId">
              <div class="goods-list-popup-item-left">
                <img class="goods-list-popup-item__img" :src="item.thumbnailImgUrl" alt="" srcset="" />
              </div>
              <div class="goods-list-popup-item-right">
                <div class="goods-list-popup-item__title">{{ item.productName }}</div>
                <div class="goods-list-popup-item-price">
                  <div class="goods-list-popup-item-price__l">￥</div>
                  <div class="goods-list-popup-item-price__r">{{ item.salePrice }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="showGoods" class="goods-popup">
      <div
        class="goods-popup-container"
        :style="{
          'background-image': `url(${goodPopupImg})`,
        }"
      >
        <div class="goods-popup__txt">~ 恭喜获得 ~ </div>
        <div class="goods-popup__title">兰蔻肌底精华焕亮眼霜</div>

        <div class="goods-popup__agrin">再来一次</div>
        <div class="goods-popup__th">马上提货</div>
      </div>
    </van-popup>

    <van-popup position="bottom" v-model:show="showOrder" class="order-popup">
      <div class="order-popup-container">
        <div class="order-popup__title">新人开盒</div>
        <div class="order-popup-price">
          <div class="order-popup-price__l">￥</div>
          <div class="order-popup-price__r">39.90</div>
        </div>

        <div class="order-popup__zffs">支付方式</div>

        <div class="order-popup-list">
          <div class="order-popup-item">
            <div class="order-popup-item__l"> 111</div>
            <div class="order-popup-item__m"> 微信支付</div>
            <div class="order-popup-item-r"> 222</div>
          </div>
          <div class="order-popup-item">
            <div class="order-popup-item__l"> 111</div>
            <div class="order-popup-item__m"> 支付宝支付</div>
            <div class="order-popup-item-r"> 222</div>
          </div>
        </div>
        <div class="order-popup__line"></div>
        <div class="order-popup__btn" @click="buy">立即付款</div>
      </div>
    </van-popup>

    <van-popup v-model:show="showPrize" class="prize-popup">
      <div
        class="prize-popup-container"
        :style="{
          'background-image': `url(${prizePopupImg})`,
        }"
      >
        <div class="prize-popup__countime">打击时</div>

        <div class="prize-popup-cell">
          <input class="prize-popup-cell__input" v-model="mobile" type="text" placeholder="请输入正确的手机号码" />
        </div>
        <div class="prize-popup__tip">*注意：手机号填错可能导致订单无法发货</div>
        <div class="prize-popup__price">新人开盒价：￥{{ salePrice }}</div>

        <div class="prize-popup-btn">
          <img @click="loginBytel" class="prize-popup-btn__gif" :src="btnGImg" alt="" srcset="" />
          <img class="prize-popup-btn__tag" :src="tagImg" alt="" srcset="" />
        </div>

        <div class="prize-popup-footer">
          <div>11111</div>
          <div class="prize-popup-footer__service">已阅读并同意《用户隐私协议》</div>
        </div>
      </div>
    </van-popup>

    <div @click="launchGoodsPopup">打开商品</div>
    <div @click="launchOrderPopup">打开order</div>
    <div @click="launchPrizePopup">打开prize</div>

    <div></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs, onMounted } from 'vue';
  import { mhImg } from '/@/common/utils/oss';
  import * as lottery from '/@/api/lottery';
  import { useRoute } from 'vue-router';
  import { useCommonStore } from '/@/store/modules/common';
  const commonStore = useCommonStore();
  const route = useRoute();
  const sacle = document.body.clientWidth / 375;
  const stage = reactive({
    width: 300 * sacle,
    height: 300 * sacle,
    ...mhImg({
      bgImg: 'h5/lottery/bg.jpg',
      titleImg: 'h5/lottery/title.png',
      tagImg: 'h5/lottery/tag.png',

      btnGImg: 'h5/lottery/btn-g.gif',
      licjBgImg: 'h5/lottery/licj-bg.png',
      goodPopupImg: 'h5/lottery/good-popup.png',
      licjLookImg: 'h5/lottery/licj-look.png',
      prizePopupImg: 'h5/lottery/prize-popup.png',
      closeImg: 'miniprogram/common/close.png',
    }),
    showGoodsList: false,
    showGoods: false,
    showOrder: false,
    showPrize: false,
    goodsList: [],
    salePrice: '',
    deatil: {},
    prizes: [],
    mobile: '',
    mangheId: '',
  });
  const imgs: any = mhImg({
    licjBtnImg: 'h5/lottery/licj-btn.png',
  });

  let {
    width,
    height,
    showGoodsList,
    showGoods,
    goodsList,
    showOrder,
    showPrize,
    mangheId,
    mobile,
    deatil,
    salePrice,
    prizes,
    prizePopupImg,
    goodPopupImg,
    licjBgImg,
    bgImg,
    closeImg,
    licjLookImg,
    titleImg,
    tagImg,
    btnGImg,
  } = toRefs(stage);

  onMounted(async () => {
    const { platform } = route.query;
    commonStore.setPlatform(platform + '');

    lottery.productList({}).then((res) => {
      const mangheDtlBean = res.data.value.mangheDtlBean;
      console.log('mangheDtlBean', mangheDtlBean);
      const productList = mangheDtlBean.productList;
      console.log('productList[0].thumbnailImgUrl', productList[0].thumbnailImgUrl);
      salePrice.value = mangheDtlBean.salePrice;
      mangheId.value = mangheDtlBean.mangheId;
      prizes.value = [
        {
          x: 0,
          y: 0,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[0].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              top: '2%',
              left: '2%',

              // top: '25%',
            },
          ],
        },
        {
          x: 1,
          y: 0,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[1].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
        {
          x: 2,
          y: 0,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[2].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
        {
          x: 2,
          y: 1,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[3].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
        {
          x: 2,
          y: 2,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[4].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
        {
          x: 1,
          y: 2,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[5].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
        {
          x: 0,
          y: 2,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[6].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
        {
          x: 0,
          y: 1,
          borderRadius: '0px',
          imgs: [
            {
              src: productList[7].thumbnailImgUrl,
              width: '96%',
              height: '96%',
              // top: '25%',
              top: '2%',
              left: '2%',
            },
          ],
        },
      ];
    });

    getAllGoods();
  });

  const luckyRef = ref();

  const blocks = [
    // { padding: '5px', background: 'yellow' },
    // { padding: '10px', background: 'blue' },
    // { padding: '10px', background: 'gray' },
  ];

  function getAllGoods() {
    lottery.allProductList({}).then((res) => {
      goodsList.value = res.data;
    });
  }

  const buttons = [
    {
      x: 1,
      y: 1,
      // background: 'rgba(0,0,0,0)',
      imgs: [
        {
          src: imgs.licjBtnImg,
          width: '96%',
          height: '96%',
          top: '2%',
          left: '2%',
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
      luckyRef.value.stop(0);
    }, 1000);
  }
  function end() {
    console.log('end');
    launchPrizePopup();
  }

  function launchGoodsListPopup() {
    showGoodsList.value = true;
  }
  function closeGoodsListPopup() {
    showGoodsList.value = false;
  }

  function launchOrderPopup() {
    lottery
      .openBlindBoxToPay({
        mangheId: mangheId.value,
      })
      .then((res) => {
        showOrder.value = true;
      });
  }
  function launchPrizePopup() {
    showPrize.value = true;
  }

  function loginBytel() {
    lottery
      .addH5User({
        mobile: mobile.value,
      })
      .then((res) => {
        launchOrderPopup();
        // commonStore.setUser(res);
      });
  }

  function launchGoodsPopup() {
    showGoods.value = true;
  }

  function buy() {
    launchGoodsPopup();
  }
</script>

<style lang="scss">
  .lottery {
    position: relative;
    width: 750px;
    height: 1612px;
    padding-top: 94px;
    background-repeat: no-repeat;
    background-size: 750px 1612px;

    &-title {
      display: block;
      width: 646px;
      height: 227px;
      margin: 0 auto 20px;
    }
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
      width: 734px;
      height: 1104px;
      padding-top: 380px;
      background-repeat: no-repeat;
      background-size: 734px 1104px;
      &-body {
        display: flex;
        justify-content: center;
        margin-bottom: 36px;
      }
      &-footer {
        display: block;
        width: 264px;
        height: 63px;
        margin: 0 auto;
      }
      &__look {
        display: block;
        width: 264px;
        height: 63px;
      }
    }
  }
  .goods {
    &-popup {
      width: 690px;
      height: 940px;
      background-color: transparent;
      &-container {
        position: relative;
        width: 690px;
        height: 940px;
        padding-top: 316px;
        background-repeat: no-repeat;
        background-size: 690px 940px;
      }

      &__txt {
        font-size: 32px;
        font-family: AlibabaPuHuiTi_2_75_SemiBold;
        color: #8640f6;
        line-height: 40px;
        text-align: center;
      }

      &__title {
        margin-bottom: 328px;
        font-size: 32px;
        font-family: AlibabaPuHuiTi_2_75_SemiBold;
        color: #8640f6;
        line-height: 40px;
        text-align: center;
      }
      &__agrin {
        height: 40px;
        margin-bottom: 20px;
        font-size: 32px;
        font-family: AlibabaPuHuiTi_2_55_Regular;
        color: #8640f6;
        line-height: 40px;
        text-align: center;
      }
      &__th {
        width: 456px;
        height: 84px;
        margin: 0 auto;
        background: linear-gradient(90deg, #6d43ff 0%, #e23ffe 100%);
        box-shadow: 0px 8px 14px 0px rgba(223, 106, 252, 0.21);
        border-radius: 60px;
        font-size: 44px;
        font-family: AlibabaPuHuiTi_2_85_Bold;
        color: #ffffff;
        line-height: 84px;
        text-align: center;
      }
    }
  }
  .goods-list {
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
        padding-top: 38px;
        background: #ffffff;
        border-radius: 16px;
        overflow-y: auto;
      }

      &__title {
        height: 44px;
        margin-bottom: 34px;
        font-size: 32px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #000000;
        line-height: 44px;
        text-align: center;
      }
      &-list {
        padding: 0 21px;
      }

      &-item {
        display: flex;
        // align-items: center;
        width: 558px;
        padding: 12px;
        margin-bottom: 20px;
        background: #f6f2ff;
        border-radius: 16px;
        &-left {
          width: 132px;
          height: 132px;
          margin-right: 22px;
        }
        &__img {
          width: 132px;
          height: 132px;
        }
        &-right {
          flex: 1;
          padding-top: 6px;
        }
        &__title {
          margin-bottom: 10px;
          font-size: 26px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: #000000;
          line-height: 36px;
        }
        &-price {
          display: flex;
          align-items: baseline;
          &__l {
            font-size: 20px;
            font-family: PingFang-SC-Regular, PingFang-SC;
            font-weight: 400;
            color: #ff0008;
            line-height: 32px;
          }
          &__r {
            font-size: 26px;
            font-family: PingFang-SC-Regular, PingFang-SC;
            font-weight: 400;
            color: #ff0008;
            line-height: 32px;
          }
        }
      }
    }
  }

  .order-popup {
    width: 750px;
    height: 1000px;

    //     width: 750px;
    // height: 1000px;
    // background: #FFFFFF;
    border-radius: 24px 24px 0px 0px;
    // background-color: transparent;
    &-container {
      position: relative;
      width: 750px;
      height: 1000px;
      padding-top: 72px;
    }

    &__title {
      margin-bottom: 48px;
      padding-left: 44px;
    }
    &-price {
      display: flex;
      justify-content: center;
      align-items: baseline;
      height: 118px;
      margin-bottom: 94px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      text-align: center;
      &__l {
        font-size: 52px;
      }
      &__r {
        font-size: 84px;
      }
    }

    &__zffs {
      height: 44px;
      margin-bottom: 48px;
      padding-left: 54px;
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 44px;
    }

    &-list {
      padding-left: 54px;
      padding-right: 54px;
      padding-bottom: 16px;
    }
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 52px;
      &__l {
        width: 48px;
        height: 48px;
        margin-right: 16px;
        background: #d8d8d8;
      }
      &__m {
        flex: 1;
        height: 40px;
        font-size: 28px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #000000;
        line-height: 40px;
      }
      &-r {
      }
    }

    &__line {
      width: 686px;
      height: 2px;
      margin: 0 auto 82px;
      background: #e5e5e5;
    }

    &__btn {
      width: 456px;
      height: 84px;
      margin: 0 auto;
      background: linear-gradient(90deg, #6d43ff 0%, #e23ffe 100%);
      box-shadow: 0px 8px 14px 0px rgba(223, 106, 252, 0.21);
      border-radius: 60px;

      font-size: 44px;
      font-family: AlibabaPuHuiTi_2_85_Bold;
      color: #ffffff;
      line-height: 84px;
      text-align: center;
    }
  }

  .prize-popup {
    // width: 750px;
    background-color: transparent;
    &-container {
      position: relative;
      width: 690px;
      height: 1287px;

      padding-top: 36px;
      background-repeat: no-repeat;
      background-size: 690px 1287px;
    }

    &__countime {
      width: 554px;
      height: 78px;
      margin: 0 auto 748px;
      background: rgba(54, 24, 130, 0.85);
      border-radius: 40px;
      border: 2px solid #a23afe;
    }

    &-cell {
      width: 442px;
      height: 70px;
      margin: 0 auto 14px;
      &__input {
        width: 442px;
        height: 70px;
        background: rgba(95, 121, 253, 0.19);
        border-radius: 36px;
        border: 2px solid rgba(147, 75, 209, 0.3);
      }
    }

    &__tip {
      height: 28px;
      margin-bottom: 52px;
      font-size: 20px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: #1b0d2c;
      line-height: 28px;
      text-align: center;
    }
    &__price {
      height: 44px;
      margin-bottom: 14px;
      font-size: 32px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 44px;
      text-align: center;
    }

    &-btn {
      position: relative;
      width: 440px;
      height: 91px;
      margin: 0 auto 10px;
      &__gif {
        width: 440px;
        height: 91px;
      }
      &__tag {
        position: absolute;
        right: -62px;
        top: -80px;
        width: 102px;
        height: 74px;
      }
    }

    &-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      &__service {
        height: 28px;
        font-size: 20px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 28px;
      }
    }
  }
</style>
