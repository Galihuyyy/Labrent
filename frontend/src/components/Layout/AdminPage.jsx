import React, { Children, useEffect, useState } from "react";
import Navbar from "../fragments/Navbar";
import Sidebar from "../fragments/Sidebar";

function AdminPage(props) {
	const { children } = props;
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="font-[poppins] bg-neutral-100 min-h-svh">
			<div className="relative w-full flex flex-col mx-auto text-neutral-800">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main className="lg:ps-64 max-w-full">
					<Navbar setSidebarOpen={setSidebarOpen} />
					<div className="px-12 pt-20">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}

export default AdminPage;
