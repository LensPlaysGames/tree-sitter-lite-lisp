cmake_minimum_required(VERSION 3.14)
project(tree-sitter-lite-lisp)

add_library(
  tree-sitter-lite-lisp
  SHARED
  src/parser.c
)

target_include_directories(
  tree-sitter-lite-lisp
  PUBLIC
  src
)

if (CMAKE_C_COMPILER_ID STREQUAL "GNU" OR CMAKE_C_COMPILER_ID STREQUAL "Clang")
  target_compile_options(
    tree-sitter-lite-lisp
    PRIVATE
    -O3
    -march=native
  )
endif()
