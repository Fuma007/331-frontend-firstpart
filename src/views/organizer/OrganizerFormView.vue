<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref, watch } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue' // ADDED

const organizer = ref<Organizer>({
  id: null,
  organizerName: '',
  address: '',
  image: '',
})

// ADDED: the uploader works with an array, but the organizer keeps only 1 image
const images = ref<string[]>([])
watch(images, (newImages) => {
  if (newImages.length > 1) {
    // only 1 image allowed: keep the most recent one
    images.value = newImages.slice(-1)
    return
  }
  organizer.value.image = newImages[0] ?? ''
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      router.push({ name: 'event-list-view' })
      store.updateMessage(
        'You are successfully add a new organizer: ' + response.data.organizationName,
      )
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label class="block text-gray-500 font-bold">Organization name</label>
      <input
        v-model="organizer.organizerName"
        type="text"
        placeholder="Organization name"
        class="h-13 w-1/4 px-2.5 text-xl border border-gray-400 focus:outline-none mb-6"
      />

      <label class="block text-gray-500 font-bold">Address</label>
      <input
        v-model="organizer.address"
        type="text"
        placeholder="Address"
        class="h-13 w-1/4 px-2.5 text-xl border border-gray-400 focus:outline-none mb-6"
      />

      <!-- ADDED -->
      <h3>The image of the Organizer</h3>
      <ImageUpload v-model="images" />

      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold border border-gray-400 hover:scale-105 hover:shadow-lg active:scale-100 focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>

    <pre>{{ organizer }}</pre>
  </div>
</template>
