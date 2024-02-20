import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faFileAlt, faUserGraduate, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AtuhService } from 'src/app/services/auth/atuh.service';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { SchoolSelectionService } from 'src/app/services/school-selection/school-selection.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { MomentJSService } from 'src/app/services/momentJS/moment-js.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ScheduleComponent } from 'src/app/bottom-sheet/schedule/schedule.component';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from "lodash";
import { StudentBottomSheetComponent } from 'src/app/bottom-sheet/student-bottom-sheet/student-bottom-sheet.component';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { TeacherBottomSheetComponent } from 'src/app/bottom-sheet/teacher-bottom-sheet/teacher-bottom-sheet.component';
import { CourseBottomSheetComponent } from 'src/app/bottom-sheet/course-bottom-sheet/course-bottom-sheet.component';
import { CourseService } from 'src/app/services/course/course.service';

const ELEMENT_DATA: any[] = [

];

@Component({
  selector: 'app-classe-single',
  templateUrl: './classe-single.component.html',
  styleUrls: ['./classe-single.component.scss']
})
export class ClasseSingleComponent implements OnInit {

  faUserGraduate = faUserGraduate;
  faFileAlt = faFileAlt;
  faCalendarAlt = faCalendarAlt;

  displayedColumnsStudent: string[] = ['position', 'name', 'gender', 'birth', 'phone', 'admission', 'action'];
  dataSourceStudent = new MatTableDataSource<any>([]);

  displayedColumnsCourse: string[] = ['no', 'name', 'coefficient', 'teacher', 'action'];
  dataSourceCourse = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  user: any;
  school: any;
  classe: any;

  students: any[] = [];
  schedules: any[] = [];
  teachers: any[] = [];
  courses: any[] = [];

  events: EventInput[] = [
    // Exemple d'événement
    { title: 'Rendez-vous avec ELONGA JOsué', start: '2023-11-01T10:00:00Z', end: '2023-11-01T11:00:00Z', backgroundColor: 'green',  },
    { title: 'Event 2', start: '2023-11-02T15:30:00Z', end: '2023-11-02T16:30:00Z', backgroundColor: 'blue',  }
    // Ajoutez d'autres événements avec des dates différentes
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: frLocale,
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    events: this.events,
    selectable: true,
    droppable: true,
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    dateClick: this.handleDateClick.bind(this), // Gestionnaire de clic sur la date
    eventClick: this.handleEventClick.bind(this), // Gestionnaire de clic sur l'événement
    eventDrop: this.handleEventDrop.bind(this), // Gestionnaire de changement de place
  };
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  constructor(
    private classeService: ClasseService,
    private authService: AtuhService,
    private schoolService: SchoolSelectionService,
    private activatedRoute: ActivatedRoute,
    private momentJS: MomentJSService,
    private bottomSheetSchedule: MatBottomSheet,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private courseService: CourseService
  ){}

  ngOnInit(): void {
    
    this.classe = this.classeService.classes.find((classe: any) => classe.id === this.activatedRoute.snapshot.params['id']) ;

    this.authService.user.subscribe((user: any) => {

      this.user = user;
      //this.scheduleService.read({user: this.user, classe: this.classe});

    });

    this.scheduleService.schedules$.subscribe((schedules: any[]) => {
      this.schedules = schedules;
      this.generateEvents();
    });
    this.scheduleService.emitSchedules();

    this.studentService.students$.subscribe((students: any[]) => {
      this.students = students;
      this.dataSourceStudent.data = this.students;
    });
    this.studentService.emitStudents();

    this.courseService.courses$.subscribe((courses: any[]) => {
      this.courses = courses;
      this.dataSourceCourse.data = this.courses;
    });
    this.courseService.emitCourses();

    this.teacherService.teachers$.subscribe((teachers: any) => this.teachers = teachers);
    this.teacherService.emitTeachers();

    this.schoolService.schoolSelected.subscribe((school: any) => this.school = school);

    this.classeService.show({user: this.user, school: this.school, classe: this.classe}).subscribe((response: {code: number, message: string, data: any}) => {

      if(response.code === 0){

        this.students = response.data.students;
        this.dataSourceStudent.data = this.students;

        this.schedules = response.data.schedules;
        this.generateEvents();

        this.courseService.read({user: this.user, classe: this.classe});
      }
      
    });

  }

  ngAfterViewInit() {
    this.dataSourceStudent.paginator = this.paginator;
    this.dataSourceCourse.paginator = this.paginator;
  }

