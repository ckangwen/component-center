describe("测试number类型表单", () => {
  const inputSelector = ".type-number .el-input__inner";
  const textSelector = ".type-number.text";

  before(() => {
    cy.visit("/schema-form");
  });
  it("检查默认值", () => {
    cy.checkDefault(inputSelector, textSelector, "0");
  });

  it("检测输入与表单返回值是否一致", () => {
    const inputText = "10";
    cy.get(inputSelector)
      .clear()
      .type(inputText)
      .blur()
      .should("have.value", inputText);

    cy.get(textSelector).contains(inputText);
  });

  it("点击计数器判断值是否变化", () => {
    const decrease = ".type-number .el-input-number__decrease";
    const increase = ".type-number .el-input-number__increase";

    cy.get(inputSelector)
      .clear()
      .type(10)
      .blur();
    cy.get(increase).click();

    cy.get(textSelector).contains("11");

    cy.get(decrease).click();
    cy.get(decrease).click();
    cy.get(textSelector).contains("9");
  });
});
