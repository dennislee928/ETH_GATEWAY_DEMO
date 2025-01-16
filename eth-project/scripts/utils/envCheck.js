function checkRequiredEnvVars() {
  const required = ["QUICKNODE_URL", "QUICKNODE_WS_URL", "PRIVATE_KEY"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("錯誤: 缺少必要的環境變數:");
    missing.forEach((key) => {
      console.error(`- ${key}`);
    });
    console.error("\n請在 .env 文件中設置這些變數");
    process.exit(1);
  }
}

module.exports = { checkRequiredEnvVars };
