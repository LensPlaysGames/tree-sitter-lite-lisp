#include <stdbool.h>
#include <tree_sitter/parser.h>

enum TokenType {
  STRING
};

/** This function should create your scanner object. It will only be
 *  called once anytime your language is set on a parser. Often, you will
 *  want to allocate memory on the heap and return a pointer to it. If your
 *  external scanner doesn’t need to maintain any state, it’s ok to return
 *  NULL.
 */
void *tree_sitter_lite_lisp_external_scanner_create() {
  return NULL;
}
void tree_sitter_lite_lisp_external_scanner_destroy(void *payload) {
  return;
}
unsigned int tree_sitter_lite_lisp_external_scanner_serialize(void *payload, char *buffer) {
  return 0;
}
void tree_sitter_lite_lisp_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  return;
}

bool tree_sitter_lite_lisp_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
  while (!lexer->eof(lexer) && lexer->lookahead <= ' ') lexer->advance(lexer, true);
  bool result = false;
  if (valid_symbols[STRING]) {
    char last2 = '0';
    char last1 = '0';
    lexer->result_symbol = STRING;
    if (lexer->lookahead == '"') {
      size_t i = 1; //> length
      while (!lexer->eof(lexer), ++i) {
        last2 = last1;
        last1 = lexer->lookahead;
        lexer->advance(lexer, false);
        if (lexer->lookahead == '"') {
          if (!(last1 == last2 && last1 == '\\')) {
            lexer->advance(lexer, false);
            result = true;
            break;
          }
        }
      }
    }
  }
  return result;
}
