import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signup } from "../services/authService"
import logo from "../assets/intellectup-logo.png"

function Signup(){

const navigate=useNavigate()

const [form,setForm]=useState({

fullname:"",
email:"",
password:""

})

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

})

}

const handleSubmit=async(e)=>{

e.preventDefault()

try{

await signup(form)

alert(
"Signup Successful"
)

navigate("/")

}

catch{

alert(
"Signup Failed"
)

}

}

return(

<div className="min-h-screen bg-slate-950 flex items-center justify-center">

<div className="bg-white p-10 rounded-3xl shadow-2xl w-[430px]">

<div className="flex flex-col items-center">

<img

src={logo}

alt="Logo"

className="w-20 h-20 mb-2"

/>

<h1

style={{
fontFamily:"Poppins"
}}

className="text-5xl font-bold text-slate-900"

>

IntellectUp

</h1>

<p

style={{
fontFamily:"Inter"
}}

className="text-gray-500 mt-2 mb-8 tracking-wide font-medium"

>

Focus

<span className="mx-2 text-green-600">

•

</span>

Learn

<span className="mx-2 text-green-600">

•

</span>

Grow

</p>

</div>

<form

onSubmit={handleSubmit}

className="flex flex-col gap-5"

>

<input

name="fullname"

placeholder="Full Name"

onChange={handleChange}

className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"

/>

<input

name="email"

placeholder="Email"

onChange={handleChange}

className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"

/>

<input

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"

/>

<button

className="bg-green-600 text-white p-4 rounded-xl font-semibold hover:bg-green-700 hover:scale-105 transition duration-300"

>

Create Account

</button>

</form>

<p className="text-center mt-6">

Already have an account?

<Link

to="/"

className="text-green-600 font-bold ml-2"

>

Login

</Link>

</p>

</div>

</div>

)

}

export default Signup