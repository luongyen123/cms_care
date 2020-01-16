<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(columnIndx, index) in columnIndxs" :key="index">{{itemValue(item,columnIndx)}}</td>
          <td>
            <b-button v-b-modal.modal-1 v-on:click="viewProfile(item['id'])" class="btn ti-eye"></b-button>
          </td>
        </slot>
      </tr>
    </tbody>
    <div>
      <b-modal v-bind:size="getSize()" id="modal-1" v-bind:title="'Profile ' + titleForm" class>
        <b-form v-if="typeUser != 3">
          <p style="font-size:20px; font-weight:bold">Personal information</p>
          <div class="row">
            <div class="col">
              <b-img
                v-if="userData.avatar"
                rounded="circle"
                alt="Circle image"
                v-bind:src="'http://care.spacev.monster'+userData.avatar"
                style="width: 80%;"
              ></b-img>
            </div>
            <div class="col">
              <h3 v-if="userData.name" style="font-weight: bold">{{userData.name}}</h3>
            </div>
          </div>
          <br />
          <b-form-group label="Name">
            <b-form-input v-if="userData.name" type="text" v-model="userData.name" disabled></b-form-input>
          </b-form-group>
          <b-form-group v-if="userData.relationship" label="Relationship">
            <b-form-input disabled v-model="userData.relationship"></b-form-input>
          </b-form-group>
          <b-form-group label="Gender">
            <b-form-input disabled v-bind:value="viewGender(userData.gender)"></b-form-input>
          </b-form-group>
          <b-form-group v-if="userData.birthday" label="Birthday">
            <b-form-input disabled v-bind:value="viewDate(userData.birthday)"></b-form-input>
          </b-form-group>
          <b-form-group v-if="userData.nationality" label="Nationality">
            <b-form-input disabled v-bind:value="viewNationality(userData.nationality)"></b-form-input>
          </b-form-group>
          <p style="font-size:20px; font-weight:bold">{{titleForm}} information</p>
          <div class="row">
            <b-form-group v-if="userData.city" label="City" class="col">
              <b-form-input disabled v-bind:value="userData.city['show_name']"></b-form-input>
            </b-form-group>
            <b-form-group v-if="userData.district" label="District" class="col">
              <b-form-input disabled v-bind:value="userData.district['show_name']"></b-form-input>
            </b-form-group>
          </div>
          <div class="row" v-for="(location,index) in userData.location" v-bind:key="index">
            <slot :row="location">
              <b-form-group
                v-for="(columLocationIndx, index) in columLocation"
                v-bind:key="index"
                v-bind:label="columLocationIndx"
                class="col"
              >
                <b-form-input v-bind:value="location[columLocationIndx].show_name" disabled></b-form-input>
              </b-form-group>
            </slot>
          </div>
          <div class="row">
            <b-form-group v-if="userData.start_date" label="Start day" class="col">
              <b-form-input disabled v-bind:value="viewDate(userData.start_date)"></b-form-input>
            </b-form-group>
            <b-form-group v-if="userData.end_date" label="End day" class="col">
              <b-form-input disabled v-bind:value="viewDate(userData.end_date)"></b-form-input>
            </b-form-group>
          </div>
          <div class="row">
            <b-form-group v-if="userData.start_time" label="Start time" class="col">
              <b-form-input disabled v-bind:value="viewTime(userData.start_time)"></b-form-input>
            </b-form-group>
            <b-form-group v-if="userData.end_time" label="End time" class="col">
              <b-form-input disabled v-bind:value="viewTime(userData.end_time)"></b-form-input>
            </b-form-group>
          </div>
          <b-form-group v-if="userData.address" label="Place of care" class="col">
            <b-form-input disabled v-bind:value="viewAddress(userData.address)"></b-form-input>
          </b-form-group>
          <b-form-group v-if="userData.note" label="Note" class="col">
            <b-form-textarea disabled v-bind:value="userData.note" rows="4"></b-form-textarea>
          </b-form-group>
          <b-form-group v-if="userData.description" label="Note" class="col">
            <b-form-textarea disabled v-bind:value="userData.description" rows="4"></b-form-textarea>
          </b-form-group>
        </b-form>
        <div class="row" v-if="totalPage > 1" style="margin-bottom: 10px">
          <div class="col">
            <input
              v-for="(item, index) in totalPage"
              v-bind:key="index"
              v-on:click="fetch(item)"
              v-bind:value="item"
              name="page"
              type="button"
              class="btn btn-sm btn-primary active"
              v-bind:disabled="item === pageActive"
              style="margin-right: 5px"
            />
          </div>
        </div>

        <table class="table table-bordered">
          <thead clas="thead-dark">
            <tr>
              <th scope="col">Device name</th>
              <th scope="col">Version</th>
              <th scope="col">Time log</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in logs" :key="index">
              <slot :row="item">
                <td
                  v-for="(columnIndx, index) in columsLog"
                  :key="index"
                >{{itemValue(item,columnIndx)}}</td>
              </slot>
            </tr>
          </tbody>
        </table>
      </b-modal>
    </div>
  </table>
