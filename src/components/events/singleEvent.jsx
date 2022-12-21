import React,{useRef,useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

const SingleEvent = ({data}) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventID = router?.query.id;
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!emailValue.match(validRegex)){
            setMessage('Please enter a valid email address.');
                        return;
        }
        
        try{
            // POST fetch request body email value and eventID
            const res = await fetch('/api/email_registration',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email:emailValue,
                        eventID
                    }),
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();
            console.log(data);
        }catch(err){
            console.log("ERROR",err);
        }
    }
    return(
        <div>
            <h1>{data.title}</h1>
            <Image src={data.image} width={1000} height={500} alt={data.title} priority='true'/>
            <p>{data.description}</p>
            <label>Register for this event! </label><br/>
            <form onSubmit = {onSubmit}  placeholder='Please enter your email'><input ref={inputEmail} id = "email" type="text"/> <button type='submit'>Submit</button></form>
            <p>{message}</p>
        </div>
    )
}

export default SingleEvent;