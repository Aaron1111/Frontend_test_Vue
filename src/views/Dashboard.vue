<template>
  <v-data-table :headers="headers" :items="data" :sort-by="[{ key: 'name', order: 'asc' }]" class="elevation-1">
    <template #item.date_of_birth="{ item }">
      <div>{{ new Date(new Date(item.selectable.date_of_birth) - (new Date()).getTimezoneOffset() *
        60000).toISOString().substr(0, 10) }} </div>
    </template>
    <template #item.photo="{ item }">
      <v-btn flat @click="openPhoto(item.raw)">
        Open Photo
      </v-btn>
      <v-dialog v-model="dialogPhotos" max-width="50vh">
        <img v-bind:src="'data:image/jpeg;base64,' + selectedPhoto" />
      </v-dialog>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="firstName" label="first name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="lastName" label="last name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <div class="form-label">Gender</div>
                    <!-- <v-text-field v-model="editedItem.gender" label="gender"></v-text-field> -->
                    <v-radio-group inline v-model="editedItem.gender" :rules="[rules.required]">
                      <v-radio label="Male" value="male"></v-radio>
                      <v-radio label="Female" value="female"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <div class="form-label">Date of Birth</div>
                    <v-col>
                      <v-row justify="center">
                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                          transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ props }">
                            <v-text-field v-model="isoDate" label="" append-inner-icon="mdi-calendar" readonly
                              v-bind="props"></v-text-field>
                          </template>
                          <v-date-picker v-model="editedItem.date_of_birth" width="200" @click:cancel="menu2 = false"
                            @click:save="menu2 = false"></v-date-picker>
                        </v-menu>
                      </v-row>
                    </v-col>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.email" label="Email Address"></v-text-field>
                  </v-col>
                  <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.photo"
                      label="Photo"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field class="address" v-model="editedItem.address" label="Address"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil-box-outline
      </v-icon>
      <!-- <v-icon
        size="small"
        @click="deleteItem(item.raw)"
      >
        mdi-delete
      </v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { storeToRefs } from "pinia";
import axios from 'axios'
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
export default {
  data: () => ({
    date: "",
    firstName: "",
    lastName: "",
    menu2: false,
    selectedPhoto: "",
    dialogPhotos: false,
    dialog: false,
    dialogDelete: false,
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
    headers: [
      {
        title: 'Name',
        align: 'center',
        sortable: false,
        key: 'name',
      },
      {
        title: 'Gender',
        align: 'center',
        sortable: false,
        key: 'gender',
      },
      {
        title: 'Date of Birth',
        align: 'center',
        sortable: false,
        key: 'date_of_birth',
      },
      {
        title: 'Email Address',
        align: 'center',
        sortable: false,
        key: 'email',
      },
      {
        title: 'Photo Profile',
        align: 'center',
        sortable: false,
        key: 'photo',
      },
      {
        title: 'Phone Number',
        align: 'center',
        sortable: false,
        key: 'phone',
      },
      {
        title: 'Address',
        align: 'center',
        sortable: false,
        key: 'address',
      },
      { title: 'Act', key: 'actions', sortable: false },
    ],
    data: [],
    photosIndex: -1,
    editedIndex: -1,
    editedItem: {
      name: '',
      gender: 'male',
      date_of_birth: 0,
      email: 0,
      photo: 0,
      phone: 0,
      address: 0
    },
    defaultItem: {
      name: '',
      gender: 'male',
      date_of_birth: 0,
      email: 0,
      photo: 0,
      phone: 0,
      address: 0
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Profile'
    },

    isoDate() {
      console.log("computed: ", this.editedItem.date_of_birth)
      return new Date(new Date(this.editedItem.date_of_birth) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      const store = useAuthStore()
      const { token } = store
      console.log("bearer token: ", token)
      if (!token) {
        router.push('/')
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios.get(
        'https://api-test.bullionecosystem.com/api/v1/admin/?offset=&limit=',
        config
      ).then((response) => {
        console.log(response);
        this.data = response.data.data
      })
        .catch((error) => {
          console.log(error);
          // alert(error.response.data.err_message)
        });
    },

    openPhoto(item) {
      console.log("opening photo")
      // console.log(item.photo)
      this.selectedPhoto = item.photo
      this.dialogPhotos = true
      // this.editedIndex = this.data.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item)
      console.log(item)
      item.date_of_birth = new Date(new Date(item.date_of_birth) - (new Date()).getTimezoneOffset() *
        60000).toISOString().substr(0, 10)
      var fullName = item.name
      this.firstName = fullName.split(' ').slice(0, -1).join(' ');
      this.lastName = fullName.split(' ').slice(-1).join(' ');
      this.date = item.date_of_birth
      const jsonData = JSON.stringify({
        first_name: this.firstName,
        last_name: this.lastName,
        gender: item.gender,
        date_of_birth: item.date_of_birth,
        email: item.email,
        phone: item.phone,
        address: item.address
      })
      console.log("new structure for sending to API: ", jsonData)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        const store = useAuthStore()
        const { token } = store
        console.log("bearer token: ", token)

        
        const config = {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        };
        console.log("save updated item")
        console.log("edited item: ", this.editedItem)
        this.editedItem.date_of_birth = new Date(new Date(this.editedItem.date_of_birth) - (new Date()).getTimezoneOffset() *
          60000).toISOString().substr(0, 10)
        this.date = this.editedItem.date_of_birth
        const jsonData = JSON.stringify({
          first_name: this.firstName,
          last_name: this.lastName,
          gender: this.editedItem.gender,
          date_of_birth: this.editedItem.date_of_birth,
          email: this.editedItem.email,
          phone: this.editedItem.phone,
          address: this.editedItem.address
        })
        console.log("new structure for sending to API: ", jsonData)
        Object.assign(this.data[this.editedIndex], this.editedItem)
        console.log("id:", this.editedItem._id)
        let url = 'https://api-test.bullionecosystem.com/api/v1/admin/' + this.editedItem._id + '/update'
        console.log("url: ", url)
        axios.put(
          url,
          jsonData,
          config
        ).then((response) => {
          console.log(response);
        })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.err_message)
          });


      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style>
.address {
  height: 50px;
}

.form-label {
  color: #2E74B2;
}
</style>