<template>
  <div class="masonryImage">
    <div v-masonry  transition-duration="0.3s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="(item, index) in blocks">
        <img :src="item" alt="">
      </div>
    </div>
  </div>
</template>
<script setup>
const blocks = [
  "https://drawertool.oss-cn-beijing.aliyuncs.com/07363dac-15d4-4e41-921a-bce3a0666725.jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/07a36d3693c83810ad2422f4444aaae7.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/08e6b37117230d9d7cf3f12b2b2f35f4.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/0c408d415652b72c04f66a17188e0691.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/198bf7146753be9d872652341c8ae922.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/20230327-123736.jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/20230327-124830.jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/20230327-130723.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/212f078f737939b1473d4b3808f52f99.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/31cf572bdb080c55ed69b8fdfcaa3605.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/355051a4d3f505318e78f6f2fefacb0e.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/4803d17edb4dfb72909ab93d9bd6d9f8.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/488462f3c1575ef2bcdcfc29f712993b.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/54c09af4a7925cb6f61d89e584c3c3bd.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/5ef644549513db3a1c4c2d4398ccfac4.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/61b49998055458bd9200905973c237bf.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/717af71ff3f2238e50ca225979eac615.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_Large-scale_building_design_Eco-friendly_materials_smart_t_5ccc6e98-ac8a-4c8e-ac9c-733f8eff32fb.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_None_1fcb64a3-b6a7-4b9b-bc27-3423e341d5b4.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_designfashion4k_56f0e5cc-993e-44c7-a88f-24613a7e9cdf.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_designfashion4k_913998df-1707-4d61-97f4-eca82d2c2740.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_fashion_interior_design4k_de6a5a78-cb7b-4129-a8ae-3552abe9dd3f.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_future_city_99c3a20f-5d2d-4329-9e8b-c2dca9a3272d.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/7_future_city_e0cd88b1-b08c-4c4e-a641-7dfd023a1695.png",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/82a8b3a6ddb22e6498ef58af0d79d16e.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/8fecabc7b5d1f2b0f19e2916a18d910c.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/92253c8f4019795be266b47702471e33.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/9cb7e7f37518e3f6bb76a3eb608df543.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/9dfbef4cb79ea63cdce87dcc8480d9ad.jpg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/Anime%20Aesthetic%20Hd%20Wallpapers.jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/Creative%20Beauty'15%20(1).jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/Less%20Words%20-%20Elizabeth%20Olipenko%20%5B905x1280%5D.jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/Untitled.jpeg",
  "https://drawertool.oss-cn-beijing.aliyuncs.com/WechatIMG210.png",
]
</script>
<style lang="scss" scoped>
div.masonryImage {
  img {
    width: 224px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
}
</style>
