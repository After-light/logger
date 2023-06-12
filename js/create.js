(function () {
  const webNameInput = $('#create_webNameInput')[0];
  const userInput = $('#create_userInput')[0];
  const passwordInput = $('#create_passwordInput')[0];
  const iconNode = $('#create_icon')[0];

  function eventBinder() {
    const loginInstance = new Login({
      webNameInput,
      userInput,
      passwordInput,
      iconNode,
    });

    $('#create_clearBtn').click(loginInstance.clearAddInfo);

    $('#create_saveBtn').click(loginInstance.addLogin);

    $('#create_iconUpdate').click(loginInstance.updateIcon);
  }

  eventBinder();
})();
