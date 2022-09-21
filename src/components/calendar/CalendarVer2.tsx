import React, { useState,useEffect } from "react";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import Input from '../../elements/Input';
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
// import { updateDate,selectDate } from '../../redux/modules/searchDate';
import { getAllTodo,__postCategory,__getDateTodo,__postTodo,__deleteTodo,__doneTodo,__editCategory,__deleteCategory } from '../../redux/modules/dateTodos';
// import { getAllTodo,allPostCategory,allDeleteCategory,allPostTodo,allDeleteTodo,allDoneTodo } from '../../redux/modules/allTodos';
import calBg from '../../assets/pixel/calBg.png'
import left from '../../assets/pixel/left.png'
import right from '../../assets/pixel/right.png'

export type Iresault = {
  result: [];
    };

const CalendarVer2 = () => {
  const dispatch = useAppDispatch();
  //달력
  //오늘 날짜 저장
  useEffect(() => {
    // dispatch(updateDate(today.format("YYYY-MM-DD")));//컴포넌트분리시사용
    setDD(today.format("YYYY-MM-DD"));
    dispatch(getAllTodo());
  }, []);
  const allTodos =  useAppSelector((state) => state.dateTodos.allTodos)
  // const date = useAppSelector((state) => state.updateDate.date);//컴포넌트분리시사용

  const [getMoment, setMoment] = useState(moment());
  const [DD,setDD] = useState('')
  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();
  const radius = 48;
  const diameter = 2 * Math.PI * radius;

  const dateSubmitHandler = (selectDD:string) => {
    // dispatch(selectDate(selectDD)) //컴포넌트분리시사용
    setDD(selectDD)
  }

  //TodoList
  useEffect(() => {
    // dispatch(__getDateTodo(date)); //컴포넌트분리시사용
    dispatch(__getDateTodo(DD));
  }, [DD]);

  const dateTodos = useAppSelector((state) => state.dateTodos.dateTodos);
  const [categoryInputShow,setCategoryInputShow] = useState(false)
  const [todoInputShow,setTodoInputShow] = useState(false)
  const [editCategoryShow,setEditCategoryShow] = useState(false)
  const [category, setCategory] = useState("");  
  const [editCategory, setEditCategory] = useState("");

  const [todo, setTodo] = useState("");

  const onSubmitHandler = () => {
    // if (category.length < 2) {
    //   alert("2글자 이상 입력");
    // }
    // if (dateTodos.length < 4)
    //   dispatch(__postCategory({ categoryName: category, selectDate: date }));
    // else {
    //   alert("4개까지만 생성가능");
    // }
    dispatch(__postCategory({ categoryName: category, selectDate: DD }));
    setCategory("");
  };

    const onChangeCategoryInput = (e: any) => {
    setCategory(e.target.value);
  };
  const onSubmitTodoHandler = (id: any) => {
    if (todo.length < 4) {
      alert("너무 짧습니다");
      return;
    }
    dispatch(
      __postTodo({
        categoryId: id,
        selectDate: DD,
        content: todo,
      })
    );
    setTodo("");
  };
  const onChangeTodoInput = (e: any) => {
    setTodo(e.target.value);
  };

  const onSubmitEditHandler = (id: any) => {
    dispatch(
      __editCategory({
        categoryName: editCategory,
        categoryId: id,
      })
    );
    setEditCategoryShow(false)
  };


  const calendarArr = () => {
    let result:any = [];
    let week = firstWeek;
  
      for (week; week <= lastWeek; week++) {
        result = result.concat(
          <CalendarRow key={week}>
            {Array(7)
              ?.fill(0)
              ?.map((data, index) => {
                let days = today
                  .clone()
                  .startOf("year")
                  .week(week)
                  .startOf("week")
                  .add(index, "day");
                if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                  return (
                    //오늘
                    <CalendarCel
                      key={index}
                      onClick={() => dateSubmitHandler(days.format("YYYY-MM-DD"))}
                    >
                
                    {allTodos.find((list)=> list.selectDate == days.format("YYYY-MM-DD")) && allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0) !== 0 &&
                    <svg  width="75" height="75" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="48"
                          fill="transparent"
                          stroke="beige"
                          strokeWidth="90"
                        />
                        <AnimatedCircle
                          cx="100"
                          cy="100"
                          r="48"
                          fill="transparent"
                          stroke="#f6730e"
                          strokeWidth="90"
                          strokeDasharray= {`${diameter * allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList).filter((z)=>z.length).map((a)=>a.filter((b)=>b.done == 1).length).reduce((a,b)=>a+b,0) 
                          / allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0)} ${
                            diameter - diameter * allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList).filter((z)=>z.length).map((a)=>a.filter((b)=>b.done == 1).length).reduce((a,b)=>a+b,0) 
                            / allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0)
                          }`}
                          strokeDashoffset={diameter * 0.25}
                        />
                      </svg> }
                      <P  style={{ backgroundColor: "#ff6f00"}}  >{days.format("D")}</P>
                    </CalendarCel>
                  );
                } else if (days.format("MM") !== today.format("MM")) {
                  return (
                    //이전달//다음달
                    <CalendarCel
                      key={index}
                      onClick={() =>  dateSubmitHandler(days.format("YYYY-MM-DD"))}
                    >
                    {allTodos.find((list)=> list.selectDate == days.format("YYYY-MM-DD")) && allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0) !== 0 &&  
                    <svg  width="75" height="75" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="48"
                          fill="transparent"
                          stroke="beige"
                          strokeWidth="90"
                        />
                        <AnimatedCircle
                          cx="100"
                          cy="100"
                          r="48"
                          fill="transparent"
                          stroke="#46BDF9"
                          strokeWidth="90"
                          strokeDasharray={`${diameter * allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList).filter((z)=>z.length).map((a)=>a.filter((b)=>b.done == 1).length).reduce((a,b)=>a+b,0) 
                          / allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0)} ${
                            diameter - diameter * allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList).filter((z)=>z.length).map((a)=>a.filter((b)=>b.done == 1).length).reduce((a,b)=>a+b,0) 
                            / allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0)
                          }`}
                          strokeDashoffset={diameter * 0.25}
                        />
                      </svg> }
                      <P style={{ backgroundColor: "#46befa" }} >
                        {days.format("D")}</P>
                    </CalendarCel>
                  );
                } else {
                  //전체날짜
                  return (
                    <CalendarCel
                      key={index}
                      onClick={() =>  dateSubmitHandler(days.format("YYYY-MM-DD"))}
                    >
                    
                    {allTodos.find((list)=> list.selectDate == days.format("YYYY-MM-DD")) && allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0) !== 0 &&  
                    <svg  width="75" height="75" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="48"
                          fill="transparent"
                          stroke="beige"
                          strokeWidth="90"
                        />
                        <AnimatedCircle
                          cx="100"
                          cy="100"
                          r="48"
                          fill="transparent"
                          stroke="#0E75F8"
                          strokeWidth="90"
                          strokeDasharray={`${diameter * allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList).filter((z)=>z.length).map((a)=>a.filter((b)=>b.done == 1).length).reduce((a,b)=>a+b,0) 
                          / allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0)} ${
                            diameter - diameter * allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList).filter((z)=>z.length).map((a)=>a.filter((b)=>b.done == 1).length).reduce((a,b)=>a+b,0) 
                            / allTodos.filter((x)=>x.selectDate == days.format("YYYY-MM-DD")).map((y)=>y.todoList.length).reduce((a,b)=>a+b,0) 
                          }`}
                          strokeDashoffset={diameter * 0.25}
                        />
                      </svg> }
                      <Cel></Cel>
                      <P>{days.format("D")}</P>
                    </CalendarCel>
                  );
                }
              })}
          </CalendarRow>
        );
      }
      return result;
    };
    return (
      <>
        <Layer>
          <Wrapper>
            <Calendar>
              <CalendarRight>
                <Main>
                  <CalendarRow>
                    <CalendarCol>SUN</CalendarCol>
                    <CalendarCol>MON</CalendarCol>
                    <CalendarCol>TUE</CalendarCol>
                    <CalendarCol>WED</CalendarCol>
                    <CalendarCol>THU</CalendarCol>
                    <CalendarCol>FRI</CalendarCol>
                    <CalendarCol>SAT</CalendarCol>
                  </CalendarRow>
                  {calendarArr()}
                </Main>
              </CalendarRight>
              <LeftLayer>
                <MonthYear>
                  <YearBox>
                  <PrevBtn src={left} onClick={() => {
                        setMoment(getMoment.clone().subtract(1, "year"));
                      }}></PrevBtn>
                    <TodayYear>{today.format("YYYY")}</TodayYear>
                    <NextBtn src={right} onClick={() => {
                        setMoment(getMoment.clone().add(1, "year"));
                      }}></NextBtn>
                  </YearBox>
                  <Month>
                    <PrevBtn src={left} onClick={() => {
                        setMoment(getMoment.clone().subtract(1, "month"));
                      }}></PrevBtn>
                    <TodayMon> {today.format("MMMM")}</TodayMon>
                    <NextBtn src={right}  onClick={() => {
                        setMoment(getMoment.clone().add(1, "month"));
                      }}></NextBtn>
                  </Month>
                </MonthYear>
                <CalendarLeft>
                  <TopBox>
                    <form onSubmit={(e)=>{
                      e.preventDefault();
                      onSubmitHandler();
                      }}>
                    <HiddenAddBtn categoryInputShow={categoryInputShow}>
                      <AddEventBtn onClick={()=>{
                        setCategoryInputShow(true);
                        }} categoryInputShow={categoryInputShow}>
                        +
                      </AddEventBtn>
                      {category && 
                      <AddEventBtnHidden>
                        +
                      </AddEventBtnHidden>}
                      <AddCategory categoryInputShow={categoryInputShow}>
                        {/* <Input height={30} /> */}
                        <input type="text" placeholder='카테고리를 입력하세요.' onChange={onChangeCategoryInput} />
                      </AddCategory>
                    </HiddenAddBtn>
                  </form>
                    <Today>{DD.slice(-2)}</Today>
                  </TopBox>
              
                  <LeftSideDay>
                      {dateTodos &&
                      dateTodos.map((list)=>( 
                      <TodoListBox key={list.categoryId}>
                        <CategoryBox>
                          <CategoryTitle    
                          onSubmit={(e) => {
                            e.preventDefault();
                            onSubmitEditHandler(list.categoryId);
                          }}>
                            <input readOnly={ editCategoryShow ? false : true} onClick={()=>setEditCategoryShow(true)} onChange={(e) => setEditCategory(e.target.value)} type="text" defaultValue={list.categoryName}/>
                          </CategoryTitle>
                          <BtnGroup>
                            <CategoryDeleteBtn onClick={() => dispatch(__deleteCategory(list.categoryId))} >+</CategoryDeleteBtn>
                            <TodoPopBtn onClick={()=>{setTodoInputShow(!todoInputShow);}} todoInputShow={todoInputShow} >
                            ›
                            </TodoPopBtn>
                          </BtnGroup> 
                    
                        </CategoryBox> 
                        {todoInputShow && 
                        <HiddenTodoAddBox onSubmit={(e) => {
                              e.preventDefault();
                              onSubmitTodoHandler(list.categoryId);
                            }}>
                            <input type="text" 
                            onChange={onChangeTodoInput}/>
                          <TodoAddBtn todo={todo}>+</TodoAddBtn>
                        </HiddenTodoAddBox>}
                        {list.todoList && 
                        list.todoList.map((item)=>(
                        <TodoList key={item.todoId}>
                          <DoneBtn style={{ backgroundColor: item.done === 1 ? "#32de5d" : "transparent"}}
                          onClick={() =>dispatch(__doneTodo(item.todoId))}> </DoneBtn>
                          <Todo>{item.content}</Todo>
                          <TodoBtn>
                            <DeleteBtn
                              onClick={() =>
                                dispatch(
                                  __deleteTodo({
                                    todoId: item.todoId,
                                    categoryId: list.categoryId,
                                  })
                                )
                            }>+</DeleteBtn>
                          </TodoBtn>
                        </TodoList>))}                    
                      </TodoListBox>))}
                  </LeftSideDay>
                </CalendarLeft>
              </LeftLayer>
            </Calendar>
          </Wrapper>
        </Layer>
      </>
    );
  };
  
  export default CalendarVer2;


  const Layer = styled.div`
    border: solid red 5px;
    margin: auto;
    height: 850px;
    width: 1350px;
    color: #ffffff;
    background-image: url(${calBg});
    background-repeat: no-repeat;
    background-size: 1200px 700px;
    background-position: center;
  `;
  
  const MonthYear = styled.div`
    background-color: #388FFF;
    /* border: solid black 3px; */
    height: 70px;
    border-radius: 6px;
    margin: 20px 20px 0 20px;
    display: flex;
    justify-content:space-around;
    box-shadow: 5px 5px 5px 5px rgba(1,1,1,0.5);
  `;
  
  const Month = styled.div`
    /* border: solid red 1px; */
    width: 180px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
  `;
  const TodayMon = styled.div`
  font-size: 23px;
  font-weight: 700;
  `
  const YearBox = styled.div`
    /* border: solid red 1px; */
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 150px;
  `
  const TodayYear = styled.div`
    font-size:23px;
    font-weight: 700;
  `
  const PrevBtn =styled.img`
    width: 20px;
    height: 30px;
  cursor: pointer;
  `
  const NextBtn =styled.img`
    width: 20px;
    height: 30px;
    cursor: pointer;
  `
  
  const Wrapper = styled.div`
    position:absolute;
    top:117px;
    /* border: solid red 3px; */
    display: block;
    position: relative;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    color: #ffffff;

  `;
  
  const Calendar = styled.div`
    /* border: solid red 1px; */
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    height: 600px;
  `;
  
  const CalendarLeft = styled.div`
  /* border: solid red 3px; */
  position:relative;
    width: 350px;
    padding: 20px;
    background-color: #388FFF;
    box-shadow: 5px 5px 5px 5px rgba(1,1,1,0.5);
    margin: 20px;
    border-radius: 6px;
    display: block;
    height: 700px;
  `;
  const Today = styled.div`
    /* border:solid red 1px; */
    position:absolute;
    top:20px;
    right:20px;
    width:100px;
    font-size:80px;
    text-align:end;
    line-height: 58px;
  `

  const LeftSideDay = styled.div`
    font-size: 18px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    max-height: 400px;
  `;

  const TodoListBox =styled.div`
    margin-top:10px;
    border:solid #000 3px;
    border-radius: 6px;

  `
  const CategoryBox =styled.div`
     margin-bottom: 2px;
     padding: 0 10px;
     height: 40px;
     display:flex;
     justify-content:space-between;
     align-items:center;
  `
  const CategoryTitle = styled.form`

    color:white;
    padding-top:5px;
    input{
      background-color: #388FFF;
      border: none;
      outline:none;
      color:white;
      font-size:20px;
      font-weight:700;
      width: 200px;
      cursor: pointer;
    }
  `
  const BtnGroup =styled.div`

    display:flex;
    justify-content:space-between;
    width:60px;
  `
  const CategoryDeleteBtn = styled.div`
    background-color: red;
    transform: rotate(45deg);
    box-sizing: border-box;
    float: left;
    width: 25px;
    height: 25px;
    color: #fff;
    font-size: 25px;
    text-decoration: none;
    text-align: center;
    line-height: 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index:1;
    cursor:pointer;
  `


