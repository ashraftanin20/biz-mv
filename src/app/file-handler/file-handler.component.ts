import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

export interface PeriodicElement {
  name: string;
  schema: any;
  import: any;
}


const URL = 'http://localhost:8080/api/upload';
@Component({
  selector: 'app-file-handler',
  templateUrl: './file-handler.component.html',
  styleUrls: ['./file-handler.component.scss']
})
export class FileHandlerComponent {
  filename: any;
  files: File[] = [];
  genFile: any;
  data: [][] | undefined;
  
  Product = [
    {"id": 1, "Name": "Dell PC", "Price": 299, "Description": "Dell PC with 4GB RAM and 500GB HDD"},
    {"id": 2, "Name": "Lenovo Laptop", "Price": 499, "Description": "Lenovo Laptop with 8GB RAM and 500GB HDD"},
    {"id": 3, "Name": "Samasung A85", "Price": 799, "Description": "Samsumg Smartphone with 4GB RAM and 256GB HDD"},
    {"id": 4, "Name": "HP Printer", "Price": 349, "Description": "HP Color printer with scanner"}
  ];

  Category = [
    {"id": 1, "Name": "Computer"},
    {"id": 2, "Name": "Smartphone"},
    {"id": 3, "Name": "Camera"},
    {"id": 4, "Name": "Printer"}
  ];

  Customer = [
    {"id": 1, "Name": "Alex", "Email": "alex@gmail.com", "telephone": "01746445647"},
    {"id": 2, "Name": "Jan", "Email": "jan@gmail.com", "telephone": "01546476789"},
    {"id": 3, "Name": "Maria", "Email": "marie@gmail.com", "telephone": "01576443222"},
    {"id": 4, "Name": "Tamim", "Email": "tamim@gmail.com", "telephone": "0172322211"}
  ];
  displayedColumns: string[] = ['name', 'schema', 'import'];
  tableNames = [
    {name: "Product"}, {name: "Customer"}, {name: "Category"}];
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file',
  });

  constructor(private toastr: ToastrService) {}
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }

  download(tablename: any) {
    this.exportExcel(tablename);
  }
  
  exportExcel(tablename: string) {
    this.filename = tablename + ".xlsx";
    let data: any;
    if(tablename == "Product") {
      data = this.Product;
    }
    if(tablename == "Category") {
      data = this.Category;
    }
   if(tablename == "Customer") {
    data = this.Customer;
   } 
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    this.genFile = XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.filename);
  }

  onSelect(event: any) {
    //const target: DataTransfer = <DataTransfer>(...event.addedFiles: any.addedFiles: any);
    //const target = ...event.addedFiles;
    const reader: FileReader = new FileReader();
    

    reader.onload = (e: any) => {
      const bStr : String = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bStr, { type: 'binary'});
      const sheetName: string =  wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[sheetName];
      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1}));

      console.log(this.data);
    }
    reader.readAsBinaryString(event.addedFiles[0]);

   
    
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
