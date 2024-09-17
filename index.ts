import URLPattern from 'url-pattern';

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/') return new Response('Player Forecasts');

    if (url.pathname === '/raw-game-data') {
      // const gamesDataResponse = await fetch(
      //   // 'https://fantasy.premierleague.com/api/bootstrap-static',
      //   // 'https://test.cors.workers.dev/?https://fantasy.premierleague.com/api/bootstrap-static'
      //   // 'https://catfact.ninja/fact',
      //   'https://51.158.54.217/api/bootstrap-static/?__cpo=aHR0cHM6Ly9mYW50YXN5LnByZW1pZXJsZWFndWUuY29t'
      // );

      // Request made with https://www.croxyproxy.com/ and copied with cookie (as Node fetch)
      const gamesDataResponse = await fetch(
        'https://footballapi.pulselive.com/football/competitions?page=0&pageSize=1000&detail=2',
        {
          headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            pragma: 'no-cache',
            priority: 'u=1, i',
            'sec-ch-ua':
              '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            Referer: 'https://www.premierleague.com/',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            Origin: 'https://www.premierleague.com',
          },
          verbose: true,
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
