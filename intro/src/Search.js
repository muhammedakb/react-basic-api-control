import React from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { BsSearch } from "react-icons/bs";

const SearchPage = (props) => {
  const style = {
    outline: "none",
    focusedColor: "none",
    color: "rgb(43, 174, 185)",
  };

  return (
    <InputGroup style={{width:"500px",float:"right"}}>
      <Input style={style}
      placeholder="Aramak istediğiniz ürünü giriniz."
       />
      <InputGroupAddon addonType="append">
        <Button color="dark">
          <BsSearch />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchPage;