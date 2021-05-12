<template>
  <div class="guess-you-like">
    <el-card class="like-card">
      <div class="like-goods-title">
        <img src="../../../static/image/home/guess-you-like.png" alt="" />
      </div>
      <div class="like-goods-main">
        <div class="goods-list">
          <xmf-goods-item
            :goods="goods"
            v-for="goods in goodsList"
            :key="goods.id"
          ></xmf-goods-item>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import xmfGoodsItem from '../goods/goods'
export default {
  data () {
    return {
      goodsList: [
        {
          id: 1,
          img:
            'https://res.vmallres.com/pimages//product/6941487203307/428_428_FE364E05A0D86CE39BE00E1EE1D18350AA8E982DFAFFC0A2mp.png',
          title: 'HUAWEI nova 7 Pro 5G',
          describe: '这是商品描述',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3001.00'
        },
        {
          id: 2,
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          id: 3,
          img:
            'https://res.vmallres.com/pimages//product/6901443415861/428_428_0BA14C7E638AD4B322D55B3106389B9E0986553156115F92mp.png',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          id: 4,
          img:
            'https://res.vmallres.com/pimages//product/6941487222551/428_428_084225B8F3BD10E711B7C93693A3600E1B87BAB5D6FD0DE4mp.png',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          id: 5,
          img:
            'https://res.vmallres.com/pimages//product/6901443353347/428_428_484D42DB83550E7CF59813E6BE3E2A9A4CF07CF0E75E32A3mp.png',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        },
        {
          img:
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6306bf6d8aede9f6f48d8e4d9256db2.jpg?thumb=1&w=200&h=200&f=webp&q=90',
          title: '小米真无线蓝牙耳机Air 2s',
          describe: '全面升级，智慧真无线',
          price: '3001.00',
          discountPrice: '3001.00',
          originalPrice: '3002.00'
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {},
  components: {
    xmfGoodsItem
  }
}
</script>

<style lang="less">
.guess-you-like {
  width: 100%;

  .like-card {
    margin: 0 50px;

    .like-goods-title {
      margin-bottom: 10px;

      img {
        width: 180px;
      }
    }
  }
}
</style>
