import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GenderService } from 'src/app/services/gender/gender.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { StudentService } from 'src/app/services/student/student.service';
import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-student-bottom-sheet',
  templateUrl: './student-bottom-sheet.component.html',
  styleUrls: ['./student-bottom-sheet.component.scss']
})
export class StudentBottomSheetComponent implements OnInit{

  blood_groups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  genders: any[] = [];
  classes: any[] = [];
  formGroupStudent!: FormGroup;

  ckeditorContent: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize'],
      /* [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ] */
    ] ,
    uploadWithCredentials: false,
    //upload: (file: File) => { return console.log(file); }
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private genderService: GenderService,
    private formStudentBldr: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef,
    private studentService: StudentService,
    private classeService: ClasseService
  ){}

  ngOnInit(): void {
    console.log(this.data);
    
    this.genderService.genders$.subscribe((genders: any[]) => this.genders = genders);
    this.genderService.emitGenders();

    this.classeService.classes$.subscribe((classes: any[]) => this.classes = classes);
    this.classeService.emitClasses();

    this.initFormStudent();
  }

  initFormStudent(){
    this.formGroupStudent = this.formStudentBldr.group({
      nom: [this.data.student ? this.data.student.user.nom : null],
      postnom: [this.data.student ? this.data.student.user.postnom : null],
      prenom: [this.data.student ? this.data.student.user.prenom : null],
      email: [this.data.student ? this.data.student.user.email : null],
      blood_group: [this.data.student ? this.data.student.user.blood_group : null],
      gender_id: [this.data.student ? this.data.student.user.gender_id : null],
      phone: [this.data.student ? this.data.student.user.phone : null],
      birth: [this.data.student ? this.data.student.user.birth : null],
      medical_history: [this.data.student ? this.data.student.user.medical_history : null],
      address: [this.data.student ? this.data.student.user.address : null],
      password: [''],
      classe_id: [this.data.student ? this.data.student.classe_id : null]
    });

    if(this.data.student){
      this.formGroupStudent.get('password')?.disable({onlySelf: true});
      
      this.formGroupStudent.addControl('classe_id', new FormControl());
      // Si vous avez une valeur par défaut spécifique, vous pouvez la définir ici
      this.formGroupStudent.patchValue({
        classe_id: this.data.student.classe_id // Remplacez 'valeur-par-defaut' par votre valeur par défaut
      });
    }
    
  }

  onSubmit(){
    this.formGroupStudent.value.user = this.data.user;
    this.formGroupStudent.value.classe = this.data.classe;

    if(this.data.student){

      this.formGroupStudent.value.student = this.data.student;
      this.studentService.update(this.formGroupStudent.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });

    }else{
      this.studentService.create(this.formGroupStudent.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });
    }

    
  }

  onReset(){
    this.formGroupStudent.reset();
    this.bottomSheetRef.dismiss();
  }

  responseServer(response: {code: number, message: string, data: any[]}){

    if(response.code === 0){
        
      this.studentService.students = response.data;
      this.studentService.emitStudents();
      this.bottomSheetRef.dismiss({status: true, message: response.message});
    }

  }

  onChange(a: any){
    console.log(a);
    console.log(this.ckeditorContent);
  }
  onEditorChange(a: any){console.log(a);
  }
  onReady(a: any){console.log(a);
  }
  onFocus(a: any){console.log(a);
  }
  onBlur(a: any){console.log(a);
  }
  onContentDom(a: any){console.log(a);
  }
  onFileUploadRequest(a: any){console.log(a);
  }
  onFileUploadResponse(a: any){console.log(a);
  }
  onPaste(a: any){console.log(a);
  }
  onDrop(a: any){console.log(a);
  }
}
