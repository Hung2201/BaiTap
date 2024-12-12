<template>
    <div class="container text-center mt-5">
        <h1 class="display-4 mb-4">Welcome to the Home Page</h1>
        <div class="d-flex justify-content-center gap-4">
            <router-link to="/greeting" class="btn btn-primary btn-lg shadow">Greeting</router-link>
            <router-link to="/dictionary" class="btn btn-success btn-lg shadow">Dictionary</router-link>
            <router-link to="/calculator" class="btn btn-warning btn-lg shadow">Calculator</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style scoped>
/* CSS tùy chỉnh */
h1 {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    color: #333;
}

.router-link {
    text-decoration: none;
}

.router-link:hover {
    text-decoration: underline;
}

.btn {
    transition: transform 0.3s ease;
}

.btn:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.container {
    max-width: 800px;
    margin-top: 50px;
}
</style>
