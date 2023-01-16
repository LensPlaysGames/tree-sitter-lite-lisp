module.exports = grammar({
    name: "un",

    rules: {
        source_file: $ => repeat($.s_expr),
        s_expr: $ => choice(
            $.quasiquote,
            $.unquote_splicing,
            $.unquote,
            $.quote,
            $.improper_list,
            $.list,
            $._atom_literal
        ),
        quasiquote: $ => seq(
            "`",
            $.s_expr
        ),
        unquote_splicing: $ => seq(
            ",@",
            $.s_expr
        ),
        unquote: $ => seq(
            ",",
            $.s_expr
        ),
        quote: $ => seq(
            "'",
            $.s_expr
        ),
        list: $ => seq(
            "(",
            repeat($.s_expr),
            ")"
        ),
        improper_list: $ => seq(
            "(",
            repeat1($.s_expr),
            ".",
            $.s_expr,
            ")"
        ),
        _atom_literal: $ => choice(
            $.string,
            $.number
        ),
        string: $ => /".*[^\\]?"/,
        number: $ => /[0-9]+/
    }
});
