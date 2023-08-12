import { useEffect } from 'react'
import Router from 'next/router'
import { StyledButton } from '../../components/layout/styles'
import router from 'next/router'
import Image from 'next/image'

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>404</h1>
      <p style={{ fontSize: '1.0rem', color: '#64717B' }}>
        このページはすでに削除されているか、URLが間違っている可能性があります。
      </p>

      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://github.com/yud0uhu/my-blog/blob/main/image/404cat.png?raw=true"
          alt="Running Cat"
          width={300}
          height={300}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <StyledButton
        onClick={() => {
          router.push('/')
        }}
        style={{
          padding: '10px',
        }}
      >
        トップに戻る
      </StyledButton>
    </div>
  )
}

export default NotFoundPage
