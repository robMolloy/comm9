<template>
  <div>
    <q-card v-if="!currentUser.isLoggedIn">
      <q-tabs v-model="tabName">
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Signup" />
      </q-tabs>

      <q-tab-panels v-model="tabName" animated>
        <q-tab-panel name="login">
          <UserLogin />
        </q-tab-panel>
        <q-tab-panel name="signup">
          <UserSignup />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div v-if="currentUser.isLoggedIn">
      <q-list>
        <template v-if="users.length !== 0">
          <ChatSidebarItem
            v-for="(user, j) in users"
            :avatar-url="user.avatarUrl ?? 'no info'"
            :label="user.username ?? 'no info'"
            recent-message="no message yet"
            :key="j"
          />
        </template>
        <template v-if="users.length === 0">
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
          <ChatSidebarItemSkeleton />
        </template>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatSidebarItem } from 'src/modules';
import ChatSidebarItemSkeleton from 'src/modules/chatSidebar/components/ChatSidebarItemSkeleton.vue';
import {
  UserLogin,
  UserSignup,
  createPocketBaseDb,
  useCurrentPocketBaseUser,
} from 'src/modules/useVuePocketbaseAuth';
import { pocketBaseUsersModelSchema } from 'src/modules/useVuePocketbaseAuth/schemas/pocketBaseUserModelSchemas';
import { onMounted, ref } from 'vue';
import { z } from 'zod';

const currentUser = useCurrentPocketBaseUser();
const tabName = ref('login');

const db = createPocketBaseDb();
const users = ref<z.infer<typeof pocketBaseUsersModelSchema>>([]);

onMounted(async () => {
  const newUsers = await db.collection('users').getList(1, 50);
  const response = pocketBaseUsersModelSchema.safeParse(newUsers.items);
  if (response.success) users.value = response.data;
});
</script>
