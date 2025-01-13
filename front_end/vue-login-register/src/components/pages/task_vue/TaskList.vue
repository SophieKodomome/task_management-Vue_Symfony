<template>
  <layout-div>
        <div class="container">
            <h2 class="text-center mt-5 mb-3">Project Manager</h2>
            <div class="card">
                <div class="card-header">
                    <router-link to="/task/create"
                        class="btn btn-outline-primary"
                        >Create New Task
                    </router-link>
                </div>
                <div class="card-body">
             
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th width="240px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in activeTasks" :key="task.id">
                                <td>{{task.title}}</td>
                                <td>
                                    <router-link :to="`/task/show/${task.id}`" class="btn btn-outline-info mx-1">Show</router-link>
                                    <router-link :to="`/task/edit/${task.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                                    <button 
                                        @click="handleDelete(task.id)"
                                        className="btn btn-outline-danger mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                                 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </layout-div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'ProjectList',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      tasks:[]
    };
  },
  created() {
    this.fetchProjectList();
  },
  methods: {
    fetchProjectList() {
      const token = localStorage.getItem('token');
      // console.log(token);
      axios.get('/api/tasks',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
            this.tasks = response.data;
            console.log(response.data);
            return response
        })
        .catch(error => {
          return error
        });
    },
    handleDelete(id){
      const token = localStorage.getItem('token');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/tasks/softdelete-${id}`,{
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then( response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Project deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.fetchProjectList();
                    return response
                })
                .catch(error => {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return error
                });
            }
          })
    }
  },
    computed:{
      activeTasks() {
        return this.tasks.filter(task => !task.deletedAt);
      }
    }
};
</script>