export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    
    const { universeId, cursor } = req.query
    
    if (!universeId) {
        return res.status(400).json({ error: "Falta universeId" })
    }
    
    let url = `https://badges.roblox.com/v1/universes/${universeId}/badges?limit=100&sortOrder=Asc`
    if (cursor) url += `&cursor=${cursor}`
    
    const respuesta = await fetch(url)
    const datos = await respuesta.json()
    
    res.status(200).json(datos)
}

