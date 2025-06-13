# archimate-js

`archimate-js` 是一个基于 [diagram-js](https://github.com/bpmn-io/diagram-js) 建模引擎的 ArchiMate® 图表建模工具。它旨在提供一个功能丰富的平台，用于创建、修改、导入和导出符合 The Open Group ArchiMate® 标准的架构模型。

ArchiMate® 是 [The Open Group](https://www.opengroup.org/archimate-forum/archimate-overview) 的注册商标。

## 项目目标

*   提供直观的界面来创建和修改 ArchiMate® 模型和视图。
*   支持 ArchiMate® 模型以 XML 格式进行导入和导出，确保与其他工具的互操作性。
*   构建一个可扩展且易于集成的库，方便开发者将其嵌入到自己的应用中。

## 核心架构

`archimate-js` 的核心建立在 `diagram-js` 之上，其主要模块协同工作以提供完整的建模体验。

*   **`lib/Modeler.js`**:
    这是建模器的核心入口点，它集成了查看器和建模功能。`Modeler` 负责协调各种功能模块，例如元素的对齐、连接、创建、复制粘贴、标签编辑、调色板等。

*   **`lib/BaseModeler.js`**:
    作为 `Modeler` 的基础，`BaseModeler` 处理与 ArchiMate® 模型底层 XML 结构相关的核心功能。它负责 `moddle`（一个用于处理 XML 结构到 JavaScript 对象的库）实例的创建和管理，并追踪和验证模型中的元素 ID。

*   **`lib/Viewer.js`**:
    `Viewer` 模块负责图表的渲染和基本的交互功能。它继承自 `BaseViewer`，并包含图表选择、覆盖、键盘移动、画布移动、触摸和缩放滚动等功能，确保用户能够流畅地浏览和查看图表。

*   **`lib/features/`**:
    这个目录包含了建模器的各种具体功能模块，每个子目录通常代表一个独立的功能，例如：
    *   `palette/`: 提供用于创建新元素的工具面板。
    *   `context-pad/`: 提供在元素上右键点击时出现的上下文操作。
    *   `label-editing/`: 支持对图表元素进行文本编辑。
    *   `copy-paste/`: 实现图表元素的复制和粘贴功能。
    *   `modeling/`: 包含与 ArchiMate 元素和关系建模相关的核心逻辑。
    *   `rules/`: 定义了在建模过程中应用的业务规则，确保操作的合法性。

*   **`lib/moddle/` 和 `lib/metamodel/`**:
    这些目录用于处理 ArchiMate® 元模型。`moddle` 库负责将 XML 结构映射到 JavaScript 对象，而 `metamodel` 则定义了 ArchiMate® 模型的结构和类型。

## 功能特性

*   **创建/修改 ArchiMate® 模型和视图**:
    通过直观的拖放操作、上下文菜单和属性面板，用户可以轻松地创建、编辑和组织 ArchiMate® 元素和关系。支持对齐、连接、调整大小、复制粘贴等多种操作，以满足复杂的建模需求。

*   **导入/导出 ArchiMate® 模型 (XML 格式)**:
    支持将 ArchiMate® 模型导出为标准 XML 格式，方便模型在不同工具之间共享和迁移。同时，也支持导入现有的 ArchiMate® XML 文件，实现模型的复用。

## 如何使用 (概念性说明)

虽然具体的集成方法取决于您的应用环境，但通常情况下，您可以通过以下步骤概念性地使用 `archimate-js`：

1.  **引入 `Modeler`**:
    在您的 JavaScript 应用中引入 `Modeler` 类。

    ```javascript
    import Modeler from 'archimate-js/lib/Modeler';
    ```

2.  **初始化 Modeler**:
    创建一个 `Modeler` 实例，并将其挂载到您 HTML 页面中的一个容器元素上。

    ```javascript
    const archimateModeler = new Modeler({
      container: '#canvas', // 替换为您的容器 ID
      width: '100%',
      height: '100%'
    });
    ```

3.  **创建新模型或导入现有模型**:
    *   **创建新模型**:
        ```javascript
        archimateModeler.createNewModel();
        ```
    *   **导入现有 XML**:
        ```javascript
        const xml = '您的 ArchiMate XML 字符串';
        archimateModeler.importXML(xml, function(err) {
          if (err) {
            console.error('导入失败', err);
          } else {
            console.log('导入成功');
          }
        });
        ```

4.  **导出模型**:
    您可以将当前模型导出为 XML 字符串。

    ```javascript
    archimateModeler.saveXML({ format: true }, function(err, xml) {
      if (err) {
        console.error('导出失败', err);
      } else {
        console.log('导出的 XML:', xml);
      }
    });
    ```

## 项目结构概览

```
.
├── .yarn/                   # Yarn 4+ 相关目录
├── assets/                  # 静态资源，如 CSS、图标等
├── archimate-font/          # ArchiMate 图标字体及其源码
├── dist/                    # 构建输出目录
├── lib/                     # 核心源代码目录
│   ├── core/                # 核心模块
│   ├── draw/                # 绘图相关逻辑
│   ├── features/            # 功能模块（palette, context-pad, modeling, rules 等）
│   ├── import/              # 导入逻辑
│   ├── metamodel/           # ArchiMate 元模型定义
│   ├── moddle/              # moddle 相关配置
│   ├── util/                # 工具函数
│   ├── BaseModeler.js       # 建模器基础类
│   ├── BaseViewer.js        # 查看器基础类
│   ├── Modeler.js           # 核心建模器
│   ├── NavigatedViewer.js   # 导航查看器
│   └── Viewer.js            # 核心查看器
├── test/                    # 测试相关目录
│   ├── __mocks__/           # 测试 mock 文件
│   ├── setup.js             # 测试环境配置
│   └── unit/                # 单元测试
├── demo.html                # 项目演示入口页面
├── example.archimate        # 示例模型文件
├── index.js                 # 项目入口文件
├── package.json             # 项目依赖和脚本配置
├── vite.config.js           # Vite 配置文件
├── README.md                # 项目说明文档
├── CHANGELOG.md             # 变更日志
├── LICENSE                  # 许可证信息
└── ...                      # 其他配置文件
```

## 潜在问题与改进方向

作为一个产品经理和工程师，我对 `archimate-js` 项目的未来发展提出以下思考和改进建议：

1.  **更详细的文档**:
    目前的 `README.md` 仅提供了概览。为了方便开发者更好地使用和贡献，建议为每个核心模块和主要功能提供更详细的文档说明，包括 API 参考、配置选项和高级用法示例。

2.  **丰富的示例**:
    当前缺乏开箱即用的代码示例来演示如何初始化和使用 `Modeler` 的各种功能。提供更多实际场景的示例将大大降低新用户的上手难度。例如，如何自定义调色板、如何添加自定义元素或规则等。

3.  **可扩展性指南**:
    虽然项目基于 `diagram-js`，但缺乏针对 `archimate-js` 特有的扩展点和自定义方法的详细指南。例如，如何添加自定义的 ArchiMate 元素类型、如何扩展现有功能或集成新的外部服务。

4.  **错误处理和用户反馈**:
    在导入/导出或进行复杂操作时，对用户提供更清晰的错误信息和反馈机制非常重要。可以考虑引入更完善的错误日志和可视化错误提示。

5.  **性能优化**:
    随着模型复杂度的增加，图表渲染和操作的性能可能会成为瓶颈。需要对大型模型进行性能测试，并考虑优化策略，例如按需加载、虚拟化渲染等。

6.  **国际化 (i18n)**:
    目前项目可能主要支持英文。为了更广泛的用户群体，建议考虑引入国际化支持，允许将界面文本翻译成不同的语言。

7.  **测试覆盖率**:
    确保核心功能和新开发的特性都有全面的单元测试和集成测试覆盖，以保证代码质量和稳定性。

8.  **用户界面/体验 (UI/UX) 改进**:
    除了核心功能，用户界面的美观性和易用性也至关重要。可以考虑进行用户研究，收集反馈，并持续改进 UI/UX，使其更加现代化和直观。

通过解决上述潜在问题和实施改进，`archimate-js` 将能够为用户提供更强大、更稳定、更易用的 ArchiMate® 建模体验。

## 测试

项目使用 Jest 作为测试框架。要运行测试，请按照以下步骤操作：

1. **安装依赖**
   ```bash
   PUPPETEER_SKIP_DOWNLOAD=true yarn install
   ```

2. **常用命令**

   - 启动开发模式：
     ```bash
     yarn start
     ```
   - 构建项目：
     ```bash
     yarn build
     ```
   - 预览构建结果：
     ```bash
     yarn preview
     ```
   - 运行测试：
     ```bash
     yarn test
     ```
   - 生成测试覆盖率报告：
     ```bash
     yarn test:coverage
     ```

3. **测试目录结构**
   ```
   test/
   ├── __mocks__/          # 模拟文件
   ├── setup.js            # 测试环境配置
   └── unit/               # 单元测试
       └── Modeler.test.js # Modeler 类的测试用例
   ```

4. **编写测试**
   - 所有测试文件都应该放在 `test/unit/` 目录下
   - 测试文件命名应该遵循 `*.test.js` 模式
   - 使用 Jest 的 `describe` 和 `it` 函数组织测试用例
   - 使用 `beforeEach` 和 `afterEach` 设置和清理测试环境

5. **测试覆盖率**
   - 运行 `yarn test:coverage` 生成覆盖率报告
   - 覆盖率报告将显示在 `coverage/` 目录下
   - 建议保持至少 80% 的测试覆盖率
