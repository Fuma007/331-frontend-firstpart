<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Organizer } from '@/types'
import OrganizerService from '@/services/OrganizerService'

const router = useRouter()
const organizers = ref<Organizer[]>([])

onMounted(() => {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
</script>

<template>
  <h1>Organizers</h1>
  <p v-if="organizers.length === 0" class="text-gray-500">No organizers yet</p>
  <ul>
    <li v-for="organizer in organizers" :key="organizer.id ?? organizer.name" class="my-2">
      <RouterLink
        class="font-bold text-gray-700 hover:text-green-500"
        :to="{ name: 'organizer-detail-view', params: { id: organizer.id } }"
      >
        {{ organizer.name }}
      </RouterLink>
    </li>
  </ul>
</template>
