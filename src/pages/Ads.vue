<template>
  <div class="row" style="background-color: white; padding: 10px">
    <div class="col-4">
      <h4 v-if="formUpload.id === 0">Add new ads</h4>
      <h4 v-else>Edit ads {{formUpload.name}}</h4>
      <label>Name ads</label>
      <input
        type="text"
        class="form-control"
        placeholder="Name ads"
        style="border: 1px solid #ced4da;background-color: white;"
        v-model="formUpload.name"
      />
      <span v-if="nameValidate" class="error">{{nameValidate}}</span>
      <br />
      <label>Choose Image</label>
      <div class="custom-file" style="margin-bottom: 10px">
        <input type="file" class="custom-file-input" id="inputGroupFile04" @change="onFileChanged" />
        <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
      </div>
      <span v-if="imageValidate" class="error">{{imageValidate}}</span>
      <br />
      <button class="btn btn-primary" v-on:click="addNew()">Add</button>
    </div>
    <div class="col-8">
      <img v-if="url" :src="url" class="img-thumbnail" style="max-height: 250px" />
    </div>
    <h4>List ads</h4>
    <table class="table col-12">
      <thead class="thead-dark">
        <tr>
          <th scope="col" v-for="(colum, index) in columTable" v-bind:key="index">{{colum}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{itemIndex(index)}}</td>
          <slot :row="item">
            <td
              v-for="(columnIndx, index) in columIndxs"
              :key="index"
              :id="columnIndx+item['id']"
              :ref="columnIndx+item['id']"
            >{{itemValue(item,columnIndx)}}</td>
            <td>
              <img v-bind:src="'http://care.spacev.monster'+ item['image']" style="width: 360px; height: 64px" />
            </td>
            <td>
              <button
                class="btn ti-pencil btn-success"
                v-on:click="editBaner(item['id'])"
                style="margin-right: 5px"
              ></button>
              <button
                class="btn ti-layout-tab-window"
                v-b-modal.modal-1
              ></button>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const columTable = [
  "#",
  "Name",
  "Status",
  "User create",
  "Image preview",
  "Action"
];
const columIndxs = ["name", "active", "user",];
export default {
  name: "ads",
  data() {
    return {
      url: null,
      formUpload: {
        id: 0,
        base64: "",
        name: "",
        active: 1
      },
      formList: {
        page: 1
      },
      data: [],
      columTable: [...columTable],
      columIndxs: [...columIndxs],
      nameValidate: "",
      imageValidate: "",
      pageActive: 1
    };
  },
  created() {
    this.getList()
  },
  methods: {
    async onFileChanged(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.formUpload.base64 = reader.result;
        };
      }
    },
    addNew() {
      if (this.formUpload.name === "") {
        this.nameValidate = " Name required";
      }
      if (this.formUpload.base64 === "") {
        this.imageValidate = "Image required";
      }
      if (this.nameValidate === "" && this.imageValidate === "") {
        this.$store.dispatch("ads/adsCreate", this.formUpload).then(reponse => {
          console.log(reponse);
        });
      }
    },
    async getList() {
      this.$store.dispatch("ads/getList", this.formList).then(reponse => {
        this.data = reponse.datas;
      });
    },
    itemIndex(index) {
      if (this.pageActive === 1) {
        return index + 1;
      } else {
        return index + 1 + 10 * (this.pageActive - 1);
      }
    },
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    itemValue(item, column) {
      switch (column) {
        case "user":
          if (!this.isEmpty(item[column])) {
            return item[column].name;
          } else {
            return "_";
          }
        case "active":
          if (item[column] == 1) {
            return "Use";
          } else {
            return "Not use";
          }
        default:
          return item[column];
      }
    },
    editBaner(id) {
      this.formUpload.id =id
      const name = 'name'+id
      console.log(name)
      console.log(this.$refs.name)
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>