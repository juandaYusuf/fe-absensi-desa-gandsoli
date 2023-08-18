import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Logo from '../Assets/Logo/logo.png'
import API_URL from '../API/API_URL'
import axios from 'axios'

const AgreementPersonalLeavePDF = ({ personal_leave_type, user_name, user_role, email, alamat, start_date, end_date, created_at, hv_name, hv_signature, staf_id, personal_leave_id, agreement, is_approving}, callBackFn) => {

  const today = new Date()
  const day = today.getDate()
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const month = monthNames[today.getMonth()]
  const year = today.getFullYear()
  const formattedDate = `${day} ${month} ${year}`

  const getImageDataURL = async () => {
    const response = await fetch(Logo)
    const blob = await response.blob()
    const reader = new FileReader()
    reader.onload = () => {
      const dataURL = reader.result

      // Melakukan load image dengan base64 


      // !==============================START PDF==============================
      pdfMake.vfs = pdfFonts.pdfMake.vfs
      const permisionTitle = []

      const permisionContent = [
        {
          alignment: 'center',
          columns: [
            {
              image: dataURL,
              width: 100,
              height: 100,
            },
            {
              text: "PEMERINTAH KABUPATEN PURWAKARTA \n KECAMATAN PLERED \n KANTOR KEPALA DESA GANDASOLI",
              margin: [0, 20, 0, 0],
              style: {
                fontSize: 16,
                bold: true
              }
            },
            {
              text: '',
              width: 100
            }
          ]
        },
        {
          style: {
            margin: [20, 0, 20, 0]
          },
          table: {
            headerRows: 1,
            body: [
              [{ text: '', style: 'tableHeader' }, { text: '', style: 'tableHeader' }, { text: '------------------------------------------------------------------------------------------------------------------------------------------------', color: "white", style: 'tableHeader' }],
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          text: "SURAT IZIN CUTI PERANGKAT DESA",
          decoration: "underline",
          alignment: "center",
          style: {
            bold: true
          }
        },
        {
          margin: [0, 10, 0, 0],
          text: `Yang bertandatangan dibawah ini Kepala Desa Gandasoli Kecamatan Plered Kabupaten Purwakarta, dengan ini memberikan izin cuti ${personal_leave_type} kepada :`
        },
        {
          margin: [30, 10, 0, 0],
          columns: [
            {
              width: 70,
              text: "Nama",
            },
            {
              width: 5,
              text: " :",
            },
            {
              text: user_name,
            }
          ]
        },
        {
          margin: [30, 0, 0, 0],
          columns: [
            {
              width: 70,
              text: "Jabatan",
            },
            {
              width: 5,
              text: " :",
            },
            {
              text: user_role,
            }
          ]
        },
        {
          margin: [30, 0, 0, 0],
          columns: [
            {
              width: 70,
              text: "Email",
            },
            {
              width: 5,
              text: " :",
            },
            {
              text: email,
            }
          ]
        },
        {
          margin: [30, 0, 0, 0],
          columns: [
            {
              width: 70,
              text: "Alamat",
            },
            {
              width: 5,
              text: " :",
            },
            {
              text: alamat,
            }
          ]
        },
        {
          margin: [0, 10, 0, 0],
          text: `Kepada yang bersangkutan diberikan cuti terhitung sejak ${start_date} sampai dengan ${end_date} dengan ketentuan setelah selesai menjalankan cuti wajib melaporkan kepada Kepala Desa Gandasoli.`,
        },
        {
          margin: [0, 5, 0, 0],
          text: `Surat izin cuti diberikan berdasarkan surat permohonan izin cuti ${personal_leave_type} yang bersangkutan yang diterima tanggal ${created_at}`,
        },
        {
          margin: [0, 10, 0, 20],
          text: 'Demikian surat izin cuti ini dibuat untuk dipergunakan sebagai mestinya.'
        },
        {
          alignment: "center",
          columns: [
            {
              text: '',
              width: 350
            },
            {
              text: formattedDate,
              decoration: "underline"
            },
          ]
        },
        {
          alignment: "center",
          columns: [
            {
              text: '',
              width: 350
            },
            {
              text: 'Kepala Desa Gandasoli',
              decoration: "underline"
            },
          ]
        },
        {
          alignment: "center",
          columns: [
            {
              text: '',
              width: 380
            },
            {
              image: `data:image/png;base64,${hv_signature}`,
              width: 100,
              height: 100,
            }
          ]
        },
        {
          alignment: "center",
          columns: [
            {
              text: '',
              width: 350
            },
            {
              text: hv_name,
              decoration: "underline"
            }
          ]
        },
        {
          margin: [0, 50, 0, 0],
          text: "Tembusan :"
        },
        {
          margin: [30, 0, 0, 0],
          ol: [
            'Yth. Camat Plered :',
            'Yth. Ketua BPD Gandasoli di Gandasoli :',
            'Yth. Sekretaris Desa Gandasoli di Gandasoli :',
            'Arsip.'
          ]
        },
      ]

      const roadap = []

      const docDefinitionss = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        header: [permisionTitle],
        content: [permisionContent],
        footer: [roadap]
      }

      // pdfMake.createPdf(docDefinitionss).open()
      const pdfDocGenerator = pdfMake.createPdf(docDefinitionss)
      pdfDocGenerator.getBase64((base64) => {
        const url = API_URL().PERSONAL_LEAVE.PERSONAL_LEAVE_APPROVING
        const data = {
          "user_id": staf_id,
          "personal_leave_id": personal_leave_id,
          "agreement": is_approving,
          "agreement_docs": base64,
        }
        axios.put(url, data).then(response => {
          callBackFn(response.data)
        })
        
      })
      // !==============================END PDF==============================
    }
    reader.readAsDataURL(blob)

  }

  getImageDataURL()
}

export default AgreementPersonalLeavePDF
