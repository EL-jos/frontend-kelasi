import { Component, OnInit, ViewChild, DoCheck, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AtuhService } from 'src/app/services/auth/atuh.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterContentInit {

  events: EventInput[] = [
    // Exemple d'événement
    { title: 'Rendez-vous avec ELONGA JOsué', start: '2023-11-01T10:00:00Z', end: '2023-11-01T11:00:00Z', backgroundColor: 'green',  },
    { title: 'Event 2', start: '2023-11-02T15:30:00Z', end: '2023-11-02T16:30:00Z', backgroundColor: 'blue',  }
    // Ajoutez d'autres événements avec des dates différentes
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
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

  configChart: {data: object, options: object} = {
    data: {},

    options: {},
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public authService: AtuhService,
  ) { }

  ngAfterContentInit(): void {
    
  }

  ngOnInit() {
    
    this.configChart.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: "#f0f",
              tension: 0.4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: "#f00",
              tension: 0.4
          }
      ]
    };

    /* this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  }; */
  
   
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }

  /* ionViewWillEnter() {
    this.calendarOptions = {
      height: 'auto',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'timeGridWeek',
    };
  } */

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
    
    /* this.dialog.open(RendezVousComponent, {
      data: {
        visite: _.find(this.visites, (visite) => visite.id == arg.event.id),
        user: this.user
      }
    }); */
    
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
}
