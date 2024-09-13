Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/') return new Response('Player Forecasts');
    if (url.pathname === '/raw-game-data') {
      const gamesDataResponse = await fetch(
        'https://fantasy.premierleague.com/api/bootstrap-static'
      );

      console.log(
        gamesDataResponse.ok,
        gamesDataResponse.status,
        await gamesDataResponse.clone().text()
      );

      return Response.json(await gamesDataResponse.json(), {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response('404!');
  },
});
