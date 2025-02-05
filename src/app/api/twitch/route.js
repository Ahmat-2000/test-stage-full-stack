import { env } from "@/app/utils/env";

// https://api-docs.igdb.com/?ref=grantwinney.com#franchise
export async function GET() {
  try {
    const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${env.NEXT_PUBLIC_Twitch_API_ID}&client_secret=${env.TWITCH_SECRET_API_KEY}&grant_type=client_credentials`,{
      method : "POST",
    });
    const data = await response.json();
    /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    const accessToken = data.access_token;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Failed to get token" }), { status: 500 });
    }

    const gameResponse = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': env.NEXT_PUBLIC_Twitch_API_ID,
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: `fields name, genres.name, platforms.name, cover.url, first_release_date, rating, rating_count, url; limit 10;`
      // body: "fields *;"
    });
    let game = await gameResponse.json();
    console.log(game);
    game = game.map((item) => {
      return {name : item.name, }
    })
    return Response.json(game,{status: 200});
  } catch (error) {
    return Response.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
