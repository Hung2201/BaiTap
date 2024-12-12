<template>
    <div class="search">
        <h2>DICTIONARY</h2>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Nhập từ khóa cần tìm" v-model="keyword">
            <button class="btn btn-primary" type="button" id="button-addon2" @click="handleSubmit">
                Tìm Kiếm
            </button>
        </div>
        <div v-if="result">
            <p class="p-4">{{ result }}</p>
        </div>
        <div v-else-if="searched">
            <p>Không tìm thấy từ khóa nào.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DictionaryView",
    data() {
        return {
            keyword: "",
            result: null,
            searched: false, 
        };
    },
    methods: {
        async handleSubmit() {
            if (!this.keyword.trim()) {
                alert("Vui lòng nhập từ khóa!");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/dictionary/search?keyword=${this.keyword}`);
                const data = await response.json();

                this.result = data.result;
                this.searched = true;
            } catch (error) {
                console.error("Error fetching search result:", error);
                alert("Có lỗi xảy ra khi tìm kiếm!");
            }
        },
    },
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
    align-items: center;
    height: 100vh;
    margin: 0;
}

h2 {
    margin: 20px;
    color: #333;
}

.form-control {
    width: 90%;
    margin-left: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 5px;
    transition: border-color 0.3s;
}

.btn {
    padding: 10px 15px;
    border: none;
    margin-right: 20px;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0056b3;
}
</style>
