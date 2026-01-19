import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: "220px", background: "#f5f5f5", padding: "15px" }}>
      <p><b>Menu</b></p>
      <Link to="/dashboard">Dashboard</Link><br />
      <Link to="/dashboard/petitions">Petitions</Link><br />
      <Link to="/dashboard/polls">Polls</Link><br />
      <Link to="/dashboard/officials">Officials</Link><br />
      <Link to="/dashboard/reports">Reports</Link><br />
      <Link to="/dashboard/settings">Settings</Link><br />
      <Link to="/dashboard/help">Help & Support</Link>
    </div>
  );
}
