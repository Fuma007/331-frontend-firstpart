<script setup lang="ts">
import AuctionItemService from '@/services/AuctionItemService'
import AuctionItemCard from '@/components/AuctionItemCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { AuctionItem } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref<AuctionItem[] | null>(null)
const totalItems = ref<number>(0)
const perPage = 3
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalItems.value / perPage)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})
const page = computed(() => props.page)
const keyword = ref('')

function updateKeyword() {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = AuctionItemService.getAuctionItems(perPage, page.value)
  } else {
    queryFunction = AuctionItemService.getAuctionItemsByKeyword(keyword.value, perPage, page.value)
  }
  queryFunction
    .then((response) => {
      items.value = response.data
      totalItems.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

onMounted(() => {
  items.value = null
  watchEffect(() => {
    updateKeyword()
  })
})
</script>

<template>
  <h1>Auction Items</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>

    <AuctionItemCard v-for="item in items" :key="item.id" :item="item" />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'auction-item-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'auction-item-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page</RouterLink
      >
    </div>
  </main>
</template>
<style scoped>
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
