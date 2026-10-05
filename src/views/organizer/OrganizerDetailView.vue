<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Organizer } from '@/types'
import OrganizerService from '@/services/OrganizerService'
import EventService from '@/services/EventService'

const props = defineProps<{ id: string }>()
const router = useRouter()

const organizer = ref<Organizer | null>(null)
const imageUrl = ref('')
const loading = ref(true)

onMounted(() => {
  OrganizerService.getOrganizer(Number(props.id))
    .then(async (response) => {
      organizer.value = response.data
      if (response.data.image) {
        try {
          const urls = await EventService.getEventImages([response.data.image])
          imageUrl.value = urls[0] ?? ''
        } catch {
          imageUrl.value = ''
        }
      }
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <p v-if="loading">Loading...</p>

  <div v-else-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <p>Organizer ID: {{ organizer.id }}</p>

    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="organizer image"
      class="mx-auto border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
    />
    <p v-else class="text-gray-500">No image</p>

    <div v-if="organizer.ownEvents && organizer.ownEvents.length > 0">
      <h3>Events by this organizer</h3>
      <ul>
        <li v-for="event in organizer.ownEvents" :key="event.id">
          <RouterLink :to="{ name: 'event-detail-view', params: { id: event.id } }">
            {{ event.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
