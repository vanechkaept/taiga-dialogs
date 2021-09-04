import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {
  DEFAULT_ICONS_PATH,
  TuiButtonModule,
  TuiDialogModule,
  TuiRootModule,
  TuiSvgService,
  TUI_ICONS_PATH
} from '@taiga-ui/core';
import { TUI_SANITIZER } from '@taiga-ui/cdk';

import * as icons from '@taiga-ui/icons';

import { AppComponent, DialogComponent } from './app.component';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TuiRootModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiInputModule
  ],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
  providers: [
    // A workaround because StackBlitz does not support assets
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [TuiSvgService],
      useFactory: iconsWorkaround
    },
    /**
     * If you use unsafe icons or have kind of WYSISYG editor in your app
     *
     * Take a look at: https://github.com/TinkoffCreditSystems/ng-dompurify
     *
     * This library implements DOMPurify as Angular Sanitizer or Pipe.
     * It delegates sanitizing to DOMPurify and supports the same configuration.
     */
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: TUI_ICONS_PATH,
      useValue: DEFAULT_ICONS_PATH
    }
  ]
})
export class AppModule {}

// A workaround because StackBlitz does not support assets
export function iconsWorkaround(service: TuiSvgService): Function {
  return () => service.define({ ...icons, tuiCoreIcons: '', tuiKitIcons: '' });
}
