import { Link } from "react-router-dom";
import { questions } from "../constants";

export default function AdminHeader() {
  return (
    <div className="admin-navbar">
      {questions.map((q, index) => {
        return (
          <Link key={index} to={`/admin/results/${q.id}`}>
            Results {q.id}
          </Link>
        );
      })}
    </div>
  );
}
