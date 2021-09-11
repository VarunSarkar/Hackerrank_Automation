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

(async function questionDoer(){
    try{
        let browser = await browserStartPromise;
        let page = await browser.newPage();
        await page.goto(loginLink);
        await page.type("input[id='input-1']", emailpassObj.email, { delay: 50 });
        await page.type("input[type='password']", emailpassObj.password, { delay: 50 });
        await page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        await waitAndClick(".track-card a[data-attr2='algorithms']", page);
        await waitAndClick("input[value='warmup']", page);
        let questionArr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
        for(let i = 0; i < questionArr.length; i++){
            await setTimeout(()=>{     
            }, 5000);
            await questionSolver(questionArr[i], answers[i], page);
        }
    }
    catch(err){
        console.log("err",err);
    }
})()


async function waitAndClick(selector, cPage) {
    try{
        await cPage.waitForSelector(selector, { visible: true });
        await cPage.click(selector, { delay: 1000 });
    }
    catch(err){
        console.log("err", err);
    }
}

async function questionSolver(question, answer, page){
    try{
        await question.click();
        await waitAndClick(".monaco-editor.no-user-select.vs",page);
        await waitAndClick('input[type="checkbox"]', page);
        await page.keyboard.type(answer,{delay: 50});
        await page.keyboard.down("Control");
        await page.keyboard.press("A", {delay : 50});
        await page.keyboard.press("X", {delay : 50});
        await page.keyboard.up("Control");
        await waitAndClick(".monaco-editor.no-user-select.vs",page);
        await page.keyboard.down("Control");
        await page.keyboard.press("A", {delay : 50});
        await page.keyboard.press("V", {delay : 50});
        await page.keyboard.up("Control");
        await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', page)
        await setTimeout(()=>{  
        }, 5000);
        await page.goBack();
        await setTimeout(()=>{  
        }, 5000);
        
    }
    catch(err){
        console.log("err", err);
    }
}