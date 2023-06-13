<template>
  <q-page padding
    >Profiles {{ $route.params.id }}
    <div>
      {{ tabs }}
      <q-tabs modelValue="/mails" narrow-indicator dense>
        <q-tab class="text-purple" name="mails" icon="mail" label="Mails" />
        <q-tab class="text-orange" name="alarms" icon="alarm" label="Alarms" />
        <q-tab class="text-teal" name="movies" icon="movie" label="Movies" />
      </q-tabs>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useRoute } from 'vue-router';

const tabs = ref('mails');

// const route = useRoute();
// console.log(/*LL*/ 9, 'route.params.id', route.params.id);
</script>
