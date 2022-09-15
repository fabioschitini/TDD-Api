import React from 'react';
import { render, screen,fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateGames from './UpdateGames'
import Login from './LogIn'
import Nav from './Nav'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {Route,BrowserRouter as Router,MemoryRouter} from 'react-router-dom'


const instance = axio.create({
  baseURL: 'https://radiant-garden-44368.herokuapp.com/',
  withCredentials:true
}); 

const allGames = [
    { id: '1', title: 'Elden Ring' }, 
    { id: '2', title: 'Dark Souls' }, 
    { id: '3', title: 'Blodborne' }
  ];

  const users=[
    {id:'1',username:'user1',password:'senha'},
    {id:'2',username:'user2',password:'senha'},
    {id:'3',username:'user3',password:'senha'}
  
  ]

const server = setupServer(
    rest.put('/games', (req, res, ctx) => {
      try{
        console.log(req.body.id,'bodyyyyyyyyyyyyyyy')
        let updatedGame={
          id:req.body.id,
          title:req.body.title
      }
     let result= allGames.map(game=>{
          if(game.id===req.body.id){
              return updatedGame
          }
          return game
      })
    return res(ctx.json({ games:  result }));
      }
      catch(e){
        console.error(e.message)
      }
 
    }),
    rest.get('/games', (req, res, ctx) => {
      try{
        return res(ctx.json({allGames }));
      }
      catch(e){
        console.error(e.message)
      }
   }),
   rest.get('/login', (req, res, ctx) => {
    try{
      return res(ctx.json({ users }));
    }
    catch(e){
      console.error(e.message)
    }
  }),
    rest.delete('/games/:id',(req,res,ctx)=>{
      try{
        let uptadedGames=allGames.filter(game=>game.id!==req.params.id)
        return res(ctx.json({games:uptadedGames}))
      }
      catch(e){
        console.error(e.message)
      }
    })
  );

  beforeAll(() => server.listen({onUnhandledRequest:'bypass'}));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

 /*  test('Submit the values using the button,and log',async ()=>{
    render(<MemoryRouter><Login  /></MemoryRouter>)
    const userNameField=screen.getByPlaceholderText('username')
    const passwordField=screen.getByPlaceholderText('password')
    const button=screen.getByText(/submit/i)
    fireEvent.change(userNameField,{target:{value:'user1'}})
    fireEvent.change(passwordField,{target:{value:'senha'}})
    fireEvent.click(button);
    await waitFor(() =>{expect( screen.getByTestId('test')).toHaveTextContent("user1")})
    expect(screen.getByTestId('location-display')).toHaveTextContent('/home')
  })
 */

/*   test('Submit the values using the button and receveid the new array from the server',async ()=>{
    render(<MemoryRouter> <SubmitGame/></MemoryRouter>)
    const nameField=screen.getByPlaceholderText('Enter the game name...')
    const button=screen.getByText(/submit/i)
    fireEvent.change(nameField,{target:{value:'Zelda'}})
    fireEvent.click(button);
    await waitFor(() =>{expect( screen.getByTestId('test')).toHaveTextContent('"title":"Zelda"')})
    expect(screen.getByTestId('location-display')).toHaveTextContent('/home')
  }) */

/* test('Render the input field and button,also the title input should have the value of the especifi game, and ',async()=>{

  const gamesList= await instance.get('/games')
  testGame=gamesList.data.filter(game=>game.title="Zelda")[0]

        render(
          <MemoryRouter initialEntries={[`/games/${testGame._id}`]}>
      <UpdateGames />
    </MemoryRouter>
        )
      expect(screen.getByTestId('location-display')).toHaveTextContent(`/games/${testGame._id}`)
      expect(await screen.findByDisplayValue("Zelda")).toBeInTheDocument()
      expect( screen.getByText(/submit/i)).toBeInTheDocument();
  })  */

/*  test('Update the game and return the new array with updated array and then navigate to /home',async()=>{
   const gamesList= await instance.get('/games')
  testGame=gamesList.data.filter(game=>game.title="Zelda")[0]
    render(
      <MemoryRouter initialEntries={[`/games/${testGame._id}`]}>
      <UpdateGames />
    </MemoryRouter>
    )
    const nameField=await  screen.findByLabelText('Title')
    const button= await screen.findByText(/submit/i)
    fireEvent.change(nameField,{target:{value:'Sekiro3'}})
    fireEvent.click(button);
    await waitFor(() =>{expect( screen.getByTestId('test')).toHaveTextContent('"title":"Sekiro3"')})
    expect(screen.getByTestId('location-display')).toHaveTextContent('/home')
  })  */

/* test('When you click the delete button,delete the game and return new array', async() => {
   const gamesList= await instance.get('/games')
  testGame=gamesList.data.filter(game=>game.title="Zelda")[0]
    render(<MemoryRouter initialEntries={[`/games/${testGame._id}`]}> <UpdateGames /> </MemoryRouter>)
    const button= await screen.findByText(/delete/i)
    fireEvent.click(button)  
    await waitFor(() =>{expect( screen.getByTestId('test')).not.toHaveTextContent('"title":"Sekiro"')})
 
      //await waitFor(() =>{expect(screen.getByText('Are you sure that you want to Delete this token?')).toBeInTheDocument()})
      //await waitFor(() =>{ expect(screen.getByText('Yes')).toBeInTheDocument() })
      //await waitFor(() =>{expect(screen.getByText('No')).toBeInTheDocument()}) 

    })  */  

/* test('Dont show logout if the user is not loggend in',async()=>{

      // server.use(
       //  rest.get('/login', (req, res, ctx) => { 
        //   return res(ctx.status(401),ctx.json('Not logged in'));
        // })
      // );  
       render(<MemoryRouter><Nav /></MemoryRouter>);
        expect(await screen.findByText("Logout")).toBeInTheDocument()
       fireEvent.click(await screen.findByText("Logout"));
       //await waitFor(() =>{ expect( screen.queryByText("Logout")).not.toBeInTheDocument() }) 
     })      

test('Dont load if not logged in', async () => {
      server.use(
        rest.get('/login', (req, res, ctx) => { 
          return res(ctx.status(401),ctx.json('Not logged in'));
        })
      ); 
      render(
        <MemoryRouter initialEntries={["/games/1"]}>
        <UpdateGames />
      </MemoryRouter>
        )
       expect(screen.getByText('You do not have permission to acesse this page')).toBeInTheDocument()
     
    })     */