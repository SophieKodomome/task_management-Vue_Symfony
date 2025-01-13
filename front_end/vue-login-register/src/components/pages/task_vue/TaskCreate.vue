<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Create New Task</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/task/dashboard">View All Tasks</router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="title">Title</label>
            <input v-model="task.title" type="text" class="form-control" id="title" name="title" />
          </div>
          <div class="form-group">
            <label htmlFor="category">Category</label>
            <select v-model="task.category" class="form-control" id="category" name="category">
              <option v-for="category in categories" :key="category.id" :value="category.category.id">{{ category.category.Name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="description">Description</label>
            <textarea v-model="task.description" class="form-control" id="description" rows="3" name="description"></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="estimates">Estimation</label>
            <input v-model="task.estimates" type="text" class="form-control" id="estimates" name="estimates" />
          </div>
          <div class="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input v-model="task.dueDate" type="date" class="form-control" id="dueDate" name="dueDate" />
          </div>
          <button @click="handleSave" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
            Save Task
          </button>
        </form>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../../LayoutDiv.vue";
import Swal from "sweetalert2";

export default {
  name: "TaskCreate",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      task: {
        title: "",
        category: null,
        description: "",
        estimates: "",
        dueDate: "",
      },
      categories: [],
      isSaving: false,
    };
  },
  methods: {
    handleSave() {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token missing or invalid!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      this.isSaving = true;
      axios
      .post(
        "/api/tasks/create",
        { ...this.task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Task created:", response.data);
        Swal.fire({
          icon: "success",
          title: "Task saved successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSaving = false;
        this.task = {
          title: "",
          category: null,
          description: "",
          estimates: "",
          dueDate: "",
        };
      })
      .catch((error) => {
        console.error("Error saving task:", error.response);
        Swal.fire({
          icon: "error",
          title: "An Error Occurred!",
          text: error.response?.data?.errors || "Check the logs for details.",
          showConfirmButton: true,
        });
        this.isSaving = false;
      });
    },
    fetchCategories() {
      const token = localStorage.getItem("token");
      axios
        .get("/api/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Failed to fetch categories!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>
