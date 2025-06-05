import AdminDashboard from "../components/admin/AdminDashBoard";

const AdminPage = () => {
  document.title = "Panel de Administración";
  return (
    <main className="container">
      <h1>Panel de Administración</h1>

      <AdminDashboard />
    </main>
  );
};

export default AdminPage;
