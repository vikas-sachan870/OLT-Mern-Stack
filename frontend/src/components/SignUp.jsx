import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

      useEffect(() => {
          document.title = 'Register';
        }, [])

  const handleSubmit = (event) => {
      event.preventDefault();
      
      axios.post( "http://localhost:1000/api/v1/register", {name, email, password})
      .then(result => {
          console.log(result);
          if(result.data === "User already exists Please login"){
              alert("E-mail already registered! Please Login to proceed.");
              navigate('/login');
          }
          else{
              alert("Registered successfully! Please Login to proceed.")
              navigate('/login');
          }
          
      })
      .catch(err => console.log(err));
  }

  let styles = {
    backgroundImage:'linear-gradient(90deg,rgb(10,36,45),rgb(192,100,302))'
}

  return (
    <>
    <NavBar />
      <div className='main flex justify-center mt-10'>
        <div className='w-[450px] shadow-xl'>
          <div className="card-header text-white text-center rounded-t-md py-2" style={styles}>
          <i className="fa-solid fa-circle-user fa-2x"></i>
            <h3 className="text-center font-bold text-2xl font-serif">Registration here</h3>
          </div>
          <form onSubmit={handleSubmit} className='bg-gray-100 rounded-b-md py-4'>
            <div className="mb-3 mx-5">
              <label htmlFor="name" className="text-lg">Name</label> <br /> <input name="name" required type="text"
                  className="rounded-md py-2 w-full mt-2 border-2 hover:outline outline-offset-1 outline-blue-300 hover:shadow-2xl" id="name" onChange={(event) => setName(event.target.value)}
                  />
            </div>
            <div className="mb-3 mx-5">
              <label htmlFor="exampleInputEmail1" className="text-lg">Email
                address</label> <br /> <input name="uemail" required type="email"
                  className="rounded-md py-2 w-full mt-2 border-2 hover:outline outline-offset-1 outline-blue-300 hover:shadow-2xl" id="exampleInputEmail1" onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3 mx-5">
              <label htmlFor="exampleInputPassword1" className="text-lg">Password</label> <br />
              <input name="upass" required type="password"
                className="rounded-md py-2 w-full mt-2 border-2 hover:outline outline-offset-1 outline-blue-300 hover:shadow-2xl" id="exampleInputPassword1"  onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className="text-center text-2xl mt-2">
              <button type="submit" className="outline outline-1 outline-black px-2 py-1 my-2 rounded-lg hover:bg-slate-400 hover:text-white">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
