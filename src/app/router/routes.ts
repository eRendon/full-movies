import { Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
  },
]

export default routes