</template>
<script>
import {
  Age,
  formatDate,
  formatTime,
  formatTimeLog
} from "../utils/dateFormat";
const columLocation = ["city", "district"];
export default {
  name: "paper-table",
  components: {},
  data() {
    return {
      showModal: false,
      formData: {
        id: 0,
        page: 1
      },
      userData: {
        location: []
      },
      logs: [],
      totalPage: 0,
      titleForm: "",
      columLocation: columLocation,
      columsLog: ["device_name", "version", "created"],
      pageActive: 1
    };
  },
  props: {
    columnIndxs: Array,
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    typeUser: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      switch (column) {
        case "city":
        case "district":
          return item[column].show_name;
        case "birthday":
          return Age(item[column]);
        case "start_date":
        case "end_date":
          return formatDate(item[column]);
        case "created":
          return formatTimeLog(item[column]);
        case "rate":
          if (item[column] === 0) {
            return "No Rate";
          } else {
            return item[column] + "/5";
          }
        case "type_account":
          switch (item[column]) {
            case "0":
              return "Normal";
            case "1":
              return "Naver";
            case "2":
              return "Google";
            case "3":
              return "Kakaotalk";
          }
        case "type":
          if (item[column] === 1) {
            return "Nurse";
          } else {
            return "The patient's representative";
          }
        default:
          return item[column];
      }
    },
    viewProfile(id) {
      this.formData = {
        id: id
      };
      if (this.typeUser === 1) {
        this.$store.dispatch("patient/detail", this.formData).then(response => {
          this.userData = response;
          this.titleForm = "Patient";
        });
      } else if (this.typeUser === 2) {
        this.$store.dispatch("nure/detail", this.formData).then(response => {
          this.userData = response;
          this.titleForm = "Nurse";
        });
      } else {
        this.formData.page = 1
        this.$store.dispatch("user/getLogs", this.formData).then(response => {
          this.logs = response.datas;
          this.totalPage = response.total_page;
          this.pageActive = 1;
          this.titleForm =" History login"
        });
      }
    },
    viewGender(gender) {
      if (gender === 0) {
        return "Male";
      } else if (gender === 1) {
        return "Female";
      } else {
        return "Other";
      }
    },
    viewNationality(nationality) {
      switch (nationality) {
        case 1:
          return "China";
        case 2:
          return "Korea";
        default:
          return "Other";
      }
    },
    viewDate(date) {
      return formatDate(date);
    },
    viewTime(timeString) {
      return formatTime(timeString);
    },
    viewAddress(address) {
      let addressArr = JSON.parse(address);
      let address_return = "";
      for (let i = 0; i < addressArr.length; i++) {
        switch (addressArr[i]) {
          case 1:
            address_return += "Hospital";
            break;
          case 2:
            address_return += "Home";
          default:
            address_return += "Other";
        }
      }
      return address_return;
    },
    getSize() {
      if (this.typeUser == 3) {
        return "lg";
      }
    },
    fetch(page) {
      this.formData.page = page
      this.$store.dispatch("user/getLogs", this.formData).then(response => {
          this.logs = response.datas;
          this.totalPage = response.total_page;
          this.pageActive = page;
        })
    }
  }
};
</script>
<style>
</style>
