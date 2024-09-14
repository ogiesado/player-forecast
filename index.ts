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
        'https://51.158.54.217/api/bootstrap-static/?__cpo=aHR0cHM6Ly9mYW50YXN5LnByZW1pZXJsZWFndWUuY29t',
        {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            pragma: 'no-cache',
            'sec-ch-ua':
              '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            cookie:
              '__cpc=RXFOUlV0ZjFxdHg5L1VGd1ZrazRKZm5iR3ZOZ1ZobVlPVHpTcWRGdnJBa3RjRkFDdzRNUHpPbzVXcmtWVTVDUVRzeVhsa0tlMTlnalUxU043c3A0N0dsTHpnTFdZM2w1MTBvU0JkWSthSWFnVDAxWWRhY250ODBSK3NsYXZYbUxSSEtnUzdiOWlLR3M4Mys4TlBnNVdjOWZXTElEZmZQbDB4clU2Q0NvUDN1UEN0NXk5UExXWGdtQUcvMnMzZDBuU2RhcE43Zlpyc0kxbkFSVEErU1lCQXJ1WFVMTWoyOG5GVERyZnN1UVY1YmVoKzhNQ0FHb09UbEVvb0QzWWxZK0ZqZ1RPZ3VjeDRNTVVZb3psVTVnVUhCeDVTSlAvZXlSQm5QTEVqdmpBL1VISDZlRzJ5MEczeVNCaHNkNDRrcHplQkJIMysvd3VLS1g3NWhrV2dSREFCYWJSNVZjVTdRWElJQmVTVVdZY2p0RkEyV2o1eTlNNTlNcldLZ0RJQXQvc05IT3FINzVMQVRPeEttSmFUZ2V0RTF3TXU3UnJIMlB5NVRoYWNLZmplbTNhOG5Bdmd5ekhjWkIzcGdjUGplZUJQS1hVUjFsc0cwYVNuNUg1eGlmUHc9PQ==; __cpcPopShown=1',
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
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
