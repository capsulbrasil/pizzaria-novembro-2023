import { useApp, userRoutes, dashboardRoutes, defineOptions, WMain } from 'waltz-ui'
import { DashboardLayout, AuthWall } from 'aeria-app-layout'
import waltzPtbr from '@waltz-ui/i18n-ptbr'

import '@waltz-ui/ui/style.css'
import 'aeria-app-layout/style.css'
import '../static/main.css'
import '../static/main.less'

const options = defineOptions({
  component: WMain,
  dashboardComponent: DashboardLayout,
  routes: [
    userRoutes(AuthWall),
    dashboardRoutes(DashboardLayout),
  ],
  i18n: {
    locale: 'pt_BR',
    messages: {
      pt_BR: waltzPtbr
    }
  },
  menuSchema: [
    '/dashboard/pizza',
    '/dashboard/table',
    '/dashboard/employee',
    '/dashboard/event',
    '/dashboard/user',
    '/dashboard/drink',
    '/dashboard/combo',
    '/dashboard/customer',
    '/dashboard/order'
  ]
})

useApp(options).then((app) => {
  app.mount()
})
