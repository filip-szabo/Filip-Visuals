import React from "react";
import './ShowUsers.css';
import AdminNav from "../../common/Navbar/AdminNav/AdminNav";
import DataTable from "../../common/DataTable/DataTable";

function ShowUsers() {
    return(
      <>
          <AdminNav />
          <DataTable />
      </>
    );
}

export default ShowUsers;