interface TodoInputShowProps {
  todoInputShow: boolean;
}


  const TodoPopBtn =styled.div<TodoInputShowProps>`
    box-sizing: border-box;
    float: left;
    width: 25px;
    height: 25px;
    color: #fff;
    background-color: #0E75F8;
    font-size: 40px;
    text-decoration: none;
    text-align: center;
    line-height: 15px;
    border: 2px solid #fff;
    border-radius: 50%;
    right: 35px;
    transform: ${({todoInputShow})=>(todoInputShow ? `rotate(-90deg)` :`rotate(90deg)`)};
    transition: transform .2s ease-in-out; 
    z-index:1;
    cursor:pointer;
  `

  const HiddenTodoAddBox = styled.form`
    background-color: #46BDF9;
    height:35px;
    transition: .2s ease-in-out; 
    padding:0 10px;
    display: flex;
    justify-content:space-between;
    align-items:center;
    input{
      width: 250px;
    }
  `
interface TodoProps {
  todo: string;
}
  const TodoAddBtn =styled.button<TodoProps>`
    
    background-color: #f6730e;
    background-color: ${({todo})=>(todo.length > 1 ? `#0E75F8` : '#f6730e')};
    box-sizing: border-box;
    float: left;
    width: 25px;
    height: 25px;
    color: #fff;
    font-size: 25px;
    text-decoration: none;
    text-align: center;
    line-height: 17px;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index:1;
    cursor:pointer;
  `

  const TodoList = styled.div`
    border-top: solid white 1.5px;
    height:35px;
    display:flex;
    align-items:center;
    padding: 0 10px;
  `


  const DoneBtn = styled.div`
    box-sizing: border-box;
    float: left;
    width: 18px;
    height: 18px;
    color: #fff;
    text-align: center;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index:1;
    cursor:pointer;
  `
  const Todo =styled.div`
  margin-left:10px;
  width: 220px;
  overflow : hidden;
  text-overflow : ellipsis;
  white-space : nowrap;
  `
  const TodoBtn =styled.div`
    /* border:solid red 1px; */
    margin-left:20px;
  `

  const DeleteBtn =styled.div`
    background-color: red;
    transform: rotate(45deg);
    box-sizing: border-box;
    float: left;
    width: 25px;
    height: 25px;
    color: #fff;
    font-size: 25px;
    text-decoration: none;
    text-align: center;
    line-height: 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index:1;
    cursor:pointer;
  `
  const CalendarRight = styled.div`
    /* border: solid red 3px; */
    position: relative;
    width: calc(80% - 300px);
    padding-bottom: 65%;
    overflow: hidden;
    margin: 20px;
    padding: 10px;
    background-color: #388FFF;
    box-shadow: 5px 5px 5px 5px rgba(1,1,1,0.5);
    border-radius: 6px;
    display: block;
  `;
  const Main = styled.div`
    /* border: solid red 3px; */
    left: -0.00070796%;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  `;
  
  const CalendarRow = styled.div`

    display: flex;
    justify-content: flex-start;
    font-weight:700;
  `;
  const CalendarCol = styled.div`

    width: calc(100% / 7);
    text-align: center;
    height: 50px;
    line-height: 50px;
    letter-spacing: 2px;
    text-transform: uppercase;
  `;
  const CalendarCel = styled.div`
    position: relative;
    width: calc(100% / 7);
    height:75px;
    text-align: center;
    cursor: pointer;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  const Cel = styled.div`
    display: block;
    padding-top: 100%;
  `;
  
  const P = styled.p`
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: #1175f8;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 3px 3px 3px 0.5px rgba(1,1,1,0.5);
    font-weight:700;
  `;
  
  const LeftLayer = styled.div`
    /* border: solid red 3px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
  const animation = keyframes`
   0% {
        stroke-dasharray: 0 ${2 * Math.PI * 48};
      }
  `;
  
  
  const AnimatedCircle = styled.circle`
    animation: ${animation} 3s ease;
  `;


const TopBox = styled.div`
/* border: solid red 1px; */
height: 60px;
`
interface CategoryInputShowProps {
  categoryInputShow: boolean;
}
const HiddenAddBtn = styled.div<CategoryInputShowProps>`
      position:relative;
      text-align:center;
      border-radius: 30px;
      background-color: #fff;
      width: ${({ categoryInputShow }) => (categoryInputShow ? "200px" : "40px")};
      height: 40px;
      transition: ${({ categoryInputShow }) => (categoryInputShow ? `.5s ease-in-out` : `width .3s .5s ease-in-out, height .5s ease-in-out`)};
