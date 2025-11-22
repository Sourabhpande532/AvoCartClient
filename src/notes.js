// Concept of Promise
const coffyMadePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("Pizza is ready");
    else reject("Oven broke!");
  }, 2000);
});
coffyMadePromise
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

console.log("Start");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => console.log(data));
console.log("End");

async function getData() {
  // console.log( "start-from funct" );
  const res1 = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const res2 = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  const [result1, result2] = await Promise.all([res1, res2]);
  // console.log( result1 );
  // console.log( result2 );
  // console.log("end-from funct");
}
getData();

async function getThenConcept() {
  console.log("Start");
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/5"); // fetch -> response
  console.log("check:", res);

  const data = await res.json(); // response -> JSON
  console.log("Check data:", data);
  console.log("End");
}
getThenConcept();

async function demo() {
  const [a, b] = await Promise.all([
    Promise.resolve("Apple"),
    Promise.resolve("Banana"),
  ]);
  console.log(a, b);
}
demo();

/* THEORY EXPlANATION 

🧠 What is a Promise?

A Promise in JavaScript represents a task that takes time — something that will finish later (like an API call, file read, etc.).

You ask JavaScript:

“Please go do this work, and when you’re done, tell me the result.”

🍕 Real-life analogy

Imagine you order pizza 🍕.

You place an order → Promise is created

The pizza is being made → Promise is pending

The delivery arrives → Promise is fulfilled (resolved)

The order fails → Promise is rejected

🧩 Code example
const pizzaPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("Pizza is ready!");
    else reject("Oven broke!");
  }, 2000);
});

pizzaPromise
  .then((message) => console.log(message)) // if success
  .catch((error) => console.log(error));   // if failed


👉 Output after 2 seconds:
Pizza is ready!

Here:

resolve() means the work finished successfully.

reject() means it failed.

.then() runs when the promise succeeds.

.catch() runs when it fails.

🪄 Why we use Promises

Because many things in JS are asynchronous — they take time.
Examples:

Fetching data from a server

Reading a file

Waiting for a timer

Promises let you write cleaner, non-blocking code:

console.log("Start");
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(data => console.log(data));
console.log("End");


➡️ “Start” and “End” print immediately; the data appears later when ready.

🤝 What about Promise.all()?

If you order two pizzas 🍕🍕 at once:

You don’t want to wait for the first one to arrive before ordering the second.

You order both together and wait until both are delivered.

That’s what Promise.all() does:

const pizza1 = fetch('/margherita');
const pizza2 = fetch('/pepperoni');

const [res1, res2] = await Promise.all([pizza1, pizza2]);
// Waits for both to finish → faster overall

✅ Summary
Concept	Real-life analogy	Meaning
Promise created	You order pizza	Task started
Pending	Pizza is baking	Still working
Resolved	Pizza delivered	Task done successfully
Rejected	Oven broke	Task failed
Promise.all	Ordering multiple pizzas at once	Wait for all tasks together

Would you like me to show how Promise.allSettled or Promise.race work next (they’re fun and related)?


Why two times then 
Excellent observation 👏 — that’s a very common question!
Let’s break it down clearly and simply.

🧠 The code
console.log("Start");
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(data => console.log(data));
console.log("End");

Step-by-step what happens

fetch(...)

Starts downloading data from the URL.

Returns a promise (it doesn’t block the code).

That promise will eventually give you a Response object — not yet the data.

First .then(res => res.json())

.then() runs after the fetch promise is fulfilled.

Here, res is the Response object (not the actual JSON yet).

Calling res.json() starts another async operation that reads and converts the response body to JSON.

It also returns another promise.

Second .then(data => console.log(data))

This one waits for the JSON promise to finish.

When that’s done, it gives you the real parsed data.

Then you log it to the console.

🧩 In short:

The first .then handles the HTTP response → convert to JSON.

The second .then handles the actual data → use it.

🔁 Analogy: pizza again 🍕

Imagine:

fetch() = you order the pizza.

First .then = the pizza arrives in a box, but you must open it to get the actual pizza (res.json() = open the box).

Second .then = now you eat the pizza (data = real food).

🧠 If you used async/await instead

Same logic — just cleaner:

async function getData() {
  console.log("Start");
  const res = await fetch("https://api.example.com/users"); // fetch -> response
  const data = await res.json();                            // response -> JSON
  console.log(data);
  console.log("End");
}
getData();


👋👋👋🌴 UseEffect + Promises 
🧠 Step-by-step explanation
1️⃣ useState

You have two pieces of state:

products → will store all product data.

categories → will store all category data.

Initially, both are empty arrays [].

2️⃣ useEffect(() => { ... }, [])

useEffect runs after the component mounts (renders for the first time).
The empty dependency array [] means it runs only once.

It’s perfect for fetching data when the app starts.

3️⃣ async function fetchData() { ... }

You define an async function that:

starts loading,

fetches products and categories,

saves them into state,

then stops loading.

4️⃣ The key line 👇
const [pRes, cRes] = await Promise.all([
  API.get('/products'),
  API.get('/categories')
]);


Let’s unpack this carefully.

💡 What is Promise.all?

In JavaScript, promises represent something that will finish later — like data coming from an API.

Example:

const productPromise = API.get('/products');    // starts fetching
const categoryPromise = API.get('/categories'); // starts fetching


Each returns a promise that will eventually give a response (or error).

🚀 Now Promise.all([...])

Promise.all takes an array of promises, starts all of them together,
and waits until all of them are finished.

Example:

const [pRes, cRes] = await Promise.all([
  API.get('/products'),
  API.get('/categories')
]);


This means:

Start fetching both /products and /categories at the same time.

Wait until both are done.

When done, return an array of results in the same order.

So:

pRes → the response of API.get('/products')

cRes → the response of API.get('/categories')

✅ Benefit: It’s faster than calling them one after another.

🕒 Example to visualize

If each request takes 2 seconds:

❌ Without Promise.all (sequential):
const pRes = await API.get('/products'); // wait 2s
const cRes = await API.get('/categories'); // wait another 2s
// total 4 seconds

✅ With Promise.all (parallel):
const [pRes, cRes] = await Promise.all([
  API.get('/products'),
  API.get('/categories')
]);
// both happen together — total ~2 seconds only

That’s why developers use Promise.all — it’s faster and cleaner when multiple requests can run in parallel.

5️⃣ setProducts(pRes.data.data.products || [])

Once responses arrive, you extract the data and store it into React state.

The || [] ensures even if data is missing, it sets an empty array (avoids crashes).

Same for categories.

6️⃣ setLoading(true) / setLoading(false)

You likely have a loading state to show a spinner while fetching.

It turns true before fetching and false after completion.

7️⃣ catch(err)

If something fails (like network error), it logs the error.

🧩 In short:
Step	What happens
1	Component mounts
2	useEffect runs once
3	fetchData() runs (async)
4	Promise.all starts fetching both /products and /categories together
5	Waits for both to finish
6	Updates products and categories states
7	Stops loading and shows the UI


“If a - b is negative, don’t swap; if positive, swap.”
a - b → ascending order  
b - a → descending order 

const numbers = [3,5,2,50,33]
a=3,b=5 3 - 5 = -2 put sam 3,5 
a=5 b=2 5 - 2 = +3 swap it 2,5 result [3,2,5] asencding...
a=3, b=5i.e 5-2 = 3 swap 5,3 
a=3,b =2 i.e 2-3 = -1 result [5,3,2]

const fruits = ["Bannana", "Apple", "Orange"];
console.log( fruits.sort() );
const numbers = [100, 20, 5, 15]
numbers.sort( ( a, b ) => b - a ) //dscenging 
console.log( numbers );
*/

