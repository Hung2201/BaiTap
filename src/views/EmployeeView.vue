<template>
    <div class="container ">
        <h1 class="text-center">QUẢN LÝ NHÂN VIÊN</h1>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Tìm kiếm nhân viên</h5>
                <form class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="searchName" class="form-label">Tên</label>
                            <input
                                type="text"
                                class="form-control"
                                id="searchName"
                                v-model="searchFilters.name"
                                placeholder="Tên (Tìm kiếm gần đúng)"
                            />
                        </div>
                        <div class="col-md-4">
                            <label for="startDate" class="form-label">Ngày sinh từ</label>
                            <input
                                type="date"
                                class="form-control"
                                id="startDate"
                                v-model="searchFilters.dobFrom"
                            />
                        </div>
                        <div class="col-md-4">
                            <label for="endDate" class="form-label">Ngày sinh đến</label>
                            <input
                                type="date"
                                class="form-control"
                                id="endDate"
                                v-model="searchFilters.dobTo"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 d-flex flex-column align-items-start">
                            <label for="gender" class="form-label">Giới tính</label>
                            <select
                                class=""
                                id="gender"
                                v-model="searchFilters.gender"
                                style="width: 100%;"
                            >
                            <option value="">Tất cả</option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="salaryRange" class="form-label">Mức lương</label>
                            <select
                                class="form-control"
                                id="salaryRange"
                                v-model="searchFilters.salaryRange"
                            >
                                <option value="">Tất cả</option>
                                <option value="1"> 0 - 5000 </option>
                                <option value="2">5000 - 10000</option>
                                <option value="3">10000 - 20000</option>
                                <option value="4"> >20000 </option>  
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="phone" class="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                class="form-control"
                                id="phone"
                                v-model="searchFilters.phone"
                                placeholder="Số điện thoại (Tìm kiếm gần đúng)"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="departmentId" class="form-label">Bộ phận</label>
                            <select
                                class="form-select"
                                id="departmentId"
                                v-model="searchFilters.departmentId"
                            >
                                <option value="">Tất cả</option>
                                <option value="1">Quản lý</option>
                                <option value="2">Kế toán</option>
                                <option value="3">Sale-Marketing</option>
                                <option value="4">Sản xuất</option>
                            </select>
                        </div>
                    </div>

                    <div class="row d-flex justify-content-center align-items-end pt-5">
                        <button
                            type="button"
                            class="btn btn-primary me-2"
                            @click="searchEmployees"
                        >
                        Tìm kiếm
                        </button>

                        <button type="button" class="btn btn-secondary" @click="resetFilters">
                            Đặt lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="managementemployee">
            <div class="header">
                <h2 class="title">Danh sách nhân viên</h2>
                <button class="btn btn-add" @click="showAddForm">+ Thêm Mới</button>
            </div>

            <div class="table-container">
                <table class="styled-table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Lương</th>
                        <th>Phone</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(employee, index) in employees" :key="employee.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ employee.name }}</td>
                        <td>{{ formatDate(employee.dob) }}</td>
                        <td>{{ employee.gender === 'MALE' ? 'Nam' : 'Nữ' }}</td>
                        <td>{{ formatCurrency(employee.salary) }}</td>
                        <td>{{ employee.phone }}</td>
                        <td>
                        <button class="btn btn-primary" @click="showUpdateForm(employee)">Cập nhật</button>
                        <button class="btn btn-danger" @click="deleteEmployee(employee.id)">Xóa</button>
                        <button class="btn btn-info" @click="showDetails(employee)">Xem chi tiết</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Form thêm/sửa -->
            <div v-if="showForm" class="modal">
            <div class="modal-content">
                <h3>{{ formMode === 'add' ? 'Thêm Nhân Viên' : 'Cập Nhật Nhân Viên' }}</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label>Tên:</label>
                        <input type="text" v-model="formData.name" required />
                    </div>
                    <div class="form-group">
                        <label>Ngày sinh:</label>
                        <input type="date" v-model="formData.dob" required />
                    </div>
                    <div class="form-group">
                        <label>Giới tính:</label>
                        <select v-model="formData.gender" required>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Lương:</label>
                        <input type="number" v-model="formData.salary" required />
                    </div>
                    <div class="form-group">
                        <label>Phone:</label>
                        <input type="number" v-model="formData.phone" required />
                    </div>
                    <div class="form-buttons">
                        <button class="btn btn-primary" type="submit">
                        {{ formMode === 'add' ? 'Thêm' : 'Cập nhật' }}
                        </button>
                        <button class="btn btn-secondary" @click="closeForm">Hủy</button>
                    </div>
                </form>
            </div>
            </div>
            <!-- Modal chi tiết -->
            <div v-if="showDetailModal" class="modal">
                <div class="modal-content">
                    <h3>Thông Tin Chi Tiết</h3>
                    <p><strong>Tên:</strong> {{ selectedEmployee.name }}</p>
                    <p><strong>Ngày sinh:</strong> {{ formatDate(selectedEmployee.dob) }}</p>
                    <p><strong>Giới tính:</strong> {{ selectedEmployee.gender === 'MALE' ? 'Nam' : 'Nữ' }}</p>
                    <p><strong>Lương:</strong> {{ formatCurrency(selectedEmployee.salary) }}</p>
                    <p><strong>Phone:</strong> {{ selectedEmployee.phone }}</p>
                    <button class="btn btn-secondary" @click="closeDetailModal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
    data() {
        return {
            employees: [],
            showForm: false,
            formMode: 'add',
            formData: {
                id: '',
                name: '',
                dob: '',
                gender: 'MALE',
                salary: 0,
                phone: ''
            },
            searchFilters: {
                name: "",
                dobFrom: "",
                dobTo: "",
                gender: "",
                salaryRange: 1,
                phone: "",
                departmentId: "",
            },
            showDetailModal: false,
            selectedEmployee: {},
        }
    },
    methods: {
        async fetchEmployees() {
            const response = await axios.get('http://localhost:8080/employee')
                this.employees = response.data.data
        },
        async searchEmployees() {
            try {
                // Gửi các bộ lọc đến API (giả sử backend hỗ trợ tìm kiếm qua query params)
                const response = await axios.get('http://localhost:8080/employee/search', {
                    params: this.searchFilters
                });
                this.employees = response.data.data;
                
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
            }
        },
        resetFilters() {
        // Reset toàn bộ bộ lọc về giá trị mặc định
            this.searchFilters = {
                name: '',
                dobFrom: "",
                dobTo: "",
                gender: "",
                salaryRange: "",
                phone: "",
                departmentId: "",
            };
            this.fetchEmployees(); // Lấy lại toàn bộ dữ liệu
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN')
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
        },
        showAddForm() {
            this.formMode = 'add'
            this.formData = { id: '', name: '', dob: '', gender: 'MALE', salary: 0, phone: '' }
            this.showForm = true
        },
        showUpdateForm(employee) {
            this.formMode = 'update'
            this.formData = { ...employee }
            this.showForm = true
        },
        async handleSubmit() {
            if (this.formMode === 'add') {
                await axios.post('http://localhost:8080/employee', this.formData)
            } else if (this.formMode === 'update') {
                await axios.put(`http://localhost:8080/employee/${this.formData.id}`, this.formData)
            }
            this.closeForm()
            this.fetchEmployees()
        },
        async deleteEmployee(id) {
            if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
                await axios.delete(`http://localhost:8080/employee/${id}`)
                this.fetchEmployees()
            }
        },
        showDetails(employee) {
            this.selectedEmployee = employee
            this.showDetailModal = true
        },
        closeDetailModal() {
        this.showDetailModal = false
        },
        closeForm() {
        this.showForm = false
        },
    },
    mounted() {
        this.fetchEmployees()
    },
    }
