<template>
   <layout-div>
        <h2 class="text-center mt-5 mb-3">Show Project</h2>
        <div class="card">
            <div class="card-header">
                <router-link 
                    class="btn btn-outline-info float-right"
                    to="/">View All Projects
                </router-link>
            </div>
            <div class="card-body">
                <b className="text-muted">Name:</b>
                <p>{{project.name}}</p>
                <b className="text-muted">Description:</b>
                <p>{{project.description}}</p>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Tasks Name</th>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="task in project.tasks" :key="task.id">
                      <td>{{task.name}}</td>
                        <td>
                            <router-link :to="`/task/show/${task.id}`" class="btn btn-outline-info mx-1">Show</router-link>
                        </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
   </layout-div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'ProjectShow',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      project: {
        name: '',
        description: '',
        tasks: [],
      },
      isSaving:false,
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`/api/projects/get/${id}`)
    .then(response => {
        let projectInfo = response.data[0]
        console.log(response.data[0])
        this.project.name = projectInfo.name
        this.project.description = projectInfo.description
        this.project.tasks = projectInfo.tasks
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
    })
  },
  methods: {
     
  },
};
</script>