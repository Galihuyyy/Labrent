import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../utils/getToken'
import { config } from '../../../config'
import { toast } from 'react-toastify'
import AdminPage from '../../../components/Layout/AdminPage'
import { Add, HardwareOutlined, ListAlt  } from '@mui/icons-material'
import Table from './resource/Table'
import CardHeader from '../../../components/fragments/CardHeader'
import throttle from '../../../utils/Throttle'
import ModalForm from './resource/ModalForm'

function Admin() {

  // init --------
  const { id } = useParams()
  const token = getToken()
  const apiUrl = config.API_URL
  const [openForm, setOpenForm] = useState(false)
  const [loading, setLoading] = useState(null)
  const [loadingForm, setLoadingForm] = useState(null)
  const [mode, setMode] = useState("create")
  const [selectedId, setSelectedId] = useState(null)

  const [dataAdmin, setDataAdmin] = useState([])

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    gender: '',
    no_telp: '',
    password: '',
    confirm_password: ''
  })

  // ------------

  // method -----
  function getDataAlat() {
    setLoading(true)
    axios.get(`${apiUrl}/home/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setDataAdmin(res.data.data)
      })
      .catch((err) => {
        toast.error('Gagal mengambil data alat!')
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function onChange(e) {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name == 'foto_alat' ? files[0] : value
    }))

  }

  function toggleForm(method = null, id = null) {
    if (method == 'create' && mode == "edit" || mode == "edit") resetForm()
    if (['edit', 'show'].includes(method)) setSelectedId(id)
    setMode(method)

    setOpenForm(!openForm)
  }

  function submitForm() {
    throttle(() => {
      if (mode != "create") {
        actionUpdate()
      } else {
        actionCreate()
      }
    }, 2000)
  }

  function actionCreate() {
    setLoadingForm(true)

    axios.post(`${apiUrl}/home/admin`, formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        getDataAlat()
        toggleForm()
        resetForm()
        toast.success(res?.data.message)
      })
      .catch(err => {
        toast.error({
          type: 'error',
          render: err.response.data?.message || 'Gagal Ditambahkan!',
          isLoading: false,
          hideProgressBar: false,
          autoClose: true,
          closeButton: true
        })
      })
      .finally(() => { setLoadingForm(false) })
  }

  function actionUpdate() {
    setLoadingForm(true)

    axios.put(`${apiUrl}/home/admin/${selectedId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setMode(null)
        setSelectedId(null)
        getDataAlat()
        toggleForm()
        resetForm()
        toast.success(res.data.message)
      })
      .catch(err => {
        toast.error({
          type: 'error',
          render: err.response.data?.message || 'Gagal Ditambahkan!',
          isLoading: false,
          hideProgressBar: false,
          autoClose: true,
          closeButton: true
        })
      })
      .finally(() => { setLoadingForm(false) })
  }

  function resetForm() {
    setFormData({
      username: '',
      email: '',
      name: '',
      gender: '',
      no_telp: '',
      password: '',
      confirm_password: '',
    })
  }

  function handleShowAndUpdate(method = "show", item) {
    setMode(method)
    setFormData({
      username: item.username,
      email: item.email,
      name: item.profile.name,
      gender: item.profile.gender,
      no_telp: item.profile.no_telp,
    })
    setSelectedId(item.id)
    setOpenForm(true)
  }

  function handleDelete(method = "delete", item) {
    setMode(method)
    setSelectedId(item.id)
    setOpenForm(true)
  }

  function actionDelete() {
    setLoadingForm(true)
    axios.delete(`${apiUrl}/home/admin/${selectedId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { toast.success("Alat berhasil dihapus"); setOpenForm(false); getDataAlat() })
      .catch(err => console.log(err.response))
      .finally(() => { setLoadingForm(false) })
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
        <CardHeader icon={<HardwareOutlined />} title="Manajemen Admin" withButton="true" buttonIcon={<Add />} buttonTitle="Tambah Admin" onClickBtn={() => { toggleForm('create') }} />
        <Table icon={<ListAlt />} title="Lists Admin" data={dataAdmin} onEdit={(method, item) => { handleShowAndUpdate('edit', item) }} onShow={(method, item) => { handleShowAndUpdate('show', item) }} onDelete={(method, item) => { handleDelete('delete', item) }} loading={loading} />

        {openForm &&
          <ModalForm
            onClose={() => { toggleForm() }}
            form={formData}
            onChange={(e) => onChange(e)}
            // onChangeFiles={(e) => {handleFileChange(e)}}
            onSubmit={(method) => { submitForm('create') }}
            onSubmitUpdate={(e) => { submitForm() }}
            onDelete={() => actionDelete()}
            loading={loadingForm}
            mode={mode}
          />
        }

      </div>
    </AdminPage>
  )
}

export default Admin
