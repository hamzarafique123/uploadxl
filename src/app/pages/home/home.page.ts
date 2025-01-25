import { Component, inject } from '@angular/core';
import {  ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import { ExcelFileData } from 'src/app/core/interfaces/excelFileData.interface';
import { IonContent,IonButton} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,FormsModule, ModalComponent,IonContent,IonButton,],
  templateUrl: './home.page.html',
  styleUrls:["./home.page.scss"]
})
export class HomePage {
  isModalOpen = false;
  excelFiles: ExcelFileData[] = [];
  selectedFileIndex: number | null = null;
  protected Object = Object;

  private toastCtrl = inject (ToastController); 

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleExcelDataUpdate(files: ExcelFileData[]) {
    this.excelFiles = files;
  }

  selectFile(index: number) {
    this.selectedFileIndex = index;
  }

  getHeaders(data: any[]): string[] {
    if (data && data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }
}