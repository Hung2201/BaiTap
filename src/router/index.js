import { createRouter, createWebHistory } from 'vue-router'
import HelloView from '../views/HelloView.vue'
import Dictionary  from '../views/DictionaryView.vue'
import Home from '../views/Home.vue'
import Calculator from '../views/CalucuatorView.vue'
import Employee from '../views/EmployeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/greeting',
      name: 'greeting',
      component: HelloView,
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: Dictionary,
    },
    {
      path: '/calculate',
      name: 'Calculator',
      component: Calculator,
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee,
    },
  ],
})

export default router
