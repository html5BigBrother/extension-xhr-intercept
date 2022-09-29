基于 [Plasmo extension](https://docs.plasmo.com/) 脚手架开发的 chrome 扩展，拦截 XMLHttpRequest 请求

<image src="./imageDemo.png">

### Feature
- 注入自定义 request header
- url路径拼接自定义参数
- mock接口数据

### Getting Started

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

### Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```
Open your browser and load the appropriate development build. For example, if you want to use manifest v3, use: `build/chrome-mv3-prod`.

This should create a production bundle for your extension, ready to be zipped and published to the stores.
