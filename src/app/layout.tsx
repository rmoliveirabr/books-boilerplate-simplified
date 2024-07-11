'use client'

import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, Box } from '@mui/material';
import { Book as BookIcon, Home as HomeIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import styles from "@/app/page.module.css";
import '@/app/globals.css';

import { ToastContainer } from 'react-toastify';
import Link from 'next/link'

import { SessionProvider } from "next-auth/react"

import SignInOutLink from '@/components/auth/sign-in-out-link';

const drawerWidth = 180;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const DrawerContainer = styled('div')(({ theme }) => ({
  overflow: 'auto',
}));

const MainContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  paddingLeft: '50px', // avoid drawer overlapping content
}));

const Content = styled('main')(({ theme }) => ({
  // display: 'flex',
  // flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(1),
  fontSize: 12,
  paddingBottom: '50px', // to ensure content does not overlap with footer
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  // marginTop: 'auto',
  backgroundColor: theme.palette.grey[200],
  textAlign: 'center',
}));

export default function Layout({ children }) {

    return (
      <html>
        <body>
          <Root>
            <SessionProvider>
              <CssBaseline />
              <AppBarStyled position="fixed">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" noWrap>
                    Boilerplate with a book Management System
                  </Typography>
                  <Typography variant="h6" noWrap>
                    <SignInOutLink />
                  </Typography>
                </Toolbar>
              </AppBarStyled>
              <DrawerStyled variant="permanent">
                <Toolbar />
                <DrawerContainer>
                  <List>
                    <ListItemButton key={"Books"} component={Link} href="/books">
                      <ListItemIcon><BookIcon /></ListItemIcon>
                      <ListItemText primary={"Books"} />
                    </ListItemButton>
                  </List>
                </DrawerContainer>
              </DrawerStyled>
              <MainContent>
                <Toolbar />
                <ToastContainer />
                <Content>
                  <Container style={{ width: '100%' }}>
                    <main className={styles.main}>
                      <div style={{ width: '100%' }}>
                      {children}
                      </div>
                    </main>
                  </Container>
                </Content>
              </MainContent>
              <Footer component="footer">
                  <Typography variant="body1">Application Footer</Typography>
              </Footer>
            </SessionProvider>
          </Root>
        </body>
      </html>
    );
};

