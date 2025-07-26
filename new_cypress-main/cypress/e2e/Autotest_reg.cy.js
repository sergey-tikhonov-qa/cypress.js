import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/');
          });

    afterEach('Конец теста', function () {
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.close).should('be.visible');
          });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type('german@dolnikov.ru');
        cy.get(main_page.password).type('qa_one_love1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно'); 
        
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type('german@dolnikov.ru');
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); 
        
    })

    it('Верный логин и Неверный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov.ru');
        cy.get(main_page.password).type('qa_one_love12');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет'); 
        
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov1.ru');
        cy.get(main_page.password).type('qa_one_love1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет'); 
        
    })

    it('Неверная валидация', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type('qa_one_love1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); 
        
    })

    it('Строчные буквы в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type('qa_one_love1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно'); 
        
    })
})

