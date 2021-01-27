import React, { Component } from "react";
import * as Yup from "yup";

import Form from "../Components/Forms/Form";
import Field from "../Components/Forms/Field";
import SubmitButton from "../Components/Forms/SubmitButton";
import UpdateAccountForm from "../Components/UpdateAccountForm";
import Tasks from "../Components/Tasks";

export default class TableauDeBord extends Component {
  state = {
    tasks: [
      {
        _id: 1,
        fait: false,
        title: "Faire de la nourriture pour la semaine",
        description: "Description de la tache",
        isFlagged: true,
        priority: false,
      },
      {
        _id: 2,
        fait: false,
        title: "Task 1",
        description: "Description de la tache",
        isFlagged: false,
        priority: true,
      },
      {
        _id: 3,
        fait: false,
        title: "Task 1",
        description: "Description de la tache",
        isFlagged: false,
        priority: true,
      },
      {
        _id: 4,
        completed: false,
        title: "Task 1",
        description: "Description de la tache",
        isFlagged: true,
        priority: true,
        isOpened: true,
      },
    ],
    updateAccount: false,
  };
  user = {
    name: "William",
    surname: "Pepin",
    email: "william@gmail.com",
  };

  handleComplete = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task, completed: !task.completed };

    // Todo delay 5 sec et envoi a l'api ensuite
    this.setState({ tasks });
  };

  handlePriority = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task, priority: !task.priority };

    this.setState(tasks);
    // Todo api call
  };

  handleFlag = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.indexOf(task);

    tasks[index] = { ...task, isFlagged: !task.isFlagged };

    this.setState(tasks);
    // Todo api call
  };

  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });
  };

  initialValues = {
    title: "",
    description: "",
    priority: false,
    flagged: false,
  };
  validationSchema = Yup.object().shape({
    title: Yup.string().required().max(127).label("Titre"),
    description: Yup.string().max(255).label("Description"),
  });

  handleSubmit = (values, actions) => {
    const task = {
      _id: 5,
      title: values.title,
      description: values.description,
      completed: false,
      isFlagged: false,
      priority: false,
    };
    const tasks = [...this.state.tasks, task];

    this.setState({ tasks });
  };

  handleUpdateAccount = () => {
    const updateAccount = this.state.updateAccount;
    this.setState({ updateAccount: !updateAccount });
  };

  render() {
    return (
      <div className="row" style={this.styles.container}>
        <div className="card col-xl-7 col-11 " style={this.styles.content}>
          <h3>Mes Tâches</h3>
          <Tasks
            tasks={this.state.tasks}
            onFlag={this.handleFlag}
            onPriority={this.handlePriority}
            onComplete={this.handleComplete}
            onDelete={this.handleDelete}
          ></Tasks>
        </div>
        <div className="card col-xl-4 col-11" style={this.styles.content}>
          <h3>Nouvelle tâche</h3>
          <Form
            initialValues={this.initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={this.validationSchema}
          >
            <Field
              name="title"
              type="text"
              label="Titre"
              placeholder="Entrez votre titre."
            />
            <Field
              name="description"
              type="text"
              label="Description"
              placeholder="Entrez votre description."
            />
            <SubmitButton title="Nouvelle tâche" />
          </Form>
          <hr />
          <h3>Mon compte</h3>
          {!this.state.updateAccount && (
            <div>
              <h6>
                {this.user.name} {this.user.surname}
              </h6>
              <label>Email</label>
              <p>{this.user.email}</p>
              <label>Mot de passe</label>
              <p>************</p>
              <button
                style={{ marginTop: "6px" }}
                className="btn btn-danger"
                onClick={this.handleUpdateAccount}
              >
                Modifier
              </button>
            </div>
          )}
          {this.state.updateAccount && (
            <div>
              <UpdateAccountForm user={this.user} />{" "}
              <button
                style={{ marginTop: "6px" }}
                className="btn btn-warning"
                onClick={this.handleUpdateAccount}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  styles = {
    container: {
      justifyContent: "center",
      display: "flex",
      padding: "1rem",
      margin: "auto",
    },
    content: {
      padding: "2rem",
      margin: "1rem",
    },
  };
}
