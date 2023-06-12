function onDeleteHandler({ event, $loginDatas, deleteByIndex }) {
  const index = +event.target.id.match(/\d+/g)[0];

  /* 使用触发器对象直接显示 */
  const delModal = createModal({
    title: '删除',
    content: `<div class='manage_del_modal'>
      <div class='manage_del_modal_content'>确定删除&nbsp;<strong>${$loginDatas[index].name}</strong>&nbsp;吗？</div>
      <div class='manage_del_modal_btn_group'>
        <button id='manage_del_modal_btn_ok' class="btn btn-primary" type="button">确定</button>
      </div>
    </div>`,
    shown: () => {
      $('#manage_del_modal_btn_ok').click(() => {
        deleteByIndex(index);
        delModal.close();
      });
    },
  });
}

function onUpdateHandler({ event, $loginDatas, loadLoginDatas }) {
  const index = +event.target.id.match(/\d+/g)[0];
  const { icon, name, user, password } = $loginDatas[index];

  /* 使用触发器对象直接显示 */
  const updateModal = createModal({
    title: '修改',
    content: `<div class="manage_update_modal">
      <div class="manage_image_container">
        <img
          id="manage_icon"
          src="${icon}"
          alt="网站图标"
        />
        <div
          id="manage_iconUpdate"
          class="manage_icon_update"
          data-toggle="tooltip"
          data-tip-class="tooltip-primary"
          data-placement="left"
          title="抓取当前标签页信息（不支持chrome扩展页）"
        >
          <i class="icon icon-cloud-download"></i>
        </div>
      </div>

      <ul class="manage_content">
        <li>
          <label for="manage_webNameInput">网站名</label>
          <div
            class="manage_content_input manage_web_name_content input-control has-icon-left"
          >
            <input
              id="manage_webNameInput"
              type="text"
              class="form-control"
              placeholder="请输入网站名"
              required="true"
              value="${name}"
            />
            <label
              for="manage_webNameInput"
              class="input-control-icon-left"
            >
              <i class="icon icon-globe"></i>
            </label>
          </div>
        </li>
        <li>
          <label for="manage_userInput">用户名</label>
          <div
            class="manage_content_input manage_user_content input-control has-icon-left"
          >
            <input
              id="manage_userInput"
              type="text"
              class="form-control"
              placeholder="请输入用户名"
              required="true"
              value="${user}"
            />
            <label
              for="manage_userInput"
              class="input-control-icon-left"
            >
              <i class="icon icon-user"></i>
            </label>
          </div>
        </li>
        <li>
          <label for="manage_passwordInput">密码</label>
          <div
            class="manage_content_input manage_password_content input-control has-icon-left"
          >
            <input
              id="manage_passwordInput"
              type="password"
              class="form-control"
              placeholder="请输入密码"
              required="true"
              value="${password}"
            />
            <label
              for="manage_passwordInput"
              class="input-control-icon-left"
            >
              <i class="icon icon-key"></i>
            </label>
          </div>
        </li>
      </ul>

      <div class="manage_button_group">
        <button id="manage_clearBtn" class="btn" type="button">
          清空
        </button>
        <button
          id="manage_saveBtn"
          class="btn btn-primary"
          type="button"
        >
          保存
        </button>
      </div>
    </div>`,
    shown: () => {
      const loginInstance = new Login({
        webNameInput: $('#manage_webNameInput')[0],
        userInput: $('#manage_userInput')[0],
        passwordInput: $('#manage_passwordInput')[0],
        iconNode: $('#manage_icon')[0],
      });

      $('#manage_clearBtn').click(loginInstance.clearAddInfo);

      $('#manage_saveBtn').click(() =>
        loginInstance.updateLoginByIndex(index, () => {
          updateModal.close();
          loadLoginDatas();
        })
      );

      $('#manage_iconUpdate').click(loginInstance.updateIcon);
    },
  });
}
