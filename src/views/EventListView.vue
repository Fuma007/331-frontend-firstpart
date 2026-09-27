<script setup lang="ts">
import EventService from '@/services/EventService'
import EventCard from '@/components/EventCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const perPage = 3
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage)
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
    queryFunction = EventService.getEvents(perPage, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, perPage, page.value)
  }
  queryFunction
    .then((response) => {
      events.value = response.data
      console.log('events', events.value)
      totalEvents.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvents.value)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}

onMounted(() => {
  events.value = null
  watchEffect(() => {
    updateKeyword()
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>

    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
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
