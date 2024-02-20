import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule, AngularEditorConfig } from '@kolkov/angular-editor';
import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-classe-bottom-sheet',
  templateUrl: './classe-bottom-sheet.component.html',
  styleUrls: ['./classe-bottom-sheet.component.scss'],
  //standalone: true,
  /* imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] */
})
export class ClasseBottomSheetComponent {
  formGroupClasse!: FormGroup;

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

  levels: any[] = [];
  sections: any[] = [];
  options: any[] = [];
  school: any;
  user: any;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    private fomGroupClasseBldr: FormBuilder,
    private classeService: ClasseService,
    private bottomSheetRef: MatBottomSheetRef
  ){}

  ngOnInit(): void {
    
    this.levels = this.data.levels;
    this.sections = this.data.sections;
    this.school = this.data.school;
    this.options = this.data.options;
    this.user = this.data.user;

    this.initFormGroupClasse();

  }
  
  initFormGroupClasse(){
    this.formGroupClasse = this.fomGroupClasseBldr.group({
      level_id: [this.data.classe ? this.data.classe.level_id : null],
      section_id: [this.data.classe ? this.data.classe.section_id : null],
      option_id: [this.data.classe ? this.data.classe.option_id : null],
      description: [this.data.classe ? this.data.classe.description : null]
    });

    if(!this.data.classe || this.data.classe && this.data.classe.section_id !== 3){
      this.formGroupClasse.get('option_id')?.disable({onlySelf: true});
    }
    
  }

  onChangeSection(section: number){
    if(section === 3){
      this.formGroupClasse.get('option_id')?.enable({onlySelf: true});
    }
  }

  onSubmit(){
    this.formGroupClasse.value.school = this.school;
    this.formGroupClasse.value.user = this.user;

    if(this.data.classe){

      this.formGroupClasse.value.classe = this.data.classe;

      this.classeService.update(this.formGroupClasse.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });

    }else{
      this.classeService.create(this.formGroupClasse.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });
    }
    
  }

  responseServer(response: {code: number, message: string, data: any[]}){

    if(response.code === 0){
        
      this.classeService.classes = response.data;
      this.classeService.emitClasses();
      this.bottomSheetRef.dismiss({status: true, message: response.message});
    }

  }

  onReset(){
    this.formGroupClasse.reset();
    this.bottomSheetRef.dismiss();
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