`  
  
  const AddEventBtn = styled.div<CategoryInputShowProps>`
            position:absolute;
            box-sizing: border-box;
            float: left;
            width: 40px;
            height: 40px;
            margin: 0 10px 0 0;
            color: #fff;
            background-color: #ff6f00;
            font-size: 35px;
            text-decoration: none;
            text-align: center;
            line-height: 25px;
            border: 5px solid #fff;
            border-radius: 50%;
            transition: .2s ease-in-out;
            right: ${({ categoryInputShow }) => (categoryInputShow ? "-10px" : null)};
            cursor:pointer;
  `;
  const AddEventBtnHidden = styled.button`
            position:absolute;
            box-sizing: border-box;
            float: left;
            width: 40px;
            height: 40px;
            margin: 0 10px 0 0;
            color: #fff;
            background-color: #0E75F8;
            font-size: 35px;
            text-decoration: none;
            text-align: center;
            line-height: 25px;
            border: 5px solid #fff;
            border-radius: 50%;
            right:-10px;
            z-index:1;
            cursor:pointer;
  `;

  const AddCategory = styled.div<CategoryInputShowProps>`
   /* border: solid red 1px; */
   margin: 0;
    height: 40px;
    padding: 8px 29px 0 0;
    font-size: 0;
    line-height: 1.25;
      input  {
        width: ${({ categoryInputShow }) => (categoryInputShow ? "140px" : "0px")};
        height: ${({ categoryInputShow }) => (categoryInputShow ? "25px" : "0px")};  
        transition: width .2s .3s , height .3s ;
        border: none;
        outline: none;
      }
  `


  