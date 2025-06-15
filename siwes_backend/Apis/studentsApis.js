
const express = require("express")
const router = express.Router()
const prisma = require("../client");

// Set up storage location and filename



// this will fetch each students details
router.get("/fetch-all-anounve", async (req, res) => {
    const { student_id } = req.query;
    try {
        // Find the student's logbook(s)
        const logbooks = await prisma.logbook.findMany({
            where: { student_id: Number(student_id) },
            select: { id: true }
        });

        if (!logbooks || logbooks.length === 0) {
            return res.status(400).json({ message: "No logbook found for this student." });
        }

        // Get all logbook IDs
        const logbookIds = logbooks.map(l => l.id);

        // Fetch all weekly entries for these logbooks
        const all_anounce = await prisma.weekly.findMany({
            where: { logbook_id: { in: logbookIds } },
            orderBy: { createdAt: "asc" }
        });

        if (all_anounce.length === 0) {
            return res.status(400).json({ message: "You have not started uploading." });
        }

        return res.json({
            message: "Successfully fetched weekly uploads.",
            data: all_anounce
        });
    } catch {
        return res.status(400).json({ message: "Kindly look into it." });
    }
});

router.get("/get-logbook", async (req, res, next) => {
    const { std_id } = req.query;
    try {

   const getlOG = await prisma.logbook.findFirst({
  where: {
    student_id: parseInt(std_id)
  }
});

        if (!getlOG) {
            return res.status(300).json({ message: "cant find logbook", data: null })
        }

        return res.status(200).json({ message: "successfully", data: getlOG })
        
    }
    catch (e) {
      
        return res.status(400).json({ message: "kindly retry again" })
    }


})

router.post("/weekly-base", async (req, res) => {
    const { progress, logbook_id } = req.body;
    try {
      
        const weeklyEntries = await prisma.weekly.findMany({
            where: { logbook_id: Number(logbook_id) },
            orderBy: { createdAt: 'desc' }
        });

        // 2. Check if maximum uploads reached
        if (weeklyEntries.length >= 8) {
            return res.status(400).json({ message: "Maximum of 8 weekly uploads reached." });
        }

        // 3. Check if already uploaded this week
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
        const alreadyUploaded = weeklyEntries.some(entry => {
            const entryDate = new Date(entry.createdAt);
            return entryDate >= startOfWeek;
        });
        if (alreadyUploaded) {
            return res.status(400).json({ message: "You can only upload once per week." });
        }

        // 4. Set weekly_tract to current count + 1
        const weekly_tract = weeklyEntries.length + 1;

        // 5. Create new weekly entry
        const newProgress = await prisma.weekly.create({
            data: {
                progress,
                logbook_id: Number(logbook_id),
                weekly_tract
            }
        });

        return res.status(201).json({ message: "Weekly progress uploaded!", data: newProgress });
    } catch (e) {
       
        return res.status(500).json({ message: "An error occurred." });
    }
});






module.exports = router;
