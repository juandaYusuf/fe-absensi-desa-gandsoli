import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import API_URL from '../API/API_URL';
import axios from 'axios';


const PermissionPDF = ({ user_id, permission_id, nama, jabatan, alamat, jumlah_hari, alasan, kepdes_signature, staf_signature, agreement }, fn) => {

  const today = new Date()
  const day = today.getDate()
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const month = monthNames[today.getMonth()]
  const year = today.getFullYear()
  const formattedDate = `${day} ${month} ${year}`


  pdfMake.vfs = pdfFonts.pdfMake.vfs
  const permisionTitle = []

  const permisionContent = [
    {
      text: `Purwakarta, ${formattedDate}`,
      alignment: 'right'
    },
    {
      text: 'Kepada Yth.',
    },
    {
      text: 'Kepala Desa Gandasoli'
    },
    {
      text: 'Jalan Gandasoli No. 91, Gandasoli, Plered, Kabupaten Purwakarta'
    },
    {
      text: 'Kabupaten Purwakarta',
      margin: [0, 10, 0, 0]
    },
    {
      text: 'Dengan hormat,',
      margin: [0, 10, 0, 0]
    },
    {
      text: 'Yang bertanda tangan dibawah ini :',
      margin: [0, 10, 0, 10]
    },
    {
      columns: [
        {
          width: 70,
          text: 'Nama',
        },
        {
          width: 5,
          text: ':',
        },
        {
          text: `${nama}`,
        }
      ],
      margin: [30, 0, 0, 0]
    },
    {
      columns: [
        {
          width: 70,
          text: 'Jabatan',
        },
        {
          width: 5,
          text: ':',
        },
        {
          text: `${jabatan}`,
        }
      ],
      margin: [30, 0, 0, 0]
    },
    {
      columns: [
        {
          width: 70,
          text: 'Alamat',
        },
        {
          width: 5,
          text: ':',
        },
        {
          text: `${alamat}`,
        }
      ],
      margin: [30, 0, 0, 0]
    },
    {
      margin: [0, 10, 0, 0],
      text: `Dengan surat ini saya bermaksud untuk memohon izin tidak masuk kerja ${jumlah_hari} untuk ${alasan.toLowerCase()}.`
    },
    {
      text: 'Demikian surat ini saya ajukan. Atas izin, perhatian, serta pengertian saya ucapkan terima kasih.'
    },
    {
      columns: [
        {
          text: 'Menyetujui, \n Kepala desa gandasoli',
          margin: [20, 20, 0, 0],
          alignment: 'left'
        },
        {
          text: 'Hormat saya',
          margin: [0, 20, 20, 0],
          alignment: 'right'
        },
      ],
    },
    {
      columns: [
        {
          image: `data:image/png;base64,${kepdes_signature}`,
          width: 100,
          height: 100,
          alignment: 'left'
        },
        {
          text: ''
        },
        {
          image: `data:image/png;base64,${staf_signature}`,
          width: 100,
          height: 100,
          alignment: "right"
        },
      ],

    },
    {
      columns: [
        {
          text: 'Dudun junaedi',
          margin: [20, 0, 0, 0],
          alignment: 'left'
        },
        {
          text: `${nama}`,
          margin: [0, 0, 20, 0],
          alignment: 'right'
        },
      ]
    }
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

  pdfDocGenerator.getBase64((data) => {
    const urlApproving = API_URL().USER_PERMISSION.PERMISSION_APPROVING
    const dataApproving = {
      "user_id": user_id,
      "permission_id": permission_id,
      "agreement": agreement,
      "docs": data,
    }
    axios.put(urlApproving, dataApproving).then(response => {
      fn(response.data.message)
    })
  })

}

export default PermissionPDF
