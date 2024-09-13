import URLPattern from 'url-pattern';

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/') return new Response('Player Forecasts');

    if (url.pathname === '/raw-game-data') {
      const gamesDataResponse = await fetch(
        'https://fantasy.premierleague.com/api/bootstrap-static',
        // 'https://catfact.ninja/fact',
        {
          headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            pragma: 'no-cache',
            priority: 'u=1, i',
            'sec-ch-ua':
              '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
          referrer: 'https://fantasy.premierleague.com/statistics',
          referrerPolicy: 'same-origin',
          body: null,
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        }
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
