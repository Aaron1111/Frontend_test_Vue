<template>
  <!-- <v-card> -->
  <v-layout>
    <v-navigation-drawer :width="405" image="../assets/FlatDesign2.png" permanent theme="dark"></v-navigation-drawer>
    <v-main style="border: none;">
      <v-container fluid>
        <div class="form">
          <v-card width="100%" class="align-center justify-center" flat>
            <v-form v-model="valid">
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
                    <v-text-field density="compact" variant="outlined" :rules="phoneRules" v-model="phone"
                      label="" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Address</div>
                    <v-textarea multi-line height="300px" variant="outlined" v-model="address" :counter="10" label=""
                      required hide-details></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Photo profile</div>
                    <v-file-input :rules="[rules.required]" v-model="photo" prepend-icon="" accept="image/png, image/jpeg, image/bmp"
                      label="Choose File (png, jpeg, bmp)" variant="solo-filled"></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Password</div>
                    <v-text-field density="compact" variant="outlined"
                      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'" name="input-10-2" label="Kata Sandi" hint="Minimal 8 Karakter"
                      v-model="password" @click:append-inner="show = !show"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Confirm Password</div>
                    <v-text-field density="compact" variant="outlined"
                      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'" name="input-10-1" label="Kata Sandi" hint="Minimal 8 Karakter"
                      v-model="password2" @click:append-inner="show = !show"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn @click="register()" :height="50" block rounded color="#2E74B2">Add Users</v-btn>
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
export default {
  data: () => ({
    show: false,
    valid: false,
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    photo: null,
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

    register() {
      console.log("registering")
      console.log("firstname: ", this.firstname)
      console.log("lastname: ", this.lastname)
      console.log("gender: ", this.gender)
      console.log("email: ", this.email)
      console.log("phone: ", this.phone)
      console.log("address: ", this.address)
      console.log("photo: ", this.photo)
      console.log("password: ", this.password)
      console.log("password2: ", this.password2)
    }
  },
  computed: {
    isoDate() {
      console.log("computed: ", this.date)
      return new Date(this.date - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10);
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
