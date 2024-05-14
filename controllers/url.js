const shortid = require('shortid');
const URL=require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body= req.body;
    if(!body.url) return res.status(400).json({error:'url is required.'})
    const shortID=shortid();
    const allUrls=await URL.find({});
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitedHistoey:[],
        createdBy:req.user._id,
    });

    return res.render('home',{
        id:shortID, urls:allUrls,
    });
    return res.json({id:shortID})
}

async function handleDeleteAllData(req, res) {
    try {
        await URL.deleteMany({}); // Delete all documents in the URL collection
        return res.status(200).json({ message: 'All URLs deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting URLs.' });
    }
}


// async function handleGetAnalytics(req,res){
//     const shortId=req.params.shortId;
//     const result= await URL.find({shortId})
//     return res.json({totalClicks: result.visitHistory.length,
//     analytics:result.visitHistory,})
// }


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}


module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,handleDeleteAllData
}