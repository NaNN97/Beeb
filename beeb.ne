@{%
const myLexer = require("./lexer");
%}

@lexer myLexer

statements
    -> _ml statement (__lb_ statement):* _ml
        {%
            (data) => {
                const repeated = data[2];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[1], ...restStatements];
            }
        %}

statement
    -> var_assign   {% id %}
    |  fun_call     {% id %}
    |  %comment     {% id %}

var_assign
    -> %identifier _ "=" _ expr
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                }
            }
        
        %}
fun_call
    -> %identifier _ "(" _ml (arg_list _ml):? ")"
    {%
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: data[4] ? data[4][0] : []
            }
        }
    %}

arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  arg_list __ml expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}

expr
    -> %boolean     {% id %}
    |  %string      {% id %}
    |  %float       {% id %}
    |  %number      {% id %}
    |  %identifier  {% id %}
    |  fun_call     {% id %}
    |  lambda       {% id %}

boolean -> "true"  {% () => true %}
         | "false" {% () => false %}
         | %boolean_true {% d => true %}
         | %boolean_flase {% d => false %}

lambda -> "(" _ (param_list _):? ")" _ "=>" _ml lambda_body
    {%
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
    %}
param_list
    -> %identifier (__ %identifier):* # Zero or more occurances
        {%
            (data) => {
                const repeatedPieces = data[1];
                const restParams = repeatedPieces.map(piece => piece[1]);
                return [data[0], ...restParams];
            }
        %}

lambda_body
    -> expr     
        {% 
            (data) => {
                return [data[0]];
            } 
        %}
    |  "{" __lb_ statements __lb_ "}"
        {%
            (data) => {
                return data[3];
            }
        %}

# Mandatory line-break with optional whitespace around it
__lb_ -> (_ %NL):+ _

# Optional multi-line whitespace
_ml -> (%WS | %NL):*

# Mandatory multi-line whitespace
__ml -> (%WS | %NL):+

# Optional whitespace
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+