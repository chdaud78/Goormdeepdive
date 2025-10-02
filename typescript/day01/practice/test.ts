//1
function add(a: number, b: number) : number{
  return a + b;
}

//2
function take(text: string, n: number) : string {
  return text.slice(0, n);
}

//3
function upper(name: string) : string{
  return name.toUpperCase();
}

//4
function avg(nums : number[]) : number {
  if (nums.length === 0) return 0;
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

//5
function divFloor(a: number, b: number) : number {
  return Math.floor(a / b);
}

//6
function clamp(x: number, min: number, max: number) : number {
  return Math.min(Math.max(x, min), max);
}

//7
interface User {
  id: number;
  name: string;
}

function greet(user: User) : string {
  return `Hi ${user.name} (#${user.id})`;
}

//8
interface Product {
  price : number;
  qty : number;
}
function total(product: Product): number {
  return product.price * product.qty;
}

//9
function totalChars(list : string []): number {
  return list.reduce((sum, s) => sum + s.length, 0);
}

//10
function isBlank(text:string):boolean {
  return text.trim().length === 0;
}

// 11
const mul = (a: number, b:number) : number => a * b;

// 12
interface P {
  x: number;
  y: number;
}
function move(p:P, dx:number, dy:number) :P {
  p.x += dx;
  p.y += dy;
  return p;
}

// 13
function reverse(arr : number []) :number [] {
  return [...arr].reverse();
}

// 14
function includesValue(arr: number [], v: number) : boolean {
  return arr.indexOf(v) !== -1;
}

// 15
interface Person {
  first: string;
  last: string;
}
function fullName(person: Person) : string {
  return person.first + " " + person.last;
}

// 16
function maxOf(arr: number []) : number {
  if (arr.length === 0) return -Infinity;
  return Math.max(...arr);
}

// 17
function allTrue(list : boolean[]) : boolean {
  return list.every(Boolean);
}

// 18
function sumWith(list: number[], start: number = 0 ) :number {
  return list.reduce((s, n) => s + n, start);
}

// 19
interface Obj {
  []
}
function sumKeyLengths(obj: { [k: string]: unknown }): number {
  return Object.keys(obj).reduce((s, k) => s + k.length, 0);
}

// 20
interface Item {
  title: string;
  price : number;
  qty : number
}
function orderLine(item: Item) : string {
  const total = item.price * item.qty;
  return `${item.title} x ${item.qty} = ${total}`;
}