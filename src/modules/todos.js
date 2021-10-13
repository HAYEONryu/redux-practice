import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo 를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo 를 체크/체크해제 함
const REMOVE = 'todos/REMOVE'; // todo 를 제거함

//액션 생성 함수 만들기
let id = 0;
export const changeInput = createAction(CHANGE_INPUT, input=>input);
export const insert = createAction(INSERT, text=>({
    id: id++,
    text,
    done:false
}));
export const toggle = createAction(TOGGLE, id=>id);
export const remove = createAction(REMOVE, id=>id);

//초기 상태 만들기
const initialState={
    input:'',
    todos:[
        {id:1,
        text: "테스트중",
        done:true}
    ]
};
//리듀서 만들기
const todos = handleActions(
    {
      [CHANGE_INPUT]: (state, { payload: input }) =>
        produce(state, draft => {
          draft.input = input;
        }),
      [INSERT]: (state, { payload: todo }) =>
        produce(state, draft => {
          draft.todos.push(todo);
        }),
      [TOGGLE]: (state, { payload: id }) =>
        produce(state, draft => {
          const todo = draft.todos.find(todo => todo.id === id);
          todo.done = !todo.done;
        }),
      [REMOVE]: (state, { payload: id }) =>
        produce(state, draft => {
          const index = draft.todos.findIndex(todo => todo.id === id);
          draft.todos.splice(index, 1);
        }),
    },
    initialState,
  );
export default todos;