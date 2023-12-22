'use client'

import http from '@/utils/http';

const Login = () => {
  const onClickHandler = async () => {
    const result = await http.post('/api/auth/local', {
      identifier: 'lijiang0327@126.com', 
      password: 'lijiang.com'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(result);
  }

  return <div onClick={onClickHandler}>login</div>
}

export default Login;
