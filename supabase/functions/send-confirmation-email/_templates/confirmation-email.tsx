
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ConfirmationEmailProps {
  confirmation_url: string
}

export const ConfirmationEmail = ({
  confirmation_url,
}: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>사단법인 컴유니티 회원가입 인증 메일</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>안녕하세요, 사단법인 컴유니티입니다.</Heading>
        
        <Text style={text}>
          회원가입을 신청해주셔서 감사합니다.
        </Text>
        
        <Text style={text}>
          아래 인증 버튼(또는 링크)을 클릭하시면 회원가입이 완료됩니다.
        </Text>

        <Section style={buttonContainer}>
          <Button
            href={confirmation_url}
            style={button}
          >
            이메일 인증하기
          </Button>
        </Section>

        <Text style={text}>
          만약 버튼이 정상적으로 동작하지 않는 경우, 아래 링크를 복사하여 인터넷 브라우저 주소창에 붙여넣어 주세요.
        </Text>

        <Text style={linkText}>
          {confirmation_url}
        </Text>

        <Hr style={hr} />

        <Text style={noticeText}>
          <strong>※ 만 14세 미만 회원의 경우</strong>
        </Text>
        
        <Text style={text}>
          홈페이지에서 보호자 동의 관련 안내를 확인하신 후,<br />
          보호자 동의서 및 관련 서류를 comm@comm-unity.or.kr로 제출해 주시기 바랍니다.
        </Text>

        <Hr style={hr} />

        <Text style={text}>
          감사합니다.
        </Text>

        <Text style={signature}>
          사단법인 컴유니티 드림
        </Text>

        <Text style={footer}>
          ※ 본 메일은 발신전용입니다. 문의사항이 있으시면 홈페이지를 이용해 주세요.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ConfirmationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eaeaea',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20, 50, 70, .2)',
  margin: '0 auto',
  padding: '68px 0 130px',
  width: '665px',
}

const h1 = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
}

const text = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 40px',
}

const buttonContainer = {
  padding: '27px 40px 27px',
}

const button = {
  backgroundColor: '#374151',
  borderRadius: '5px',
  color: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
}

const linkText = {
  color: '#374151',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '16px 0',
  padding: '0 40px',
  wordBreak: 'break-all' as const,
  backgroundColor: '#f3f4f6',
  borderRadius: '4px',
  padding: '12px 40px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const noticeText = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 40px',
}

const signature = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: '24px',
  margin: '20px 0 10px',
  padding: '0 40px',
}

const footer = {
  color: '#8898aa',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '20px 0 0',
  padding: '0 40px',
}
