import { Component, Input, Output, EventEmitter, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ExcelFileData } from 'src/app/core/interfaces/excelFileData.interface';
import { IonModal,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonAvatar,IonContent,IonItem,IonLabel,IonList,IonIcon} from '@ionic/angular/standalone';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,IonModal,IonHeader,IonToolbar,IonAvatar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonLabel,IonList,IonIcon],
  templateUrl: './modal.component.html',
  styleUrls:['./modal.component.scss']
})
export class ModalComponent {
  @Input() isModalOpen = false;
  @Input() selectedFileIndex: number | null = null;
  @Output() modalClose = new EventEmitter<void>();
  @Output() excelDataUpdate = new EventEmitter<ExcelFileData[]>();
  @Output() fileSelect = new EventEmitter<number>();

  excelFiles: ExcelFileData[] = [];
  
  private toastCtrl = inject (ToastController);

  closeModal() {
    this.modalClose.emit();
  }

  async onFileChange(event: any) {
    const files: FileList = event.target.files;
    const newExcelFiles: ExcelFileData[] = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      try {
        const data = await new Promise<any[]>((resolve) => {
          reader.onload = (e: any) => {
            const binaryData = e.target.result;
            const workbook = XLSX.read(binaryData, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            resolve(data);
          };
          reader.readAsBinaryString(file);
        });

        const formattedData = {
          type: "excel_data",
          data: data.map((row: any, index: number) => ({
            id: index + 1,
            ...row
          }))
        };

        const jsonString = JSON.stringify(formattedData, null, 2);
        newExcelFiles.push({ 
          file, 
          data: formattedData.data, 
          jsonString,
          formattedData 
        });
      } catch (error) {
        console.error('Error reading Excel file:', error);
        this.showToast('Error reading Excel file');
      }
    }

    this.excelFiles = [...this.excelFiles, ...newExcelFiles];
    this.excelDataUpdate.emit(this.excelFiles);
  }

  selectFile(index: number) {
    this.fileSelect.emit(index);
  }

  async copyJsonData() {
    if (this.selectedFileIndex !== null && this.excelFiles[this.selectedFileIndex].jsonString) {
      try {
        await navigator.clipboard.writeText(this.excelFiles[this.selectedFileIndex].jsonString!);
        this.showToast('JSON data copied to clipboard');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        this.showToast('Error copying to clipboard');
      }
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}