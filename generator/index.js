const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const REGEX_HTML_FILE = /\S+[.]html$/;

const PAGE_TYPE = fs.readdirSync(path.join(__dirname, 'templates/'));


function generateFolder(name, template,type){
    let basicPath = path.join(__dirname,'..','frontend/pages/',name);

    if (!fs.existsSync(basicPath)) {
        try {

            //specific treatment for types
            if (type === 'VueJS'){
                fs.copySync(path.join(__dirname,'templates',type), basicPath);
                let content = fs.readFileSync(path.join(basicPath,'components/App.vue')).toString();
                content = content.replace('%name%', name);
                fs.writeFileSync(path.join(basicPath,'components/App.vue'),content);
            }

            //Generate config file
            let config = {
                "name" : name,
                "entryPoint" : "index.js",
                "type" : type,
                "template" : './frontend/templates/' +template
            }
            fs.writeFileSync(path.join(basicPath,'page.json'),JSON.stringify(config,null, 2));

            console.log(chalk.green(`New page ${name} has been created`));

        } catch (err) {
            console.error(err)
        }

    }
    else{
        console.error("Page folder already exists")
    }


}


inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: 'Enter the new page name without the \".html\"',
    validate: function (text) {
        return text.length>0;
    }
}, {
    name: 'template',
    type: 'list',
    message: 'Which template do you want to use? Or just leave default.html',
    choices: () => {
        let choices = fs.readdirSync(path.join(__dirname, '..', 'frontend/templates/'));
        choices.filter(function (choice) {
            try {
                //check if file is an html file
                return choice.match(REGEX_HTML_FILE);
            }
            catch (e) {
                return false;
            }
        });
        return choices;
    },

},
    {
        name: 'type',
        type: 'list',
        message: 'Which page type is it?',
        choices: PAGE_TYPE
    }
]).then((answers) => {
    generateFolder(answers.name,answers.template,answers.type);
});