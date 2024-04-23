import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { HeaderComponent } from '../layout/header/header.component'
import { FooterComponent } from '../layout/footer/footer.component'
import { LayoutComponent } from '../layout/layout/layout.component'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { YearOnlyPipe } from '../pipes/year-only.pipe'
import { AlertComponent } from '../components/ui/alert/alert.component'
import { LoadingComponent } from '../components/ui/loading/loading.component';
import { MovieComponent } from './movie/movie.component'

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'movie/:id',
      component: MovieComponent
    }
  ]
}]

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    YearOnlyPipe,
    AlertComponent,
    LoadingComponent,
    MovieComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    YearOnlyPipe,
    AlertComponent,
    LoadingComponent,
    MovieComponent
  ],
})
export class PagesModule {
}
