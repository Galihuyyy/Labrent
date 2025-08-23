import Loader from "../../../../components/elements/Loader"

function ModalForm({ form, onChange, onClose, onSubmit, mode, loading, onDelete }) {
    const readonly = mode == "show"
    return (
        <div className="fixed-top min-h-svh w-full grid place-items-center bg-black/50">
            <main className='relative w-full max-w-xl mx-auto p-4 bg-white rounded shadow-md'>
                <Loader absolute={true} show={loading}></Loader>
                <h2 className="text-xl font-semibold text-gray-700 mb-4"><i onClick={onClose} className="bi bi-caret-left cursor-pointer"></i> {mode} Admin</h2>
                {mode != 'delete' ?
                    (<div className="space-y-4">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={form.username}
                                id='username'
                                name='username'
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Masukkan username"
                                disabled={readonly}
                                autoComplete="username"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                id='email'
                                name='email'
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Masukkan email"
                                disabled={readonly}
                                autoComplete="email"
                            />
                        </div>

                        {/* Nama Lengkap */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={form.name}
                                id='name'
                                name='name'
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Masukkan name"
                                disabled={readonly}
                                autoComplete="name"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select value={form.gender} id="gender" name='gender' onChange={onChange} disabled={readonly} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">Pilih gender</option>
                                <option value="pria">Pria</option>
                                <option value="wanita">Wanita</option>
                            </select>
                        </div>

                        {/* No Telepon */}
                        <div>
                            <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700 mb-1">No Telepon</label>
                            <input
                                type="tel"
                                id="no_telp"
                                name='no_telp'
                                value={form.no_telp}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Masukkan Nomor Telepon"
                                max="15"
                                required
                                disabled={readonly}
                            />
                        </div>

                        {mode == "create" &&
                            <>
                            
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        id='password'
                                        name='password'
                                        onChange={onChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Masukkan password"
                                        disabled={readonly}
                                        autoComplete="password"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={form.confirm_password}
                                        id='confirm_password'
                                        name='confirm_password'
                                        onChange={onChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="konfirmasi password"
                                        disabled={readonly}
                                        autoComplete="confirm_password"
                                    />
                                </div>
                            </>
                        }
                    </div>)
                    :
                    (
                        <p>Anda yakin ingin menghapus admin ini? </p>
                    )
                }
                {/* Submit */}
                <div className="text-right">
                    {mode == "create" &&
                        <button
                            onClick={() => { onSubmit('create') }}
                            type="button"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition mt-3"
                        >
                            Simpan
                        </button>
                    }
                    {mode == "edit" &&
                        <button
                            onClick={() => { onSubmit('edit') }}
                            type="button"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition mt-3"
                        >
                            Update
                        </button>
                    }
                    {mode == "show" &&
                        <button
                            onClick={onClose}
                            type="button"
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition mt-3"
                        >
                            Cancel
                        </button>
                    }
                    {mode == "delete" &&
                        <button
                            onClick={onDelete}
                            type="button"
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition mt-3"
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
