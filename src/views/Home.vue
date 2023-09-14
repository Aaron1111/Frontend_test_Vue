<template>
  <!-- <v-card> -->
  <v-layout>
    <v-navigation-drawer :width="405" image="../assets/FlatDesign.png" permanent theme="dark"></v-navigation-drawer>
    <v-main style="border: none;">
      <v-container fluid>
        <div class="banner-text">
          <h1 style="color: #2E74B2;">
            LOGIN DULU ABANGKUH!
          </h1>
          <h1 style="color: #FD5725;">
            RESPECT ABANGKUH!
          </h1>
        </div>
        <div class="form">
          <!-- <v-row> -->
          <!-- <v-col> -->
          <!-- <v-layout justify-center align-center> -->
          <v-card width="50%" class="align-center justify-center" flat>
            <v-form fast-fail @submit.prevent="login()" v-model="isFormValid">
              <v-container>
                <v-row style="margin-bottom: 10px;">
                  <!-- <v-col cols="12" md="4"> -->
                  <v-text-field append-inner-icon="mdi-email" variant="outlined" v-model="email" :rules="emailRules" label="Alamat Email"
                    required></v-text-field>
                  <!-- </v-col> -->
                </v-row>
                <v-row style="margin-bottom: 10px;">
                  <v-text-field variant="outlined" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-2"
                    label="Kata Sandi" hint="Minimal 8 Karakter" v-model="password"
                    @click:append-inner="show = !show"></v-text-field>
                </v-row>
                <v-row>
                  <v-btn :disabled="!isFormValid" type="submit" :height="50" block rounded color="#2E74B2">Masuk</v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-layout>

  <!-- </v-card> -->
</template>

<script>
import router from '@/router'
import axios from 'axios'
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from 'pinia'

export default {
  data: () => ({
    isFormValid: false,
    show: false,
    valid: false,
    email: '',
    password: '',
    nameRules: [
      value => {
        if (value) return true

        return 'Name is required.'
      },
      value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      },
    ],
    email: '',
    rules: {
      required: value => !!value || 'Harus diisi.',
      min: v => v.length >= 8 || 'Minimal 8 karakter',
      emailMatch: () => (`The email and password you entered don't match`),
    },
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail harus diisi'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail tidak valid.'
      },
    ],
  }),
  mounted() {

  },
  methods: {
    async login() {
      let email = this.email
      let password = this.password
      console.log("username: ", email)
      console.log("password: ", password)
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      password = hashHex
      const store = useAuthStore()
      if (this.isFormValid) {
        axios.post('https://api-test.bullionecosystem.com/api/v1/auth/login', {
          email: email,
          password: password
        })
          .then(function (response) {
            console.log(response.data.data.token);
            router.push('/dashboard')
            store.saveToken(response.data.data.token)
          })
          .catch(function (error) {
            console.log(error);
            alert("email atau kata sandi salah")
          });
      }
    }
  }
}
</script>

<style>
h1 {
  text-align: center;
}

.banner-text {
  margin-top: 15vh;
}

.form {
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: auto; */

}

.login-input.v-input .v-input__slot {
  border-radius: 20px;
}
</style>
