import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../utils/getToken'
import { config } from '../../../config'
import { toast } from 'react-toastify'
import AdminPage from '../../Layout/AdminPage'
import { Add, HardwareOutlined, PlaylistAddCheck, PlaylistRemove } from '@mui/icons-material'
import Table from './resource/Table'
import CardHeader from '../../fragments/CardHeader'
import throttle from '../../../utils/Throttle'
import ModalForm from './resource/ModalForm'

function FormUpdate() {

  // init --------
    const { id } = useParams()
    const token = getToken()
    const apiUrl = config.API_URL
    const [openForm, setOpenForm] = useState(false)
    const [loading, setLoading] = useState(null)
    const [loadingForm, setLoadingForm] = useState(null)
    const [mode, setMode] = useState("create")
    const [selectedId, setSelectedId] = useState(null)
    
    const [dataAlatTersedia, setDataAlatTersedia] = useState([])
    const [dataAlatTidakTersedia, setDataAlatTidakTersedia] = useState([])

    const [formData, setFormData] = useState({
      name: '',
      deskripsi: '',
      stok: '',
      keterangan: '',
      foto_alat: ''
    })
    
  // ------------

  // method -----
    function getDataAlat () {
      setLoading(true)
      axios.get(`${apiUrl}/home/alat`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setDataAlatTidakTersedia(res.data.data.alat_tidak_tersedia)
        setDataAlatTersedia(res.data.data.alat_tersedia)
      })
      .catch((err) => {
        toast.error('Gagal mengambil data alat!')
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
    }

    function onChange (e) {
      const { name, value, files } = e.target
      setFormData(prev => ({
          ...prev,
          [name]: name == 'foto_alat' ? files[0] : value
      }))

    }

    function toggleForm (method = null , id = null) {
      if (method == 'create' && mode == "edit" || mode == "edit") resetForm()
      if (['edit', 'show'].includes(method)) setSelectedId(id)
      setMode(method)
      
      setOpenForm(!openForm)
    }

    function submitForm() {
        throttle(() => {
          if (mode != "create"){
            actionUpdate()
          }else {
            actionCreate()
          }
        }, 2000)
    }

    function actionCreate () {
      setLoadingForm(true)
      const data = new FormData()
      data.append('name', formData.name)
      data.append('deskripsi', formData.deskripsi)
      data.append('stok', formData.stok)
      data.append('keterangan', formData.keterangan)
      data.append('foto_alat', formData.foto_alat);
      
      axios.post(`${apiUrl}/home/alat`, data, {headers :{Authorization : `Bearer ${token}`}})
      .then(res => {
        getDataAlat()
        toggleForm()
        resetForm()
        toast.success("Berhasil Tambah Alat")
      })
      .catch(err => {
        toast.error({
                type : 'error',
                render : err.response.data?.message || 'Gagal Ditambahkan!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeButton : true
            })
        })
        .finally(() => {setLoadingForm(false)})
    }
      
    function actionUpdate () {
      setLoadingForm(true)
      
      const data = new FormData()
      data.append('_method', 'PUT')
      data.append('name', formData.name)
      data.append('deskripsi', formData.deskripsi)
      data.append('stok', formData.stok)
      data.append('keterangan', formData.keterangan)

      if (formData.foto_alat) data.append('foto_alat', formData.foto_alat)
      axios.post(`${apiUrl}/home/alat/${selectedId}`, data, {headers :{Authorization : `Bearer ${token}`}})
      .then(res => {
          setMode(null)
          setSelectedId(null)
          getDataAlat()
          toggleForm()
          resetForm()
          toast.success("Berhasil Update Alat")
      })
      .catch(err => {
          toast.error({
              type : 'error',
              render : err.response.data?.message || 'Gagal Ditambahkan!',
              isLoading : false,
              hideProgressBar : false,
              autoClose : true,
              closeButton : true
          })
      })
      .finally(() => {setLoadingForm(false)})
    }

    function resetForm () {
      setFormData({
        name: '',
        deskripsi: '',
        stok: '',
        keterangan: '',
        foto_alat: ''
      })
    }

    function handleShowAndUpdate (method = "show", item) {
      setMode(method)
      setFormData({
        name: item.name,
        deskripsi: item.deskripsi,
        stok: item.stok,
        keterangan: item.keterangan,
        foto_alat: item.foto_alat.foto
      })
      setSelectedId(item.id)
      setOpenForm(true)
    }

    function handleDelete (method = "delete", item) {
      setMode(method)
      setSelectedId(item.id)
      setOpenForm(true)
    }

    function actionDelete () {
      setLoadingForm(true)
      axios.delete(`${apiUrl}/home/alat/${selectedId}`, {headers : { Authorization : `Bearer ${token}`}})
      .then(res => {toast.success("Alat berhasil dihapus"); setOpenForm(false); getDataAlat()})
      .catch(err => console.log(err.response))
      .finally(() => {setLoadingForm(false)})
    }
    
  // ------------

  // mounted ----
    useEffect(() => {
      getDataAlat()
    }, [])

  // ------------

  return (
    <AdminPage>
        <div className="mt-6 pb-6">
          <CardHeader icon={<HardwareOutlined/>} title="Manajemen Alat" withButton="true" buttonIcon={<Add/>} buttonTitle="Tambah Alat" onClickBtn={() => {toggleForm('create')}} />
          <Table icon={<PlaylistAddCheck/>} title="Alat Tersedia" data={dataAlatTersedia} onEdit={(method, item) => {handleShowAndUpdate('edit',item)}} onShow={(method, item) => {handleShowAndUpdate('show',item)}} onDelete={(method, item) => {handleDelete('delete', item)}} loading={loading}/>
          <Table icon={<PlaylistRemove/>} title="Alat Tidak Tersedia" data={dataAlatTidakTersedia} loading={loading}/>

          {openForm &&
            <ModalForm
              onClose={() => {toggleForm()}}
              form={formData}
              onChange={(e) => onChange(e)}
              // onChangeFiles={(e) => {handleFileChange(e)}}
              onSubmit={(method) => {submitForm('create')}}
              onSubmitUpdate={(e) => {submitForm()}}
              onDelete={() => actionDelete()}
              loading={loadingForm}
              mode = {mode}
            />
          }

        </div>
    </AdminPage>
  )
}

export default FormUpdate
