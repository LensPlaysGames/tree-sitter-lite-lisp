module.exports = grammar({
    name: "lite_lisp",

    externals: $ => [
        $.string
    ],

    rules: {
        source_file: $ => repeat($._s_expr),
        _s_expr: $ => choice(
            $.quasiquote,
            $.unquote_splicing,
            $.unquote,
            $.quote,
            $.list,
            $.improper_list,
            $.define,
            $.set,
            $.if,
            $.when,
            $.unless,
            $.let,
            $.defun,
            $.macro,
            $._atom_literal,
            $.comment
        ),
        comment: $ => /;+.*/,
        quasiquote: $ => seq(
            "`",
            $._s_expr
        ),
        unquote_splicing: $ => seq(
            ",@",
            $._s_expr
        ),
        unquote: $ => seq(
            ",",
            $._s_expr
        ),
        quote: $ => seq(
            "'",
            $._s_expr
        ),
        list: $ => seq(
            "(",
            repeat($._s_expr),
            ")"
        ),
        improper_list: $ => seq(
            "(",
            repeat1($._s_expr),
            ".",
            $._s_expr,
            ")"
        ),
        define: $ => seq(
            "(",
            "define",
            field("name", $.symbol),
            field("value", $._s_expr),
            optional(field("docstring", $.string)),
            ")"
        ),
        set: $ => seq(
            "(",
            "set",
            field("name", $.symbol),
            field("value", $._s_expr),
            optional(field("docstring", $.string)),
            ")"
        ),
        if: $ => seq(
            "(",
            "if",
            field("condition", $._s_expr),
            field("then", $._s_expr),
            field("otherwise", $._s_expr),
            ")"
        ),
        when: $ => seq(
            "(",
            "when",
            field("condition", $._s_expr),
            field("body", repeat($._s_expr)),
            ")"
        ),
        unless: $ => seq(
            "(",
            "unless",
            field("condition", $._s_expr),
            field("body", repeat($._s_expr)),
            ")"
        ),
        let: $ => seq(
            "(",
            "let",
            field("bindings", $.list),
            field("body", repeat($._s_expr)),
            ")"
        ),
        let: $ => seq(
            "(",
            "let",
            field("bindings", $.list),
            field("body", repeat($._s_expr)),
            ")"
        ),
        defun: $ => seq(
            "(",
            "defun",
            field("name", $.symbol),
            field("parameters", $._s_expr),
            field("docstring", $.string),
            field("body", repeat($._s_expr)),
            ")"
        ),
        macro: $ => seq(
            "(",
            choice("defmacro", "macro"),
            field("name", $.symbol),
            field("parameters", $._s_expr),
            field("docstring", $.string),
            field("body", repeat($._s_expr)),
            ")"
        ),
        _atom_literal: $ => choice(
            $.string,
            $.symbol,
            $.number
        ),
        symbol: $ => /[a-zA-Z#\*\+\.<>\!\$@:\-&\^_]+/,
        number: $ => /[0-9]+/
    }
});
