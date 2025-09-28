export interface QuizItem {
  number: number;
  question: string;
  testcase: string;
}

export interface languageType {
    name: string;
}

export const quizData: QuizItem[] = [
  {
    number: 1,
    question:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    testcase: "l1 =[2,4,3], l2 =[5,6,4]",
  },
  {
    number: 2,
    question:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    testcase: "x=121",
  },
  {
    number: 3,
    question:
      "Given a string s, find the length of the longest substring without duplicate characters.",
    testcase: "s=abcabcbb",
  },
  {
    number: 4,
    question:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0. Assume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    testcase: "x=123",
  },
  {
    number: 5,
    question:
      "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    testcase: 'strs=["flower","flow","flight"]',
  },
];

export const languageTypeData: languageType[] = [
    {
        name: "Python"
    },
    {
        name: "C"
    },
    {
        name: "C++"
    },
    {
        name: "Java"
    },
    {
        name: "JavaScript"
    },

]