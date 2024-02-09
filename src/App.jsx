
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilStateLoadable } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    {/* these todos below will have a single backend request as recoil optimizes this coz of same ids, all of these todos below will have the same selector */}
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
  // making it useRecoilStateLoadable instead of useRecoilState to handle the loading state
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));  // alternative is <Suspense fallback={<div>Loading...</div>} />

  // now our todo is of this format
  // {
  //   contents: {id: 1, title: '...', description: '...'},
  //   state: 'hasValue' | 'loading' | 'hasError',
  // }

  if (todo.state === 'loading') {
    return <div>Loading...</div>
  } else if(todo.state === 'hasValue') {
    return (
      <>
        {todo.contents.title}
        {todo.contents.description}
        <br />
      </>
    )
  }
}

export default App
