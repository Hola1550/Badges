export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    
    const { universeId, badgeId } = req.query
    
    if (badgeId) {
        const respuesta = await fetch(`https://badges.roblox.com/v1/badges/${badgeId}`)
        const datos = await respuesta.json()
        return res.status(200).json(datos)
    }
    
    if (!universeId) {
        return res.status(400).json({ error: "Falta universeId" })
    }
    
    let url = `https://badges.roblox.com/v1/universes/${universeId}/badges?limit=100&sortOrder=Asc`
    if (req.query.cursor) url += `&cursor=${req.query.cursor}`
    
    const respuesta = await fetch(url)
    const datos = await respuesta.json()
    res.status(200).json(datos)
}
