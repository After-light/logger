(function () {
  var $loginDatas = [];

  function renderLoginElementImage({ icon }) {
    const imgSrc = icon || '../images/default.ico';

    return `<div>
      <img src="${imgSrc}" class="popup_login_item_icon img-circle" alt="网站图标">
    </div>`;
  }

  function renderLoginElementInfo({ name, user, password }, index) {
    return `<div href="#" class="popup_login_item_info">
      <h4 class="popup_login_item_heading" title="${name}">${name}</h4>
      <div class="list-group-item-text text-muted">
        <span>账号：</span>
        <span id='popup_userName_${index}'>${textEncryption(user)}</span>
      </div>
      <div class="list-group-item-text text-muted">
        <span>密码：</span>
        <span id='popup_password_${index}'>${textEncryption(password)}</span>
      </div>
    </div>`;
  }

  function renderLoginElementToolbar(item, index) {
    return `<div class="popup_login_item_toolbar">
      <i id="icon-eye-${index}" class="icon icon-eye-close"></i>
    </div>`;
  }

  // 创建所有登录器
  function createLoginElements(elements, item, index) {
    const $element = `<div id='popup_loginItem_${index}' class='popup_login_item list-group-item'>
      ${renderLoginElementImage(item)}
      ${renderLoginElementInfo(item, index)}
      <div class="popup_divider"></div>
      ${renderLoginElementToolbar(item, index)}
    </div>`;

    elements += $element;

    return elements;
  }

  // 创建登录器列表
  function createLoginList(list) {
    const $list = document.querySelector('.loginList');

    const $loginElements = list.reduce(createLoginElements, '');

    $list.innerHTML = $loginElements;
  }

  // 加载登录器数据
  function loadLoginDatas() {
    getLocalData(['list'], (result) => {
      const list = result.list ?? [];
      $loginDatas = list;

      if (!list.length) {
        return;
      }

      createLoginList($loginDatas);
    });
  }

  // 文本加密
  function textEncryption(text) {
    return text?.[0] + '******' + text?.[text.length - 1];
  }

  // 密码显示/隐藏
  function eyeToggle(e) {
    var isCurrentEyeOpen = e.target.className.includes('open');

    e.target.classList.value = !isCurrentEyeOpen
      ? 'icon icon-eye-open'
      : 'icon icon-eye-close';

    const index = e.target.id.match(/\d+/g)?.[0];

    const { user, password } = $loginDatas[index];
    $(`#popup_userName_${index}`)[0].innerText = !isCurrentEyeOpen
      ? user
      : textEncryption(user);
    $(`#popup_password_${index}`)[0].innerText = !isCurrentEyeOpen
      ? password
      : textEncryption(password);
  }

  // 寻找目标元素
  function findTargetElement(targetClass, boundaryClass, target) {
    // 找不到：当前元素不存在 或 当前元素为委托元素(事件触发源)
    if (!target || target.className.includes(boundaryClass)) {
      return { isTarget: false, targetElement: null };
    }

    // 找到了：当前元素包含目标元素的class
    if (Array.from(target?.classList)?.includes(targetClass)) {
      return { isTarget: true, targetElement: target };
    }

    return findTargetElement(targetClass, boundaryClass, target.parentNode);
  }

  function loginInfoInject(targetNode) {
    const index = targetNode.id.match(/\d+/g)?.[0];

    getCurrentTab(({ id }) => {
      chrome.tabs.sendMessage(id, { loginData: $loginDatas[index] });
      window.close();
    });
  }

  // 选中目标元素
  function selectTargetElement(targetNode, listNode) {
    listNode.childNodes.forEach((node) => {
      node.classList.remove('popup_active_item');
    });

    targetNode.classList.add('popup_active_item');
    loginInfoInject(targetNode);
  }

  function eventBinder() {
    $('#searchInput').searchBox({
      escToClear: true, // 设置点击 ESC 键清空搜索框
      onSearchChange: function (searchKey) {
        const newData = $loginDatas.filter((e) =>
          e.name
            .toLocaleLowerCase()
            .includes(searchKey.trim().toLocaleLowerCase())
        );

        if (!newData.length) {
          $('.loginList')[0].innerHTML = '<div class="noData">暂无数据</div>';
          return;
        }

        createLoginList(newData);
      },
    });

    $('.loginList').click((e) => {
      const { target, currentTarget } = e;
      const isEyeToggle = target.className.includes('icon-eye');
      if (isEyeToggle) {
        e.stopPropagation();
        eyeToggle(e);
        return;
      }

      const { isTarget, targetElement } = findTargetElement(
        'popup_login_item',
        currentTarget.className,
        target
      );
      if (isTarget) {
        selectTargetElement(targetElement, currentTarget);
      }
    });
  }

  function main() {
    loadLoginDatas();
    eventBinder();
  }

  main();
})();
