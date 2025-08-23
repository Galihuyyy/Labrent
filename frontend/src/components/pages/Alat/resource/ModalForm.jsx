import Loader from "../../../elements/Loader"

function ModalForm({ form, onChange, onClose, onSubmit, mode, loading, onDelete }) {
    const readonly = mode == "show"
  return (
    <div className="fixed-top min-h-svh w-full grid place-items-center bg-black/50">
        <main className='relative w-full max-w-xl mx-auto p-4 bg-white rounded shadow-md'>
            <Loader absolute={true} show={loading}></Loader>
            <h2 className="text-xl font-semibold text-gray-700 mb-4"><i onClick={onClose} className="bi bi-caret-left cursor-pointer"></i> {mode} Alat</h2>
            {mode != 'delete' ?
                (<div className="space-y-4">
                    {/* Nama Alat */}
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Alat</label>
                    <input
                        type="text"
                        value={form.name}
                        id='name'
                        name='name'
                        onChange={onChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Masukkan nama alat"
                        disabled={readonly}
                        autoComplete="name"
                    />
                    </div>

                    {/* Deskripsi */}
                    <div>
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                        rows={4}
                        id="deskripsi"
                        name='deskripsi'
                        value={form.deskripsi}
                        onChange={onChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tulis deskripsi alat"
                        disabled={readonly}
                    ></textarea>
                    </div>

                    {/* Stok */}
                    <div>
                    <label htmlFor="stok" className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                    <input
                        type="number"
                        id="stok"
                        name='stok'
                        value={form.stok}
                        onChange={onChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Jumlah stok"
                        disabled={readonly}
                    />
                    </div>

                    {/* Keterangan */}
                    <div>
                    <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                    <select value={form.keterangan} id="keterangan" name='keterangan' onChange={onChange} disabled={readonly} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Pilih status</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Aman">Aman</option>
                        <option value="Rusak">Rusak</option>
                    </select>

                    {/* foto_alat */}
                    <div className='mt-4'>
                        <label htmlFor="foto_alat" className="block text-sm font-medium text-gray-700 mb-1">
                            Foto Alat
                        {form.foto_alat && (
                            <img src={form.foto_alat} alt={"preview"} width={144} />
                        )}
                        </label>
                        <input
                            disabled={readonly}
                            type="file"
                            name="foto_alat"
                            multiple
                            id="foto_alat"
                            onChange={onChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100
                            focus:outline-none"
                        />
                    </div>

                    </div>
                </div>)
                :
                (
                    <p>Anda yakin ingin menghapus alat ini? </p>
                )
            }
            {/* Submit */}
            <div className="text-right">
                {mode == "create" &&
                    <button
                        onClick={() => {onSubmit('create')}}
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        Simpan
                    </button>
                }
                {mode == "edit" &&
                    <button
                        onClick={() => {onSubmit('edit')}}
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        Update
                    </button>
                }
                {mode == "show" &&
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                }
                {mode == "delete" &&
                    <button
                        onClick={onDelete}
                        type="button"
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                }
            </div>
        </main>
    </div>

  )
}

export default ModalForm
