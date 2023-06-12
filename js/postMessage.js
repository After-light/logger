function getCurrentTab(callback, queryProps = {}) {
  chrome.tabs.query(
    { active: true, currentWindow: true, ...queryProps },
    (tabs) => {
      const { status } = tabs[0];
      if (status === 'loading') {
        return showMessage({
          message: '页面加载中，请等待页面加载完成后再次尝试...',
        });
      }

      callback(tabs[0]);
    }
  );
}

function setLocalData(map, callback = () => {}) {
  chrome.storage.local.set(map).then(callback);
}

function getLocalData(keyList, callback = () => {}) {
  chrome.storage.local.get(keyList).then(callback);
}
