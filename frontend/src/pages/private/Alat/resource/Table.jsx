import Loader from "../../../../components/elements/Loader"
import no_data from "../../../../assets/images/no-data.png"

const Table = (props) => {
  return (
	<div className="w-auto overflow-x-auto mt-4 bg-white p-6 rounded-xl shadow-xl shadow-neutral-200">
		<h4 className="!text-xl flex items-center gap-x-2 !text-gray-600 mb-2">{props.icon ?? ""}{props.title}</h4>
		<Loader show={props.loading}/>
		{!props.loading &&
			<table className="min-w-[600px] w-full text-sm text-left">
				<thead className="bg-gray-100 text-gray-600 uppercase">
				<tr>
					<th className="px-4 py-2" width="5%">No</th>
					<th className="px-4 py-2" width="10%">Foto Alat</th>
					<th className="px-4 py-2" width="15%">Name</th>
					<th className="px-4 py-2" width="50%">Deskripsi</th>
					<th className="px-4 py-2" width="5%">Stok</th>
					<th className="px-4 py-2" width="5%">Keterangan</th>
					<th className="px-4 py-2" width="5%">Aksi</th>
				</tr>
				</thead>
				<tbody>
				{Array.isArray(props.data) && props.data.length > 0 ? (
					props.data?.map((item, i) => (
						<tr key={i} className={`hover:bg-gray-50`}>
							<td className="px-4 py-2 text-center">{i + 1}</td>
							<td className="ps-3 py-2 items">
								<div className="w-16 h-16 overflow-hidden">
									<img src={item.foto_alat} className="w-full h-full object-cover object-center" />
								</div>
							</td>
							<td className="px-4 py-2">{item.name}</td>
							<td className="px-4 py-2">{item.deskripsi}</td>
							<td className="px-4 py-2">{item.stok}</td>
							<td className="px-4 py-2">{item.keterangan}</td>
							<td className="px-4 py-2">
								<div className="flex items-center gap-x-2">
									<button onClick={() => props.onShow('show', item)} className="btn btn-sm btn-primary">
										<i className="bi bi-search"></i>
									</button>
									<button onClick={() => props.onEdit('edit', item)} className="btn btn-sm btn-success">
										<i className="bi bi-pencil"></i>
									</button>
									<button onClick={() => props.onDelete('delete', item)} className="btn btn-sm btn-danger">
										<i className="bi bi-trash"></i>
									</button>
								</div>
							</td>
						</tr>
					))) : (
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