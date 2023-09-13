<template>
  <V-app-bar>
    <v-row>
      <v-col class="d-flex align-left" cols="12" sm="2">
        <v-img :height=30 src="../../assets/logoBEI.png"></v-img>
      </v-col>
      <v-col class="d-flex align-left" cols="12" sm="8">
      </v-col>
      <v-col class="d-flex align-right" cols="12" sm="1">
        <v-btn exact-path href="/Register">Register</v-btn>
      </v-col>
      <v-col class="d-flex align-right" cols="12" sm="1">
        <v-btn href="/">Login</v-btn>
      </v-col>
    </v-row>
  </V-app-bar>
</template>

<script setup>
//
</script>
