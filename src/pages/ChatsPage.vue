<template>
  <q-footer class="q-pa-sm">
    <q-input
      dense
      standout
      bg-color="white"
      rounded
      model-value="text"
      input-class="text-black"
      label="input"
    >
      <template v-slot:append>
        <q-icon
          name="send"
          @click="$emit('submit')"
          class="cursor-pointer"
          color="secondary"
        />
      </template>
    </q-input>
  </q-footer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

defineEmits(['submit']);

const route = useRoute();
console.log(/*LL*/ 9, 'route.params.id', route.params.id);
</script>
