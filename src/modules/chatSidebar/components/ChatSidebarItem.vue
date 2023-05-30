<template>
  <q-item
    clickable
    v-ripple
    @click="handleClick"
    :active="props.active"
    active-class="bg-blue-grey-3"
  >
    <q-item-section avatar>
      <q-avatar size="xl">
        <img :src="props.avatarUrl" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ props.label }}
      </q-item-label>
      <q-item-label caption>
        {{ props.recentMessage }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = defineProps<{
  active?: boolean;
  avatarUrl: string;
  label: string;
  recentMessage: string;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => emit('click');
</script>

<style lang="sass">
.active-item
  background: #DDDDDD
</style>
