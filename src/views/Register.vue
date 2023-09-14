<template>
  <!-- <v-card> -->
  <v-layout>
    <v-navigation-drawer :width="405" image="../assets/FlatDesign2.png" permanent theme="dark"></v-navigation-drawer>
    <v-main style="border: none;">
      <v-container fluid>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ snackbarText }}
        </v-snackbar>
        <div class="form">
          <v-card width="100%" class="align-center justify-center" flat>
            <v-form fast-fail @submit.prevent="register()" v-model="isFormValid">
              <v-container>
                <v-row>
                  <v-col>
                    <div class="form-label">First name</div>
                    <v-text-field density="compact" variant="outlined" v-model="firstname" :rules="[rules.required]"
                      label="" required></v-text-field>
                  </v-col>
                  <v-col>
                    <div class="form-label">Last name</div>
                    <v-text-field density="compact" variant="outlined" v-model="lastname" :rules="[rules.required]"
                      label="" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Gender</div>
                    <v-radio-group inline v-model="gender" required :rules="[rules.required]">
                      <v-radio label="Male" value="male"></v-radio>
                      <v-radio label="Female" value="female"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Date of Birth</div>
                    <v-col>
                      <v-row justify="center">
                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                          transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ props }">
                            <v-text-field v-model="isoDate" label="" append-inner-icon="mdi-calendar" readonly
                              v-bind="props"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" width="200" @click:cancel="menu2 = false"
                            @click:save="menu2 = false"></v-date-picker>
                        </v-menu>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Email Address</div>
                    <v-text-field density="compact" variant="outlined" :rules="emailRules" v-model="email" :counter="10"
                      label="" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Phone Number</div>
                    <v-text-field density="compact" variant="outlined" :rules="phoneRules" v-model="phone" label=""
                      required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Address</div>
                    <v-textarea :rules="[rules.required]" multi-line height="300px" variant="outlined" v-model="address"
                      label="" required></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Photo profile</div>
                    <v-file-input show-size :rules="[rules.required, rules.photos]" v-model="photo" prepend-icon=""
                      accept="image/png, image/jpeg, image/bmp" label="Choose File (png, jpeg, bmp)"
                      variant="solo-filled"></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Password</div>
                    <v-text-field density="compact" variant="outlined"
                      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'" name="input-10-2" label="" hint="Minimal 8 Karakter"
                      v-model="password" @click:append-inner="show = !show"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Confirm Password</div>
                    <v-text-field density="compact" variant="outlined"
                      :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min, passwordConfirmationRule]" :type="show2 ? 'text' : 'password'"
                      name="input-10-1" label="" hint="Minimal 8 Karakter" v-model="password2"
                      @click:append-inner="show2 = !show2"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn :disabled="!isFormValid" type="submit" :height="50" block rounded color="#2E74B2">Add
                    Users</v-btn>
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
import axios from 'axios'
import router from '@/router'

export default {
  data: () => ({
    snackbar: false,
    timeout: 2000,
    snackbarText: "erro",
    isFormValid: false,
    show: false,
    show2: false,
    valid: false,
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    photo: [],
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)),
    menu: false,
    modal: false,
    menu2: false,
    password2: '',
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
      photos: v => v.length > 0 || 'Photo required'
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
    phoneRules: [
      value => {
        if (value) return true

        return 'Nomor telepon harus diisi'
      },
      value => {
        if (/^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/.test(value)) return true

        return 'Nomor telepon tidak valid.'
      },
    ],
  }),
  methods: {
    // saveDate(date) {
    //   this.menu2 = false
    //   console.log("save date: ", date)
    // }

    async register() {
      console.log("registering")
      console.log("firstname: ", this.firstname)
      console.log("lastname: ", this.lastname)
      console.log("gender: ", this.gender)
      console.log("date of birth: ", this.date)
      console.log("email: ", this.email)
      console.log("phone: ", this.phone)
      console.log("address: ", this.address)
      console.log("photo: ", this.photo[0])
      console.log("password: ", this.password)
      console.log("password2: ", this.password2)
      const encoder = new TextEncoder();
      const data = encoder.encode(this.password);
      const hash = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      let hashed = hashHex
      if (this.isFormValid) {
        console.log("valid")
        axios.postForm('https://api-test.bullionecosystem.com/api/v1/auth/register', {
          first_name: this.firstname,
          last_name: this.lastname,
          gender: this.gender,
          date_of_birth: this.date,
          email: this.email,
          phone: this.phone,
          address: this.address,
          photo: this.photo[0],
          password: hashed
        }).then(function (response) {
          console.log(response)
          router.push('/')
        })
          .catch(function (error) {
            console.log(error.response.data.err_message);
            alert(error.response.data.err_message)
          });
      }
    }
  },
  computed: {
    isoDate() {
      console.log("computed: ", this.date)
      return new Date(this.date - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    },

    passwordConfirmationRule() {
      return () => (this.password2 === this.password) || 'Kata sandi harus sama'
    }
  }
}
</script>

<style>
h1 {
  text-align: center;
}

.v-date-picker-header {
  display: none
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

.form-label {
  color: #2E74B2;
}
</style>
