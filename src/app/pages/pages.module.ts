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
import { MediaComponent } from '../components/ui/media/media.component'
import { DollarsPipe } from '../pipes/dollars.pipe'
import { FormsModule } from '@angular/forms'
import { PaginatorComponent } from '../components/ui/paginator/paginator.component'
import { CanvaComponent } from '../components/ui/canva/canva.component'

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
    MediaComponent,
    DollarsPipe,
    PaginatorComponent,
    CanvaComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
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
    MovieComponent,
    MediaComponent,
    DollarsPipe,
    PaginatorComponent,
    CanvaComponent
  ],
})
export class PagesModule {
}
