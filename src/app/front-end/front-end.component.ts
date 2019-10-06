import { Component } from '@angular/core';
import { Texts } from './front-end.module';
import { NgForm } from '@angular/forms';

import { TextsService} from './front-end.service';
import { from } from 'rxjs';


@Component({
    selector: 'app-front-end',
    templateUrl: './front-end.component.html',
    // styleUrls: ['./name.component.scss']
})
export class FrontEndComponent  {
    userinput = '';
    newText = 'Nothing here';

    constructor(public textsService: TextsService) {}
    // submit1() {
    //     this.newText = this.userinput;
    //     // alert('submitted!!');
    // }
    submit1(form: NgForm) {
        // if (form.invalid) {
        //     return;
        // }
        this.textsService.addText( this.userinput);
        this.newText = this.textsService.getTexts()[0].content;
        console.log(this.textsService);
        console.log(this.textsService.getTexts());
        // form.resetForm();
    }
}
