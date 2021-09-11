const loginLink = "https://www.hackerrank.com/auth/login";
const emailpassObj = require("./secrets");
const { answers } = require("./codes");
const puppeteer = require("puppeteer");
// creates headless browser
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page, browser;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened ")
        let gPageOpenPromise = newTab.goto(loginLink);
        return gPageOpenPromise;
    }).then(function () {
        let emailWillBeEnteredPromise = page.type("input[id='input-1']", emailpassObj.email, { delay: 50 });
        return emailWillBeEnteredPromise;
    }).then(function () {
        let passwordWillBeEnteredPromise = page.type("input[type='password']", emailpassObj.password, { delay: 50 });
        return passwordWillBeEnteredPromise;
    }).then(function () {
        let loginWillBeDOnepromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        return loginWillBeDOnepromise;
    })
    .then(function () {
        let clickedOnAlgoPromise = waitAndClick(".track-card a[data-attr2='algorithms']", page);
        return clickedOnAlgoPromise;
    }).then(function () {
        let getToWarmUp = waitAndClick("input[value='warmup']", page);
        return getToWarmUp;
    }).then(function (){
        let questionArrPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
        return questionArrPromise;
    }).then(function(questionArr){
        let questionWillBeSolved = questionSolver(questionArr[0], answers[0], page);
        return questionWillBeSolved;
    })

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                let clickModal =
                    cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err)
            })
    }
    )
}

function questionSolver(question, answer, page){
    return new Promise(function (resolve,reject){
        let questionWillBeClickedPromise = question.click();
        questionWillBeClickedPromise.then(function (){
            let editorWillBeInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs",page);
            return editorWillBeInFocusPromise;
                }).then(function (){
                    let customInputTextBoxInFocusPromise = waitAndClick('input[type="checkbox"]', page);
                    return customInputTextBoxInFocusPromise;
                }).then(function (){
                    let answerWillBeTyped = page.keyboard.type(answer,{delay: 50});
                    return answerWillBeTyped;
                }).then(function (){
                    return page.keyboard.down("Control");
                }).then(function (){
                    return page.keyboard.press("A", {delay : 50});
                }).then(function (){
                    return page.keyboard.press("X", {delay : 50});
                }).then(function (){
                    return page.keyboard.down("Control");
                }).then(function (){
                    let editorWillBeInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs",page);
                    return editorWillBeInFocusPromise;
                }).then(function (){
                    let ctrlWillBePressed = page.keyboard.down("Control");
                    return ctrlWillBePressed;
                }).then(function (){
                    return page.keyboard.press("A", {delay : 50});
                }).then(function (){
                    return page.keyboard.press("V", {delay : 50});
                }).then(function (){
                    return page.keyboard.down("Control");
                }).then(function (){
                    resolve();
                }).catch(function(err){
                    reject(err);
                })
        })
}