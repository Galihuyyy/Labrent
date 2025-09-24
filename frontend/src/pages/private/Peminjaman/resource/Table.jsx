import Loader from "../../../../components/elements/Loader"
import no_data from "../../../../assets/images/no-data.png"
import { useServices } from "../../../../services/Services"
import Badge from "../../../../components/elements/Badge"
import ActionButton from "../../../../components/elements/ActionButton"

const Table = (props) => {
	const { getVariantByStatus } = useServices()

	return (
		<div className="w-auto overflow-x-auto mt-4 bg-white p-6 rounded-xl shadow-xl shadow-neutral-200">
			<h4 className="!text-xl flex items-center gap-x-2 !text-gray-600 mb-2">{props.icon ?? ""}{props.title}</h4>
			<Loader show={props.loading} />
			{!props.loading &&
				<table className="min-w-[600px] w-full text-sm text-left">
					<thead className="bg-gray-100 text-gray-600 uppercase">
						<tr className="[&>th]:!font-semibold [&>th]:py-2">
							<th className="text-center" width="15%">Trx Code</th>
							<th className="px-4" width="40%">Peminjam</th>
							<th className="px-4" width="10%">Gender</th>
							<th className="text-center" width="15%">Total Alat</th>
							<th className="text-center">Status</th>
							<th className="text-center min-w-12" width="20%">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(props.data) && props.data.length > 0 ? (
							props.data.map((item, i) => (
								<tr key={i} className="hover:bg-gray-50">
									<td className="text-center py-2">
										<Badge variant={'primary'}>{item.transaksi_code}</Badge></td>
									<td className="px-4 py-2">
										<span className="font-semibold">{item.peminjam?.profile.name}</span>
										<br />
										{item?.peminjam?.email + ' | ' + item?.peminjam?.profile.no_telp}
									</td>
									<td className="px-4 py-2">{item?.peminjam?.profile.gender}</td>
									<td className="px-4 py-2 text-center">{item?.transaksi_details?.length}</td>
									<td className="text-center py-2">
										<Badge variant={getVariantByStatus(item.status)}>{item.status}</Badge>
									</td>

									<td className="py-2">
										<div className="flex items-center justify-content-center gap-x-2">
											{item.status === 'pending' ? (
												<button onClick={() => { accept(item.id) }} className="btn btn-sm btn-outline-primary !bg-blue-100 hover:!bg-blue-500 hover:!text-white px-3 py-1 rounded flex items-center gap-1">
													<i className="bi bi-check"></i>
												</button>
											) : item.status === 'dipinjam' ? (
												<button onClick={() => { kembalikan(item.id) }} className="btn btn-sm btn-outline-success !bg-green-100 hover:!bg-green-700 hover:!text-white px-3 py-1 rounded flex items-center gap-1">
													<i className="bi bi-box-arrow-up"></i>
												</button>
											) : null}
											<ActionButton variant="primary" onClick={() => {window.location.href = `/peminjaman/${item.id}`}}>
												<i className="bi bi-search"></i>
											</ActionButton>
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