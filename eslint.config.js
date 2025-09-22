//Sets rules for formatting and style
const js = require('@eslint/js')

module.exports = [js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
        },
        //Insert rules to apply to eslint
        //This is my first time working with this module, so expect a lot of comments
        rules: {
            /*
            Arrow functions should have a space before and after the arrow
            this is allowed:
            const add = (a, b) => a + b;
            this is allowed, but discouraged:
            const add = (a, b)=>a + b;
            */
            'arrow-spacing': ['warn', {before: true, after: true}],
            //enforce consistent brace style for blocks
            //stroustrup style means the brace is on the line which starts the block, but the else statement is on a new line from the closing brace
            /*
            this is valid:
            if (condition) {
                functionCall();
            }
            else {
            }
            this is not:
            function funcName() 
            {
                if (condition) 
                {
                    functionCall();
                } else {
                }
            }
            */
            'brace-style': ['error', 'stroustrup', {allowSingleLine: true}],
            //If we're passing a list of objects or arrays and we break it across lines, the last item must have a comma after it
            'comma-dangle': ['error', 'always-multiline'],
            //When a comma is used, there must be a space after it
            'comma-spacing': 'error',
            //Comma style means if a list goes multiple lines, the comma will be at the end of the current line and not the start of the new line.
            //I haven't worked with any files that use the other style.
            'comma-style': 'error',
            //Require curly braces when a block spans multiple lines, 
            //consistent means if one block uses curly braces, all blocks within that scope must use curly braces
            curly: ['error', 'multi-line', 'consistent'],
            /*
            Dot location property is like the reverse of the comma style rule.
            we want dots to be at the start of a new line, not the end of the previous line:

            object
                .property
            instead of:

            object.
                property
            (the second style is called 'object')

            */
            'dot-location': ['error', 'property'],
            /*
            handle the err argument in call backs
            so if we have something like
            fs.readFile('file.txt', (err, data) => {
                ...
            }
            we need to have err be used:
            fs.readFile('file.txt', (err, data) => {
                if (err) {
                    console.error(err);
                }
            }
            off means we don't care if err is used or not
            */
            'handle-callback-err': 'off',
            //indents must be done with tabs
            indent: ['error', 'tab'],
            /*
            Something like this wouldn't be allowed:
            if (condition) doSomething();
            we would want this:
            if (condition) {
                doSomething();
            }
            */
            'keyword-spacing': 'error',
            //Only 4 callbacks can be in a statement
            'max-nest-callbacks': ['error', {max: 4}],
            /*
            only 2 statements on a line
            so this is valid:
            let a = 1; let b = 2;
            but this is not:
            let a = 1; let b = 2; let c = 3;
            */
            'max-statements-per-line': ['error', {max: 2}],
            //allows console.log statements
            'no-console': 'off',
            /*
            this is not allowed:
            function funcName() {}
            */
            'no-empty-function': 'error',
            /*
            this is not allowed:
            let a = 1. 5;
            let b = 1 .5
            let c = .5
            let d = 5.
            */
            'no-floating-declimal': 'error',
            /*
            this is not allowed:
            let a = 1; //comment
            must be:
            //comment
            let b = 1
            */
            'no-inline-comments': 'error',
            /*
            this is fine:
            if {
            
            } else if {
            
            }
            this isn't:
            if {
            
            } else
                if {
            
            }
            once again, I've never seen someone use the second convention
            */
            'no-lonely-if': 'error',
            //more than one space cannot exist between tokens (except for indentation purposes)    
            'no-multi-spaces': 'error',
            /*
            max of two line within the file itself
            1 line at the end of the file
            and no lines at the start of the file itself
            */
            'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 1, maxBOF: 0}],
            /*
            Variables within functions can't have the same names as variables in an outer scope
            so this would be fine:

            if (cond) {
                let a = 1;
            } else {
                let a = 2;    
            }

            this would not be fine:

            let a = 10;
            if (cond) {
                let a = 1;
            } else {
                let a = 2;    
            }
        
            */
            'no-shadow': ['error', {allow: ['err', 'resolve', 'reject']}],
            //funcA();\s wouldn't be allowed
            'no-trailing-spaces': ['error'],
            //No use of var, only let or const is allowed. (var is function scope not block scope, which can lead to subtle bugs)
            //let or const is the modern convention as well.
            'no-var': 'error',
            /*
            no use of undefined variables are allowed
            this would not be ok:
            let userName = "Alice"
            if (username) {} //eslint would catch a title

            this would also not be ok:
            count = 0; //no let or const, creates a global variable sloppily
            */
            'no-undef': 'error',
            /*
            this is ok:
            const obj = { a: 1, b: 2 }
            this isn't:
            const obj = {a: 1, b: 2}

            for multiline curly braces:
            this is valid:
            const obj = {\s
                a: 1,
                b: 2,
            \s}
            this is not valid:
            const obj = {
            a:1
            }

            */
            'object-curly-spacing': ['error', 'always'],
            //When a variable is never reassigned, you must declare it with const.
            'prefer-const': 'error',
            /* 
            Quotes must be done with single quotes ''
            alowTemplateLiterals allows the use of backticks `` for fstrings
            */
            quotes: ['error', 'single', {'allowTemplateLiterals': true}],
            //Statements must always end with a semicolon ;
            semi: ['error', 'always'],
            /*
            A space must exist before the start of a block,
            so this is allowed:
            if (cond) {
            
            }
            this isn't:
            if (cond){
            
            }
            
            */
            'space-before-blocks': 'error',
            /* 
            Space exists before the function parentheses
            anonymous never would mean this is ok:
            const foo = function(){};
            named never would mean this is ok:
            function bar(){};
            async arrow always means it must be like this:
            const asyncFunc = async () => {};
            */
            'space-before-function-paren': ['error', {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            }],
            //This would not be ok: foo( bar )
            //this is still fine: funcA(a, b, c)
            'space-in-parens': 'error',
            //There must be spaces around operators like +, -, =, *. so let a=2*2; is not allowed.
            'space-infix-ops': 'error',
            /* 
            There must be spacing after unary operators (!, typeof, void, ++, --, etc.) but not before
            so this is valid
            let x = !flag;
            so is this:
            ++y;
            this isn't:
            let z =!flag;
            this is also not allowed (because it has to be a prefix to something):
            ++ a;

            for post fix operators (++, --), it is forbidden to put the space before the operand (notice i didn't say operator), and there is no after since the operator is at the end attached to the operand.
            so this is valid:
            i++;
            i--;
            i++ + a; //No space before the operand (i in this case), and no space after the operator ++ (since it's attached to a).
            this isn't valid:
            i ++;
            i --;
            i ++ + a;
            */
            'space-unary-ops': 'error',
            //This would mean comments would need to start with a space, I don't like using spaces at the start, so I'm commenting it out
            //'spaced-comment': 'error',

            /* 
            Prevents yoda conditions, where the literal comes first in a comparison
            so this would be fine:
            if (count === 5);
            this wouldn't be:
            if (5 === count);
            */
            yoda: 'error',
        },
    }
]