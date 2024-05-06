const CVE = require("../models/cve")

const loadData = async(req,res) => {
    try {
        const response = await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0")
        const data = await response.json()
        const vulnerabilities = data.vulnerabilities
        const cleanData = []
        for(var i=0;i<data.resultsPerPage;i++){
            cleanData.push(vulnerabilities[i].cve)
        }
        await CVE.create(cleanData)
        console.log("Data inserted successfully")
    } catch (error) {
        console.log(error);
    }
}

module.exports = loadData