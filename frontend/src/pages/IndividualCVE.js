import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualCVE = () => {
  const { id } = useParams();
  const [cve, setCve] = useState({});
  const getIndividualCVE = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cves/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCve(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getIndividualCVE();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="top-margin">
      <h1>{cve.id}</h1>
      {cve.descriptions?.length > 0 && (
        <>
          <h2>Description:</h2>
          <p>{cve.descriptions[0].value}</p>
        </>
      )}
      {cve.metrics?.cvssMetricV2 && (
        <>
          <h2>CVSS V2 Metrics: </h2>
          <div className="flex-inline">
            {cve.metrics?.cvssMetricV2.length > 0 && (
              <span>
                <b>Severity:</b> {cve.metrics?.cvssMetricV2[0]?.baseSeverity}
              </span>
            )}
            {cve.metrics?.cvssMetricV2?.length > 0 && (
              <span>
                <b>Score:</b> {cve.metrics?.cvssMetricV2[0]?.cvssData.baseScore}
              </span>
            )}
          </div>
        </>
      )}
      {cve.metrics?.cvssMetricV2?.length > 0 && (
        <p>
          <b>Vector String:</b>{" "}
          {cve.metrics?.cvssMetricV2[0]?.cvssData.vectorString}
        </p>
      )}
      <h2>Scores: </h2>
      {cve.metrics?.cvssMetricV2?.length > 0 && (
        <p>
          <b>Exploitability Score: </b>
          {cve.metrics?.cvssMetricV2[0]?.exploitabilityScore}
        </p>
      )}
      {cve.metrics?.cvssMetricV2?.length > 0 && (
        <p>
          <b>Impact Score: </b>
          {cve.metrics?.cvssMetricV2[0]?.impactScore}
        </p>
      )}
      {cve.metrics?.cvssMetricV2?.length > 0 &&
        cve.metrics?.cvssMetricV2[0]?.cvssData && (
          <table>
            <thead>
              <tr>
                <th>Access Vector</th>
                <th>Access Complexity</th>
                <th>Authentication</th>
                <th>Confidential Impact</th>
                <th>Integrity Impact</th>
                <th>Availability Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cve.metrics.cvssMetricV2[0].cvssData?.accessVector}</td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData?.accessComplexity}
                </td>
                <td>{cve.metrics.cvssMetricV2[0].cvssData?.authentication}</td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData?.confidentialityImpact}
                </td>
                <td>{cve.metrics.cvssMetricV2[0].cvssData?.integrityImpact}</td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData?.availabilityImpact}
                </td>
              </tr>
            </tbody>
            <br />
          </table>
        )}
      {cve.configurations?.length > 0 &&
        cve.configurations[0]?.nodes?.length > 0 &&
        cve.configurations[0]?.nodes[0].cpeMatch && (
          <>
            <h2>CPE:</h2>
            <table>
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Match Criteria ID</th>
                  <th>Vulnerable</th>
                </tr>
              </thead>
              <tbody>
                {cve.configurations[0].nodes[0].cpeMatch.map((cpe, index) => (
                  <tr key={index}>
                    <td>{cpe?.criteria}</td>
                    <td>{cpe?.matchCriteriaId}</td>
                    <td>{cpe?.vulnerable === true ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
    </div>
  );
};

export default IndividualCVE;
