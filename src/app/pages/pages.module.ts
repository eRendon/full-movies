import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { HeaderComponent } from '../layout/header/header.component'
import { FooterComponent } from '../layout/footer/footer.component'
import { LayoutComponent } from '../layout/layout/layout.component'

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    }
  ]
}]

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class PagesModule {
}
