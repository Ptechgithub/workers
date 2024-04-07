addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const buttonNameRegex = /^[a-zA-Z]+$/;

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
  
  const html = generateHTML();
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

function generateHTML() {
  return `
    <!DOCTYPE html>
	<html lang="fa">
	<head>
	  <meta charset="UTF-8">
	  <title>بازی گل یا پوچ</title>
	  <style>
	    body {
	      display: flex;
	      align-items: center;
	      justify-content: center;
	      min-height: 100vh;
	      margin: 0;
	      background-image: url('https://raw.githubusercontent.com/Ptechgithub/configs/main/media/3-3.jpeg');
	      background-size: cover;
	      background-repeat: no-repeat;
	      background-position: center;
	      font-family: Arial, sans-serif;
	    }
	
	    .container {
	      text-align: center;
	      background-color: rgba(255, 255, 255, 0.8);
	      padding: 20px;
	      border-radius: 10px;
	      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	    }
	
	    h1 {
	      color: black;
	    }
	
	    p {
	      color: #333;
	    }
	
	    img {
	      margin: 10px;
	      width: 100px;
	      height: 100px;
	      border-radius: 50%;
	      cursor: pointer;
	      transition: transform 0.3s ease;
	    }
	
	    img:hover {
	      transform: scale(1.1);
	    }
	
	    #score {
	      font-weight: bold;
	      color: #FF5722;
	    }
	
	    #message {
	      background-color: #E0E0E0;
	      padding: 10px;
	      border-radius: 5px;
	    }
	
	    .flower-message {
	      color: green;
	    }
	
	    .empty-message {
	      color: red;
	    }
	  </style>
	</head>
	<body>
	<div class="container">
	  <a href="https://github.com/Ptechgithub/workers/tree/main/gol-ya-pooch" target="_blank" style="position: absolute; top: 10px; right: 10px; color: yellow;">Github لینک</a>
	  <h1>بازی گل یا پوچ</h1>
	  <p>امتیاز: <span id="score">0</span></p>
	  <div id="message"></div>
	  <img onclick="selectOption('flower')" src="https://raw.githubusercontent.com/Ptechgithub/configs/main/media/1-1.png" alt="گل">
	  <img onclick="selectOption('empty')" src="https://raw.githubusercontent.com/Ptechgithub/configs/main/media/2-2.png" alt="پوچ">
	</div>
	<script>
	  const scoreElement = document.getElementById('score');
	  const messageElement = document.getElementById('message');
	
	  let score = 0;
	
	  const selectOption = async (option) => {
	    try {
	      const result = await getRandomResult();
	      const message = option === result ? '<span class="flower-message">گل بود 🌹</span>' : '<span class="empty-message">به 🍀 نیز آراسته شد</span>';
	      if (option === result) {
	        score++;
	      } else {
	        if (score > 0) {
	          score--;
	        } else {
	          score = 0;
	        }
	      }
	      scoreElement.innerText = score;
	      if (score === 29) {
	        alert('آفرین! بازی تموم شد امتیاز شما 2️⃣9️⃣ شد');
	        score = 0;
	        scoreElement.innerText = score;
	      } else if (score === 0) {
	        alert('شما بازی را باختید ❌️');
	      } else {
	        messageElement.innerHTML = message;
	      }
	    } catch (error) {
	      console.error('خطا در برنامه:', error);
	      messageElement.innerText = 'متاسفانه خطایی رخ داده است!';
	    }
	  }
	
	  const getRandomResult = async () => {
	    const randomNumber = Math.random();
	    return randomNumber < 0.5 ? 'flower' : 'empty';
	  };
	</script>
	</body>
	</html>
  `;
}