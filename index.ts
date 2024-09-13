import URLPattern from 'url-pattern';

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/') return new Response('Player Forecasts');

    if (url.pathname === '/raw-game-data') {
      const gamesDataResponse = await fetch(
        // 'https://fantasy.premierleague.com/api/bootstrap-static',
        'https://test.cors.workers.dev/?https://fantasy.premierleague.com/api/bootstrap-static'
        // 'https://catfact.ninja/fact',
      );

      console.log(
        gamesDataResponse.ok,
        gamesDataResponse.status,
        gamesDataResponse.statusText
      );

      return Response.json(await gamesDataResponse.json(), {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const playerResourcePattern = new URLPattern('/api/players(/:id)');

    const playerResourceMatch = playerResourcePattern.match(url.pathname);

    if (playerResourceMatch) {
      return Response.json(playerResourceMatch);
    }

    return new Response('404! ');
  },
});
