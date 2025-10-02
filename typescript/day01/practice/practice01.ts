// 1
function len(s:string | []): number {
  return s.length;
}

// 2
function add(a:number, b: number):number {
  return a+b;
}

// 3
type User = {
  id: number;
  name: string;
  admin: boolean;
};

const user:User = {
  id: 1,
  name: "Lee",
  admin: false,
}

function greet(u : User):string {
  return `Hello, ${u.name}`
}

// 4
function avg(arr: number[]) : number {
  if(!arr.length) return 0;
  return arr.reduce((s,n) => s+n,0) / arr.length;
}

// 5
function toText(v : number | string) : string {
  if (typeof v === "number") return String(v);
  return v.toUpperCase();
}

// 6
type Product = {
  title: string;
  badge?: string;
}

function label(product : Product) : string {
  const title = product.title;
  const badge = product.badge ? ` [${product.badge}]` : "";
  return title + badge;
}

const p1:Product = { title: "Mug" };
const p2:Product = { title: "T-Shirt", badge: "NEW" };

// 7
type Point = {
  x: number;
  y: number;
}

const coords:Point = { x: 10, y: 20 };
function move(p: Point, dx: number, dy: number):Point {
  p.x += dx;
  p.y += dy;
  return p;
}

// 8
function toggle(flag: boolean) : boolean {
  return !flag;
}

// 9
function size(list :number[]) : number {
  return list.length;
}

// 10
type mPoint = {
  x: number;
  y: number;
}

function makePoint(x:number, y:number):mPoint {
  return { x: x, y: y };
}