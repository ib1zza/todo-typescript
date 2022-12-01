import React, { useState } from "react";
import Wrapper from "../UI/Wrapper";
import SearchBar from "../UI/SearchBar";
import s from "../css/CompletedPage.module.scss";
import TodoListCompleted from "../components/TodoListCompleted";
import Burger from "../UI/Burger";

const CompletedPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menu, setMenu] = useState(false);

  return (
    <div style={{ marginTop: "50px" }}>
      <Wrapper>
        <div className={s.CompletedPageWrapper}>
          <div className={s.todoBlock}>
            {<TodoListCompleted searchQuery={searchQuery} />}
          </div>

          <div className={s.todoFilters}>
            <SearchBar
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>
        </div>
        <Burger isActive={menu} hideF={() => setMenu(!menu)}>
          <h1 className={s.header}>search</h1>
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </Burger>
      </Wrapper>
    </div>
  );
};

export default CompletedPage;
