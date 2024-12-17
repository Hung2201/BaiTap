import instance from '@/common'

export const employeeApi = {
    fetchAll(params) {
        return instance.get('/employee', { params: params })
    },
    fetchById(id) {
        return instance.get(`/employee/${id}`)
    },
    search(filters) {
        return instance.get('/employee', { params: filters })
    },
    create(data) {
        return instance.post('/employee', data)
    },
    update(id, data) {
        return instance.put(`/employee/${id}`, data)
    },
    delete(id) {
        return instance.delete(`/employee/${id}`)
    },
}
