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