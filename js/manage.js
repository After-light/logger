(function () {
  var $loginDatas = [];

  function renderLoginElementImage({ icon }) {
    const imgSrc = icon || '../images/default.ico';

    return `<div>
      <img src="${imgSrc}" class="manage_login_item_icon img-circle" alt="网站图标">
    </div>`;
  }

  function renderLoginElementInfo({ name, user, password }, index) {
    return `<div href="#" class="manage_login_item_info">
      <h4 class="manage_login_item_heading" title="${name}">
        ${name}
      </h4>
      <div class="list-group-item-text text-muted">
        <span>账号：</span>
        <span id="manage_username_${index}">${textEncryption(user)}</span>
      </div>
      <div class="list-group-item-text text-muted">
        <span>密码：</span>
        <span id="manage_password_${index}">${textEncryption(password)}</span>
      </div>
    </div>`;
  }

  function renderLoginElementToolbar(item, index) {
    return `<div class="manage_login_item_toolbar">
      <i id="deleteBtn_${index}" class="icon icon-trash"></i>
      <i id="updateBtn_${index}" class="icon icon-edit"></i>
    </div>`;
  }

  // 创建所有登录器
  function createLoginElements(elements, item, index) {
    const $element = `<div id='manage_login_item_${index}' class='manage_login_item list-group-item'>
      ${renderLoginElementImage(item)}
      ${renderLoginElementInfo(item, index)}
      <div class="manage_divider"></div>
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

  function deleteByIndex(index) {
    const newList = $loginDatas.filter((_, i) => i !== index);

    setLocalData({ list: newList }, () => {
      loadLoginDatas();
      showMessage({
        type: 'success',
        icon: 'ok-sign',
        message: '删除成功',
      });
    });
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

    $('.loginList').click((event) => {
      const { target } = event;

      const isDelete = target.id.includes('deleteBtn');

      if (isDelete) {
        onDeleteHandler({ event, $loginDatas, deleteByIndex });
      }

      const isUpdate = target.id.includes('updateBtn');
      if (isUpdate) {
        onUpdateHandler({ event, $loginDatas, loadLoginDatas });
      }
    });
  }

  function main() {
    loadLoginDatas();
    eventBinder();
  }

  main();
})();
