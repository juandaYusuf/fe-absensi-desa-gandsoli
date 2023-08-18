import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'



const PersonalLeavePDF = ({staf_name, role, email, alamat, reason, signature}, base64) => {


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
      columns: [
        {
          text: `Lampiran : Permohonan cuti melahirkan`,
        },
        {
          width: 150,
          text: `Gandasoli, ${formattedDate}`,
        }
      ]
    },
    {
      columns: [
        {
          text: '',
        },
        {
          width: 150,
          text: 'Kepada, Yth.',
        }
      ]
    },
    {
      columns: [
        {
          text: '',
        },
        {
          width: 150,
          text: 'Kepala desa Gandasoli',
        }
      ]
    },
    {
      columns: [
        {
          text: '',
        },
        {
          width: 150,
          text: 'Di Gandasoli',
        }
      ]
    },
    {
      text: 'Dengan hormat,',
      margin: [0, 10, 0, 0]
    },
    {
      text: 'Yang bertanda tangan dibawah ini :',
      margin: [0, 10, 0, 0]
    },
    {
      margin: [50, 10, 0, 0],
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
          text: staf_name,
        }
      ]
    },
    {
      margin: [50, 0, 0, 0],
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
          text: role,
        }
      ]
    },
    {
      margin: [50, 0, 0, 0],
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
      margin: [50, 0, 0, 0],
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
      text: `Dengan ini saya selaku ${alamat} mengajukan permohonan untuk mendapatkan cuti ${reason},`,
      margin: [0, 10, 0, 0]
    },
    {
      text: 'Demikian surat permohonanan ini untuk menjadikan maklum atas kebijaksanaannya disampaikan. Terimakasih.',
      margin: [0, 0, 0, 20]
    },
    {
      alignment: "center",
      columns: [
        {
          text: '',
          width: 350
        },
        {
          text: "Hormat saya",
        }
      ]
    },
    {
      alignment: "center",
      columns: [
        {
          text: '',
          width: 370
        },
        {
          image: `data:image/png;base64,${signature}`,
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
          text: staf_name,
        }
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
    base64(data)
  })

}

export default PersonalLeavePDF
