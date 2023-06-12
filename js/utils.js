// 文本加密
function textEncryption(text) {
  return text?.[0] + '******' + text?.[text.length - 1];
}

function showMessage({ message, ...resetProps }) {
  new $.zui.Messager(message, {
    type: 'warning',
    icon: 'exclamation-sign',
    time: 3000,
    close: false,
    placement: 'top',
    ...resetProps,
  }).show();
}

function createModal({ content, ...resetProps }) {
  const modal = new $.zui.ModalTrigger({
    custom: () => content,
    ...resetProps,
  });
  modal.show();

  return modal;
}

/**---------------------------- 全局处理 start ----------------------------**/
(function () {
  $('.alert').click((e) => {
    e.currentTarget.style.display = 'none';
  });
})();
/**---------------------------- 全局处理 end ----------------------------**/
