module.exports = grammar({
    name: "lite_lisp",

    rules: {
        source_file: $ => repeat($._s_expr),
        _s_expr: $ => choice(
            $.quasiquote,
            $.unquote_splicing,
            $.unquote,
            $.quote,
            $.improper_list,
            $.list,
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
        _atom_literal: $ => choice(
            $.string,
            $.symbol,
            $.number
        ),
        // TODO: Multiline strings are going to require a custom scanner.
        string: $ => /".*[^\\]?"/,
        symbol: $ => /[a-zA-Z#\*\+\.<>\!\$@:\-&\^_]+/,
        number: $ => /[0-9]+/
    }
});
