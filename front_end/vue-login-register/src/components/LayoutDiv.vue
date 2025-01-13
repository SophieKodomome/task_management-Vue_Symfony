<template>
    <div class="row justify-content-md-center">
        <div class="col-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Learning App</a>
                    <a class="navbar-brand" href="/dashboard">Project Dashoard</a>
                    <a class="navbar-brand" href="/task/dashboard">Task Dashoard</a>
                    <div class="d-flex">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a @click="logoutAction()" class="nav-link " aria-current="page" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'LayoutDiv',
    data() {
     return {
       user: {},
     };
   },
   methods: {
     logoutAction () {
        localStorage.removeItem('token')
        this.$router.push('/')
     }
  
   },
};
</script>