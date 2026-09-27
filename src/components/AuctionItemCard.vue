<script setup lang="ts">
import type { AuctionItem } from '@/types'

defineProps<{
  item: AuctionItem
}>()
</script>

<template>
  <div
    class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
  >
    <h2>{{ item.description }}</h2>
    <span>{{ item.type }}</span>
    <p>{{ item.bids.length }} bid(s)</p>
    <p v-if="item.successfulBid">Sold for ${{ item.successfulBid.amount }}</p>
    <p v-else>Not yet sold</p>
  </div>
</template>
