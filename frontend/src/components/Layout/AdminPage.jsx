import React, { Children, useState } from "react";
import Navbar from "../fragments/Navbar";
import Sidebar from "../fragments/Sidebar";

function AdminPage(props) {
	const { children } = props;
	const [sidebarOpen, setSidebarOpen] = useState(false);

	sidebarOpen ? "oke" : "ha";
	return (
		<div className="font-[poppins] bg-neutral-100 min-h-svh">
			<div className="relative w-full flex flex-col mx-auto text-neutral-800">
			  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main className="ps-12 sm:ps-64 max-w-full">
				  <Navbar />
          <div className="px-12 pt-20">
            {children}
          </div>
        </main>
			</div>
		</div>
	);
}

export default AdminPage;
