const CVE = require("../models/cve")

const getAllCVEs = async(req, res) => {
    try {
        let {page,limit, year, lastModified, score, sortByPublished, sortByLastModified} = req.query
        
        // Pagination Logic
        page = page?parseInt(page):1
        limit = limit?parseInt(limit):10
        const skip = (page-1)*limit

        const query = {}
        // Filter By Year - Published Year
        if(year){
            const startDate = new Date(`${year}-01-01T00:00:00.000Z`)
            const endDate = new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`)
            query.published = {
                $gte: startDate,
                $lt: endDate
            }
        }

        // Filter By last modified in last N days
        if(lastModified){
            const currentDate = new Date()
            let lastNthDate = new Date(currentDate)
            lastNthDate.setDate(currentDate.getDate()-parseInt(lastModified))
            query.lastModified = {
                $gte: lastNthDate,
                $lte: currentDate
            }
        }

        // Filter By CVE Score
        if(score){
            //query["metrics.cvssMetricV2.cvssData.baseScore"]=parseInt(score)
            const parsedScore = parseInt(score);
            query.$or = [
                { "metrics.cvssMetricV2.cvssData.baseScore": parsedScore },
                { "metrics.cvssMetricV3.cvssData.baseScore": parsedScore }
            ];
        }

        const totalPagesQuery = await CVE.find(query)
        let cve = CVE.find(query).limit(limit).skip(skip)

        // Sort By Year - Published and Last Modified
        const sortOptions = {}
        if (sortByPublished !== undefined) {
            sortOptions.published = sortByPublished == 'true' ? 1 : -1;
        }
        if (sortByLastModified !== undefined) {
            sortOptions.lastModified = sortByLastModified == 'true' ? 1 : -1;
        }
        if(Object.keys(sortOptions).length>0){
            cve = cve.sort(sortOptions)
        }
        cve = await cve
        res.status(200).json({data:cve,total:totalPagesQuery.length,count:cve.length,currentPage:page,totalPages:Math.ceil(totalPagesQuery.length/limit)})
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const getCVE = async(req,res) => {
    try {
        const {id} = req.params 
        const cve = await CVE.findOne({id})
        if(cve){
            res.status(200).json(cve)
        }
        else{
            res.status(404).json({message:"CVE not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = {
    getAllCVEs,
    getCVE
}