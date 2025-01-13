<template>
   <layout-div>
        <h2 class="text-center mt-5 mb-3">Show Project</h2>
        <div class="card">
            <div class="card-header">
                <router-link 
                    class="btn btn-outline-info float-right"
                    to="/task/dashboard">View All Tasks
                </router-link>
            </div>
            <div class="card-body">
                <b className="text-muted">Name:</b>
                <p>{{task.slug}}</p>
                <b className="text-muted">Description:</b>
                <p>{{task.description}}</p>
                <table v-if="task.project" class="table table-bordered">
                  <thead>
                    <tr>
                      <th>From Project</th>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{task.project.name}}</td>
                        <td>
                            <router-link :to="`show/${task.project.id}`" class="btn btn-outline-info mx-1">Show</router-link>
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
      task: {
        name: '',
        slug: '',
        description: '',
        project: [],
      },
      isSaving:false,
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`/api/tasks/${id}`)
    .then(response => {
        let projectInfo = response.data
        console.log(response.data)
        this.task.name = projectInfo.title
        this.task.slug = projectInfo.slug
        this.task.description = projectInfo.description
        this.task.project = projectInfo.project
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