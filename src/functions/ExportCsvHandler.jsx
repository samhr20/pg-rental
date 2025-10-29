import Papa from 'papaparse'

export const handleExportCsv = (data, unparse, fileName) => {
  if (data.length === 0) {
    alert("No Data to Export");
    return;
  }

  // unparse example  
  // adminData.map((admin) => ({
  //       AdminID: admin[newAdminSchema.AdminId],
  //       FullName: admin[newAdminSchema.FullName],
  //       PhoneNumber: admin[newAdminSchema.AdminPhone],
  //       Mail: admin[newAdminSchema.AdminMail],
  //       Role: admin[newAdminSchema.Role],
  //       LastLogin: admin[newAdminSchema.LastLogin],
  //       Status: admin[newAdminSchema.Status] ? "Active" : "Offline",
  //     }))

  const csv = Papa.unparse(unparse)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a")
  link.href = url;
  link.setAttribute("Download", fileName);
  document.body.appendChild(link)
  link.click();
  document.body.removeChild(link);
}
