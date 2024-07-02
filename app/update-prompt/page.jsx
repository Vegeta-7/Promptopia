// page creates a route for the component with address as /create-prompt

'use client';

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();    
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(()=>{
        const promptDetails = async() => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost(data)
        }
        if(promptId) promptDetails();
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("Prompt id not found")

        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,                    
                    tag: post.tag
                })
            })
            if(response.ok){
                router.push('/')
            }
        }catch(e){
            console.log(e)
        }finally{
            setSubmitting(false)
        }
    }

    return (
        <Form 
            type="Edit"
            post={post}            
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt;