import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { faThLarge, faHome, faBriefcase, faFileAlt, faUserGraduate, faChalkboardTeacher, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AtuhService } from './services/auth/atuh.service';
import { SchoolSelectionService } from './services/school-selection/school-selection.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/localStorage/local-storage.service';
import { LoaderService } from './services/loader/loader.service';
import { LevelService } from './services/level/level.service';
import { SectionService } from './services/section/section.service';
import { OptionService } from './services/option/option.service';
import { GenderService } from './services/gender/gender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-kelasi';
  @ViewChild("drawer") drawer!: MatDrawer;
  isOpened: boolean = true;
  faThLarge = faThLarge;
  faHome = faHome;
  faUserGraduate = faUserGraduate;
  faFileAlt = faFileAlt;
  faChalkboardTeacher = faChalkboardTeacher;
  faBriefcase = faBriefcase;
  faSignIn = faSignIn;
  faSignOut = faSignOut;

  user: any = null;

  constructor(
    public authService: AtuhService,
    private localStorageService: LocalStorageService,
    public schoolSelectionService: SchoolSelectionService,
    public router: Router,
    public loaderService: LoaderService,
    private levelService: LevelService,
    private sectionService: SectionService,
    private optionService: OptionService,
    private genderService: GenderService
  ){}

  ngOnInit(): void {
    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });

    this.initialization();

    /* this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd) {
        // Récupérez le nom de la route active
        const activeRouteName = this.router.url;
        console.log('Route active : ', activeRouteName);
      }
    }) */
  }

  onLogOut(){
    this.authService.logout(this.user.id).subscribe((response: any) => {

      localStorage.removeItem('access_token');
      this.localStorageService.removeData();

      this.authService.userSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

  onToggle(){
    this.drawer.toggle();
    this.isOpened = !this.isOpened;
  }

  initialization(){
    this.levelService.read();
    this.sectionService.read();
    this.optionService.read();
    this.genderService.read();
  }
}
