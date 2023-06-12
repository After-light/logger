function Login({ webNameInput, userInput, passwordInput, iconNode }) {
  this.webNameInput = webNameInput;
  this.userInput = userInput;
  this.passwordInput = passwordInput;
  this.iconNode = iconNode;

  this.clearAddInfo = () => {
    webNameInput.value = '';
    userInput.value = '';
    passwordInput.value = '';
    iconNode.src = '../images/default.ico';
  };

  this.updateIcon = () => {
    getCurrentTab(({ favIconUrl, title }) => {
      if (!webNameInput.value) {
        webNameInput.value = title;
      }

      if (!favIconUrl) {
        return showMessage({
          message: '网站图标不存在',
        });
      }

      iconNode.src = favIconUrl;
    });
  };

  this.addLogin = () => {
    if (this.validate()) {
      return;
    }

    const addItem = (list, updateList) => {
      updateList([
        ...list,
        {
          name: this.webNameInput.value,
          icon: this.iconNode.src,
          user: this.userInput.value,
          password: this.passwordInput.value,
        },
      ]);
    };

    this.updateLocalData(addItem);
  };

  this.updateLoginByIndex = (index, callback = () => {}) => {
    if (this.validate()) {
      return;
    }

    const updateItem = (list, updateList) => {
      const newItem = {
        name: this.webNameInput.value,
        icon: this.iconNode.src,
        user: this.userInput.value,
        password: this.passwordInput.value,
      };
      const newList = list.map((item, i) => {
        return i === index ? newItem : item;
      });
      updateList(newList);
    };

    this.updateLocalData(updateItem, callback);
  };
}

Login.prototype.requiredValidate = function (node) {
  const isValidate = node.required && !node.value;
  if (isValidate) {
    node.parentNode.classList.add('errorTips');
  } else {
    node.parentNode.classList.remove('errorTips');
  }
  return isValidate;
};

Login.prototype.validate = function () {
  return (
    this.requiredValidate(this.webNameInput) &&
    this.requiredValidate(this.userInput) &&
    this.requiredValidate(this.passwordInput)
  );
};

Login.prototype.updateLocalData = function (getList, callback) {
  getLocalData(['list'], (result) => {
    const list = result.list ?? [];

    const updateList = (newList) => {
      setLocalData({ list: newList }, () => {
        this.clearAddInfo();
        showMessage({
          type: 'success',
          icon: 'ok-sign',
          message: '修改成功',
        });
        callback && callback();
      });
    };

    if (!getList) {
      updateList(list);
      return;
    }

    getList(list, updateList);
  });
};
