import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import axios from 'axios'
import API_URL from '../API/API_URL'

const AttendanceSheetPDF = async (month, year, callBack) => {

  const attendanceDatas = async () => {
    const url = API_URL(month, year).ATTENDANCE.ATTENDANCE_SHEETS
    return await axios.get(url)
  }

  const applyData = await attendanceDatas()

  pdfMake.vfs = pdfFonts.pdfMake.vfs
  const docTitle = []
  const docContent = applyData.data.map((result) => {


    const tbody = []

    for (let i = 0; i < result.attendance.length; i += 2) {


      const row = [
        { text: i + 1 },
        { text: `${result.attendance[i].first_name} ${result.attendance[i].last_name}` },
        { text: result.attendance[i].role },
        { text: result.attendance[i].created_at_in },
        !!result.attendance[i].signature ? { image: `data:image/png;base64,${result.attendance[i].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " },
        !!result.attendance[i].signature ? { image: `data:image/png;base64,${result.attendance[i].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " },
        { text: result.attendance[i].created_at_out },
        !!result.attendance[i].signature ? { image: `data:image/png;base64,${result.attendance[i].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " },
        !!result.attendance[i].signature ? { image: `data:image/png;base64,${result.attendance[i].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " },
      ];

      if (i + 1 < result.attendance.length) {
        // Hanya untuk data dengan indeks genap, tambahkan elemen dengan rowSpan
        row[4] = { rowSpan: 2, stack: [{ style: { fontSize: 8 }, text: i + 1, width: 5, height: 5 }, !!result.attendance[i].signature ? { image: `data:image/png;base64,${result.attendance[i].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " }] }
        row[5] = { rowSpan: 2, stack: [{ style: { fontSize: 8 }, text: i + 2, width: 5, height: 5 }, !!result.attendance[i + 1].signature ? { image: `data:image/png;base64,${result.attendance[i + 1].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i + 1].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i + 1].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i + 1].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " }] }
        row[7] = { rowSpan: 2, stack: [{ style: { fontSize: 8 }, text: i + 1, width: 5, height: 5 }, !!result.attendance[i].signature ? { image: `data:image/png;base64,${result.attendance[i].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " }] }
        row[8] = { rowSpan: 2, stack: [{ style: { fontSize: 8 }, text: i + 2, width: 5, height: 5 }, !!result.attendance[i + 1].signature ? { image: `data:image/png;base64,${result.attendance[i + 1].signature}`, width: 50, height: 50, alignment: "center" } : result.attendance[i + 1].presence_status === 'sakit' ? { text: "S", alignment: 'center' } : result.attendance[i + 1].presence_status === 'izin' ? { text: 'I', alignment: 'center' } : result.attendance[i + 1].presence_status === 'cuti' ? { text: "C", alignment: 'center' } : { text: " " }] }
      }

      tbody.push(row);

      // Hanya tambahkan baris untuk data indeks ganjil
      if (i + 1 < result.attendance.length) {
        tbody.push([
          { text: i + 2 },
          { text: `${result.attendance[i + 1].first_name} ${result.attendance[i + 1].last_name}` },
          { text: result.attendance[i + 1].role },
          { text: result.attendance[i + 1].created_at_in },
          { text: ' ' }, // Kolom untuk indeks ganjil
          { text: ' ' }, // Kolom untuk indeks ganjil
          { text: result.attendance[i + 1].created_at_out },
          { text: ' ' }, // Kolom untuk indeks ganjil
          { text: ' ' }  // Kolom untuk indeks ganjil
        ]);
      }
    }

    return [
      {
        alignment: "center",
        columns: [
          {
            text: '',
          },
          {
            text: 'DESA GANDASOLI \n KECAMATAN PLERED KABUPATEN PURWAKARTA',
            margin: [0, 0, 0, 10],
            width: 500,
            style: {
              bold: true,
              fontSize: 14
            }
          },
          {
            text: ''
          }
        ]
      },
      {
        columns: [
          {
            text: `Hari : ${result.day_name}`,
            margin: [0, 0, 0, 20],
            width: 200
          },
          {
            text: `Tanggal : ${result.date}`,
            margin: [0, 0, 0, 20]
          },
        ]
      },
      {
        table: {
          widths: [17, 'auto', 'auto', 48, '*', '*', 48, '*', '*'],
          body: [
            [{ text: 'No', alignment: "center", margin: [0, 8, 0, 0], style: { bold: true } }, { text: 'Nama', alignment: "center", style: { bold: true }, margin: [0, 8, 0, 0] }, { text: 'Jabatan', alignment: "center", style: { bold: true }, margin: [0, 8, 0, 0] }, { text: 'Waktu \n Datang', alignment: "center", style: { bold: true }, }, { text: 'Tanda Tangan', colSpan: 2, alignment: "center", margin: [0, 8, 0, 0], style: { bold: true } }, {}, { text: 'Waktu \n Pulang', alignment: "center", style: { bold: true } }, { text: 'Tanda Tangan', colSpan: 2, alignment: "center", margin: [0, 8, 0, 0], style: { bold: true } }, {}],
            ...tbody
          ]
        },
      },
      {
        margin: [0, 15, 0, 0],
        columns: [
          {
            stack: [
              { text: 'Keterangan :', decoration: 'underline', margin: [10, 0, 0, 0], style: { bold: true, fontSize: 10 } },
              {
                margin: [20, 0, 0, 0],
                ol: [
                  {
                    columns: [
                      { text: "DL", width: 20, style: { bold: true, fontSize: 10 } },
                      { text: ":", width: "auto", margin: [0, 0, 3, 0], style: { bold: true, fontSize: 10 } },
                      { text: "Dinas Luar (Lampirkan surat tugas)", width: "auto", style: { bold: true, fontSize: 10 } }
                    ]
                  },
                  {
                    columns: [
                      { text: "S", width: 20, style: { bold: true, fontSize: 10 } },
                      { text: ":", width: "auto", margin: [0, 0, 3, 0], style: { bold: true, fontSize: 10 } },
                      { text: "Sakit (Lampirkan surat dokter)", width: "auto", style: { bold: true, fontSize: 10 } }
                    ]
                  },
                  {
                    columns: [
                      { text: "C", width: 20, style: { bold: true, fontSize: 10 } },
                      { text: ":", width: "auto", margin: [0, 0, 3, 0], style: { bold: true, fontSize: 10 } },
                      { text: "Lampirkan surat cuti dari atasan", width: "auto", style: { bold: true, fontSize: 10 } }
                    ]
                  },
                  {
                    columns: [
                      { text: "I", width: 20, style: { bold: true, fontSize: 10 } },
                      { text: ":", width: "auto", margin: [0, 0, 3, 0], style: { bold: true, fontSize: 10 } },
                      { text: "Lampirkan surat izin dari atasan", width: "auto", style: { bold: true, fontSize: 10 } }
                    ]
                  }
                ]
              }
            ]
          },
          {
            text: ' ',
          },
          {
            alignment: "center",
            margin: [100, 0, 0, 0],
            stack: [
              { text: 'Kepala Desa Gandasoli' },
              {
                image: `data:image/png;base64,${result.hv_signature}`,
                width: 100, height: 100,
              },
              { text: result.hv_name, style: { bold: true }, pageBreak: 'after' },
            ]
          }
        ]
      }
    ]
  })
  const roadap = []

  const docDefinitionss = {
    pageSize: 'A4',
    pageMargins: [20, 20, 20, 20],
    header: [docTitle],
    content: [docContent],
    footer: [roadap],
    pageOrientation: 'landscape',
  }


  pdfMake.createPdf(docDefinitionss).open()
  callBack(false)

  // const pdfDocGenerator = pdfMake.createPdf(docDefinitionss)
  // pdfDocGenerator.getBase64((base64) => {
  //   console.log(base64)
  // })


}

export default AttendanceSheetPDF