// USE-LOCATION
/* useQuery: This is a custom React Hook that helps you read query parameters (the ?key=value part of a URL).
/* 
useLocation() → gives the full address of page e.g pathname,search.
URLSearchParams → lets you easily read the details (page=2, category=shoes).
e.g 
const params = new URLSearchParams("?page=2&category=shoes");
params.get("page");       // "2"
params.get("category");   // "shoes"

const location = useLocation(); return object with current page details; e.g search ...
console.log(location.search); i.e ?page=3&category=xyz 

  console.log(useLocation());
  const params = new URLSearchParams(useLocation().search)
  console.log(params.get('categorysent'));


  UseEffect:
  so can we just say in short useEffect design after rendered part(return code) is it so?? clear my confusion?
  Yes — you can say that in short.

Here is the simplest and correct version:

✅ Short Explanation

useEffect runs after the component renders the return part.

That’s exactly how React designed it.

✅ Even simpler sentence

useEffect is executed after the UI is shown on the screen.

⭐ Final clarity
The return() part runs first → UI appears
Then useEffect() runs → side effects happen
Your understanding is correct now.

✅useEffect(() => { const queryCategory = query.get("category"); if (queryCategory) setSelectedCats([queryCategory]); }, []); one concern here why we stored categoryId in array see here setSel...in short we can even stored in string
✅ Why selectedCats is an array instead of a string?

Because:
✔️ In most filter systems, users can select multiple categories.
Example:

Shoes
Bags
Watches

If user selects more than one category, you need:

["shoes", "bags"]


NOT:

"shoes"


So the state is designed like this from the beginning:

const [selectedCats, setSelectedCats] = useState([]);


This allows multi-select filtering later.

🧠 So in this line:
setSelectedCats([queryCategory]);


You are saying:

“Set the first selected category as an array with one item.”

This keeps the structure consistent everywhere in your app.

❓ But can we store a string?

Yes, you can, but only if:

Your project supports single category selection only

Filters do NOT allow selecting multiple categories

In that case, you would do:

const [selectedCat, setSelectedCat] = useState("");

useEffect(() => {
  const queryCategory = query.get("category");
  if (queryCategory) setSelectedCat(queryCategory);
}, []);


But most e-commerce filters support multiple categories, so devs use an array.

⭐ Final Simple Answer

We use an array because category filters often allow multiple selections.
Even if today you store only one, the array keeps the structure ready for multi-category filtering.

-------------

UseMemo instead useEffect ? 
const filtered = useMemo(() => {
  let res = [...products];
  if (selectedCats.length) {
    res = res.filter((product) =>
      selectedCats.includes(String(product.category?._id))
    );
  }
  return res;
}, [products, selectedCats]);


🔥 Your Confusion Solved in One Sentence

useEffect is not always about state change inside it — it’s about WHEN you want the code to run: after render, and only when certain dependencies change.


🎯 SUPER SIMPLE ANALOGY FOR THIS EFFECT
⭐ Analogy:

Imagine someone gives you a list of fruits.
The moment the list arrives → now you filter them based on color.

But you do NOT filter before the fruits arrive.
You do NOT filter on every second.
You only filter when the fruits are updated.

That is useEffect([products]).

✅ First, read this rule:

useEffect is not only for state changes.
useEffect is for: code that should run AFTER render and code that should run when specific values change.




why we use product inside useEffect? in dependencies [product]

⭐ YES — the reason we use useEffect in ProductListing is because products comes from AppContext and it changes asynchronously.

That is the exact reason.

🧠 Why this matters?

Look at AppContext:

useEffect(() => {
  async function fetchData() {
    const [pRes, cRes] = await Promise.all([...]);
    setProducts(pRes.data.data.products || []);
  }
  fetchData();
}, []);


This means:

ProductListing renders first time → products = []

API request starts (fetchData)

After 1–2 seconds → API response comes back

setProducts(...) updates products in AppContext

Context updates → ProductListing re-renders with new data

So, in ProductListing:

useEffect(() => {
  let res = [...products];
  if (selectedCats.length)
    res = res.filter(...);
  setFiltered(res);
}, [products]);


This effect runs only when products actually change, not every render.

🧠 Simple Explanation
Step 1: Page loads → products empty ([])
Step 2: UI renders (loading screen, blank UI)
Step 3: API finishes → setProducts updates state in Context
Step 4: ProductListing gets NEW products
Step 5: NOW useEffect(products) runs → filters the new data

This is exactly why we need useEffect here.

⭐ Analogy (very simple)

Imagine you're cooking:

Pan is empty (products = [])

You turn on the stove (component renders)

Delivery boy brings vegetables (API response)

NOW you chop the vegetables (filter them)

You cannot chop before the vegetables arrive.
You chop after delivery.

This chopping-after-delivery = useEffect(products)

❗ If we remove this useEffect?

Then filtering would run before the products arrive → wrong.
Or you'd try to set state inside the render → infinite loop.

So YES — because products are coming later from Context, we must use useEffect.

🎯 Final One-Line Answer

We use useEffect in ProductListing because products come from AppContext and update asynchronously after the component has rendered. Filtering must happen after products arrive, not during the initial render.
*/
