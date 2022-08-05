import {useNavigate} from 'react-router-dom';
const TodoList = () => {
    const navigate = useNavigate();

    const todo = {
        id: 3,
        title: "과학",
    }
    return (
        <div>
            <h1>게시판</h1>
            <button>게시글 등록</button>
            <p onClick={() =>
                navigate("/detail/" + todo.id)}
            >{todo.title}</p>
        </div>

    );
};

  export default TodoList;