</script>

<style scoped>
    .container {
    max-width: 100%;
    margin: 30px auto;
    padding: 20px;
    background-color: #f9f9f9;
    }
    .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    }
    .title {
    font-size: 2rem;
    color: #333;
    }
    .btn-add {
    background-color: #28a745;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }
    .btn-add:hover {
    background-color: #218838;
    }
    .table-container {
    overflow-x: auto;
    }
    .styled-table {
    width: 100%;
    border-collapse: collapse;
    }
    .styled-table thead {
    background-color: #007bff;
    color: #fff;
    }
    .styled-table th,
    .styled-table td {
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
    }
    .styled-table tbody tr:nth-child(even) {
    background-color: #f3f3f3;
    }
    .styled-table tbody tr:hover {
    background-color: #f1f1f1;
    }
    .btn {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }
    .btn-primary {
    background-color: #007bff;
    color: #fff;
    }
    .btn-danger {
    background-color: #dc3545;
    color: #fff;
    }
    .btn-secondary {
    background-color: #6c757d;
    color: #fff;
    }
    .btn-info {
    background-color: #17a2b8;
    color: #fff;
    }
    .btn-info:hover {
    background-color: #138496;
    }
    .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    }
    .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    }
    .form-group {
    margin-bottom: 15px;
    }
    .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    }
    .form-group input,
    .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    }
    .form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    }
</style>