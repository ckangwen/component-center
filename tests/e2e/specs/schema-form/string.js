describe("测试string类型表单", () => {
  const inputSelector = ".type-string .el-input__inner";
  const textSelector = ".type-string.text";

  before(() => {
    cy.visit("/schema-form");
  });
  it("检查默认值", () => {
    cy.checkDefault(inputSelector, textSelector, "DEFAULT");
  });

  it("检测输入与表单返回值是否一致", () => {
    const inputText = "hello world";
    cy.get(inputSelector)
      .clear()
      .type(inputText)
      .should("have.value", inputText);

    cy.get(textSelector).contains(inputText);

    cy.get(inputSelector).clear();

    cy.get(textSelector).should("be.empty");
  });
});