  onCreateStudent(){
    let bottomSheetScheduleRef = this.bottomSheetSchedule.open(StudentBottomSheetComponent, {
      data: {
        user: this.user,
        classe: this.classe
      }
    });

    bottomSheetScheduleRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onCreateSchedule(){
    let bottomSheetScheduleRef = this.bottomSheetSchedule.open(ScheduleComponent, {
      data: {
        user: this.user,
        classe: this.classe
      }
    });

    bottomSheetScheduleRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onCreateCourse(){
    let bottomSheetScheduleRef = this.bottomSheetSchedule.open(CourseBottomSheetComponent, {
      data: {
        user: this.user,
        classe: this.classe,
        teachers: this.teachers,
        school: this.school,
      }
    });

    bottomSheetScheduleRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onUpdateStudent(element: any){
    let bottomSheetScheduleRef = this.bottomSheetSchedule.open(StudentBottomSheetComponent, {
      data: {
        user: this.user,
        classe: this.classe,
        student: element
      }
    });

    bottomSheetScheduleRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onDeleteStudent(element: any){
    this.studentService.delete({student: element, user: this.user, classe: this.classe}).subscribe((response: {code: number, message: string, data: any[]}) => {

      if(response.code === 0){

        this.studentService.students = response.data;
        this.studentService.emitStudents();

      }

    });
  }

  onUpdateCourse(element: any){
    let bottomSheetScheduleRef = this.bottomSheetSchedule.open(CourseBottomSheetComponent, {
      data: {
        course: element,
        user: this.user,
        classe: this.classe,
        teachers: this.teachers,
        school: this.school,
      }
    });

    bottomSheetScheduleRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onDeleteCourse(element: any){
    this.courseService.delete({course: element, user: this.user, classe: this.classe}).subscribe((response: {code: number, message: string, data: any[]}) => {

      if(response.code === 0){

        this.courseService.courses = response.data;
        this.courseService.emitCourses();

      }

    });
  }

  // Gestionnaire de clic sur la date
  handleDateClick(arg: any) {
    /* this.dialog.open(RendezVousComponent, {
      data: {
        arg: arg,
        user: this.user
      }
    }); */
  }

  // Gestionnaire de clic sur l'événement
  handleEventClick(arg: any) {
    
    let bottomSheetScheduleRef = this.bottomSheetSchedule.open(ScheduleComponent, {
      data: {
        schedule: _.find(this.schedules, (schedule) => schedule.id == arg.event.id),
        user: this.user,
        classe: this.classe
      }
    });

    bottomSheetScheduleRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
    
  }

  handleEventDrop(arg: any) {
    // Gestionnaire appelé lorsqu'un événement est déplacé
    // Vous pouvez mettre à jour votre backend ici si nécessaire
    /* let visiteMove = _.find(this.visites, (visite: any) => visite.id === arg.event.id )
    
    if(visiteMove){

      let newDateTime = new Date(arg.event.startStr);

      visiteMove.date = newDateTime;
      visiteMove.user = this.user;

      this.visiteService.update(visiteMove).subscribe(response => this.actualizeCalendar(response));
    } */
  }

  actualizeCalendar(response: {code: number, message: string, data: any[]}){
    /* this.visiteService.visites = [];
      if(response.code === 0){
        this.visiteService.visites = response.data;
        this.visiteService.emitVisites();
        this.snackBar.open(response.message, "Fermer");
      } */
  }

  generateEvents(): void {

    if(this.fullcalendar && this.fullcalendar.getApi()){

      this.fullcalendar.getApi().removeAllEvents();

      // Convertir les horaires de cours en événements compatibles avec FullCalendar
      this.schedules.map(schedule => {
        
        if(schedule.course !== null){

          const inputEvent = {
            id: schedule.id, 
            title: schedule.course.name, 
            startTime: this.momentJS.convertToHHMM(schedule.start_at), 
            endTime: this.momentJS.convertToHHMM(schedule.end_at), 
            daysOfWeek: [
              this.convertDayOfWeekToNumber(schedule.day)
            ]
          };
          
          this.fullcalendar.getApi().addEvent(inputEvent);

        }
    
      });
    }
    
  }

  // Convertir le jour de la semaine en numéro de jour de la semaine (0 pour Dimanche, 1 pour Lundi, ..., 6 pour Samedi)
  convertDayOfWeekToNumber(dayOfWeek: string): number {
    switch (dayOfWeek) {
      case 'Sunday': return 0;
      case 'Monday': return 1;
      case 'Tuesday': return 2;
      case 'Wednesday': return 3;
      case 'Thursday': return 4;
      case 'Friday': return 5;
      case 'Saturday': return 6;
      default: return -1; // Retourne -1 si le jour de la semaine n'est pas valide
    }
  }
}
