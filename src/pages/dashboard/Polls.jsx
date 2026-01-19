import { Outlet } from "react-router-dom";

export default function Polls() {
  return (
    <div>
      <h1>Polls</h1>
      <Outlet />
    </div>
  );
}
