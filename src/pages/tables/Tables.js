import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import API from "../../api/axios";
import axios from "axios";
import config from "../../config.json";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

let datatableData = [

];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

class Model {
  constructor() {
    this.authToken = localStorage.getItem("authToken");
  }

  async getUsers(limit, skip) {
    const { data } = await axios.post(config.server, {
      query: API.getUsers,
      variables: {
        limit: limit ? limit : 10,
        skip: skip ? skip : 0,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        "authToken": `Bearer ${this.authToken}`,
      },
    });
    console.log(this.authToken)

    if (data.data && data.data.getUsers && data.data.getUsers.length) {
      datatableData = [];
      data.data.getUsers.forEach(user => {
        let arr = [];
        arr.push(user.firstName);
        arr.push(user.lastName);

        let newDate = new Date(user.birthDate);
        let birthDate = newDate.getFullYear() + "-" + (newDate.getMonth() <= 9 ? "0" + (newDate.getMonth()+1) : newDate.getMonth()+1) + "-" + (newDate.getDate() <= 9 ? "0" + newDate.getDate() : newDate.getDate());
        arr.push(birthDate);
        arr.push(user.email);
        datatableData.push(arr);
      })
    }
  }
}

export default function Tables() {
  const classes = useStyles();
  const model = new Model();
  model.getUsers();
  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Users List"
            data={datatableData}
            columns={["FirstName", "LastName", "BirthDate", "Email"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}
