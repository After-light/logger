(function () {
  console.info('logger start...');

  const userMatches = [
    'input[id*="user"]',
    'input[id*="login"]',
    'input[name*="user"]',
    'input[name*="login"]',
    'input[class*="user"]',
    'input[class*="login"]',
    'input[placeholder*="账号"]',
  ];

  const passwordMatches = [
    'input[type="password"]',
    'input[id*="password"]',
    'input[id*="passwd"]',
    'input[name*="password"]',
    'input[name*="passwd"]',
    'input[class*="password"]',
    'input[class*="passwd"]',
    'input[placeholder*="密码"]',
  ];

  const userInput = findInput(userMatches);
  const passwordInput = findInput(passwordMatches);

  function findInput(matches) {
    for (let i = 0; i < matches.length; i++) {
      const node = document.querySelector(matches[i]);

      if (node) {
        return node;
      }
    }

    return null;
  }

  if (!userInput || !passwordInput) {
    console.info('logger error: 未获取到用户名或密码输入框');
  }

  chrome.runtime.onMessage.addListener(({ loginData }) => {
    userInput && (userInput.value = loginData.user);
    passwordInput && (passwordInput.value = loginData.password);
  });
})();
