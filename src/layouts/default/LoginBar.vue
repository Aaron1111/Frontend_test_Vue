<template>
  <V-app-bar>
    <v-row>
      <v-col class="d-flex align-left" cols="12" sm="2">
        <v-img :height=30 src="../../assets/logoBEI.png"></v-img>
      </v-col>
      <v-col class="d-flex align-left" cols="12" sm="8">
      </v-col>
      <v-col class="d-flex align-right" cols="12" sm="1">
        <v-btn color="blue" exact-path href="/Dashboard">List of Users</v-btn>
      </v-col>
      <v-col class="d-flex align-right" cols="12" sm="1">
        <v-btn @click="store.deleteToken()" color="red" href="/">Log out</v-btn>
      </v-col>
    </v-row>
  </V-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const store = useAuthStore()
// call the action as a method of the store
// store.deleteToken()
</script>
