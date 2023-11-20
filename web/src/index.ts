import { useApp, userRoutes, dashboardRoutes, defineOptions, WMain } from 'waltz-ui'
import { DashboardLayout, AuthWall } from 'waltz-tailwind-layout'
import waltzPtbr from '@waltz-ui/i18n-ptbr'

import '@waltz-ui/ui/style.css'
import 'waltz-tailwind-layout/style.css'
import '../static/main.css'
import "@waltz-ui/ui/themes/default.less"

const options = defineOptions({
  component: WMain,
  dashboardComponent: DashboardLayout,
  routes: [
    userRoutes(() => AuthWall),
    dashboardRoutes(() => DashboardLayout),
  ],
  i18n: {
    locale: 'pt_BR',
    messages: {
      pt_BR: waltzPtbr
    }
  },
  menuSchema: {
    start: {
      children: [
        '/dashboard/pizza',
        '/dashboard/table',
        '/dashboard/employee',
        '/dashboard/event',
        '/dashboard/user',
        '/dashboard/drink',
        '/dashboard/combo',
        '/dashboard/drink',
        '/dashboard/customer',
        '/dashboard/combo',
        '/dashboard/order'
      ]
    }
  }
})

useApp(options).then((app) => {
  app.mount()
})
