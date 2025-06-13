// 设置全局测试环境变量
global.IS_TEST = true;

// 模拟浏览器环境
global.window = {
  requestAnimationFrame: (callback) => setTimeout(callback, 0),
  cancelAnimationFrame: (id) => clearTimeout(id)
};

// 模拟 document 对象
global.document = {
  createElement: () => ({
    style: {},
    setAttribute: () => {},
    getBoundingClientRect: () => ({ width: 0, height: 0 })
  }),
  createElementNS: () => ({
    style: {},
    setAttribute: () => {},
    getBoundingClientRect: () => ({ width: 0, height: 0 })
  })
}; 