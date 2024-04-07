// Click game music

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const userAgent = request.headers.get('User-Agent');
  if (!userAgent || !userAgent.includes('Mozilla')) {
    return new Response('https://github.com/Ptechgithub', {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ù¾Ø®Ø´ Ù…ÙˆØ³ÛŒÙ‚ÛŒ Ø¨Ø§ Ø¹Ú©Ø³</title>
      <style>
        .container {
          text-align: center;
          margin-top: 50px;
        }

        .description {
          margin-top: 28px;
          padding: 10px;
          background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
        }
        
        img {
          width: 300px;
          height: 320px;
          cursor: pointer;
          border-radius: 48%; /* Makes the image circular */
          border: 10px solid transparent; /* Initial transparent border */
          transition: border-color 0.3s ease; /* Smooth transition for border color change */
        }

        img:hover {
          transform: scale(1.1); /* Zoom effect on hover */
        }

        img.clicked {
          border-color: yellow; /* Yellow border when image is clicked */
        }

        .github-link {
          position: absolute;
          top: 10px;
          right: 10px;
          color: black;
          text-decoration: none;
        }
      </style>
    </head>
    <body style="background-image: url('https://raw.githubusercontent.com/Ptechgithub/configs/main/media/5-5.jpg');">
      <a href="https://github.com/Ptechgithub/workers/tree/main/click-game-music" class="github-link" style="color: blue;">Github Ù„ÛŒÙ†Ú©</a>
      <div class="container">
        <img id="albumArt" src="https://raw.githubusercontent.com/Ptechgithub/configs/main/media/4-4.jpg" alt="Ø¢Ù„Ø¨ÙˆÙ… Ù…ÙˆØ³ÛŒÙ‚ÛŒ">
        <div class="description">
          <p>Ø§ÛŒÙ† ÛŒÚ© Ø¨Ø§Ø²ÛŒ Ú©Ù„ÛŒÚ©ÛŒ ðŸ‘†Ø§Ø³Øª! Ø¨Ø§ Ø³Ø±Ø¹Øª Ø¨Ø± Ø±ÙˆÛŒ ØªØµÙˆÛŒØ± Ú©Ù„ÛŒÚ© Ú©Ù†ÛŒØ¯ ØªØ§ ØµØ¯Ø§ÛŒ Ø¢Ù† Ø±Ø§ Ø¨Ø´Ù†ÙˆÛŒØ¯.</p>
        </div>
      </div>
      <audio id="audioPlayer" controls hidden>
        <source src="https://raw.githubusercontent.com/Ptechgithub/configs/main/media/h.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <script>
        const albumArt = document.getElementById('albumArt');
        const audioPlayer = document.getElementById('audioPlayer');
        let isPlaying = false;
        let lastClickTime = 0;
        let timer;

        albumArt.addEventListener('click', () => {
          const currentTime = Date.now();
          const clickInterval = currentTime - lastClickTime;
          lastClickTime = currentTime;

          if (!isPlaying || clickInterval <= 150) {
            if (timer) clearTimeout(timer);
            isPlaying = true;
            audioPlayer.play();
            timer = setTimeout(() => {
              audioPlayer.pause();
              audioPlayer.currentTime = 0;
              isPlaying = false;
            }, 300);
          } else {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            isPlaying = false;
          }
          
          // Toggle 'clicked' class to add or remove yellow border
          albumArt.classList.toggle('clicked');
        });
      </script>
    </body>
    </html>
  `;

  return new Response(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}