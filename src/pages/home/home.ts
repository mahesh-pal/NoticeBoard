import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateNoticeBoardPage} from '../create-notice-board/create-notice-board';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private nav: NavController) {

  }
  /**
   * This method will navigate user to the notice board creation screen.
   */
  createNoticeBoard(){
    this.nav.push(CreateNoticeBoardPage);
  }

}
