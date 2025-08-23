import Loader from "../../../../components/elements/Loader"
import no_data from "../../../../assets/images/no-data.png"

const Table = (props) => {
	return (
		<div className="w-auto overflow-x-auto mt-4 bg-white p-6 rounded-xl shadow-xl shadow-neutral-200">
			<h4 className="!text-xl flex items-center gap-x-2 !text-gray-600 mb-2">{props.icon ?? ""}{props.title}</h4>
			<Loader show={props.loading} />
			{!props.loading &&
				<table className="min-w-[600px] w-full text-sm text-left">
					<thead className="bg-gray-100 text-gray-600 uppercase">
						<tr>
							<th className="text-center py-2">Trx Id</th>
							<th className="px-4 py-2" width="25%">Peminjam</th>
							<th className="px-4 py-2" width="10%">Gender</th>
							<th className="px-4 py-2" width="20%">Alat Dipinjam</th>
							<th className="text-center py-2">Jumlah</th>
							<th className="text-center py-2">Status</th>
							<th className="text-center py-2 min-w-12">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(props.data) && props.data.length > 0 ? (
							props.data.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="text-center py-2">{item.id}</td>
                                    <td className="px-4 py-2">
										<span className="font-semibold">{item.peminjam?.profile.name}</span>
										<br />
										{item?.peminjam?.email + ' | ' + item?.peminjam?.profile.no_telp }
									</td>
                                    <td className="px-4 py-2">{item?.peminjam?.profile.gender}</td>
                                    <td className="px-4 py-2">{item?.transaksi_details?.alat?.name}</td>
                                    <td className="text-center py-2">{item?.transaksi_details?.jumlah}</td>
                                    <td className="text-center py-2">
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${item.status === 'biru' || item.status === 'pending' ? 'text-yellow-700 bg-yellow-200' :
                                                item.status === 'dikembalikan' ? 'text-green-700 bg-green-200' :
                                                    item.status === 'ditolak' ? 'text-red-700 bg-red-200' : 'text-blue-700 bg-blue-200'
                                            }`}>
                                            {item.status}
                                        </span>

                                    </td>

                                    <td className="py-2">
                                        <div className="flex items-center justify-content-center gap-x-2">
                                            {item.status === 'pending' ? (
                                                <button onClick={() => { accept(item.id) }} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
                                                    <i className="bi bi-check"></i>
                                                </button>
                                            ) : item.status === 'dipinjam' ? (
                                                <button onClick={() => { kembalikan(item.id) }} className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
                                                    <i className="bi bi-box-arrow-up"></i>
                                                </button>
                                            ) : null}


                                            <button onClick={() => { hapusTrx(item.id) }} className="btn btn-sm btn-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
						) : (
							<tr>
								<td colSpan={999} className="text-center py-4 text-gray-600">
									Tidak Ada Data
								</td>
							</tr>
						)
						}
					</tbody>
				</table>
			}
		</div>
	)
}

export default Table