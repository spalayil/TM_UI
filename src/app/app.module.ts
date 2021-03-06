import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TmrouterRoutingModule } from './tmrouter-routing.module';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewTaskComponent } from './view-task/view-task.component';
import { FilterdataPipe } from './filterdata.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    FilterdataPipe
  ],
  imports: [
    BrowserModule,
    TmrouterRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
 
 
  ],
  providers: [],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
