<template>
    <div class="calculator-container">
        <h1 class="text-center">My Calculator</h1>
        <div class="calculator">
        <div class="input-group mb-3">
            <span class="input-group-text" id="first_number">Số Thứ Nhất: </span>
            <input v-model="first_number" type="text" class="form-control" placeholder="Số thứ nhất" aria-label="Số thứ nhất">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="second_number">Số Thứ Hai:</span>
            <input v-model="second_number" type="text" class="form-control" placeholder="Số thứ hai" aria-label="Số thứ hai">
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">Phép Toán</label>
            <select v-model="operator" class="form-select" id="operator">
            <option disabled value="">Chọn phép toán</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
            </select>
        </div>
        <button class="btn btn-primary w-100" @click="handleCalculate">Kết Quả</button>
        <div v-if="result !== null" class="mt-3">
            <p class="result-text text-success text-center">Kết quả: {{ result }}</p>
        </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
    data() {
        return {
        first_number: "",
        second_number: "",
        operator: "",
        result: null,
        };
    },
    methods: {
        async handleCalculate() {
        if (!this.first_number.trim() || !this.second_number.trim() || !this.operator) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8080/calculate", {
            params: {
                firstNumber: parseFloat(this.first_number),
                secondNumber: parseFloat(this.second_number),
                operator: this.operator,
            },
            });

            this.result = response.data;
        } catch (error) {
            if (error.response) {
            alert(error.response.data);
            } else {
            alert("Không thể kết nối tới server!");
            }
        }
        },
    },
    };
</script>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.calculator-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;

}

h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
}

.form-control,
.form-select {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.input-group-text {
    width: 50%;
    text-align: center;
}


</style>
