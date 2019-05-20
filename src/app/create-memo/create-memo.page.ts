import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.page.html',
  styleUrls: ['./create-memo.page.scss'],
})
export class CreateMemoPage implements OnInit {

  constructor(
    private element: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  //テキストエリアのheightを自動で変更する
  @HostListener('document:keydown.enter', ['$event']) 
  onKeydownHandler(evt: KeyboardEvent) {
  this.textChange()
  }
   Text = {} as Text;

   ngAfterViewInit(){
   this.textChange()
   }

  textChange():void{
    const textArea = this.element.nativeElement.getElementsByTagName("textarea")[0];
    textArea.style.overflow = "hidden";
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';

    
  }

  cancel(){
    this.router.navigate(["/home"]);
  }
}
