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
                <v-row style="margin-bottom: 10px;">
                  <v-col>
                    <div class="form-label">First name</div>
                    <v-text-field variant="outlined" v-model="firstname" :counter="10" label="" required
                      hide-details></v-text-field>
                  </v-col>
                  <v-col>
                    <div class="form-label">Last name</div>
                    <v-text-field variant="outlined" v-model="lastname" :counter="10" label="" required
                      hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Gender</div>
                    <v-radio-group inline v-model="gender" required>
                      <v-radio label="Male" value="1"></v-radio>
                      <v-radio label="Female" value="2"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Date of Birth</div>
                    <v-col>
                      <v-row justify="center">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                          transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Picker in menu" append-inner-icon="mdi-calendar" readonly
                              v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Email Address</div>
                    <v-text-field variant="outlined" v-model="email" :counter="10" label="" required
                      hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Phone Number</div>
                    <v-text-field variant="outlined" v-model="phone" :counter="10" label="" required
                      hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Address</div>
                    <v-text-field height="300px" variant="outlined" v-model="address" :counter="10" label="" required
                      hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Photo profile</div>
                      <v-file-input prepend-icon="" accept="image/png, image/jpeg, image/bmp" label="Choose File (png, jpeg, bmp)" variant="solo-filled"></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Password</div>
                    <v-text-field variant="outlined" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-2"
                      label="Kata Sandi" hint="Minimal 8 Karakter" v-model="password"
                      @click:append-inner="show = !show"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="form-label">Confirm Password</div>
                    <v-text-field variant="outlined" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-2"
                      label="Kata Sandi" hint="Minimal 8 Karakter" v-model="password2"
                      @click:append-inner="show = !show"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn :height="50" block rounded color="#2E74B2">Add Users</v-btn>
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
    photo: '',
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail is requred.'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
  }),
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

.form-label {
  color: #2E74B2;
}
</style>
