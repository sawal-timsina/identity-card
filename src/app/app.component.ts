import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Path, Text, Group, pdf } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

const { exportPDF } = pdf;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'identityCard';
  data = new Array();

  constructor() {}

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
      document.getElementById('name').textContent = this.data[0][0];
      document.getElementById('sId').textContent = this.data[0][1];
      document.getElementById('address').textContent = this.data[0][2];
      document.getElementById('DOB').textContent = this.data[0][3];
      document.getElementById('validity').textContent = this.data[0][4];
      //document.getElementById('clickMe').click();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // bulk() {
  //   let img;
  //   let name;
  //   let sId;
  //   let address;
  //   let DOB;
  //   let validity;
  //   console.log(this.data);

  //   for (let i = 0; i <= this.data.length; i++) {
  //     name = this.data[i][0];
  //     sId = this.data[i][1];
  //     address = this.data[i][2];
  //     DOB = this.data[i][3];
  //     validity = this.data[i][4];

  //     document.getElementById('name').textContent = name;
  //     document.getElementById('sId').textContent = sId;
  //     document.getElementById('address').textContent = address;
  //     document.getElementById('DOB').textContent = DOB;
  //     document.getElementById('validity').textContent = validity;
  //     // document.getElementById('clickMe').click();
  //   }
  // }

  exports() {
    let img;
    let name;
    let sId;
    let address;
    let DOB;
    let validity;
    console.log(this.data);

    for (let i = 0; i <= this.data.length - 1; i++) {
      name = this.data[i][0];
      sId = this.data[i][1];
      address = this.data[i][2];
      DOB = this.data[i][3];
      validity = this.data[i][4];
      console.log(name);
      document.getElementById('name').textContent = name;
      document.getElementById('sId').textContent = sId;
      document.getElementById('address').textContent = address;
      document.getElementById('DOB').textContent = DOB;
      document.getElementById('validity').textContent = validity;
      document.getElementById('clickMe').click();
    }
  }
}
// bulk() {
//   ; i <= this.data.length - 1; i++) {
//     name = this.data[i][0];
//     sId = this.data[i][1];
//     address = this.data[i][2];
//     DOB = this.data[i][3];
//     validity = this.data[i][4];

//     console.log(name, sId, address, DOB, validity);

//     // document.getElementById('name').textContent = name;
//     // document.getElementById('sId').textContent = sId;
//     // document.getElementById('address').textContent = address;
//     // document.getElementById('DOB').textContent = DOB;
//     // document.getElementById('validity').textContent = validity;
//     document.getElementById('clickMe').click();
//   }
// }
