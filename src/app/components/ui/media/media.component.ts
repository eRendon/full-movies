import { Component, Input } from '@angular/core'
import { IMedia } from '../../../interfaces/Movie/IMedia'
import { environment } from '../../../environments/environment'

interface ShowMedia {
  backdrops: boolean;
  logos: boolean;
  posters: boolean;
}
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  @Input() backdrops!: IMedia[]
  @Input() logos!: IMedia[]
  @Input() posters!: IMedia[]
  showMedia: ShowMedia = {
    backdrops: true,
    logos: false,
    posters: false
  }
  imageMedia: string = environment.imageMedia

  handleClickMedia(mediaType: keyof ShowMedia): void {
    this.showMedia = {
      backdrops: false,
      logos: false,
      posters: false
    };


    this.showMedia[mediaType] = true;
  }
}
