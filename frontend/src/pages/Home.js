import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [cves, setCves] = useState([]);

  const getAllCVEs = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cves?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTotalPages(data.totalPages);
      setCount(data.total);
      setCves(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllCVEs();
    // eslint-disable-next-line
  }, [page, limit]);

  const formatDate = (dateString) => {
    return new Date(dateString).toDateString().split(" ").slice(1).join(" ");
  };

  return (
    <div className="container">
      <h1>CVE LIST</h1>
      <div className="flex-btns">
        <span>Total Records: {count}</span>
        <span>Page No: {page}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>CVE ID</th>
            <th>IDENTIFIER</th>
            <th>PUBLISHED DATE</th>
            <th>LAST MODIFIED DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {cves.map((cve) => (
            <tr key={cve.id}>
              <td>
                <Link to={`/cves/${cve.id}`}>{cve.id}</Link>
              </td>
              <td>
                <Link to={`/cves/${cve.id}`}>{cve.sourceIdentifier}</Link>
              </td>
              <td>
                <Link to={`/cves/${cve.id}`}>{formatDate(cve.published)}</Link>
              </td>
              <td>
                <Link to={`/cves/${cve.id}`}>
                  {formatDate(cve.lastModified)}
                </Link>
              </td>
              <td>
                <Link to={`/cves/${cve.id}`}>{cve.vulnStatus}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-btns">
        <div>
          <span>Results per page: </span>
          <select
            name="limit"
            id="limit"
            onChange={(e) => setLimit(parseInt(e.target.value))}
            defaultValue="10"
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </button>
          <button>{page}</button>
          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
