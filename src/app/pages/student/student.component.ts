import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../dashboard/dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { AtuhService } from 'src/app/services/auth/atuh.service';

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  student: any = {
    user: {},
    guardians: [],
    participations: [],
    classe: {
      level: {},
      section: {},
      option: {},
    },
    gender: {},
    father: {},
    mather: {}
  };
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private authService: AtuhService
  ) { }

  ngOnInit() {

    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.studentService.show({user: this.user, student: {id: this.activatedRoute.snapshot.params['id']}}).subscribe((res: any) => {
        if(res.code === 0){
          this.student = res.data;
        }
        
        console.log(this.student);
        //debugger
      });
    });

    /* this.studentService.show({user: this.authService., student: any, classe: any}).subscribe((students: any[]) => {
      this.student = students.find((student: any) => student.id === this.activatedRoute.snapshot.params['id']);
      console.log(this.student, students, this.studentService.students);
    });
    this.studentService.emitStudents(); */
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
