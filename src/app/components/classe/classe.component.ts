import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { LevelService } from 'src/app/services/level/level.service';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularEditorModule
  ],
  providers: [
    LevelService,
    SectionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ClasseComponent implements OnInit{
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

  constructor(
    private levelService: LevelService,
    private sectionService: SectionService
  ){}

  ngOnInit(): void {

    this.levelService.levels$.subscribe((levels: any[]) => this.levels = levels);
    this.sectionService.sections$.subscribe((sections: any[]) => this.sections = sections);
    
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
