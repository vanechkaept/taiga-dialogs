import { Component, Inject, TemplateRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {
  PolymorpheusComponent,
  POLYMORPHEUS_CONTEXT
} from '@tinkoff/ng-polymorpheus';

@Component({
  template: `
    I'm a test component. Data: {{ context.data }}
  `
})
export class DialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) readonly context: TuiDialogContext<string>
  ) {}
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  test = 'Test text';

  constructor(private readonly dialogs: TuiDialogService) {}

  showText() {
    this.dialogs.open(this.test).subscribe();
  }

  showFunction() {
    this.dialogs
      .open(context => context.data(this.test), {
        data: (text: string) => text.toUpperCase()
      })
      .subscribe();
  }

  showTemplate(template: TemplateRef<TuiDialogContext>) {
    this.dialogs.open(template).subscribe();
  }

  showComponent() {
    this.dialogs
      .open(new PolymorpheusComponent(DialogComponent), {
        data: this.test
      })
      .subscribe();
  }
}
