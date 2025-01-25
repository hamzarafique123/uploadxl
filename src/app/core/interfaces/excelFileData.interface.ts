export interface ExcelFileData {
    file: File;
    data: any[];
    jsonString?: string;
    formattedData?: {
      type: string;
      data: any[];
    };
  }

  export interface ExcelFileData{  
      file: File;
      data: any[];
      jsonString?: string;
    }