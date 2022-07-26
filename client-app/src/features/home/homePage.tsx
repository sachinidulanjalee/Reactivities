import React from 'react'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer (function HomePage() {
const {userStore,modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' lt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn?(
                    <>
                    <Header as='h2' inverted content='Welcome to Reactivities'/>
                    <Button as={Link} to='/activities' size='huge'> Go to Activities</Button>
                    </>
                ):(
                    <>
                <Button onClick={()=>modalStore.openModal(<LoginForm/>)} size='huge'> Login!</Button>
                <Button onClick={()=>modalStore.openModal(<RegisterForm/>)} size='huge'> Register!</Button>
                </>)
            } 
            </Container>
        </Segment>

    )
})
