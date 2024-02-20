import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AtuhService } from 'src/app/services/auth/atuh.service';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { SchoolSelectionService } from 'src/app/services/school-selection/school-selection.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClasseBottomSheetComponent } from 'src/app/bottom-sheet/classe-bottom-sheet/classe-bottom-sheet.component';
import { LevelService } from 'src/app/services/level/level.service';
import { SectionService } from 'src/app/services/section/section.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionService } from 'src/app/services/option/option.service';
import { Router } from '@angular/router';

const ELEMENT_DATA: any[] = [

];

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  
  displayedColumnsClasse: string[] = ['position', 'level', 'section', 'option', 'action'];
  dataSourceClasse = new MatTableDataSource<any>([]);

  subscription!: Subscription;
  classes: any[] = [];

  user!: any;

  school: any;

  levels: any[] = [];
  sections: any[] = [];
  options: any[] = [];

  constructor(
    private classeService: ClasseService,
    private authService: AtuhService,
    private schoolService: SchoolSelectionService,
    private classeBottomsheet: MatBottomSheet,
    private levelService: LevelService,
    private sectionService: SectionService,
    private snackBar: MatSnackBar,
    private optionService: OptionService,
    private router: Router
  ) {}

  ngOnInit() {

    this.authService.user.subscribe((user: any) => this.user = user);

    this.classeService.classes$.subscribe((classes:any) => {
      this.classes = classes;
      this.dataSourceClasse.data = this.classes;
    });
    this.classeService.emitClasses();
    
    this.levelService.levels$.subscribe((levels: any[]) => this.levels = levels);
    this.levelService.emitLevels();

    this.sectionService.sections$.subscribe((sections: any[]) => this.sections = sections);
    this.sectionService.emitSections();

    this.optionService.options$.subscribe((options: any[]) => this.options = options);
    this.optionService.emitOptions();

    this.schoolService.schoolSelected.subscribe((school: any) => this.school = school);

  }

  onCreate(){
    
    const bottomSheetRef = this.classeBottomsheet.open(ClasseBottomSheetComponent, {
      data: {
        levels: this.levels,
        sections: this.sections,
        options: this.options,
        school: this.school,
        user: this.user
      }
    });
    bottomSheetRef.afterDismissed().subscribe((res: any) => {
      if(res.status){
        this.snackBar.open(res.message, "Fermer");
      }
      
    });
  }

  onUpdate(element: any){
    const bottomSheetRef = this.classeBottomsheet.open(ClasseBottomSheetComponent, {
      data: {
        classe: element,
        levels: this.levels,
        sections: this.sections,
        options: this.options,
        school: this.school,
        user: this.user
      }
    });
    bottomSheetRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onShow(element: any){
    this.router.navigate(['/classe', element.id]);
  }

  onDelete(element: any){
    this.classeService.delete({classe: element, user: this.user, school: this.school}).subscribe((response: {code: number, message: string, data: any[]}) => {

      if(response.code === 0){

        this.classeService.classes = response.data;
        this.classeService.emitClasses();

      }

    });
  }

}
